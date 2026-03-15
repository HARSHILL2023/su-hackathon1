import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowRight, Factory, Zap, ShieldCheck, 
    LayoutDashboard, Settings, Wrench, Sparkles, Award
} from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState('Strategic Owner');

    const handleLaunch = () => {
        setLoading(true);
        setTimeout(() => {
            localStorage.setItem('token', 'HACKATHON_DEMO_BYPASS');
            localStorage.setItem('userRole', selectedRole);
            localStorage.setItem('userName', 'Demo Operative');
            
            if (selectedRole === 'Strategic Owner') {
                navigate('/owner');
            } else {
                navigate('/dashboard');
            }
        }, 600);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#05070a', color: 'white', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ position: 'absolute', top: '10%', width: '50vw', height: '50vw', background: 'rgba(99, 102, 241, 0.1)', filter: 'blur(150px)', borderRadius: '50%', zIndex: 0 }} />
            
            <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '500px', background: 'rgba(10, 13, 20, 0.8)', padding: '40px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '16px', color: '#6366f1', marginBottom: '24px' }}>
                    <ShieldCheck size={40} />
                </div>
                
                <h1 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '8px', letterSpacing: '-1px' }}>SmartFactory AI</h1>
                <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>Instant Command Core Access • No Auth Required</p>

                <div style={{ display: 'grid', gap: '12px', marginBottom: '32px' }}>
                    {[
                        { id: 'Strategic Owner', label: 'STRATEGIC OWNER', icon: <LayoutDashboard size={20} /> },
                        { id: 'Manager', label: 'FACTORY MANAGER', icon: <Settings size={20} /> },
                        { id: 'Operator', label: 'FIELD OPERATOR', icon: <Wrench size={20} /> }
                    ].map(role => (
                        <div
                            key={role.id}
                            onClick={() => setSelectedRole(role.id)}
                            style={{
                                padding: '18px',
                                borderRadius: '16px',
                                border: '1px solid',
                                borderColor: selectedRole === role.id ? '#6366f1' : 'rgba(255,255,255,0.05)',
                                background: selectedRole === role.id ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.02)',
                                cursor: 'pointer',
                                transition: '0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px'
                            }}
                        >
                            <div style={{ color: selectedRole === role.id ? '#6366f1' : 'rgba(255,255,255,0.3)' }}>{role.icon}</div>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontWeight: '800', fontSize: '0.9rem', color: selectedRole === role.id ? 'white' : 'rgba(255,255,255,0.6)' }}>{role.label}</div>
                                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>Full Workspace Access</div>
                            </div>
                        </div>
                    ))}
                </div>

                <button 
                    onClick={handleLaunch}
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '18px',
                        background: '#6366f1',
                        color: 'white',
                        border: 'none',
                        borderRadius: '16px',
                        fontWeight: '900',
                        fontSize: '1.1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)',
                        transition: '0.3s'
                    }}
                >
                    {loading ? 'Initializing...' : <>Launch Command Core <ArrowRight size={20} /></>}
                </button>

                <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px', opacity: 0.3, fontSize: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Award size={14} /> BHILWARA TIER-1</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Sparkles size={14} /> AI-ORCHESTRATED</div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
