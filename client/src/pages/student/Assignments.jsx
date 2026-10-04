import { useState } from 'react';
import { FileText, Calendar, Clock, AlertTriangle, CheckCircle, Upload, FileUp, Check, Award, Send } from 'lucide-react';
import StatCard from '../teacher/components/StatCard';
import SectionCard from '../teacher/components/SectionCard';

export default function Assignments() {
  const [filter, setFilter] = useState('all');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [assignments, setAssignments] = useState([
    {
      id: 'asg-01',
      title: 'Lab 4: SQL Complex Queries & Views',
      courseId: 'CS204',
      courseName: 'DBMS',
      dueDate: '2026-08-21',
      status: 'pending',
      desc: 'Complete all questions in SQL Lab sheet 4. Implement subqueries, outer joins, and materialised views. Submit single .sql file.',
      points: '100 pts',
      daysLeft: 5
    },
    {
      id: 'asg-02',
      title: 'Assignment 2: Red-Black Trees Balancing',
      courseId: 'CS201',
      courseName: 'Data Structures',
      dueDate: '2026-08-18',
      status: 'pending',
      desc: 'Draw balancing rotations step-by-step for the given binary tree insertions. Submit PDF.',
      points: '50 pts',
      daysLeft: 2
    },
    {
      id: 'asg-03',
      title: 'Problem Set 4: Double Integrals in Polar Coords',
      courseId: 'MATH302',
      courseName: 'Calculus III',
      dueDate: '2026-08-14',
      status: 'submitted',
      desc: 'Solve problem sheet 4 questions 1-10. Show complete steps and sketch integration regions.',
      points: '80 pts',
      daysLeft: -2
    },
    {
      id: 'asg-04',
      title: 'Physics Lab 3: Ohm\'s Law & Series Circuits',
      courseId: 'PHYS202',
      courseName: 'General Physics II',
      dueDate: '2026-08-10',
      status: 'graded',
      desc: 'Submit experimental readings, calculations, errors analysis graphs and conclusion.',
      points: '100 pts',
      score: '94/100',
      feedback: 'Excellent work in calculations. Graph titles were missing details.'
    }
  ]);

  const filteredAssignments = assignments.filter(asg => {
    if (filter === 'all') return true;
    return asg.status === filter;
  });

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleAssignmentSubmit = (e) => {
    e.preventDefault();
    if (!uploadFile) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      setAssignments(assignments.map(asg => 
        asg.id === selectedAssignment.id ? { ...asg, status: 'submitted' } : asg
      ));

      setTimeout(() => {
        setSubmitSuccess(false);
        setUploadFile(null);
        setSelectedAssignment(null);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="tab-view-container animate-fade">
      {/* Header */}
      <div className="teacher-welcome">
        <h1>Assignments Board</h1>
        <p>View your active course assignments, submit your lab files, and track instructor feedback.</p>
      </div>

      {/* Metric Stats */}
      <div className="stats-grid">
        <StatCard
          title="Pending Tasks"
          value="2 Tasks"
          subtitle="Action required soon"
          icon={<AlertTriangle size={20} />}
          gradient="gradient-1"
          iconColor="orange"
        />
        <StatCard
          title="Submitted"
          value="1 File"
          subtitle="Awaiting evaluation"
          icon={<Send size={20} />}
          gradient="gradient-2"
          valueColor="blue"
          iconColor="blue"
        />
        <StatCard
          title="Graded Tasks"
          value="1 Completed"
          subtitle="Latest Score: 94/100"
          icon={<CheckCircle size={20} />}
          gradient="gradient-4"
          valueColor="green"
          iconColor="green"
        />
        <StatCard
          title="Avg Assessment Score"
          value="92.4%"
          subtitle="Top tier performance"
          icon={<Award size={20} />}
          gradient="gradient-3"
          valueColor="cyan"
          iconColor="cyan"
        />
      </div>

      {/* Filter Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 className="section-title" style={{ fontSize: '18px', margin: 0 }}>Course Work Items</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'pending', 'submitted', 'graded'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                border: '1px solid',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'capitalize',
                borderColor: filter === cat ? '#FF6B00' : '#E5E7EB',
                background: filter === cat ? '#FF6B00' : '#FFFFFF',
                color: filter === cat ? '#FFFFFF' : '#4B5563'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedAssignment ? '1fr 1fr' : '1fr', gap: '24px' }}>
        {/* Assignments List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredAssignments.map((asg) => (
            <div 
              key={asg.id} 
              className="section-card"
              style={{ 
                cursor: 'pointer',
                borderColor: selectedAssignment?.id === asg.id ? '#FF6B00' : '#F0F0F0',
                background: selectedAssignment?.id === asg.id ? '#FFFBF8' : '#FFFFFF',
                boxShadow: selectedAssignment?.id === asg.id ? '0 4px 12px rgba(255, 107, 0, 0.1)' : '0 1px 3px rgba(0,0,0,0.04)'
              }}
              onClick={() => {
                if (asg.status !== 'graded') {
                  setSelectedAssignment(asg);
                }
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="edu-badge edu-badge-primary">{asg.courseName} ({asg.courseId})</span>
                
                <span className={`edu-badge ${
                  asg.status === 'pending' ? (asg.daysLeft <= 2 ? 'edu-badge-warning' : 'edu-badge-info') :
                  asg.status === 'submitted' ? 'edu-badge-primary' : 'edu-badge-success'
                }`}>
                  {asg.status === 'pending' ? `Due in ${asg.daysLeft} days` :
                   asg.status === 'submitted' ? 'Submitted' : 'Graded'}
                </span>
              </div>

              <h3 style={{ fontSize: '16px', margin: '0 0 10px', color: '#1A1A2E' }}>{asg.title}</h3>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#6B7280' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} /> Due: {asg.dueDate}
                </span>
                <span style={{ fontWeight: '700', color: '#1A1A2E' }}>
                  {asg.status === 'graded' ? `Score: ${asg.score}` : `Weight: ${asg.points}`}
                </span>
              </div>

              {asg.status === 'graded' && asg.feedback && (
                <div style={{ marginTop: '12px', padding: '10px 12px', background: '#F0FDF4', borderRadius: '8px', borderLeft: '3px solid #10B981', fontSize: '13px', color: '#166534' }}>
                  <strong>Instructor Feedback:</strong> {asg.feedback}
                </div>
              )}
            </div>
          ))}

          {filteredAssignments.length === 0 && (
            <div className="section-card" style={{ textAlign: 'center', padding: '40px', color: '#9CA3AF' }}>
              No assignments found in this category.
            </div>
          )}
        </div>

        {/* Selected Assignment Submit Drawer */}
        {selectedAssignment && (
          <div className="section-card animate-fade" style={{ height: 'fit-content', position: 'sticky', top: '88px', borderColor: '#FED7AA' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span className="edu-badge edu-badge-primary" style={{ marginBottom: '6px' }}>{selectedAssignment.courseName} Assignment</span>
                <h3 style={{ fontSize: '18px', margin: '0 0 4px', color: '#1A1A2E' }}>{selectedAssignment.title}</h3>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>Submission portal active.</p>
              </div>
              <button 
                onClick={() => setSelectedAssignment(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#9CA3AF', padding: 0 }}
              >
                ×
              </button>
            </div>

            <div style={{ background: '#FAFAFA', padding: '12px', borderRadius: '8px', fontSize: '13px', color: '#4B5563', marginBottom: '20px', lineHeight: '1.5' }}>
              {selectedAssignment.desc}
            </div>

            {submitSuccess ? (
              <div style={{ textAlign: 'center', padding: '30px 0', color: '#10B981' }}>
                <CheckCircle size={48} style={{ marginBottom: '10px' }} />
                <h4 style={{ margin: '0 0 4px', fontSize: '16px' }}>Assignment Uploaded Successfully!</h4>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>Status is now updated to Submitted.</p>
              </div>
            ) : (
              <form onSubmit={handleAssignmentSubmit}>
                <div style={{ border: '2px dashed #D1D5DB', borderRadius: '8px', padding: '24px', textAlign: 'center', cursor: 'pointer', marginBottom: '20px', position: 'relative', background: uploadFile ? '#FFFBF8' : '#FFFFFF' }}>
                  <input 
                    type="file" 
                    onChange={handleFileUpload} 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                  />
                  {uploadFile ? (
                    <div>
                      <FileUp size={36} color="#FF6B00" style={{ marginBottom: '8px' }} />
                      <p style={{ fontSize: '13px', fontWeight: '600', color: '#1A1A2E', margin: '0 0 2px' }}>{uploadFile.name}</p>
                      <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0 }}>{(uploadFile.size / 1024).toFixed(1)} KB • Click or drag to replace</p>
                    </div>
                  ) : (
                    <div>
                      <Upload size={36} color="#9CA3AF" style={{ marginBottom: '8px' }} />
                      <p style={{ fontSize: '13px', fontWeight: '500', color: '#4B5563', margin: '0 0 2px' }}>Click to select a file or drag here</p>
                      <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0 }}>PDF, SQL, ZIP formats accepted (Max 10MB)</p>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="button" className="btn-brand-outline" style={{ flex: 1, padding: '10px' }} onClick={() => { setUploadFile(null); setSelectedAssignment(null); }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-brand" style={{ flex: 2, display: 'flex', justifyContent: 'center', padding: '10px' }} disabled={!uploadFile || isSubmitting}>
                    {isSubmitting ? 'Uploading...' : 'Submit Assignment'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

