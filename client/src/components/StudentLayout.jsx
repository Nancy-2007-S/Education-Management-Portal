import { useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import StudentSidebar from './StudentSidebar';
import StudentHeader from './StudentHeader';
import { MessageSquare, Sparkles, HelpCircle } from 'lucide-react';
import '../pages/teacher/TeacherDashboard.css';

export default function StudentLayout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hi! I am your EduAI Assistant. Ask me anything about your courses, assignments, or progress!' }
  ]);
  const [userInput, setUserInput] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    const query = userInput.trim();
    if (!query) return;

    const newMsgs = [...chatMessages, { sender: 'user', text: query }];
    setChatMessages(newMsgs);
    setUserInput('');

    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      let botResponse = "I am analyzing your academic record. Keep up your study streak and focus on your active course assignments!";

      if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
        botResponse = "Hello! I am your EduAI Assistant. How can I help you with your studies, assignments, or grades today?";
      } else if (lowerQuery.includes('gpa') || lowerQuery.includes('grade') || lowerQuery.includes('score')) {
        botResponse = "Your current Cumulative GPA is healthy! Check the 'Grades & GPA' section on your dashboard for detailed transcript breakdown.";
      } else if (lowerQuery.includes('course') || lowerQuery.includes('class')) {
        botResponse = "You can view all enrolled courses and syllabi in the 'My Courses' section!";
      } else if (lowerQuery.includes('assignment') || lowerQuery.includes('homework')) {
        botResponse = "Check your 'My Assignments' tab for upcoming deadlines and score breakdown.";
      } else if (lowerQuery.includes('attendance')) {
        botResponse = "Your attendance summary is tracked live. Access the 'Attendance' page to see detailed subject-wise attendance.";
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 600);
  };

  const getPageInfo = (path) => {
    switch (path) {
      case '/student/dashboard':
        return {
          title: "Student Academic Dashboard",
          desc: "High-level overview of your active courses, upcoming assignment deadlines, and performance metrics."
        };
      case '/student/courses':
        return {
          title: "My Courses Portal",
          desc: "Access your enrolled subjects, view class schedules, syllabus breakdown, and course materials."
        };
      case '/student/assignments':
        return {
          title: "Assignments & Submission Hub",
          desc: "Track pending coursework, submit assignments online, and view teacher feedback and grades."
        };
      case '/student/attendance':
        return {
          title: "Attendance Tracker",
          desc: "Monitor your overall class attendance stats, monthly trends, and subject-wise logs."
        };
      case '/student/grades':
        return {
          title: "Academic Transcript & CGPA",
          desc: "Review your semester GPA, exam grade sheets, and credit breakdown."
        };
      case '/student/progress':
        return {
          title: "Progress & AI Study Recommendations",
          desc: "Identify weak subjects, receive custom study plans, and monitor subject growth."
        };
      default:
        return {
          title: "EduPortal Student Portal",
          desc: "Empowering your academic journey with live insights, smart tracking, and EduAI assistance."
        };
    }
  };

  const pageInfo = getPageInfo(location.pathname);

  return (
    <div className={`teacher-layout ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <StudentSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="teacher-main-area">
        <StudentHeader onMobileToggle={() => setMobileOpen(!mobileOpen)} />

        <main className="teacher-content">
          {/* Informative Banner matching Teacher theme */}
          <div className="teacher-info-banner">
            <HelpCircle size={20} className="info-icon" />
            <div>
              <h4>{pageInfo.title}</h4>
              <p>{pageInfo.desc}</p>
            </div>
          </div>

          {/* Nested Page Body */}
          <Outlet />
        </main>
      </div>

      {/* Floating EduAI Study Assistant */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}>
        <button 
          onClick={() => setShowChat(!showChat)} 
          style={{
            width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF6B00, #FF8C38)',
            color: '#fff', border: 'none', boxShadow: '0 4px 14px rgba(255, 107, 0, 0.4)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s'
          }}
          title="EduAI Study Assistant"
        >
          <MessageSquare size={24} />
        </button>

        {showChat && (
          <div style={{
            position: 'absolute', bottom: '64px', right: '0', width: '340px', height: '440px',
            background: '#FFFFFF', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            border: '1px solid #F0F0F0', display: 'flex', flexDirection: 'column', overflow: 'hidden'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #FF6B00, #FF8C38)', padding: '14px 18px', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 'bold'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <Sparkles size={18} />
                <span>EduAI Assistant</span>
              </div>
              <button onClick={() => setShowChat(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>×</button>
            </div>

            <div style={{ flex: 1, padding: '14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '82%', padding: '10px 14px', borderRadius: '12px', fontSize: '13px', lineHeight: '1.4',
                  background: msg.sender === 'user' ? '#FF6B00' : '#FFF5EB',
                  color: msg.sender === 'user' ? '#FFFFFF' : '#1A1A2E'
                }}>
                  {msg.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} style={{ padding: '10px', borderTop: '1px solid #F0F0F0', display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                placeholder="Ask EduAI study assistant..." 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                style={{ flex: 1, padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
              />
              <button type="submit" style={{ padding: '8px 14px', background: '#FF6B00', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>Send</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

