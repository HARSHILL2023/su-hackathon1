import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowRight, Factory, Zap, ShieldCheck,
    MessageCircle, Globe, Layers,
    Sparkles, Award, CheckCircle2,
    TrendingUp, Clock
} from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
    const [step, setStep] = useState(1); // 1: Credentials, 2: OTP, 3: Security Question
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Strategic Owner',
        otp: '',
        securityQuestion: 'What was the name of your first loom?',
        securityAnswer: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [activeQuestion, setActiveQuestion] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (authMode === 'register') {
                const res = await fetch('http://localhost:3001/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                const data = await res.json();
                if (res.ok) {
                    setAuthMode('login');
                    alert("Registration successful! Please login.");
                } else {
                    setError(data.msg || "Registration failed");
                }
            } else if (authMode === 'login' && step === 1) {
                const res = await fetch('http://localhost:3001/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: formData.email, password: formData.password })
                });
                const data = await res.json();
                if (res.ok) {
                    setStep(2);
                } else {
                    setError(data.msg || "Login failed");
                }
            } else if (authMode === 'login' && step === 2) {
                const res = await fetch('http://localhost:3001/api/auth/verify-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: formData.email, otp: formData.otp })
                });
                const data = await res.json();
                if (res.ok && data.step === 3) {
                    setStep(3);
                    setActiveQuestion(data.securityQuestion);
                } else {
                    setError(data.msg || "OTP verification failed");
                }
            } else if (authMode === 'login' && step === 3) {
                const res = await fetch('http://localhost:3001/api/auth/verify-security', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: formData.email, securityAnswer: formData.securityAnswer })
                });
                const data = await res.json();
                if (res.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userRole', data.role);
                    localStorage.setItem('userName', data.name);
                    navigate('/dashboard');
                } else {
                    setError(data.msg || "Security verification failed");
                }
            }
        } catch (err) {
            setError("Server connection failed");
        } finally {
            setLoading(false);
        }
    };

    const features = [
        {
            icon: <Clock size={24} />,
            title: "'EM4' Scheduler",
            desc: "Dynamic production scheduling optimizer using RL to plan jobs across machines and staff."
        },
        {
            icon: <MessageCircle size={24} />,
            title: "Maha-Connect WhatsApp",
            desc: "Native WhatsApp integration for real-time inventory alerts and autonomous reordering."
        },
        {
            icon: <Zap size={24} />,
            title: "'Bijli' Surcharge Predictor",
            desc: "Peak-load voltage surge forecasting specifically tuned for Bhilwara's power grid."
        },
        {
            icon: <Layers size={24} />,
            title: "'Vastra' Design IP",
            desc: "Steganographic protection for textile patterns using generative AI to safeguard heritage."
        },
        {
            icon: <Globe size={24} />,
            title: "'Vamsh' Traceability",
            desc: "Blockchain-backed farm-to-fabric audit trail for premium export compliance."
        },
        {
            icon: <TrendingUp size={24} />,
            title: "'Mandi' Pulse AI",
            desc: "Rumor sentiment swarm analysis for global yarn price arbitrage and profit protection."
        }
    ];

    return (
        <div className="landing-root" style={{ background: '#05070a', color: 'white', fontFamily: 'Inter, sans-serif' }}>
            {/* Navbar */}
            <nav style={{
                position: 'fixed',
                top: 0,
                width: '100%',
                padding: scrolled ? '1rem 5%' : '2rem 5%',
                background: scrolled ? 'rgba(5, 7, 10, 0.8)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 1000,
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div style={{
                        background: 'linear-gradient(45deg, #6366f1, #a855f7)',
                        padding: '8px',
                        borderRadius: '12px',
                        boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)'
                    }}>
                        <Factory size={24} color="white" />
                    </div>
                    <span style={{ fontWeight: '900', fontSize: '1.4rem', letterSpacing: '-0.5px' }}>SmartFactory AI</span>
                </div>

                <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                    <button
                        onClick={() => setShowAuth(true)}
                        style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'white',
                            padding: '10px 24px',
                            borderRadius: '12px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: '0.3s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                    >
                        Access Command Core
                    </button>
                </div>
            </nav>

            {/* Auth Modal */}
            {showAuth && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2000,
                    backdropFilter: 'blur(10px)'
                }}>
                    <div className="auth-card animate-scale-up" style={{
                        background: '#0a0d14',
                        width: '100%',
                        maxWidth: '440px',
                        padding: '3rem',
                        borderRadius: '32px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                        position: 'relative'
                    }}>
                        <button 
                            onClick={() => { setShowAuth(false); setStep(1); }}
                            style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'white', opacity: 0.5, cursor: 'pointer' }}
                        >✕</button>

                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '16px', color: '#6366f1', marginBottom: '1rem' }}>
                                <ShieldCheck size={32} />
                            </div>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>
                                {step === 1 ? (authMode === 'login' ? 'Welcome Back' : 'Create Account') : 
                                 step === 2 ? 'Verification Required' : 'Security Check'}
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>
                                {step === 1 ? 'Enter your credentials to proceed' : 
                                 step === 2 ? 'Enter the 6-digit code sent to your email' :
                                 'Answer your private security question'}
                            </p>
                        </div>

                        {error && (
                            <div style={{ padding: '12px', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.2)', color: '#f43f5e', borderRadius: '12px', fontSize: '0.9rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {step === 1 ? (
                                <>
                                    {authMode === 'register' && (
                                        <div className="input-group">
                                            <input 
                                                type="text" 
                                                placeholder="Full Name" 
                                                required
                                                value={formData.name}
                                                onChange={e => setFormData({...formData, name: e.target.value})}
                                                style={{ width: '100%', padding: '14px 18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', color: 'white', outline: 'none' }}
                                            />
                                        </div>
                                    )}
                                    <div className="input-group">
                                        <input 
                                            type="email" 
                                            placeholder="Email Address" 
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({...formData, email: e.target.value})}
                                            style={{ width: '100%', padding: '14px 18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', color: 'white', outline: 'none' }}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <input 
                                            type="password" 
                                            placeholder="Password" 
                                            required
                                            value={formData.password}
                                            onChange={e => setFormData({...formData, password: e.target.value})}
                                            style={{ width: '100%', padding: '14px 18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', color: 'white', outline: 'none' }}
                                        />
                                    </div>
                                    
                                    {authMode === 'register' && (
                                        <>
                                            <div className="input-group" style={{ position: 'relative' }}>
                                                <div 
                                                    onClick={() => setFormData(prev => ({ ...prev, showDropdown: !prev.showDropdown }))}
                                                    style={{ 
                                                        width: '100%', 
                                                        padding: '14px 18px', 
                                                        background: 'rgba(255,255,255,0.03)', 
                                                        border: '1px solid rgba(255,255,255,0.1)', 
                                                        borderRadius: '14px', 
                                                        color: 'white', 
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    {formData.role.toUpperCase()} VIEW
                                                    <TrendingUp size={14} style={{ transform: formData.showDropdown ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
                                                </div>

                                                {formData.showDropdown && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        bottom: '100%',
                                                        left: 0,
                                                        right: 0,
                                                        background: '#0f172a',
                                                        border: '1px solid rgba(255,255,255,0.1)',
                                                        borderRadius: '12px',
                                                        marginBottom: '8px',
                                                        zIndex: 10,
                                                        overflow: 'hidden'
                                                    }}>
                                                        {[
                                                            { id: 'Operator', label: 'OPERATOR VIEW' },
                                                            { id: 'Manager', label: 'MANAGER VIEW' },
                                                            { id: 'Strategic Owner', label: 'STRATEGIC OWNER' }
                                                        ].map(r => (
                                                            <div 
                                                                key={r.id}
                                                                onClick={() => setFormData({ ...formData, role: r.id, showDropdown: false })}
                                                                style={{
                                                                    padding: '12px 16px',
                                                                    fontSize: '0.75rem',
                                                                    fontWeight: '800',
                                                                    cursor: 'pointer',
                                                                    background: formData.role === r.id ? '#6366f1' : 'transparent',
                                                                    color: formData.role === r.id ? 'white' : 'rgba(255,255,255,0.6)'
                                                                }}
                                                            >
                                                                {r.label}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="input-group">
                                                <select 
                                                    value={formData.securityQuestion}
                                                    onChange={e => setFormData({...formData, securityQuestion: e.target.value})}
                                                    style={{ width: '100%', padding: '14px 18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', color: 'white', outline: 'none' }}
                                                >
                                                    <option>What was the name of your first loom?</option>
                                                    <option>Which Bhilwara sector were you born in?</option>
                                                    <option>What is your master technician's nickname?</option>
                                                </select>
                                            </div>
                                            <div className="input-group">
                                                <input 
                                                    type="text" 
                                                    placeholder="Security Answer" 
                                                    required
                                                    value={formData.securityAnswer}
                                                    onChange={e => setFormData({...formData, securityAnswer: e.target.value})}
                                                    style={{ width: '100%', padding: '14px 18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', color: 'white', outline: 'none' }}
                                                />
                                            </div>
                                        </>
                                    )}

                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        style={{ width: '100%', padding: '14px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', marginTop: '1rem', transition: '0.3s' }}
                                        onMouseOver={e => e.currentTarget.style.filter = 'brightness(1.1)'}
                                        onMouseOut={e => e.currentTarget.style.filter = 'brightness(1)'}
                                    >
                                        {loading ? 'Processing...' : (authMode === 'login' ? 'Authenticate' : 'Complete Setup')}
                                    </button>
                                </>
                            ) : step === 2 ? (
                                <>
                                    <div className="input-group">
                                        <input 
                                            type="text" 
                                            placeholder="_ _ _ _ _ _" 
                                            maxLength="6"
                                            required
                                            autoFocus
                                            value={formData.otp}
                                            onChange={e => setFormData({...formData, otp: e.target.value})}
                                            style={{ width: '100%', padding: '20px', background: 'rgba(255,255,255,0.03)', border: '2px solid #6366f1', borderRadius: '14px', color: 'white', outline: 'none', fontSize: '2rem', textAlign: 'center', fontWeight: '900', letterSpacing: '8px' }}
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        style={{ width: '100%', padding: '14px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', marginTop: '1rem' }}
                                    >
                                        {loading ? 'Verifying...' : 'Verify Secure Token'}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div style={{ padding: '20px', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '14px', border: '1px solid rgba(99, 102, 241, 0.2)', marginBottom: '1rem' }}>
                                        <div style={{ fontSize: '0.75rem', color: '#818cf8', fontWeight: '800', marginBottom: '8px' }}>IDENTITY VERIFICATION</div>
                                        <div style={{ fontSize: '1rem', fontWeight: '600' }}>{activeQuestion}</div>
                                    </div>
                                    <div className="input-group">
                                        <input 
                                            type="text" 
                                            placeholder="Your Answer" 
                                            required
                                            autoFocus
                                            value={formData.securityAnswer}
                                            onChange={e => setFormData({...formData, securityAnswer: e.target.value})}
                                            style={{ width: '100%', padding: '14px 18px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', color: 'white', outline: 'none' }}
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        style={{ width: '100%', padding: '14px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '14px', fontWeight: '800', cursor: 'pointer', marginTop: '1rem' }}
                                    >
                                        {loading ? 'Confirming...' : 'Confirm Identity'}
                                    </button>
                                </>
                            )}
                        </form>

                        {step === 1 && (
                            <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>
                                {authMode === 'login' ? "New operative?" : "Already verified?"} 
                                <button 
                                    onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                                    style={{ background: 'none', border: 'none', color: '#6366f1', fontWeight: '700', marginLeft: '8px', cursor: 'pointer' }}
                                >
                                    {authMode === 'login' ? 'Initiate Registration' : 'Return to Login'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '0 5%',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '600px',
                    height: '600px',
                    background: 'rgba(99, 102, 241, 0.15)',
                    filter: 'blur(150px)',
                    borderRadius: '50%',
                    zIndex: 0
                }}></div>

                <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
                    <span style={{
                        display: 'inline-block',
                        padding: '6px 16px',
                        background: 'rgba(99, 102, 241, 0.1)',
                        border: '1px solid rgba(99, 102, 241, 0.3)',
                        borderRadius: '100px',
                        color: '#818cf8',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        marginBottom: '2rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        <Sparkles size={14} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                        The Future of Textile Manufacturing
                    </span>

                    <h1 style={{
                        fontSize: 'max(4rem, 6vw)',
                        fontWeight: '900',
                        lineHeight: 1.1,
                        letterSpacing: '-2px',
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(to bottom right, #fff 30%, rgba(255,255,255,0.5))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Powering the Bhilwara <br />
                        <span style={{ color: '#6366f1' }}>Nirvana Tier</span> Factory
                    </h1>

                    <p style={{
                        fontSize: '1.25rem',
                        color: 'rgba(255,255,255,0.6)',
                        lineHeight: 1.6,
                        maxWidth: '700px',
                        margin: '0 auto 3rem auto'
                    }}>
                        The world's first specialized MSME production orchestrator. 52 autonomous AI agents designed to transform traditional textile units into world-class smart factories.
                    </p>

                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <button
                            onClick={() => setShowAuth(true)}
                            style={{
                                background: '#6366f1',
                                border: 'none',
                                color: 'white',
                                padding: '16px 40px',
                                borderRadius: '14px',
                                fontWeight: '800',
                                fontSize: '1.1rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
                                transition: '0.3s'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            Secure Access Core <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Floating Badges */}
                <div style={{ display: 'flex', gap: '40px', marginTop: '6rem', opacity: 0.4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><CheckCircle2 size={18} /> 52 AI Agents Deployed</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><ShieldCheck size={18} /> Bhilwara SME Optimized</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Award size={18} /> Digital Maturity: Nirvana</div>
                </div>
            </section>

            {/* Features Grid */}
            <section style={{ padding: '10rem 10%', background: '#080a0f' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>The Power of 52</h2>
                    <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto' }}>A comprehensive suite of autonomous agents working in harmony to solve local manufacturing challenges.</p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '30px'
                }}>
                    {features.map((f, i) => (
                        <div key={i} className="feature-card" style={{
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            padding: '2.5rem',
                            borderRadius: '24px',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            cursor: 'default'
                        }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)';
                                e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                                e.currentTarget.style.transform = 'translateY(-10px)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <div style={{
                                background: 'rgba(99, 102, 241, 0.1)',
                                width: '50px',
                                height: '50px',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#6366f1',
                                marginBottom: '1.5rem'
                            }}>{f.icon}</div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1rem' }}>{f.title}</h3>
                            <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, fontSize: '0.95rem' }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ padding: '10rem 10%', textAlign: 'center' }}>
                <div style={{
                    background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.1) 0%, transparent 100%)',
                    padding: '5rem',
                    borderRadius: '40px',
                    border: '1px solid rgba(99, 102, 241, 0.2)'
                }}>
                    <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '1.5rem' }}>Ready to reach Nirvana?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>Join the textile revolution and optimize your factory in minutes. No complex hardware required.</p>
                    <button
                        onClick={() => setShowAuth(true)}
                        style={{
                            background: 'white',
                            border: 'none',
                            color: 'black',
                            padding: '18px 48px',
                            borderRadius: '16px',
                            fontWeight: '900',
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            transition: '0.3s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Initiate Secure Link
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '5rem 10%', borderTop: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Factory size={18} />
                    <span style={{ fontWeight: '800', color: 'rgba(255,255,255,0.8)' }}>SmartFactory AI</span>
                </div>
                <div>© 2026 SmartFactory AI. Built for the Bhilwara Textile Hackathon.</div>
            </footer>
        </div>
    );
};


// Add helper icon for landing
const Infinity = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z" />
    </svg>
);

export default Landing;
