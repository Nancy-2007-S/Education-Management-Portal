import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  BarChart2, CheckSquare, Sparkles, MessageSquare, TrendingUp, 
  BookOpen, AlertTriangle, ArrowUpRight, HelpCircle, Check, Play, RefreshCw, Award, Target
} from 'lucide-react';
import StatCard from '../teacher/components/StatCard';
import SectionCard from '../teacher/components/SectionCard';

export default function Progress() {
  const location = useLocation();

  const getTab = () => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') || 'performance';
  };

  const activeTab = getTab();

  const weakSubjects = [
    { 
      code: 'PHYS202', 
      title: 'General Physics II', 
      grade: 'C+', 
      score: 45, 
      weakAreas: ['DC Circuits Analysis', 'Electric Potential equations'], 
      action: 'Schedule Tutoring Session' 
    },
    { 
      code: 'MATH302', 
      title: 'Calculus III', 
      grade: 'B', 
      score: 62, 
      weakAreas: ['Triple Integrals in Spherical Coordinates', 'Surface Integrals'], 
      action: 'Solve Practice Worksheet 5' 
    }
  ];

  const [tips, setTips] = useState([
    { id: 1, text: 'Spend 20 minutes practicing SQL Join questions', completed: false, category: 'DBMS' },
    { id: 2, text: 'Revise Gauss Law tutorial calculations', completed: true, category: 'Physics' },
    { id: 3, text: 'Watch video lecture: Multivariable Integration Limits', completed: false, category: 'Calculus' },
    { id: 4, text: 'Implement AVL Tree insertion code locally', completed: false, category: 'Algorithms' }
  ]);

  const toggleTip = (id) => {
    setTips(tips.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const [generating, setGenerating] = useState(false);
  const [insightReport, setInsightReport] = useState(
    "Alex, your performance indicates a strong affinity for programming theory (Algorithms 78%, DBMS 90%). However, mathematical applications are facing resistance. General Physics II score is 45% due to low scores in DC circuits quizzes. Calculus III integrals are showing a minor dip. Reallocating 3 hours from Database studies to Calculus practice this week is highly recommended."
  );

  const regenerateInsights = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setInsightReport(
        "AI Assessment updated: You have completed the Gauss Law physics tutorial. Electromagnetics confidence level increased by 8%. Calculus double integrals remain the highest priority. Recommended next step: watch the Multivariable Limits video tutorial to secure B+ zone."
      );
    }, 1500);
  };

  return (
    <div id="student-progress-page" className="tab-view-container animate-fade">
      {/* Header */}
      <div className="teacher-welcome">
        <h1>
          {activeTab === 'performance' && 'Academic Performance & Trends'}
          {activeTab === 'weak' && 'Weak Subjects Tracker'}
          {activeTab === 'tips' && 'Improvement Action Plan'}
          {activeTab === 'insights' && 'EduAI Academic Recommendations'}
        </h1>
        <p>
          {activeTab === 'performance' && 'Monitor term-by-term GPA trajectories, weekly study logs, and score diagnostics.'}
          {activeTab === 'weak' && 'Automated identification of subjects requiring immediate focus and intervention.'}
          {activeTab === 'tips' && 'Tailored daily checklist tasks designed to address identified learning gaps.'}
          {activeTab === 'insights' && 'Deep learning analytical synthesis powered by EduAI smart engine.'}
        </p>
      </div>

      {/* Metric Stat Cards */}
      <div className="stats-grid">
        <StatCard
          title="Current Standing"
          value="3.82 GPA"
          subtitle="Semester 4 active"
          icon={<TrendingUp size={20} />}
          gradient="gradient-4"
          valueColor="green"
          iconColor="green"
        />
        <StatCard
          title="Weekly Study Hours"
          value="24.5 / 28 Hrs"
          subtitle="87.5% target achieved"
          icon={<BookOpen size={20} />}
          gradient="gradient-1"
          iconColor="orange"
        />
        <StatCard
          title="Focus Areas"
          value="2 Subjects"
          subtitle="Physics & Calculus III"
          icon={<AlertTriangle size={20} />}
          gradient="gradient-2"
          valueColor="blue"
          iconColor="blue"
        />
        <StatCard
          title="Checklist Completed"
          value="1 / 4 Tasks"
          subtitle="3 Tasks Remaining Today"
          icon={<Target size={20} />}
          gradient="gradient-3"
          valueColor="cyan"
          iconColor="cyan"
        />
      </div>

      {activeTab === 'performance' && (
        <div className="animate-fade" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          {/* Semester Grade Progression Chart */}
          <SectionCard title="GPA Progression Trajectory" subtitle="Semesters 1 - 4 performance curve">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '230px', paddingBottom: '20px', borderBottom: '1px solid #F0F0F0', marginTop: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60px' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px', color: '#4B5563' }}>3.40</div>
                <div style={{ width: '38px', height: '160px', background: '#F3F4F6', borderRadius: '8px', position: 'relative' }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '85%', background: '#FED7AA', borderRadius: 'inherit' }}></div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: '600', marginTop: '8px', color: '#6B7280' }}>Sem 1</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60px' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px', color: '#4B5563' }}>3.55</div>
                <div style={{ width: '38px', height: '160px', background: '#F3F4F6', borderRadius: '8px', position: 'relative' }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '88.7%', background: '#FDBA74', borderRadius: 'inherit' }}></div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: '600', marginTop: '8px', color: '#6B7280' }}>Sem 2</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60px' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '8px', color: '#4B5563' }}>3.72</div>
                <div style={{ width: '38px', height: '160px', background: '#F3F4F6', borderRadius: '8px', position: 'relative' }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '93%', background: '#FB923C', borderRadius: 'inherit' }}></div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: '600', marginTop: '8px', color: '#6B7280' }}>Sem 3</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60px' }}>
                <div style={{ fontSize: '13px', fontWeight: '800', marginBottom: '8px', color: '#FF6B00' }}>3.82</div>
                <div style={{ width: '38px', height: '160px', background: '#F3F4F6', borderRadius: '8px', position: 'relative' }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '95.5%', background: '#FF6B00', borderRadius: 'inherit' }}></div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: '700', marginTop: '8px', color: '#FF6B00' }}>Sem 4</span>
              </div>
            </div>
          </SectionCard>

          {/* Performance Summary */}
          <SectionCard title="Score Analytics" subtitle="Department Diagnostics">
            <div style={{ fontSize: '13px', color: '#4B5563', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ padding: '10px 12px', background: '#F9FAFB', borderRadius: '8px', border: '1px solid #F3F4F6' }}>
                <span style={{ color: '#6B7280', fontSize: '12px', display: 'block' }}>Highest Subject Score</span>
                <strong style={{ color: '#1A1A2E', fontSize: '15px' }}>DBMS — 90%</strong>
              </div>
              
              <div style={{ padding: '10px 12px', background: '#F9FAFB', borderRadius: '8px', border: '1px solid #F3F4F6' }}>
                <span style={{ color: '#6B7280', fontSize: '12px', display: 'block' }}>Class Standing</span>
                <strong style={{ color: '#1A1A2E', fontSize: '15px' }}>#12 of 150 Students</strong>
              </div>

              <div style={{ padding: '10px 12px', background: '#F9FAFB', borderRadius: '8px', border: '1px solid #F3F4F6' }}>
                <span style={{ color: '#6B7280', fontSize: '12px', display: 'block' }}>Scholarship Qualification</span>
                <strong style={{ color: '#10B981', fontSize: '15px' }}>Eligible (Top Tier)</strong>
              </div>
            </div>
          </SectionCard>
        </div>
      )}

      {activeTab === 'weak' && (
        <div className="animate-fade">
          <SectionCard title="Identified Learning Focus Areas" subtitle="Subjects below the 70% threshold">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {weakSubjects.map((sub) => (
                <div key={sub.code} style={{ padding: '16px', borderRadius: '8px', border: '1px solid #FED7AA', background: '#FFFBF8' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <span className="edu-badge edu-badge-warning" style={{ marginBottom: '6px' }}>{sub.code}</span>
                      <h3 style={{ fontSize: '16px', margin: '0', color: '#1A1A2E' }}>{sub.title}</h3>
                    </div>
                    <span style={{ fontSize: '18px', fontWeight: '800', color: '#FF6B00' }}>{sub.score}% Complete</span>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#6B7280' }}>Topics requiring intervention:</span>
                    <ul style={{ paddingLeft: '20px', fontSize: '13px', color: '#4B5563', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {sub.weakAreas.map((area, idx) => (
                        <li key={idx}>{area}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #FEEAE6', paddingTop: '12px' }}>
                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>Target threshold for scholarship: B+</span>
                    <button className="btn-brand" style={{ fontSize: '13px', padding: '6px 14px' }}>
                      {sub.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {activeTab === 'tips' && (
        <div className="animate-fade">
          <SectionCard title="Daily Study Checklist" subtitle="Practical tasks generated for weak subject areas">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {tips.map((tip) => (
                <div 
                  key={tip.id} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    padding: '12px 16px', 
                    border: '1px solid #E5E7EB', 
                    borderRadius: '8px',
                    background: tip.completed ? '#F9FAFB' : '#FFFFFF',
                    opacity: tip.completed ? 0.7 : 1,
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button 
                      onClick={() => toggleTip(tip.id)}
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '6px',
                        border: '2px solid #FF6B00',
                        background: tip.completed ? '#FF6B00' : 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        padding: 0
                      }}
                    >
                      {tip.completed && <Check size={14} />}
                    </button>
                    <span style={{ fontSize: '14px', textDecoration: tip.completed ? 'line-through' : 'none', fontWeight: '500', color: '#1A1A2E' }}>
                      {tip.text}
                    </span>
                  </div>

                  <span className="edu-badge edu-badge-primary" style={{ fontSize: '11px' }}>
                    {tip.category}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="animate-fade">
          <SectionCard 
            title="EduAI Academic Synthesis" 
            subtitle="Intelligent study recommendations and load balancing"
            action={
              <button 
                onClick={regenerateInsights} 
                disabled={generating}
                className="btn-brand" 
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '6px 14px' }}
              >
                <RefreshCw size={14} className={generating ? 'animate-spin' : ''} /> 
                {generating ? 'Analyzing...' : 'Request Fresh Analysis'}
              </button>
            }
          >
            <div style={{ fontSize: '14px', color: '#1A1A2E', lineHeight: '1.6', padding: '16px', background: '#FFFBF8', border: '1px solid #FED7AA', borderRadius: '8px', marginBottom: '20px' }}>
              {generating ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#FF6B00' }}>
                  <span>Evaluating current syllabus completion rates...</span>
                </div>
              ) : (
                insightReport
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ padding: '14px', border: '1px solid #E5E7EB', borderRadius: '8px', background: '#FFFFFF' }}>
                <h4 style={{ fontSize: '14px', margin: '0 0 8px', color: '#1A1A2E' }}>Study Load Balance</h4>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: '0 0 4px' }}>Calculus: <strong style={{ color: '#EF4444' }}>High Demand</strong> (+2h requested)</p>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>DBMS: <strong style={{ color: '#10B981' }}>Optimal Status</strong></p>
              </div>

              <div style={{ padding: '14px', border: '1px solid #E5E7EB', borderRadius: '8px', background: '#FFFFFF' }}>
                <h4 style={{ fontSize: '14px', margin: '0 0 8px', color: '#1A1A2E' }}>Confidence Metrics</h4>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: '0 0 4px' }}>Calculus integration: <strong style={{ color: '#F59E0B' }}>68%</strong></p>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>Physics circuits: <strong style={{ color: '#EF4444' }}>52% (Critical)</strong></p>
              </div>
            </div>
          </SectionCard>
        </div>
      )}
    </div>
  );
}

