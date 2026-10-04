import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  User, Award, BookOpen, Clock, FileText, CheckCircle, AlertCircle, AlertTriangle,
  ChevronRight, Calendar, Settings, Sparkles, Brain, Check, ArrowRight, Download
} from 'lucide-react';
import StatCard from '../teacher/components/StatCard';
import SectionCard from '../teacher/components/SectionCard';

export default function StudentDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Parse query parameter tab
  const getTab = () => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') || 'overview';
  };

  const activeTab = getTab();
  const { userProfile } = useAuth();

  // Profile State mapping to current user
  const [profile, setProfile] = useState({
    name: userProfile?.name || 'Student',
    id: userProfile?.rollNumber || 'STU-2026-004',
    email: userProfile?.email || 'student@eduportal.com',
    phone: userProfile?.phone || '+1 (555) 234-5678',
    major: userProfile?.department || 'Computer Science & Engineering',
    semester: '4th Semester (Sophomore)',
    gpa: '3.82',
    bio: 'Passionate computer science undergraduate focusing on Data Structures, Algorithms, and Database Management.',
    avatar: userProfile?.name?.charAt(0) || 'S'
  });

  useEffect(() => {
    if (userProfile) {
      setProfile(prev => ({
        ...prev,
        name: userProfile.name || prev.name,
        email: userProfile.email || prev.email,
        id: userProfile.rollNumber || userProfile.uid || prev.id,
        major: userProfile.department || prev.major,
        avatar: (userProfile.name || 'S').charAt(0)
      }));
    }
  }, [userProfile]);

  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleProfileSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // AI recommendations actions
  const [recList, setRecList] = useState([
    { id: 1, text: "Revise Electromagnetism formulas for the upcoming Physics Midterm.", completed: false, tag: "Urgent" },
    { id: 2, text: "Review feedback on 'Database Relational Algebra' assignment.", completed: false, tag: "Review" },
    { id: 3, text: "Practice 15 limits problems to boost your Calculus scores.", completed: false, tag: "Practice" },
    { id: 4, text: "Read Chapter 4 of Data Structures textbook for tomorrow's class.", completed: false, tag: "Preparation" },
  ]);

  const toggleRec = (id) => {
    setRecList(recList.map(rec => rec.id === id ? { ...rec, completed: !rec.completed } : rec));
  };

  const activeCourses = [
    { code: 'CS201', name: 'Data Structures & Algorithms', instructor: 'Dr. Sarah Jenkins', progress: 78, grade: 'A-', color: '#FF6B00' },
    { code: 'MATH302', name: 'Calculus III', instructor: 'Prof. Ryan Miller', progress: 62, grade: 'B', color: '#3B82F6' },
    { code: 'PHYS202', name: 'General Physics II', instructor: 'Dr. Alan Vance', progress: 45, grade: 'C+', color: '#EF4444' },
    { code: 'CS204', name: 'Database Management Systems', instructor: 'Prof. Amy Lin', progress: 90, grade: 'A', color: '#10B981' },
  ];

  const todayClasses = [
    { time: '09:00 AM - 10:30 AM', subject: 'Calculus III (Lecture)', room: 'Lecture Hall A • Prof. Ryan Miller', status: 'Upcoming' },
    { time: '11:00 AM - 12:30 PM', subject: 'Data Structures (Lab)', room: 'Computer Lab 3 • Dr. Sarah Jenkins', status: 'Upcoming' },
    { time: '02:00 PM - 03:30 PM', subject: 'DBMS Seminar (Optional)', room: 'Seminar Room B • Prof. Amy Lin', status: 'Optional' },
  ];

  return (
    <div id="student-dashboard-page">
      {activeTab === 'overview' && (
        <div className="tab-view-container animate-fade">
          {/* Welcome Header */}
          <div className="teacher-welcome">
            <h1>Welcome back, {profile.name}! 👋</h1>
            <p>Here is a live summary of your academic standing, active courses, and study schedule — {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'})}</p>
          </div>

          {/* Smart Warning Alert Banner */}
          <div className="teacher-info-banner" style={{ background: '#FFFBEB', border: '1px solid #FDE68A', display: 'flex', gap: '12px', padding: '16px 20px', borderRadius: '12px', marginBottom: '24px', cursor: 'pointer' }} onClick={() => navigate('/student/progress?tab=weak')}>
            <div className="info-icon" style={{ background: '#F59E0B', color: '#FFFFFF', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <AlertTriangle size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, color: '#92400E', fontSize: '14px', fontWeight: 700 }}>Academic Focus Alert: General Physics II</h4>
              <p style={{ margin: '3px 0 0', color: '#B45309', fontSize: '13px', lineHeight: '1.4' }}>
                Your Physics II score is currently at 45% (DC Circuits module). Click here to view weak topic recommendations and schedule tutoring.
              </p>
            </div>
            <button className="btn-brand-outline" style={{ height: 'fit-content', alignSelf: 'center', fontSize: '12px', padding: '6px 12px' }}>
              View Tips
            </button>
          </div>

          {/* Stats Grid using StatCards */}
          <div className="stats-grid">
            <StatCard
              title="Cumulative GPA"
              value={profile.gpa}
              subtitle="Top 8% of CSE Cohort"
              icon={<Award size={20} />}
              gradient="gradient-1"
              iconColor="orange"
            />
            <StatCard
              title="Enrolled Courses"
              value="4 Subjects"
              subtitle="14 Active Credits"
              icon={<BookOpen size={20} />}
              gradient="gradient-2"
              valueColor="blue"
              subtitleColor="blue"
              iconColor="blue"
            />
            <StatCard
              title="Attendance Rate"
              value="94.8%"
              subtitle="Safe Zone (> 85% required)"
              icon={<CheckCircle size={20} />}
              gradient="gradient-4"
              valueColor="green"
              subtitleColor="green"
              iconColor="green"
            />
            <StatCard
              title="Pending Assignments"
              value="3 Due"
              subtitle="Next due in 2 days"
              icon={<FileText size={20} />}
              gradient="gradient-3"
              valueColor="cyan"
              iconColor="cyan"
            />
            <StatCard
              title="Study Streak"
              value="12 Days"
              subtitle="Active EduAI Learner"
              icon={<Sparkles size={20} />}
              gradient="gradient-5"
              valueColor="red"
              iconColor="red"
            />
          </div>

          {/* Dashboard Main Grid */}
          <div className="dashboard-grid">
            {/* Left Main Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Active Courses Progress */}
              <SectionCard title="My Active Courses & Completion" actionLabel="All Courses" onActionClick={() => navigate('/student/courses')}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '6px' }}>
                  {activeCourses.map((course) => (
                    <div 
                      key={course.code} 
                      style={{ 
                        padding: '16px', 
                        background: '#FFFFFF', 
                        borderRadius: '12px', 
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span className="edu-badge edu-badge-primary" style={{ fontSize: '11px', fontWeight: 700, padding: '4px 8px' }}>{course.code}</span>
                          <span style={{ fontWeight: 700, fontSize: '14.5px', color: '#1A1A2E' }}>{course.name}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>Grade: <strong style={{ color: course.color }}>{course.grade}</strong></span>
                          <span style={{ fontSize: '12px', fontWeight: 700, background: '#F3F4F6', padding: '2px 10px', borderRadius: '12px', color: '#1A1A2E' }}>
                            {course.progress}% Completed
                          </span>
                        </div>
                      </div>

                      <div style={{ height: '8px', background: '#F3F4F6', borderRadius: '4px', overflow: 'hidden', margin: '2px 0' }}>
                        <div style={{ width: `${course.progress}%`, height: '100%', background: course.color, borderRadius: '4px', transition: 'width 0.4s ease' }} />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px', color: '#6B7280', paddingTop: '2px' }}>
                        <span>Instructor: <strong style={{ color: '#374151' }}>{course.instructor}</strong></span>
                        <Link to="/student/courses" style={{ color: '#FF6B00', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          View Syllabus <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

              </SectionCard>

              {/* EduAI Recommended Actions */}
              <SectionCard title="EduAI Recommended Study Tasks" actionLabel="Full Checklist" onActionClick={() => navigate('/student/dashboard?tab=ai-rec')}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '6px' }}>
                  {recList.slice(0, 3).map((rec) => (
                    <div 
                      key={rec.id} 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        padding: '12px 14px', 
                        border: '1px solid #E5E7EB', 
                        borderRadius: '10px',
                        background: rec.completed ? '#F9FAFB' : '#FFFFFF',
                        opacity: rec.completed ? 0.7 : 1
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button 
                          onClick={() => toggleRec(rec.id)}
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '4px',
                            border: '2px solid #FF6B00',
                            background: rec.completed ? '#FF6B00' : 'transparent',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            padding: 0
                          }}
                        >
                          {rec.completed && <Check size={14} />}
                        </button>
                        <span style={{ fontSize: '13px', textDecoration: rec.completed ? 'line-through' : 'none', fontWeight: '500', color: '#1A1A2E' }}>
                          {rec.text}
                        </span>
                      </div>

                      <span className={`edu-badge ${
                        rec.tag === 'Urgent' ? 'edu-badge-warning' : 
                        rec.tag === 'Review' ? 'edu-badge-info' : 'edu-badge-success'
                      }`} style={{ fontSize: '11px' }}>
                        {rec.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>

            {/* Right Sidebar Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Today's Timetable */}
              <SectionCard title="Today's Classes" actionLabel="Full Timetable" onActionClick={() => navigate('/student/attendance')}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '4px' }}>
                  {todayClasses.map((cls, idx) => (
                    <div className="schedule-item" key={idx}>
                      <div className="schedule-time">{cls.time}</div>
                      <div className="schedule-info">
                        <h4>{cls.subject}</h4>
                        <p>{cls.room}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Upcoming Deadlines Quick Widget */}
              <SectionCard title="Upcoming Assignments" actionLabel="Submit Work" onActionClick={() => navigate('/student/assignments')}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '4px' }}>
                  <div style={{ padding: '12px', borderRadius: '8px', borderLeft: '4px solid #EF4444', background: '#FEF2F2' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: '#991B1B', marginBottom: '2px' }}>
                      <span>Red-Black Trees Assignment</span>
                      <span>Due in 2 days</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '11px', color: '#7F1D1D' }}>CS201 Data Structures • 50 pts</p>
                  </div>

                  <div style={{ padding: '12px', borderRadius: '8px', borderLeft: '4px solid #F59E0B', background: '#FFFBEB' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: '#92400E', marginBottom: '2px' }}>
                      <span>SQL Lab 4 Complex Queries</span>
                      <span>Due in 5 days</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '11px', color: '#B45309' }}>CS204 Database Systems • 100 pts</p>
                  </div>
                </div>
              </SectionCard>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="tab-view-container animate-fade">
          <div className="teacher-welcome">
            <h1>My Profile & Specialization</h1>
            <p>Manage your personal contact info, degree program, and bio.</p>
          </div>

          {saveSuccess && (
            <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', padding: '12px 16px', borderRadius: '10px', marginBottom: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={16} /> Profile changes saved successfully!
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
            {/* Left Profile Avatar Card */}
            <div className="section-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: 'fit-content' }}>
              <div style={{ width: '90px', height: '90px', background: 'linear-gradient(135deg, #FF6B00, #FF8C38)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px', boxShadow: '0 4px 12px rgba(255, 107, 0, 0.3)' }}>
                {profile.avatar}
              </div>
              <h3 style={{ fontSize: '1.2rem', margin: '0 0 4px', color: '#1A1A2E' }}>{profile.name}</h3>
              <span className="edu-badge edu-badge-primary" style={{ marginBottom: '16px' }}>{profile.id}</span>
              
              <div style={{ width: '100%', textAlign: 'left', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '16px', borderTop: '1px solid #F0F0F0' }}>
                <div>
                  <span style={{ fontWeight: '600', color: '#6B7280' }}>Major / Department:</span>
                  <p style={{ margin: '2px 0 0', fontWeight: 600, color: '#1A1A2E' }}>{profile.major}</p>
                </div>
                <div>
                  <span style={{ fontWeight: '600', color: '#6B7280' }}>Academic Standing:</span>
                  <p style={{ margin: '2px 0 0', fontWeight: 600, color: '#1A1A2E' }}>{profile.semester}</p>
                </div>
                <div>
                  <span style={{ fontWeight: '600', color: '#6B7280' }}>Cumulative GPA:</span>
                  <p style={{ margin: '2px 0 0', fontWeight: 700, color: '#FF6B00' }}>{profile.gpa} / 4.00</p>
                </div>
              </div>
            </div>

            {/* Right Profile Fields Form */}
            <div className="section-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 className="section-title">Personal Information</h3>
                {!isEditing && (
                  <button className="btn-brand-outline" onClick={() => setIsEditing(true)} style={{ fontSize: '12px', padding: '6px 14px' }}>
                    Edit Profile
                  </button>
                )}
              </div>

              <form onSubmit={handleProfileSave}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div className="edu-input-group">
                    <label className="edu-label">Full Name</label>
                    <input 
                      type="text" 
                      className="edu-input" 
                      value={profile.name} 
                      disabled={!isEditing} 
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="edu-input-group">
                    <label className="edu-label">Student Roll Number (Read-only)</label>
                    <input 
                      type="text" 
                      className="edu-input" 
                      value={profile.id} 
                      disabled 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div className="edu-input-group">
                    <label className="edu-label">Email Address</label>
                    <input 
                      type="email" 
                      className="edu-input" 
                      value={profile.email} 
                      disabled={!isEditing}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="edu-input-group">
                    <label className="edu-label">Phone Contact</label>
                    <input 
                      type="text" 
                      className="edu-input" 
                      value={profile.phone} 
                      disabled={!isEditing}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="edu-input-group" style={{ marginBottom: '16px' }}>
                  <label className="edu-label">Department & Degree Major</label>
                  <input 
                    type="text" 
                    className="edu-input" 
                    value={profile.major} 
                    disabled={!isEditing}
                    onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                    required
                  />
                </div>

                <div className="edu-input-group" style={{ marginBottom: '24px' }}>
                  <label className="edu-label">Academic Biography</label>
                  <textarea 
                    rows="4" 
                    className="edu-input" 
                    value={profile.bio} 
                    disabled={!isEditing}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    style={{ resize: 'none' }}
                  ></textarea>
                </div>

                {isEditing && (
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button type="button" className="btn-brand-outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn-brand">
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ai-rec' && (
        <div className="tab-view-container animate-fade">
          <div className="teacher-welcome">
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Brain color="#FF6B00" />
              <span>EduAI Academic Recommendations</span>
            </h1>
            <p>Smart study objectives dynamically calculated to improve your core subject grades.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            <div className="section-card">
              <h3 className="section-title" style={{ marginBottom: '8px' }}>Your Personalized Study Plan</h3>
              <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '20px' }}>Check off objectives to complete them. EduAI evaluates your completion rates to adjust difficulty and targets.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recList.map((rec) => (
                  <div 
                    key={rec.id} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      padding: '14px 16px', 
                      border: '1px solid #E5E7EB', 
                      borderRadius: '10px',
                      background: rec.completed ? '#F9FAFB' : '#FFFFFF',
                      opacity: rec.completed ? 0.7 : 1,
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button 
                        onClick={() => toggleRec(rec.id)}
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '6px',
                          border: '2px solid #FF6B00',
                          background: rec.completed ? '#FF6B00' : 'transparent',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          padding: 0
                        }}
                      >
                        {rec.completed && <Check size={14} />}
                      </button>
                      <span style={{ fontSize: '14px', textDecoration: rec.completed ? 'line-through' : 'none', fontWeight: '500', color: '#1A1A2E' }}>
                        {rec.text}
                      </span>
                    </div>

                    <span className={`edu-badge ${
                      rec.tag === 'Urgent' ? 'edu-badge-warning' : 
                      rec.tag === 'Review' ? 'edu-badge-info' : 'edu-badge-success'
                    }`}>
                      {rec.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="section-card" style={{ background: '#FFF5EB', borderColor: '#FED7AA' }}>
                <h3 style={{ fontSize: '15px', color: '#FF6B00', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} />
                  <span>AI Learning Path Insight</span>
                </h3>
                <p style={{ fontSize: '13px', color: '#4B5563', lineHeight: '1.6', margin: 0 }}>
                  Based on recent grades, your learning path is pointing towards reinforcing Calculus multivariable limits and Physics electromagnetism basics. Completed items automatically sync to your progress report.
                </p>
              </div>

              <div className="section-card">
                <h3 className="section-title" style={{ marginBottom: '12px' }}>Resource Recommendations</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                  <a href="#tutorial" style={{ display: 'block', padding: '10px 12px', border: '1px solid #E5E7EB', borderRadius: '8px', textDecoration: 'none', color: 'inherit', background: '#FAFAFA' }}>
                    <p style={{ fontWeight: '600', color: '#FF6B00', margin: '0 0 2px' }}>Syllabus: Integration Rules Sheet</p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: 0 }}>PDF study guide • 1.2 MB</p>
                  </a>
                  <a href="#tutorial" style={{ display: 'block', padding: '10px 12px', border: '1px solid #E5E7EB', borderRadius: '8px', textDecoration: 'none', color: 'inherit', background: '#FAFAFA' }}>
                    <p style={{ fontWeight: '600', color: '#FF6B00', margin: '0 0 2px' }}>Video: Gauss's Law Explained</p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: 0 }}>14 mins lecture • Youtube</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

