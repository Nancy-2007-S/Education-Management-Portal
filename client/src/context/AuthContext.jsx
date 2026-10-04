// AuthContext.jsx — Firebase Auth state + backend profile sync
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);   // Firebase user
  const [userProfile, setUserProfile] = useState(null);   // RTDB profile
  const [role, setRole]               = useState(null);   // 'student' | 'teacher' | 'admin'
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setCurrentUser(firebaseUser);
        try {
          const idToken = await firebaseUser.getIdToken();
          const res = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${idToken}` },
          });

          // Unpack user profile accurately regardless of Axios interceptor structure
          const userObj = res?.user || res?.data?.user || res?.data || res;
          const profile = userObj || {};

          // Extract role from profile, custom claims, or email identifier
          let userRole = profile?.profile?.role || profile?.role;
          if (!userRole) {
            const tokenResult = await firebaseUser.getIdTokenResult();
            userRole = tokenResult.claims?.role;
          }
          if (!userRole) {
            const email = firebaseUser.email?.toLowerCase() || '';
            if (email.includes('admin')) userRole = 'admin';
            else if (email.includes('teacher') || email.includes('faculty') || email.includes('prof')) userRole = 'teacher';
            else userRole = 'student';
          }

          setUserProfile(profile);
          setRole(userRole);
        } catch (err) {
          const email = firebaseUser.email?.toLowerCase() || '';
          let fallbackRole = 'student';
          if (email.includes('admin')) fallbackRole = 'admin';
          else if (email.includes('teacher') || email.includes('faculty') || email.includes('prof')) fallbackRole = 'teacher';

          try {
            const tokenResult = await firebaseUser.getIdTokenResult();
            if (tokenResult.claims?.role) fallbackRole = tokenResult.claims.role;
          } catch (_) {}

          setRole(fallbackRole);
          setUserProfile({
            uid: firebaseUser.uid,
            profile: {
              name: firebaseUser.displayName || (email ? email.split('@')[0] : 'Portal User'),
              email: firebaseUser.email,
              role: fallbackRole,
            }
          });
        }
      } else {
        setCurrentUser(null);
        setUserProfile(null);
        setRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  /** Returns the current Firebase ID token (for attaching to API requests) */
  const getToken = async () => {
    if (!currentUser) return null;
    return currentUser.getIdToken();
  };

  const logout = () => signOut(auth);

  const value = { currentUser, userProfile, role, loading, getToken, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
