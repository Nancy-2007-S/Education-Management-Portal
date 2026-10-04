import { useState } from 'react';
import { Award, BookOpen, AlertCircle, Sparkles, TrendingUp, CheckCircle } from 'lucide-react';
import StatCard from '../teacher/components/StatCard';
import SectionCard from '../teacher/components/SectionCard';

export default function Grades() {
  const [activeCourseId, setActiveCourseId] = useState('CS201');

  const gradeReport = [
    {
      id: 'CS201',
      name: 'Data Structures & Algorithms',
      gpaPoints: '3.7',
      grade: 'A-',
      components: [
        { name: 'Quizzes (Avg of 3)', weight: '15%', score: '92%' },
        { name: 'Lab Assignments (4)', weight: '35%', score: '88%' },
        { name: 'Midterm Exam', weight: '25%', score: '85%' },
        { name: 'Final Exam Project', weight: '25%', score: '90%' }
      ]
    },
    {
      id: 'MATH302',
      name: 'Calculus III',
      gpaPoints: '3.0',
      grade: 'B',
      components: [
        { name: 'Weekly Homeworks', weight: '10%', score: '80%' },
        { name: 'Class Quizzes', weight: '20%', score: '84%' },
        { name: 'Midterm Exam', weight: '30%', score: '78%' },
        { name: 'Final Exam Paper', weight: '40%', score: '82%' }
      ]
    },
    {
      id: 'PHYS202',
      name: 'General Physics II',
      gpaPoints: '2.3',
      grade: 'C+',
      components: [
        { name: 'Lab Experiments', weight: '20%', score: '94%' },
        { name: 'Surprise Tests', weight: '15%', score: '62%' },
        { name: 'Midterm Exam', weight: '25%', score: '70%' },
        { name: 'Final Written Exam', weight: '40%', score: '72%' }
      ]
    },
    {
      id: 'CS204',
      name: 'Database Management Systems',
      gpaPoints: '4.0',
      grade: 'A',
      components: [
        { name: 'Relational Model Quiz', weight: '10%', score: '100%' },
        { name: 'SQL Schema Lab', weight: '30%', score: '95%' },
        { name: 'Midterm Exam', weight: '25%', score: '92%' },
        { name: 'DBMS Capstone Project', weight: '35%', score: '98%' }
      ]
    }
  ];

  const selectedCourse = gradeReport.find(c => c.id === activeCourseId);

  return (
    <div className="tab-view-container animate-fade">
      {/* Header */}
      <div className="teacher-welcome">
        <h1>Transcript & Gradebook</h1>
        <p>Review cumulative GPA, term transcript records, and detailed course evaluation breakdowns.</p>
      </div>

      {/* Top Stat Cards */}
      <div className="stats-grid">
        <StatCard
          title="Cumulative GPA"
          value="3.82"
          subtitle="Out of 4.0 scale"
          icon={<Award size={20} />}
          gradient="gradient-1"
          iconColor="orange"
        />
        <StatCard
          title="Academic Honor Roll"
          value="Distinction"
          subtitle="Top 8% of CSE Cohort"
          icon={<Sparkles size={20} />}
          gradient="gradient-3"
          valueColor="cyan"
          iconColor="cyan"
        />
        <StatCard
          title="Completed Credits"
          value="52 / 120"
          subtitle="Degree completion 43.3%"
          icon={<BookOpen size={20} />}
          gradient="gradient-2"
          valueColor="blue"
          iconColor="blue"
        />
        <StatCard
          title="Class Rank"
          value="#12 of 150"
          subtitle="Computer Science Dept"
          icon={<TrendingUp size={20} />}
          gradient="gradient-4"
          valueColor="green"
          iconColor="green"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        {/* Transcript Directory */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <SectionCard title="Course GPA Directory" subtitle="Select a course to view assessment breakdown">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {gradeReport.map((course) => (
                <div 
                  key={course.id}
                  onClick={() => setActiveCourseId(course.id)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 16px',
                    border: '1px solid',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    borderColor: activeCourseId === course.id ? '#FF6B00' : '#E5E7EB',
                    background: activeCourseId === course.id ? '#FFFBF8' : '#FFFFFF',
                    boxShadow: activeCourseId === course.id ? '0 2px 8px rgba(255, 107, 0, 0.12)' : '0 1px 3px rgba(0,0,0,0.02)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="edu-badge edu-badge-primary" style={{ fontWeight: 700, fontSize: '11px' }}>{course.id}</span>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#1A1A2E' }}>{course.name}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: '4px 0 0' }}>
                      GPA Points: <strong style={{ color: '#FF6B00' }}>{course.gpaPoints} / 4.0</strong>
                    </p>
                  </div>
                  <span className={`edu-badge ${
                    course.grade.startsWith('A') ? 'edu-badge-success' : 
                    course.grade.startsWith('B') ? 'edu-badge-info' : 'edu-badge-warning'
                  }`} style={{ fontSize: '13px', fontWeight: '800', padding: '6px 14px' }}>
                    {course.grade}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* CGPA Summary Card */}
          <SectionCard title="Semester Academic Standing">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: '#FAFAFA', borderRadius: '8px', border: '1px solid #F0F0F0' }}>
                <span style={{ color: '#6B7280' }}>Current Semester GPA</span>
                <span style={{ fontWeight: 700, color: '#FF6B00' }}>3.75</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: '#FAFAFA', borderRadius: '8px', border: '1px solid #F0F0F0' }}>
                <span style={{ color: '#6B7280' }}>Cumulative CGPA</span>
                <span style={{ fontWeight: 700, color: '#10B981' }}>3.82</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: '#FAFAFA', borderRadius: '8px', border: '1px solid #F0F0F0' }}>
                <span style={{ color: '#6B7280' }}>Academic Status</span>
                <span style={{ fontWeight: 700, color: '#3B82F6' }}>Dean's List Honoree</span>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Selected Course Grade breakdown */}
        {selectedCourse && (
          <SectionCard 
            title={`${selectedCourse.id}: ${selectedCourse.name}`} 
            subtitle="Grading Schema: Standard CSE weight distribution"
            icon={<CheckCircle size={18} color="#FF6B00" />}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #F0F0F0', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 2px', color: '#1A1A2E' }}>Assessment Ledger Breakdown</h4>
                <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>Weighted scores calculated based on course syllabus terms</p>
              </div>
              <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#FF6B00', background: 'rgba(255, 107, 0, 0.08)', padding: '6px 14px', borderRadius: '20px', border: '1px solid rgba(255, 107, 0, 0.2)' }}>
                Course Grade: {selectedCourse.grade} ({selectedCourse.gpaPoints} GPA)
              </div>
            </div>
            
            <div className="edu-table-container" style={{ marginBottom: '20px' }}>
              <table className="edu-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Assessment Task</th>
                    <th style={{ width: '130px', textAlign: 'center' }}>Course Weight</th>
                    <th style={{ width: '110px', textAlign: 'center' }}>Score</th>
                    <th style={{ width: '220px', textAlign: 'left' }}>Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCourse.components.map((item, idx) => {
                    const scoreNum = parseInt(item.score);
                    return (
                      <tr key={idx}>
                        <td style={{ fontWeight: '600', color: '#1A1A2E', textAlign: 'left' }}>{item.name}</td>
                        <td style={{ textAlign: 'center' }}>
                          <span style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 500 }}>{item.weight}</span>
                        </td>
                        <td style={{ textAlign: 'center', fontWeight: '700', color: '#FF6B00', fontSize: '13.5px' }}>{item.score}</td>
                        <td style={{ textAlign: 'left' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ flex: 1, height: '8px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                              <div style={{ 
                                width: `${scoreNum}%`, 
                                height: '100%', 
                                background: scoreNum >= 90 ? '#10B981' : scoreNum >= 80 ? '#3B82F6' : '#FF6B00',
                                borderRadius: '4px',
                                transition: 'width 0.4s ease'
                              }} />
                            </div>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', minWidth: '38px', textAlign: 'right' }}>{scoreNum}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div style={{ background: '#FFFBEB', padding: '12px 16px', borderRadius: '10px', display: 'flex', gap: '10px', alignItems: 'center', border: '1px solid #FDE68A' }}>
              <AlertCircle size={16} color="#D97706" style={{ flexShrink: 0 }} />
              <p style={{ fontSize: '12.5px', color: '#92400E', lineHeight: '1.5', margin: 0 }}>
                <strong>Note:</strong> Grades shown above are provisional. Official university transcripts will be published upon faculty board verification at term end.
              </p>
            </div>
          </SectionCard>
        )}

      </div>
    </div>
  );
}

