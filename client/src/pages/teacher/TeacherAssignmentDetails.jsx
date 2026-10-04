import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, FileText, Award, AlertTriangle, CheckCircle, Save } from 'lucide-react';
import SectionCard from './components/SectionCard';
import StatCard from './components/StatCard';
import { getAssignments } from '../../services/academicDataService';

const assignmentDetailsMock = {
  a1: {
    title: 'Binary Tree Traversal',
    course: 'DSA',
    class: 'CSE-A (3rd Year)',
    dueDate: 'Aug 18, 2026',
    maxMarks: 100,
    description: 'Implement pre-order, in-order, and post-order traversals for binary search trees. You must write the algorithm without using standard libraries and provide complexity analysis in the comments.',
    submissions: [
      { studentId: '1', roll: 'CSE2601', name: 'Rahul Sharma', date: 'Aug 14, 2026', score: 90, status: 'Graded' },
      { studentId: '3', roll: 'CSE2603', name: 'Priya Nair', date: 'Aug 15, 2026', score: '', status: 'Submitted' },
      { studentId: '4', roll: 'CSE2604', name: 'Aditya Sen', date: 'Aug 16, 2026', score: '', status: 'Submitted' },
      { studentId: '2', roll: 'CSE2602', name: 'Karthik Raj', date: 'N/A', score: 0, status: 'Missing' },
    ]
  },
  a2: {
    title: 'ER Diagram Design',
    course: 'DBMS',
    class: 'CSE-B (2nd Year)',
    dueDate: 'Aug 15, 2026',
    maxMarks: 50,
    description: 'Create an ER diagram representing an online university course catalog management system. Specify all entity sets, relationships, key attributes, and cardinality bounds.',
    submissions: [
      { studentId: '6', roll: 'CSE2610', name: 'Siddharth Roy', date: 'Aug 14, 2026', score: 45, status: 'Graded' },
      { studentId: '7', roll: 'CSE2611', name: 'Ananya Iyer', date: 'Aug 13, 2026', score: 48, status: 'Graded' },
    ]
  },
  a3: {
    title: 'Linear Regression Model',
    course: 'ML',
    class: 'CSE-A (3rd Year)',
    dueDate: 'Aug 22, 2026',
    maxMarks: 100,
    description: 'Build a Scikit-Learn linear regression model to predict student performance based on attendance and assignment scores. Include MSE and R2 evaluation metrics.',
    submissions: [
      { studentId: '1', roll: 'CSE2601', name: 'Rahul Sharma', date: 'Aug 19, 2026', score: 95, status: 'Graded' },
      { studentId: '4', roll: 'CSE2604', name: 'Aditya Sen', date: 'Aug 20, 2026', score: '', status: 'Submitted' },
      { studentId: '5', roll: 'CSE2605', name: 'Meera Das', date: 'Aug 21, 2026', score: '', status: 'Submitted' },
    ]
  },
  a4: {
    title: 'Process Scheduling Sim',
    course: 'OS',
    class: 'IT-A (3rd Year)',
    dueDate: 'Aug 20, 2026',
    maxMarks: 100,
    description: 'Simulate CPU scheduling algorithms (FCFS, SJF, Round Robin with quantum=2ms) and calculate average waiting and turnaround time.',
    submissions: [
      { studentId: '8', roll: 'CSE2612', name: 'Rohan Mehta', date: 'Aug 18, 2026', score: '', status: 'Submitted' },
      { studentId: '9', roll: 'CSE2613', name: 'Divya Krishna', date: 'Aug 19, 2026', score: 85, status: 'Graded' },
    ]
  },
  a5: {
    title: 'SQL Joins Worksheet',
    course: 'DBMS',
    class: 'CSE-B (2nd Year)',
    dueDate: 'Aug 12, 2026',
    maxMarks: 50,
    description: 'Write relational SQL queries using INNER JOIN, LEFT OUTER JOIN, and GROUP BY to extract student enrolment statistics.',
    submissions: [
      { studentId: '6', roll: 'CSE2610', name: 'Siddharth Roy', date: 'Aug 10, 2026', score: 42, status: 'Graded' },
      { studentId: '7', roll: 'CSE2611', name: 'Ananya Iyer', date: 'Aug 11, 2026', score: 50, status: 'Graded' },
    ]
  }
};

export default function TeacherAssignmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(assignmentDetailsMock[id] || {
    title: 'Assignment Details',
    course: 'General',
    class: 'CSE-A',
    dueDate: 'Aug 25, 2026',
    maxMarks: 100,
    description: 'Comprehensive assignment evaluating core course principles and practical problem solving.',
    submissions: [
      { studentId: '1', roll: 'CSE2601', name: 'Rahul Sharma', date: 'Aug 18, 2026', score: 88, status: 'Graded' },
      { studentId: '3', roll: 'CSE2603', name: 'Priya Nair', date: 'Aug 19, 2026', score: '', status: 'Submitted' }
    ]
  });

  useEffect(() => {
    if (id && assignmentDetailsMock[id]) {
      setData(assignmentDetailsMock[id]);
    } else if (id) {
      getAssignments().then(list => {
        const found = list.find(item => item.id === id);
        if (found) {
          setData({
            title: found.title,
            course: found.course,
            class: found.class,
            dueDate: found.dueDate,
            maxMarks: 100,
            description: `Official coursework evaluation for ${found.title} (${found.course}). Students must submit their completed work before ${found.dueDate}.`,
            submissions: [
              { studentId: '1', roll: 'CSE2601', name: 'Rahul Sharma', date: 'Recent', score: 92, status: 'Graded' },
              { studentId: '3', roll: 'CSE2603', name: 'Priya Nair', date: 'Recent', score: '', status: 'Submitted' }
            ]
          });
        }
      });
    }
  }, [id]);

  const handleScoreChange = (index, value) => {
    if (!data?.submissions) return;
    const updatedSubmissions = [...data.submissions];
    if (updatedSubmissions[index]) {
      updatedSubmissions[index].score = value;
      if (value !== '') {
        updatedSubmissions[index].status = 'Graded';
      }
      setData({ ...data, submissions: updatedSubmissions });
    }
  };

  const submissions = data?.submissions || [];
  const gradedCount = submissions.filter(s => s && s.status === 'Graded').length;
  const submittedCount = submissions.filter(s => s && (s.status === 'Submitted' || s.status === 'Graded')).length;


  return (
    <div className="details-container">
      {/* Header */}
      <div className="teacher-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn-teacher secondary" style={{ padding: '8px' }} onClick={() => navigate('/teacher/assignments')}>
            <ChevronLeft size={18} />
          </button>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px' }}>{data.title}</h1>
            <p style={{ margin: 0, color: '#6B7280', fontSize: '13px' }}>Course: {data.course} • Class: {data.class}</p>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="stats-grid">
        <StatCard
          title="Maximum Marks"
          value={data.maxMarks}
          icon={<Award size={20} />}
          gradient="gradient-1"
          iconColor="orange"
        />
        <StatCard
          title="Submission Rate"
          value={`${data.submissions.length > 0 ? Math.round((submittedCount / data.submissions.length) * 100) : 0}%`}
          icon={<CheckCircle size={20} />}
          gradient="gradient-4"
          valueColor="green"
          iconColor="green"
        />
        <StatCard
          title="Graded Submissions"
          value={`${gradedCount} / ${submittedCount}`}
          icon={<FileText size={20} />}
          gradient="gradient-2"
          valueColor="blue"
          iconColor="blue"
        />
        <StatCard
          title="Due Date"
          value={data.dueDate}
          icon={<Calendar size={20} />}
          gradient="gradient-3"
          valueColor="cyan"
          iconColor="cyan"
        />
      </div>

      <div className="details-grid">
        {/* Submissions list */}
        <div className="details-main">
          <SectionCard title="Student Submissions">
            <div className="table-container" style={{ margin: 0 }}>
              <table className="teacher-table">
                <thead>
                  <tr>
                    <th>Roll Number</th>
                    <th>Student Name</th>
                    <th>Submission Date</th>
                    <th>Marks Obtained</th>
                    <th>Status</th>
                    <th>Quick Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {data.submissions.map((sub, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{sub.roll}</td>
                      <td>{sub.name}</td>
                      <td>{sub.date}</td>
                      <td style={{ fontWeight: 700, color: '#FF6B00' }}>
                        {sub.score !== '' ? `${sub.score} / ${data.maxMarks}` : `— / ${data.maxMarks}`}
                      </td>
                      <td>
                        <span className={`badge ${
                          sub.status === 'Graded' ? 'badge-success' : sub.status === 'Submitted' ? 'badge-primary' : 'badge-danger'
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                      <td>
                        {sub.status !== 'Missing' ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input
                              type="number"
                              placeholder="Score"
                              style={{ width: '70px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #E5E7EB' }}
                              value={sub.score}
                              max={data.maxMarks}
                              onChange={(e) => handleScoreChange(i, e.target.value)}
                            />
                            <button className="btn-teacher primary" style={{ padding: '6px 10px', fontSize: '11px' }} title="Save Score">
                              <Save size={14} />
                            </button>
                          </div>
                        ) : (
                          <span style={{ fontSize: '12px', color: '#9CA3AF' }}>No submission to grade</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {data.submissions.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '30px' }}>No student records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        {/* Info panel */}
        <div className="details-sidebar">
          <SectionCard title="Assignment Description">
            <p style={{ fontSize: '13.5px', color: '#4B5563', lineHeight: '1.6', margin: 0 }}>
              {data.description}
            </p>
            
            <div className="sidebar-divider" style={{ margin: '16px 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>Attachments:</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', background: '#FAFBFC', borderRadius: '8px', border: '1px dashed #D1D5DB', fontSize: '12.5px', color: '#4B5563' }}>
                <FileText size={16} color="#FF6B00" />
                <span>assignment_sheet.pdf</span>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
