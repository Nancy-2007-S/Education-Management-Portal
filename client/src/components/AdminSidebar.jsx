import {
  TrendingUp, Users, UserCheck, BookOpen, FileText, Award, BarChart3, Bot, ChevronLeft, ChevronRight
} from 'lucide-react';

export default function AdminSidebar({ activeTab, setActiveTab, collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const navItems = [
    { id: 'analytics', label: 'Global Analytics', icon: TrendingUp },
    { id: 'students', label: 'Manage Students', icon: Users },
    { id: 'teachers', label: 'Manage Teachers', icon: UserCheck },
    { id: 'courses', label: 'Manage Courses & Classes', icon: BookOpen },
    { id: 'assignments', label: 'Manage Assignments', icon: FileText },
    { id: 'exams', label: 'Manage Exams & Grades', icon: Award },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'ai', label: 'AI Insights & Monitoring', icon: Bot },
  ];

  return (
    <>
      <div className={`sidebar-overlay ${mobileOpen ? 'visible' : ''}`} onClick={() => setMobileOpen && setMobileOpen(false)} />
      <aside className={`teacher-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-info">
            <div className="brand-logo">EP</div>
            <div className="brand-text">
              <h3>EduPortal</h3>
              <span>Admin Portal</span>
            </div>
          </div>
          <button className="sidebar-toggle" onClick={() => { setCollapsed(!collapsed); setMobileOpen && setMobileOpen(false); }}>
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        <div className="sidebar-role">Administrator</div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMobileOpen && setMobileOpen(false); }}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="nav-icon" size={20} />
                <span className="nav-label">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
