import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, FileText, Calendar, Award, TrendingUp, 
  Sparkles, CheckSquare, Compass, ChevronLeft, ChevronRight, User
} from 'lucide-react';

const navItems = [
  { to: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard', exactTab: 'overview' },
  { to: '/student/courses', icon: BookOpen, label: 'My Courses' },
  { to: '/student/assignments', icon: FileText, label: 'My Assignments' },
  { to: '/student/attendance', icon: Calendar, label: 'Attendance' },
  { to: '/student/grades', icon: Award, label: 'Grades & GPA' },
  { to: '/student/progress', icon: TrendingUp, label: 'Progress Overview', exactTab: 'performance' },
  { divider: true },
  { to: '/student/progress?tab=weak', icon: CheckSquare, label: 'Weak Subjects', exactTab: 'weak' },
  { to: '/student/progress?tab=tips', icon: Sparkles, label: 'Improvement Tips', exactTab: 'tips' },
  { to: '/student/dashboard?tab=ai-rec', icon: Compass, label: 'AI Recommendations', exactTab: 'ai-rec' },
  { divider: true },
  { to: '/student/dashboard?tab=profile', icon: User, label: 'My Profile', exactTab: 'profile' },
];

export default function StudentSidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const location = useLocation();

  const isItemActive = (item) => {
    const currentPath = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    const currentTab = searchParams.get('tab');

    if (item.to.includes('?tab=')) {
      const targetTab = item.exactTab;
      return currentPath === item.to.split('?')[0] && currentTab === targetTab;
    } else {
      // For base routes like /student/dashboard or /student/progress
      if (item.exactTab) {
        return currentPath === item.to && (!currentTab || currentTab === item.exactTab);
      }
      return currentPath === item.to;
    }
  };

  return (
    <>
      <div className={`sidebar-overlay ${mobileOpen ? 'visible' : ''}`} onClick={() => setMobileOpen(false)} />
      <aside className={`teacher-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-info">
            <div className="brand-logo">EP</div>
            <div className="brand-text">
              <h3>EduPortal</h3>
              <span>Student Portal</span>
            </div>
          </div>
          <button className="sidebar-toggle" onClick={() => { setCollapsed(!collapsed); setMobileOpen(false); }}>
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        <div className="sidebar-role">Student</div>

        <nav className="sidebar-nav">
          {navItems.map((item, i) =>
            item.divider ? (
              <div className="sidebar-divider" key={`div-${i}`} />
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className={`sidebar-nav-item ${isItemActive(item) ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <item.icon className="nav-icon" size={20} />
                <span className="nav-label">{item.label}</span>
              </Link>
            )
          )}
        </nav>
      </aside>
    </>
  );
}

