import { useState } from 'react';
import { Calendar as CalendarIcon, CheckCircle, AlertCircle, XCircle, Mail, UserCheck, Clock, ShieldCheck } from 'lucide-react';
import StatCard from '../teacher/components/StatCard';
import SectionCard from '../teacher/components/SectionCard';

export default function Attendance() {
  const [showExcuseModal, setShowExcuseModal] = useState(false);
  const [excuseSent, setExcuseSent] = useState(false);
  const [excuseForm, setExcuseForm] = useState({ course: 'CS201', date: '', reason: '' });

  const attendanceSummary = [
    { code: 'CS201', name: 'Data Structures', attended: 28, total: 30, pct: 93.3 },
    { code: 'MATH302', name: 'Calculus III', attended: 29, total: 30, pct: 96.6 },
    { code: 'PHYS202', name: 'General Physics II', attended: 26, total: 30, pct: 86.6 },
    { code: 'CS204', name: 'DBMS', attended: 30, total: 30, pct: 100 }
  ];

  const days = Array.from({ length: 31 }, (_, i) => {
    const dayNum = i + 1;
    let status = 'present';
    if ([5, 12].includes(dayNum)) status = 'absent';
    if ([8, 19, 26].includes(dayNum)) status = 'late';
    return { dayNum, status };
  });

  const handleExcuseSubmit = (e) => {
    e.preventDefault();
    setExcuseSent(true);
    setTimeout(() => {
      setExcuseSent(false);
      setShowExcuseModal(false);
      setExcuseForm({ course: 'CS201', date: '', reason: '' });
    }, 2000);
  };

  return (
    <div className="tab-view-container animate-fade">
      {/* Header */}
      <div className="teacher-welcome">
        <h1>Attendance Portal</h1>
        <p>Monitor class presence logs, view monthly attendance ledgers, and request absence excuses.</p>
      </div>

      {/* Top Stat Cards */}
      <div className="stats-grid">
        <StatCard
          title="Overall Attendance"
          value="94.1%"
          subtitle="Meets 85% requirement"
          icon={<ShieldCheck size={20} />}
          gradient="gradient-4"
          valueColor="green"
          iconColor="green"
        />
        <StatCard
          title="Attended Lectures"
          value="113 Sessions"
          subtitle="120 Total Sessions"
          icon={<CheckCircle size={20} />}
          gradient="gradient-2"
          valueColor="blue"
          iconColor="blue"
        />
        <StatCard
          title="Late / Tardy"
          value="3 Sessions"
          subtitle="Within threshold"
          icon={<Clock size={20} />}
          gradient="gradient-1"
          iconColor="orange"
        />
        <StatCard
          title="Absence Allowance"
          value="2 / 10 Days"
          subtitle="8 Absences Remaining"
          icon={<UserCheck size={20} />}
          gradient="gradient-3"
          valueColor="cyan"
          iconColor="cyan"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Course-by-course Breakdown */}
        <SectionCard 
          title="Subject-wise Attendance Logs" 
          subtitle="Real-time class breakdown for active semester"
          action={
            <button className="btn-brand" style={{ fontSize: '13px', padding: '7px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }} onClick={() => setShowExcuseModal(true)}>
              <Mail size={15} /> Request Excuse
            </button>
          }
        >
          <div className="edu-table-container">
            <table className="edu-table">
              <thead>
                <tr>
                  <th style={{ width: '100px', textAlign: 'left' }}>Code</th>
                  <th style={{ textAlign: 'left' }}>Course Title</th>
                  <th style={{ width: '120px', textAlign: 'center' }}>Attended</th>
                  <th style={{ width: '220px', textAlign: 'left' }}>Percentage Progress</th>
                  <th style={{ width: '160px', textAlign: 'left' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceSummary.map((item) => (
                  <tr key={item.code}>
                    <td style={{ textAlign: 'left' }}>
                      <span className="edu-badge edu-badge-primary" style={{ fontWeight: 700, fontSize: '11px', padding: '4px 8px' }}>{item.code}</span>
                    </td>
                    <td style={{ fontWeight: '600', color: '#1A1A2E', textAlign: 'left' }}>{item.name}</td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{ fontWeight: '700', color: '#1A1A2E', fontSize: '14px' }}>{item.attended}</span>
                      <span style={{ color: '#9CA3AF', fontSize: '12.5px', fontWeight: 400 }}> / {item.total}</span>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ flex: 1, height: '8px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ 
                            width: `${item.pct}%`, 
                            height: '100%', 
                            background: item.pct >= 90 ? '#10B981' : item.pct >= 85 ? '#FF6B00' : '#EF4444', 
                            borderRadius: '4px',
                            transition: 'width 0.4s ease' 
                          }} />
                        </div>
                        <span style={{ fontWeight: '700', fontSize: '12.5px', color: item.pct >= 90 ? '#10B981' : item.pct >= 85 ? '#D97706' : '#EF4444', minWidth: '45px' }}>
                          {item.pct}%
                        </span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <span className={`edu-badge ${item.pct >= 90 ? 'edu-badge-success' : item.pct >= 85 ? 'edu-badge-warning' : 'edu-badge-danger'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', padding: '4px 10px' }}>
                        {item.pct >= 90 ? <CheckCircle size={13} /> : <AlertCircle size={13} />}
                        {item.pct >= 90 ? 'Good Standing' : item.pct >= 85 ? 'Satisfactory' : 'Needs Attention'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>


        {/* Attendance Legend & Metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <SectionCard title="Attendance Summary" subtitle="Semester ledger Breakdown">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#F0FDF4', borderRadius: '8px', border: '1px solid #DCFCE7', color: '#166534' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
                  <CheckCircle size={16} color="#10B981" /> Present
                </span>
                <span style={{ fontWeight: '700', fontSize: '14px' }}>113 Sessions</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#FFFBEB', borderRadius: '8px', border: '1px solid #FEF3C7', color: '#92400E' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
                  <AlertCircle size={16} color="#F59E0B" /> Tardy / Late
                </span>
                <span style={{ fontWeight: '700', fontSize: '14px' }}>3 Sessions</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#FEF2F2', borderRadius: '8px', border: '1px solid #FEE2E2', color: '#991B1B' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
                  <XCircle size={16} color="#EF4444" /> Unexcused Absent
                </span>
                <span style={{ fontWeight: '700', fontSize: '14px' }}>2 Sessions</span>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Calendar Grid Sheet */}
      <SectionCard 
        title="Monthly Attendance Log — August 2026" 
        subtitle="Daily session presence status and absence log"
        icon={<CalendarIcon size={18} color="#FF6B00" />}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Calendar Header Stats */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FAFAFA', padding: '10px 16px', borderRadius: '8px', border: '1px solid #F0F0F0', flexWrap: 'wrap', gap: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#1A1A2E' }}>August 2026 Daily Tracker</span>
            <div style={{ display: 'flex', gap: '12px', fontSize: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#166534', fontWeight: 600 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} /> 28 Present
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#92400E', fontWeight: 600 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} /> 3 Tardy
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#991B1B', fontWeight: 600 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} /> 2 Absent
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', maxWidth: '850px', margin: '0 auto', width: '100%' }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(h => (
              <div key={h} style={{ textAlign: 'center', fontWeight: '700', fontSize: '12px', padding: '8px 0', color: '#4B5563', background: '#F3F4F6', borderRadius: '6px' }}>
                {h}
              </div>
            ))}

            {days.map((day) => {
              const bg = day.status === 'present' ? '#F0FDF4' : day.status === 'late' ? '#FFFBEB' : '#FEF2F2';
              const border = day.status === 'present' ? '#DCFCE7' : day.status === 'late' ? '#FEF3C7' : '#FEE2E2';
              const dotColor = day.status === 'present' ? '#10B981' : day.status === 'late' ? '#F59E0B' : '#EF4444';
              const badgeText = day.status === 'present' ? 'Present' : day.status === 'late' ? 'Tardy' : 'Absent';
              
              return (
                <div 
                  key={day.dayNum} 
                  style={{ 
                    minHeight: '64px', 
                    border: `1px solid ${border}`, 
                    borderRadius: '10px', 
                    padding: '8px', 
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    background: bg,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                    transition: 'transform 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#1A1A2E' }}>{day.dayNum}</span>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: dotColor }} />
                  </div>
                  <span style={{ 
                    fontSize: '10px', 
                    fontWeight: 700, 
                    color: dotColor, 
                    background: 'rgba(255,255,255,0.7)', 
                    padding: '2px 6px', 
                    borderRadius: '4px',
                    width: 'fit-content'
                  }}>
                    {badgeText}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Legend Footer */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #F0F0F0', fontSize: '12px', color: '#6B7280' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#F0FDF4', border: '1px solid #DCFCE7' }} /> Present (Green)</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#FFFBEB', border: '1px solid #FEF3C7' }} /> Tardy / Late (Amber)</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#FEF2F2', border: '1px solid #FEE2E2' }} /> Unexcused Absent (Red)</span>
          </div>
        </div>
      </SectionCard>

      {/* Request Absence Excuse Modal */}
      {showExcuseModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="section-card animate-fade" style={{ width: '420px', background: '#FFFFFF', borderColor: '#FED7AA' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #F0F0F0', paddingBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', color: '#1A1A2E' }}>Submit Absence Request</h3>
              <button onClick={() => setShowExcuseModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#9CA3AF' }}>×</button>
            </div>

            {excuseSent ? (
              <div style={{ textAlign: 'center', padding: '20px 0', color: '#10B981' }}>
                <CheckCircle size={44} style={{ marginBottom: '8px' }} />
                <h4 style={{ margin: '0 0 4px' }}>Absence Request Submitted!</h4>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>Faculty will review your documentation shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleExcuseSubmit}>
                <div className="edu-input-group" style={{ marginBottom: '14px' }}>
                  <label className="edu-label" style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px', display: 'block' }}>Course Subject</label>
                  <select 
                    className="edu-input" 
                    style={{ height: '38px', fontSize: '13px' }}
                    value={excuseForm.course}
                    onChange={(e) => setExcuseForm({ ...excuseForm, course: e.target.value })}
                  >
                    <option value="CS201">CS201: Data Structures</option>
                    <option value="MATH302">MATH302: Calculus III</option>
                    <option value="PHYS202">PHYS202: General Physics II</option>
                    <option value="CS204">CS204: DBMS</option>
                  </select>
                </div>

                <div className="edu-input-group" style={{ marginBottom: '14px' }}>
                  <label className="edu-label" style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px', display: 'block' }}>Absence Date</label>
                  <input 
                    type="date" 
                    className="edu-input" 
                    style={{ height: '38px', fontSize: '13px' }}
                    required 
                    value={excuseForm.date}
                    onChange={(e) => setExcuseForm({ ...excuseForm, date: e.target.value })}
                  />
                </div>

                <div className="edu-input-group" style={{ marginBottom: '20px' }}>
                  <label className="edu-label" style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px', display: 'block' }}>Reason & Description</label>
                  <textarea 
                    rows="3" 
                    className="edu-input" 
                    style={{ fontSize: '13px', padding: '10px' }}
                    placeholder="Provide medical or personal reason details..."
                    required
                    value={excuseForm.reason}
                    onChange={(e) => setExcuseForm({ ...excuseForm, reason: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" className="btn-brand-outline" style={{ flex: 1, padding: '10px' }} onClick={() => setShowExcuseModal(false)}>Cancel</button>
                  <button type="submit" className="btn-brand" style={{ flex: 2, padding: '10px' }}>Submit Request</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

