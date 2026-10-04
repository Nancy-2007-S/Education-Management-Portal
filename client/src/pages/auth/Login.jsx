import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, Eye, EyeOff, Shield, BookOpen, UserCheck, Sparkles } from 'lucide-react';

export default function Login() {
  const [selectedRole, setSelectedRole] = useState('student');
  const [email, setEmail]       = useState('student@university.edu');
  const [password, setPassword] = useState('password123');
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState(null);
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();
  const { currentUser, role } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser && role) {
      if (role === 'admin')   navigate('/admin/dashboard', { replace: true });
      else if (role === 'teacher') navigate('/teacher/dashboard', { replace: true });
      else navigate('/student/dashboard', { replace: true });
    }
  }, [currentUser, role, navigate]);

  const roles = [
    {
      id: 'student',
      title: 'Student',
      icon: GraduationCap,
      color: '#2563eb',
      bgLight: '#eff6ff',
      border: '#bfdbfe',
      email: 'student@university.edu',
      desc: 'Courses, grades & progress'
    },
    {
      id: 'teacher',
      title: 'Teacher',
      icon: BookOpen,
      color: '#059669',
      bgLight: '#ecfdf5',
      border: '#a7f3d0',
      email: 'teacher@university.edu',
      desc: 'Classes, grading & exams'
    },
    {
      id: 'admin',
      title: 'Admin',
      icon: Shield,
      color: '#7c3aed',
      bgLight: '#f5f3ff',
      border: '#ddd6fe',
      email: 'admin@university.edu',
      desc: 'System & user management'
    }
  ];

  const handleSelectRole = (r) => {
    setSelectedRole(r.id);
    setEmail(r.email);
    setPassword('password123');
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const msg = err.code === 'auth/user-not-found' ? 'No account found with this email.'
                : err.code === 'auth/wrong-password'  ? 'Incorrect password. Please try again.'
                : err.code === 'auth/invalid-email'   ? 'Please enter a valid email address.'
                : err.code === 'auth/invalid-credential' ? 'Invalid email or password.'
                : 'Login failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoRole) => {
    setLoading(true);
    setError(null);
    const demoEmail = `${demoRole}@university.edu`;
    const demoPw = 'password123';
    setSelectedRole(demoRole);
    setEmail(demoEmail);
    setPassword(demoPw);

    try {
      await signInWithEmailAndPassword(auth, demoEmail, demoPw);
    } catch (err) {
      try {
        const { createUserWithEmailAndPassword } = await import('firebase/auth');
        const cred = await createUserWithEmailAndPassword(auth, demoEmail, demoPw);
        const idToken = await cred.user.getIdToken();

        await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idToken,
            name: demoRole === 'admin' ? 'System Administrator' : demoRole === 'teacher' ? 'Prof. Sarah Jenkins' : 'Alex Johnson',
            role: demoRole,
            rollNumber: demoRole === 'student' ? 'STU-2026-01' : undefined,
            employeeId: demoRole === 'teacher' ? 'EMP-102' : undefined,
          }),
        }).catch(() => {});
      } catch (createErr) {
        setError(`Demo login error: ${createErr.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card" style={{ maxWidth: '440px', width: '100%' }}>
        <div className="auth-header" style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="brand-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)' }}>
              <GraduationCap size={24} color="white" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.4rem', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>EduPortal</span>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 6px 0' }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>Select your portal to sign in</p>
        </div>

        {/* Enhanced Interactive Portal Selector Cards */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '12px' }}>
            {roles.map((r) => {
              const Icon = r.icon;
              const isSelected = selectedRole === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleSelectRole(r)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justify: 'center',
                    padding: '12px 8px',
                    borderRadius: '12px',
                    border: isSelected ? `2px solid ${r.color}` : '1px solid var(--border, #e2e8f0)',
                    background: isSelected ? r.bgLight : 'var(--card-bg, #ffffff)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    transform: isSelected ? 'translateY(-2px)' : 'none',
                    boxShadow: isSelected ? `0 4px 12px ${r.color}25` : 'none',
                    position: 'relative'
                  }}
                >
                  <div 
                    style={{ 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '8px', 
                      background: isSelected ? r.color : '#f1f5f9', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      marginBottom: '6px',
                      color: isSelected ? '#ffffff' : '#64748b',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: isSelected ? r.color : 'var(--text-primary)' }}>
                    {r.title}
                  </span>
                  {isSelected && (
                    <span style={{ position: 'absolute', top: '6px', right: '6px', width: '6px', height: '6px', borderRadius: '50%', background: r.color }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Demo One-Click Sign In Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
            border: '1px solid var(--border, #e2e8f0)',
            borderRadius: '10px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} color="var(--primary)" />
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Demo {roles.find(r => r.id === selectedRole)?.title} Access
              </span>
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleDemoLogin(selectedRole)}
              style={{
                background: roles.find(r => r.id === selectedRole)?.color || 'var(--primary)',
                color: 'white',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}
            >
              1-Click Sign In →
            </button>
          </div>
        </div>

        {error && <div className="auth-alert error" style={{ marginBottom: '16px' }}>{error}</div>}

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Email Address</label>
            <input
              type="email"
              placeholder="you@university.edu"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{ paddingRight: '44px' }}
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading} style={{ width: '100%', padding: '12px', borderRadius: '10px', fontWeight: 700 }}>
            {loading ? 'Signing in…' : `Sign In to ${roles.find(r => r.id === selectedRole)?.title} Portal`}
          </button>
        </form>

        <p className="auth-footer" style={{ marginTop: '20px', marginBottom: '8px', textAlign: 'center', fontSize: '0.85rem' }}>
          Don't have an account? <Link to="/register" style={{ fontWeight: 600 }}>Create Account</Link>
        </p>
        <p style={{ textAlign: 'center', margin: 0 }}>
          <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none' }}>← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

