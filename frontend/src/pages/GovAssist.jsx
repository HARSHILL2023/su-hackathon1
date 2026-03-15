import React, { useState, useEffect } from 'react';
import api from '../api';
import {
    ShieldCheck, Landmark, FileText, ClipboardCheck,
    TrendingUp, AlertTriangle, Download, RefreshCw,
    Search, ExternalLink, ChevronRight, Gavel,
    Building2, BadgePercent, Clock, Sparkles, Activity
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const GovAssist = () => {
    const [complianceData, setComplianceData] = useState(null);
    const [schemes, setSchemes] = useState([]);
    const [readiness, setReadiness] = useState(null);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [applyingScheme, setApplyingScheme] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [compRes, schemeRes, readRes, reprRes] = await Promise.all([
                api.get('/govassist/compliance-status'),
                api.get('/govassist/scheme-eligibility'),
                api.get('/govassist/inspection-readiness'),
                api.get('/govassist/generate-report')
            ]);
            setComplianceData(compRes.data);
            setSchemes(schemeRes.data.schemes);
            setReadiness(readRes.data);
            setReports(reprRes.data.reports);
        } catch (err) {
            console.error("Failed to fetch GovAssist data", err);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async (scheme) => {
        setApplyingScheme(scheme.name);
        try {
            // 1. REGISTER THE APPLICATION IN LOCAL AI SYSTEM
            await api.post('/govassist/apply', { schemeName: scheme.name });
            
            // 2. IMMEDIATE REDIRECT TO OFFICIAL GOVERNMENT PORTAL
            // We use a small timeout to let the user see the "REGISTERED" status for a split second
            setTimeout(() => {
                window.open(scheme.portalUrl, '_blank');
            }, 800);
            
        } catch (err) {
            alert("Connection error: " + err.message);
        } finally {
            setTimeout(() => setApplyingScheme(null), 2000);
        }
    };

    const downloadReport = (report) => {
        const doc = new jsPDF();
        doc.setFillColor(15, 23, 42);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(34, 211, 238);
        doc.setFontSize(22);
        doc.text(report.reportType.toUpperCase(), 105, 20, { align: 'center' });
        doc.setTextColor(148, 163, 184);
        doc.setFontSize(10);
        doc.text('SmartFactory AI - GovAssist Auto-Generated Report', 105, 30, { align: 'center' });

        const body = Object.entries(report)
            .filter(([key]) => key !== 'reportType')
            .map(([key, value]) => [key.replace(/([A-Z])/g, ' $1').toUpperCase(), value]);

        autoTable(doc, {
            startY: 50,
            head: [['Metric', 'Value']],
            body: body,
            headStyles: { fillColor: [34, 211, 238], textColor: [0, 0, 0] },
            theme: 'grid'
        });

        doc.save(`${report.reportType.replace(/\s+/g, '_').toLowerCase()}.pdf`);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
                <span className="ml-4 text-cyan-500 font-bold tracking-widest">ORCHESTRATING GOV-DATA...</span>
            </div>
        );
    }

    return (
        <div className="animate-fade-in space-y-8">
            {/* High-Impact Stat Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    {
                        title: 'Compliance Health',
                        val: `${complianceData?.complianceHealth}%`,
                        icon: <ShieldCheck size={24} />,
                        color: '#0ea5e9',
                        label: 'LIVE STATUS',
                        desc: 'Cross-module regulations'
                    },
                    {
                        title: 'Eligible Schemes',
                        val: schemes.length,
                        icon: <Landmark size={24} />,
                        color: '#10b981',
                        label: 'SIENA AI MATCH',
                        desc: 'Potential subsidies found'
                    },
                    {
                        title: 'Readiness Score',
                        val: `${readiness?.readinessScore}%`,
                        icon: <Sparkles size={24} />,
                        color: '#f59e0b',
                        label: 'AUDIT SIM READY',
                        desc: 'Industrial safety index'
                    },
                    {
                        title: 'Reports Ready',
                        val: reports.length,
                        icon: <FileText size={24} />,
                        color: '#6366f1',
                        label: 'AUTO-COMPILED',
                        desc: 'Regulatory docs ready'
                    }
                ].map((stat, i) => (
                    <div key={i} className="strategic-card industrial-panel p-6 overflow-hidden group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-slate-800/50 rounded-xl border border-white/5 transition-all group-hover:scale-110" style={{ color: stat.color }}>
                                {stat.icon}
                            </div>
                            <span className="text-[9px] font-black px-2 py-0.5 rounded border" style={{ borderColor: `${stat.color}33`, color: stat.color, background: `${stat.color}11` }}>
                                {stat.label}
                            </span>
                        </div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.title}</div>
                        <div className="text-3xl font-black text-white mt-1">{stat.val}</div>
                        <div className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                            <Activity size={12} style={{ color: stat.color }} /> {stat.desc}
                        </div>
                        <div className="absolute -right-2 -bottom-2 w-16 h-16 opacity-5 transition-all group-hover:opacity-10 group-hover:scale-150" style={{ color: stat.color }}>{stat.icon}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Panel 1: Compliance Status */}
                <div className="industrial-panel p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-sm font-black text-white uppercase tracking-[2px] flex items-center gap-3">
                                <Gavel size={20} className="text-cyan-500" /> Compliance Monitor
                            </h3>
                            <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">Regulatory tracking across all departments</p>
                        </div>
                        <button onClick={fetchData} className="p-2.5 bg-slate-800/50 hover:bg-slate-700 rounded-xl transition-all text-slate-400 border border-white/5"><RefreshCw size={16} /></button>
                    </div>
                    <div className="space-y-4">
                        {complianceData?.complianceList.map((item, idx) => (
                            <div key={idx} className="bg-slate-900/30 border border-white/5 p-5 rounded-2xl flex justify-between items-center group hover:border-cyan-500/30 hover:bg-slate-900/50 transition-all cursor-default">
                                <div className="flex gap-4 items-center">
                                    <div className={`w-1.5 h-10 rounded-full ${item.riskLevel === 'High' ? 'bg-red-500' : item.riskLevel === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                                    <div>
                                        <div className="text-[13px] font-black text-white uppercase tracking-wide">{item.name}</div>
                                        <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-1 font-bold">
                                            <Clock size={12} /> NEXT DEADLINE: {item.nextDeadline}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${item.status === 'Completed' ? 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5' : 'border-amber-500/20 text-amber-500 bg-amber-500/5'}`}>{item.status}</div>
                                    <div className={`text-[10px] mt-2 font-black tracking-widest ${item.riskLevel === 'High' ? 'text-red-500' : 'text-slate-400'}`}>RISK // {item.riskLevel.toUpperCase()}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Panel 2: Eligible Government Schemes */}
                <div className="industrial-panel p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-sm font-black text-white uppercase tracking-[2px] flex items-center gap-3">
                                <Landmark size={20} className="text-emerald-500" /> Subsidy Matcher
                            </h3>
                            <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold italic">Powered by Siena Industrial AI Engine</p>
                        </div>
                        <div className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg">AI ENGINE ACTIVE</div>
                    </div>
                    <div className="space-y-5">
                        {schemes.map((scheme, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent border border-white/5 p-6 rounded-3xl relative overflow-hidden group hover:border-emerald-500/30 transition-all">
                                <div className="absolute right-[-10px] top-[-10px] text-emerald-500/5 group-hover:text-emerald-500/10 transition-all group-hover:rotate-12">
                                    <Landmark size={120} />
                                </div>
                                <div className="relative z-10">
                                    <div className="text-[11px] font-black text-emerald-500 mb-2 tracking-[2px] uppercase">Eligible Scheme</div>
                                    <div className="text-lg font-black text-white leading-tight mb-2 group-hover:text-emerald-400 transition-colors">{scheme.name}</div>
                                    <div className="text-3xl font-black text-white mb-4 drop-shadow-lg">{scheme.estimatedSubsidy || scheme.estimatedBenefit}</div>
                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {scheme.documents.map((doc, dIdx) => (
                                            <span key={dIdx} className="text-[9px] font-black bg-slate-800/80 text-slate-400 px-2.5 py-1 rounded-lg border border-white/5 uppercase tracking-tighter">{doc}</span>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => handleApply(scheme)}
                                        disabled={applyingScheme === scheme.name}
                                        className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-500 text-slate-900 rounded-2xl text-[11px] font-black uppercase tracking-[2px] hover:bg-emerald-400 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {applyingScheme === scheme.name ? (
                                            <>
                                                <RefreshCw size={16} className="animate-spin" /> REDIRECTING TO GOV-PORTAL...
                                            </>
                                        ) : (
                                            <>
                                                INITIATE OFFICIAL SUBMISSION <ChevronRight size={16} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Panel 3: Inspection Readiness */}
                <div className="industrial-panel p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-sm font-black text-white uppercase tracking-[2px] flex items-center gap-3">
                                <Search size={20} className="text-amber-500" /> Audit Simulation
                            </h3>
                            <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">Predictive readiness for surprise inspections</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_#f59e0b]"></div>
                            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">ACTIVE TRACING</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-10 p-8 bg-slate-900/30 rounded-[2rem] border border-white/5 mb-8">
                        <div className="relative">
                            <svg className="w-40 h-40 transform -rotate-90">
                                <circle className="text-slate-800" strokeWidth="12" stroke="currentColor" fill="transparent" r="60" cx="80" cy="80" />
                                <circle className="text-amber-500 transition-all duration-1000 ease-out" strokeWidth="12" strokeDasharray={377} strokeDashoffset={377 - (readiness?.readinessScore / 100) * 377} strokeLinecap="round" stroke="currentColor" fill="transparent" r="60" cx="80" cy="80" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-black text-white leading-none">{readiness?.readinessScore}%</span>
                                <span className="text-[8px] font-black text-amber-500 tracking-[1px] mt-1">READY</span>
                            </div>
                        </div>
                        <div className="flex-1 space-y-4">
                            <div className="industrial-panel p-4 bg-amber-500/5 border-amber-500/20">
                                <div className="text-[10px] font-black text-amber-500 mb-1 uppercase tracking-widest">Primary Risk</div>
                                <div className="text-xs font-bold text-white uppercase">Safety & Fire Hazards</div>
                            </div>
                            <div className="industrial-panel p-4 bg-emerald-500/5 border-emerald-500/20">
                                <div className="text-[10px] font-black text-emerald-500 mb-1 uppercase tracking-widest">Compliance Level</div>
                                <div className="text-xs font-bold text-white uppercase">Optimal (High)</div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="text-[11px] font-black text-slate-500 uppercase mb-4 tracking-widest pl-2">Critical Action Items:</div>
                        {readiness?.issuesDetected.map((issue, idx) => (
                            <div key={idx} className="flex gap-4 items-center bg-red-500/5 border border-red-500/10 p-4 rounded-2xl group hover:bg-red-500/10 transition-all">
                                <div className="p-2 bg-red-500/10 rounded-lg group-hover:scale-110 transition-transform"><AlertTriangle size={18} className="text-red-500" /></div>
                                <div className="text-[13px] font-bold text-slate-200 uppercase tracking-tight">{issue}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Panel 4: Generated Reports */}
                <div className="industrial-panel p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-sm font-black text-white uppercase tracking-[2px] flex items-center gap-3">
                                <FileText size={20} className="text-indigo-500" /> Automated Reports
                            </h3>
                            <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">1-Click generation for regulatory submission</p>
                        </div>
                        <button className="px-5 py-2 bg-indigo-600/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-inner">BATCH GENERATE</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {reports.map((report, idx) => (
                            <div key={idx} className="bg-slate-900/30 border border-white/5 p-6 rounded-[2rem] flex flex-col justify-between group hover:border-indigo-500/30 hover:bg-slate-900/50 transition-all">
                                <div>
                                    <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl w-fit mb-5 group-hover:rotate-6 transition-transform">
                                        <FileText size={24} />
                                    </div>
                                    <div className="text-[14px] font-black text-white uppercase mb-2 leading-tight tracking-wide">{report.reportType}</div>
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter mb-6 leading-relaxed opacity-70">
                                        Validated via Industrial Edge-Nodes and real-time production telemetry data streams.
                                    </div>
                                </div>
                                <div className="flex gap-3 mt-auto">
                                    <button
                                        onClick={() => downloadReport(report)}
                                        className="flex-1 py-3 bg-indigo-500/10 hover:bg-indigo-600 border border-indigo-500/20 rounded-2xl text-[10px] font-black uppercase tracking-[2px] text-indigo-400 hover:text-white transition-all"
                                    >
                                        <Download size={16} className="inline mr-2" /> DOWNLOAD
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx="true">{`
                .strategic-card {
                    position: relative;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .strategic-card:hover {
                    transform: translateY(-8px);
                    border-color: rgba(255, 255, 255, 0.2);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
            `}</style>
        </div>
    );
};

export default GovAssist;
