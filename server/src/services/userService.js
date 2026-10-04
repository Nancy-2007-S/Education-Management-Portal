// userService.js — RTDB /users
const { db, auth } = require('../config/firebase');

const usersRef = () => db.ref('users');
const userRef  = (uid) => db.ref(`users/${uid}`);

/** Get full user profile from RTDB (auto-provisions if missing) */
const getUserById = async (uid) => {
  const snap = await userRef(uid).once('value');
  if (!snap.exists()) {
    try {
      const authUser = await auth.getUser(uid);
      const email = authUser.email || '';
      const customRole = authUser.customClaims?.role;
      const role = customRole || (email.includes('admin') ? 'admin' : email.includes('teacher') ? 'teacher' : 'student');
      
      const profile = {
        name: authUser.displayName || (email ? email.split('@')[0] : 'Portal User'),
        email,
        role,
        photoURL: authUser.photoURL || null,
        isActive: true,
        createdAt: new Date().toISOString(),
      };

      await userRef(uid).update({ profile });

      if (role === 'student') {
        await userRef(uid).child('studentInfo').update({
          rollNumber: 'STU-' + uid.slice(0, 6).toUpperCase(),
          batch: '2026',
          semester: 4,
          enrolledCourses: {},
        });
      } else if (role === 'teacher') {
        await userRef(uid).child('teacherInfo').update({
          employeeId: 'EMP-' + uid.slice(0, 6).toUpperCase(),
          assignedCourses: {},
          assignedClasses: {},
        });
      }

      await setUserRoleClaim(uid, role);
      const createdSnap = await userRef(uid).once('value');
      return { uid, ...createdSnap.val() };
    } catch (err) {
      throw new Error('User profile not found: ' + err.message);
    }
  }
  return { uid, ...snap.val() };
};

/** List all users (admin only) */
const getAllUsers = async () => {
  const snap = await usersRef().once('value');
  if (!snap.exists()) return [];
  const users = [];
  snap.forEach((child) => users.push({ uid: child.key, ...child.val() }));
  return users;
};

/** List users by role */
const getUsersByRole = async (role) => {
  const snap = await usersRef().orderByChild('profile/role').equalTo(role).once('value');
  if (!snap.exists()) return [];
  const users = [];
  snap.forEach((child) => users.push({ uid: child.key, ...child.val() }));
  return users;
};

/** Create / update user profile after Firebase Auth registration */
const createOrUpdateUser = async (uid, profileData) => {
  await userRef(uid).update({ profile: profileData });
  return getUserById(uid);
};

/** Update student-specific info */
const updateStudentInfo = async (uid, studentInfo) => {
  await userRef(uid).child('studentInfo').update(studentInfo);
  return getUserById(uid);
};

/** Update teacher-specific info */
const updateTeacherInfo = async (uid, teacherInfo) => {
  await userRef(uid).child('teacherInfo').update(teacherInfo);
  return getUserById(uid);
};

/** Enroll student in a course — writes to /users/$uid/studentInfo/enrolledCourses/$courseId */
const enrollStudentInCourse = async (uid, courseId) => {
  await userRef(uid).child(`studentInfo/enrolledCourses/${courseId}`).set({
    enrolledAt: new Date().toISOString(),
    status: 'active',
  });
};

/** Remove / soft-delete user (disable in Firebase Auth + flag in RTDB) */
const deleteUser = async (uid) => {
  await auth.updateUser(uid, { disabled: true });
  await userRef(uid).child('profile/isActive').set(false);
};

/** Set custom role claim on Firebase Auth token */
const setUserRoleClaim = async (uid, role) => {
  await auth.setCustomUserClaims(uid, { role });
};

module.exports = {
  getUserById,
  getAllUsers,
  getUsersByRole,
  createOrUpdateUser,
  updateStudentInfo,
  updateTeacherInfo,
  enrollStudentInCourse,
  deleteUser,
  setUserRoleClaim,
};
