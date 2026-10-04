import { useState } from 'react';
import { BookOpen, Search, User, Award, Clock, ArrowRight, Download, CheckCircle, FileText, Sparkles } from 'lucide-react';
import StatCard from '../teacher/components/StatCard';
import SectionCard from '../teacher/components/SectionCard';

export default function MyCourses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    {
      id: 'CS201',
      title: 'Data Structures & Algorithms',
      instructor: 'Dr. Sarah Jenkins',
      schedule: 'Mon, Wed 02:00 PM - 03:30 PM',
      credits: 4,
      progress: 78,
      grade: 'A-',
      status: 'Active',
      color: '#FF6B00',
      description: 'Core concepts of data structures including trees, graphs, heaps, and algorithmic analysis techniques.',
      syllabus: [
        { week: 'Week 1-3', title: 'Complexity Analysis & Linear Structures', completed: true },
        { week: 'Week 4-6', title: 'Trees, BST, AVL Trees & Red-Black Trees', completed: true },
        { week: 'Week 7-9', title: 'Heaps, Priority Queues & Hashing', completed: true },
        { week: 'Week 10-12', title: 'Graph Algorithms: BFS, DFS, Dijkstra', completed: false },
        { week: 'Week 13-15', title: 'Dynamic Programming & Greedy Algorithms', completed: false },
      ]
    },
    {
      id: 'MATH302',
      title: 'Calculus III',
      instructor: 'Prof. Ryan Miller',
      schedule: 'Tue, Thu 09:00 AM - 10:30 AM',
      credits: 4,
      progress: 62,
      grade: 'B',
      status: 'Active',
      color: '#3B82F6',
      description: 'Multivariable calculus including vectors, partial derivatives, multiple integrals, and vector analysis.',
      syllabus: [
        { week: 'Week 1-4', title: 'Vector Geometry and Functions', completed: true },
        { week: 'Week 5-8', title: 'Partial Derivatives & Optimization', completed: true },
        { week: 'Week 9-11', title: 'Double & Triple Integrals', completed: false },
        { week: 'Week 12-15', title: 'Line and Surface Integrals, Green\'s Theorem', completed: false },
      ]
    },
    {
      id: 'PHYS202',
      title: 'General Physics II',
      instructor: 'Dr. Alan Vance',
      schedule: 'Tue, Thu 01:00 PM - 02:30 PM',
      credits: 3,
      progress: 45,
      grade: 'C+',
      status: 'Active',
      color: '#EF4444',
      description: 'Introduction to electromagnetism, circuits, light waves, and basics of modern physics.',
      syllabus: [
        { week: 'Week 1-3', title: 'Electrostatics & Electric Fields', completed: true },
        { week: 'Week 4-6', title: 'Electric Potential & Capacitance', completed: true },
        { week: 'Week 7-9', title: 'Current, Resistance & DC Circuits', completed: false },
        { week: 'Week 10-12', title: 'Magnetic Fields & Induction', completed: false },
        { week: 'Week 13-15', title: 'Maxwell\'s Equations & Electromagnetic Waves', completed: false },
      ]
    },
    {
      id: 'CS204',
      title: 'Database Management Systems',
      instructor: 'Prof. Amy Lin',
      schedule: 'Wed, Fri 11:00 AM - 12:30 PM',
      credits: 3,
      progress: 90,
      grade: 'A',
      status: 'Active',
      color: '#10B981',
      description: 'Relational databases design, SQL syntax, normal forms, transaction processing, and storage structures.',
      syllabus: [
        { week: 'Week 1-3', title: 'Relational Model & Relational Algebra', completed: true },
        { week: 'Week 4-7', title: 'SQL Queries, DDL, DML & Triggers', completed: true },
        { week: 'Week 8-10', title: 'Schema Normalization (1NF, 2NF, 3NF, BCNF)', completed: true },
        { week: 'Week 11-13', title: 'Transactions, Concurrency & Recovery', completed: true },
        { week: 'Week 14-15', title: 'NoSQL Databases & Distributed Systems', completed: false },
      ]
    }
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownloadSyllabus = (course) => {
    const textContent = `Course: ${course.id} - ${course.title}
Instructor: ${course.instructor}
Schedule: ${course.schedule}
Credits: ${course.credits}

Description:
${course.description}

Syllabus Modules:
${course.syllabus.map(item => `- ${item.week}: ${item.title} [${item.completed ? 'Completed' : 'Pending'}]`).join('\r\n')}
`;
    try {
      const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${course.id}_Syllabus.txt`;
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (err) {
      console.error("Failed to trigger download", err);
    }
  };

  return (
    <div className="tab-view-container animate-fade">
      {/* Header */}
      <div className="teacher-welcome">
        <h1>My Enrolled Courses</h1>
        <p>Explore your course list, syllabus breakdown, and learning materials for Semester 4.</p>
      </div>

      {/* Top Metric Stats */}
      <div className="stats-grid">
        <StatCard
          title="Active Courses"
          value="4 Subjects"
          subtitle="Registered Core Courses"
          icon={<BookOpen size={20} />}
          gradient="gradient-1"
          iconColor="orange"
        />
        <StatCard
          title="Total Credits"
          value="14 Credits"
          subtitle="Full-Time Load"
          icon={<Award size={20} />}
          gradient="gradient-2"
          valueColor="blue"
          iconColor="blue"
        />
        <StatCard
          title="Average Progress"
          value="68.8%"
          subtitle="On track for term completion"
          icon={<CheckCircle size={20} />}
          gradient="gradient-4"
          valueColor="green"
          iconColor="green"
        />
        <StatCard
          title="Academic Standing"
          value="Honors Roll"
          subtitle="Top 10% distinction"
          icon={<Sparkles size={20} />}
          gradient="gradient-3"
          valueColor="cyan"
          iconColor="cyan"
        />
      </div>

      {/* Title & Search bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 className="section-title" style={{ fontSize: '18px', margin: 0 }}>Subject Directory</h3>
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '11px', color: '#9CA3AF' }} />
          <input 
            type="text" 
            placeholder="Search courses or instructor..." 
            className="edu-input" 
            style={{ paddingLeft: '38px', height: '38px', fontSize: '13px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedCourse ? '1fr 1fr' : '1fr', gap: '24px', transition: 'all 0.3s' }}>
        {/* Course List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredCourses.map((course) => (
            <div 
              key={course.id} 
              className="section-card"
              style={{ 
                cursor: 'pointer',
                borderColor: selectedCourse?.id === course.id ? '#FF6B00' : '#F0F0F0',
                background: selectedCourse?.id === course.id ? '#FFFBF8' : '#FFFFFF',
                boxShadow: selectedCourse?.id === course.id ? '0 4px 12px rgba(255, 107, 0, 0.1)' : '0 1px 3px rgba(0,0,0,0.04)'
              }}
              onClick={() => setSelectedCourse(course)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="edu-badge edu-badge-primary" style={{ fontWeight: '700' }}>{course.id}</span>
                <span style={{ fontSize: '13px', color: course.color, fontWeight: '700' }}>Current Grade: {course.grade}</span>
              </div>
              <h3 style={{ fontSize: '16px', margin: '0 0 8px', color: '#1A1A2E' }}>{course.title}</h3>
              
              <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#6B7280', marginBottom: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <User size={14} /> {course.instructor}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} /> {course.credits} Credits
                </span>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span style={{ color: '#6B7280' }}>Course Syllabus Progress</span>
                  <span style={{ fontWeight: '700', color: course.color }}>{course.progress}%</span>
                </div>
                <div style={{ height: '7px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${course.progress}%`, height: '100%', background: course.color, transition: 'width 0.4s' }}></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#FF6B00', fontWeight: '600' }}>
                  View Syllabus Breakdown <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}

          {filteredCourses.length === 0 && (
            <div className="section-card" style={{ textAlign: 'center', padding: '40px', color: '#9CA3AF' }}>
              No enrolled courses matched your search query.
            </div>
          )}
        </div>

        {/* Selected Course Details / Syllabus Drawer */}
        {selectedCourse && (
          <div className="section-card animate-fade" style={{ height: 'fit-content', position: 'sticky', top: '88px', borderColor: '#FED7AA' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className="edu-badge edu-badge-primary" style={{ marginBottom: '6px' }}>{selectedCourse.id} Syllabus</span>
                <h3 style={{ fontSize: '18px', margin: '0 0 4px', color: '#1A1A2E' }}>{selectedCourse.title}</h3>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>Instructor: <strong>{selectedCourse.instructor}</strong> • {selectedCourse.schedule}</p>
              </div>
              <button 
                onClick={() => setSelectedCourse(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#9CA3AF', padding: 0 }}
              >
                ×
              </button>
            </div>

            <p style={{ fontSize: '13px', color: '#4B5563', lineHeight: '1.5', marginBottom: '20px', background: '#FAFAFA', padding: '12px', borderRadius: '8px' }}>
              {selectedCourse.description}
            </p>

            <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: '#1A1A2E' }}>Course Modules</h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '250px', overflowY: 'auto', marginBottom: '20px', paddingRight: '6px' }}>
              {selectedCourse.syllabus.map((item, index) => (
                <div 
                  key={index}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    padding: '8px 12px', 
                    border: '1px solid var(--border)', 
                    borderRadius: 'var(--radius-sm)',
                    background: item.completed ? 'var(--bg-hover)' : 'transparent',
                    opacity: item.completed ? 0.75 : 1
                  }}
                >
                  {item.completed ? (
                    <CheckCircle size={16} color="var(--success)" />
                  ) : (
                    <div style={{ width: '16px', height: '16px', border: '2px solid var(--text-muted)', borderRadius: '50%' }}></div>
                  )}
                  <div style={{ fontSize: '0.8rem' }}>
                    <span style={{ fontWeight: '700', marginRight: '6px' }}>{item.week}:</span>
                    <span>{item.title}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
              <button 
                className="btn-brand-outline" 
                style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
                onClick={() => handleDownloadSyllabus(selectedCourse)}
              >
                <Download size={14} /> Download Syllabus
              </button>
              <button className="btn-brand" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                Contact Faculty
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
