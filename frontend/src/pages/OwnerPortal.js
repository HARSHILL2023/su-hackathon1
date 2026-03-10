import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Bell, Check, X, Shield, Clock, BrainCircuit, Activity, Zap, Cpu, Search, Filter, RefreshCw } from 'lucide-react';

const OwnerPortal = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    const fetchRequests = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/ai/requests');
            setRequests(res.data.filter(r => r.status === 'Pending'));
            setLoading(false);
        } catch (err) {
            console.error('Error fetching requests:', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
        const interval = setInterval(fetchRequests, 3000);
        const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => {
            clearInterval(interval);
            clearInterval(timeInterval);
        };
    }, []);

    const handleAction = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/api/ai/request/${id}`, { status });
            fetchRequests();
        } catch (err) {
            console.error('Error updating request:', err);
        }
    };

    return (
        <div className="flex flex-col min-h-screen text-white font-sans relative overflow-hidden" style={{
            backgroundColor: '#0d0e1a',
            backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
        }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
                
                * {
                    font-family: 'Inter', sans-serif;
                }

                .glass-card {
                    background: #151623;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                }

                .stat-card {
                    background: #151623;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 12px;
                }

                .action-btn-primary {
                    background: #3d42b3;
                    box-shadow: 0 4px 20px rgba(61, 66, 179, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .action-btn-primary:hover {
                    background: #4a4fc4;
                    transform: translateY(-1px);
                    box-shadow: 0 6px 24px rgba(61, 66, 179, 0.4);
                }

                .reject-btn {
                    background: #1c1d29;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #94a3b8;
                }

                .reject-btn:hover {
                    background: #252635;
                    color: #ef4444;
                    border-color: rgba(239, 68, 68, 0.2);
                }

                .badge-strategic {
                    background: rgba(16, 185, 129, 0.1);
                    border: 1px solid #10b981;
                    color: #10b981;
                    font-weight: 800;
                    letter-spacing: -0.01em;
                }
                
                @keyframes pulse-soft {
                    0%, 100% { opacity: 0.02; }
                    50% { opacity: 0.05; }
                }
                
                .zap-bg {
                    animation: pulse-soft 5s ease-in-out infinite;
                }
                
                .executive-bg-text {
                    position: fixed;
                    bottom: -30px;
                    left: -20px;
                    width: 100%;
                    font-size: 22rem;
                    font-weight: 900;
                    color: rgba(255, 255, 255, 0.012);
                    pointer-events: none;
                    z-index: 0;
                    text-transform: uppercase;
                    letter-spacing: -0.05em;
                }

                .signal-pill {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    color: #64748b;
                }

                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            <div className="relative z-10 flex-1 flex flex-col max-w-6xl mx-auto w-full px-6 py-10">
                {/* Header Section */}
                <header className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-[#1c1d29] border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl">
                            <Shield size={28} className="text-indigo-500/80" />
                        </div>
                        <div>
                            <h1 className="text-[32px] font-black tracking-tighter text-white leading-none">
                                SmartFactory <span className="text-indigo-500">EXECUTIVE</span> Terminal
                            </h1>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-[11px] font-bold text-gray-500 tracking-[0.1em]">SYSTEM INTEGRITY:</span>
                                <span className="text-[11px] font-extrabold text-[#10b981] tracking-[0.1em]">VALIDATED</span>
                                <span className="text-gray-700 px-1">—</span>
                                <span className="text-[11px] font-bold text-gray-500 tracking-widest">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 px-6 py-3 bg-[#1c1d29] border border-white/10 rounded-xl shadow-lg">
                            <User size={16} className="text-indigo-400" />
                            <span className="text-[13px] font-black tracking-widest text-gray-200">ADMIN.BHILWARA</span>
                        </div>
                        <button className="w-14 h-14 bg-[#1c1d29] border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#252635] transition-all shadow-lg">
                            <div className="relative">
                                <Bell size={22} className="text-gray-300" />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full border-[3px] border-[#1c1d29]"></div>
                            </div>
                        </button>
                    </div>
                </header>

                {/* Stats Grid - Explicitly forcing horizontal on all screens */}
                <div className="flex flex-row gap-6 mb-12 overflow-x-auto no-scrollbar">
                    {[
                        { label: 'AGENTS', val: '52/52', icon: Cpu, color: 'text-gray-500' },
                        { label: 'LATENCY', val: '0.8ms', icon: Activity, color: 'text-indigo-400' },
                        { label: 'PENDING', val: requests.length, icon: Zap, color: 'text-amber-500' },
                        { label: 'NODE', val: 'Bhilwara', icon: Activity, color: 'text-emerald-400' }
                    ].map((stat, i) => (
                        <div key={i} className="stat-card flex-1 min-w-[200px] p-6 group transition-all duration-300 hover:border-indigo-500/20">
                            <div className="flex items-center gap-2 mb-3">
                                <stat.icon size={13} className={stat.color} />
                                <span className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">{stat.label}</span>
                            </div>
                            <div className="text-[28px] font-black text-white">{stat.val}</div>
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="flex-1">
                    <div className="flex items-center gap-6 mb-10">
                        <h2 className="text-[18px] font-black tracking-[0.2em] text-indigo-500 uppercase">Approval Stack</h2>
                        <span className="text-[11px] font-bold text-gray-500 tracking-widest uppercase">{requests.length} STRATEGIC SIGNALS DETECTED</span>
                        <div className="flex-1 h-[1px] bg-white/5 mx-4"></div>
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-indigo-500 transition-colors" size={14} />
                            <input type="text" placeholder="Search signals.." className="bg-[#1c1d29] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-[11px] w-64 focus:outline-none focus:border-indigo-500/30 transition-all font-medium text-gray-300" />
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-24 text-center">
                            <RefreshCw size={32} className="animate-spin text-indigo-500 mx-auto mb-4" />
                            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em]">Syncing Neural Nexus...</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            {requests.map((req) => (
                                <div key={req._id} className="relative glass-card rounded-[2rem] p-8 border border-white/[0.05] hover:border-indigo-500/20 transition-all duration-300 group overflow-hidden">
                                    <div className="flex justify-between items-start relative z-10 gap-8">
                                        <div className="flex-1">
                                            {/* Meta Tags Row 1 */}
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="px-5 py-1.5 bg-indigo-500/10 rounded-full border border-indigo-500/20 flex items-center gap-2">
                                                    <Cpu size={14} className="text-indigo-400" />
                                                    <span className="text-[11px] font-black tracking-widest text-indigo-300 uppercase">{req.agentName}</span>
                                                </div>
                                                <div className="px-5 py-1.5 bg-white/5 rounded-full border border-white/5 flex items-center gap-2">
                                                    <Clock size={14} className="text-gray-400" />
                                                    <span className="text-[11px] font-black tracking-widest text-gray-400 uppercase">{new Date(req.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                </div>
                                            </div>

                                            {/* Meta Tags Row 2 */}
                                            <div className="mb-6">
                                                <div className="inline-flex px-5 py-1.5 signal-pill rounded-full border border-white/5">
                                                    <span className="text-[10px] font-black tracking-widest uppercase">SECURED_SIGNAL // {req._id.toString().slice(-8).toUpperCase()}</span>
                                                </div>
                                            </div>

                                            <h3 className="text-[38px] font-black text-white tracking-tight mb-3 uppercase leading-none">
                                                {req.requestType}
                                            </h3>
                                            <p className="text-[16px] text-gray-400 font-medium leading-relaxed max-w-xl opacity-60 group-hover:opacity-100 transition-opacity">
                                                {req.details}
                                            </p>
                                        </div>

                                        <div className="flex flex-col items-end gap-6 shrink-0 pt-2 text-right">
                                            {/* Strategic Utility Section - Horizontal layout as per Photo 2 */}
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <Zap size={10} className="text-emerald-500" />
                                                    <span className="text-[10px] font-black tracking-[0.2em] text-emerald-500 uppercase">Strategic Utility</span>
                                                </div>
                                                <div className="badge-strategic px-5 py-2 rounded-lg text-[11px]">
                                                    {req.agentName === 'InventoryAI' ? 'Working Capital Optimization' : 'Direct Margin Enhancement'}
                                                </div>
                                            </div>

                                            {/* Action Buttons Row */}
                                            <div className="flex items-center gap-4 mt-2">
                                                <button
                                                    onClick={() => handleAction(req._id, 'Rejected')}
                                                    className="reject-btn w-14 h-14 rounded-xl flex items-center justify-center transition-all group/reject shadow-lg"
                                                >
                                                    <X size={26} className="group-hover/reject:scale-110 transition-transform" strokeWidth={2.5} />
                                                </button>
                                                <button
                                                    onClick={() => handleAction(req._id, 'Approved')}
                                                    className="action-btn-primary h-14 px-12 rounded-xl flex items-center gap-4 transition-all group/action shadow-2xl"
                                                >
                                                    <Check size={22} className="text-white group-hover/action:scale-110 transition-transform" strokeWidth={4} />
                                                    <span className="text-[16px] font-black text-white tracking-tight uppercase">Execute Action</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subliminal Zap Icon - Pulsing behind */}
                                    <div className="absolute top-1/2 right-12 -translate-y-1/2 pointer-events-none zap-bg">
                                        <Zap size={240} fill="currentColor" stroke="none" className="text-white/[0.04]" />
                                    </div>
                                </div>
                            ))}

                            {requests.length === 0 && (
                                <div className="py-40 text-center glass-card rounded-[2rem] border-dashed border-white/10">
                                    <div className="w-24 h-24 bg-emerald-500/5 rounded-[2rem] flex items-center justify-center mx-auto mb-10 border border-emerald-500/10">
                                        <Check size={48} className="text-emerald-500/30" strokeWidth={3} />
                                    </div>
                                    <h3 className="text-[28px] font-black text-white mb-4 uppercase tracking-tight">Operational Equilibrium</h3>
                                    <p className="text-[13px] text-gray-500 uppercase tracking-[0.3em] font-black">All strategic signals processed</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Logistics */}
                <footer className="mt-24 py-16 border-t border-white/5 relative z-10">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-12 opacity-20 hover:opacity-100 transition-opacity duration-700">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-8">
                            <div>
                                <div className="text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase mb-2">Gateway Hub</div>
                                <div className="text-xs font-bold text-gray-400">Port 5000 (Neural Engine v4.2)</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase mb-2">Sovereign Layer</div>
                                <div className="text-xs font-bold text-gray-400">AES-256-QUBIT / RSA-8192</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-black tracking-[0.2em] text-gray-500 uppercase mb-2">Local Identity</div>
                                <div className="text-xs font-bold text-gray-400">admin@bhilwara.mill</div>
                            </div>
                        </div>
                        <div className="flex flex-col lg:items-end gap-3">
                            <div className="flex items-center gap-3 lg:justify-end">
                                <Shield size={18} className="text-indigo-500/50" />
                                <span className="text-[13px] font-black tracking-[0.5em] text-white uppercase opacity-70">Secure Sovereign Factory OS</span>
                            </div>
                            <span className="text-[10px] font-bold text-gray-700 tracking-[0.3em] uppercase lg:text-right">Bhilwara Smart Architecture © 2026</span>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Subliminal Brand Text */}
            <div className="executive-bg-text select-none">
                EXECUTIVE
            </div>
        </div>
    );
};

// Internal Components (Using icons already imported)
const ArrowRight = ({ size, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
);

const CheckCircle = ({ className, size }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

export default OwnerPortal;
