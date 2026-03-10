import api from "../api";
import { useEffect, useState } from "react";
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
  BarChart, Bar, Cell, Legend, PieChart, Pie
} from 'recharts';
import {
  LayoutDashboard, Users, Zap, DollarSign, Activity, Settings, Info, Briefcase,
  ShieldCheck, CheckCircle2, Factory, BarChart3, Play,
  Cpu, TrendingUp, Droplets, Wind, Package, Plus, Award,
  ShieldAlert, BrainCircuit, Layers, CheckCircle, Thermometer, Globe, Building2, Database,
  MessageCircle, Video, Wand2, Smartphone, Bot,
  Box, Network, Mic, Droplet, RefreshCcw, Fingerprint, MessageSquare, ArrowRight, Landmark, BookOpen, FileScan, Sparkles, Recycle, Flame
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { agentsData } from "../data/agentsData"; export default function Dashboard() {
  const navigate = useNavigate();
  // --- AI States ---
  // Overview & Ops
  const [delay, setDelay] = useState("");
  const [pei, setPei] = useState(0);
  const [peiTrend, setPeiTrend] = useState([]);
  const [maintenanceScore, setMaintenanceScore] = useState(0);
  const [reliability, setReliability] = useState(0);
  const [digitalMaturity, setDigitalMaturity] = useState(0);
  const [benchmark, setBenchmark] = useState({});
  const [solar, setSolar] = useState({});
  const [workforce, setWorkforce] = useState({});
  const [safety, setSafety] = useState({});
  const [maintenance, setMaintenance] = useState({});

  // Supply Chain
  const [yarnPrice, setYarnPrice] = useState({});
  const [subcontractor, setSubcontractor] = useState({});
  const [season, setSeason] = useState({});
  const [exportScore, setExportScore] = useState(0);
  const [cluster, setCluster] = useState({});
  const [inventoryAlerts, setInventoryAlerts] = useState([]);

  // Sustainability
  const [esg, setEsg] = useState({});
  const [water, setWater] = useState({});
  const [waterTrend, setWaterTrend] = useState([]);
  const [waste, setWaste] = useState({});
  const [heatwave, setHeatwave] = useState({ isHeatwave: false, alert: "", recommendation: "" });
  const [anomaly, setAnomaly] = useState({ hasAnomaly: false, type: "Normal" });
  // Finance & Risk
  const [costOptimization, setCostOptimization] = useState({});
  const [costBreakdown, setCostBreakdown] = useState([]);
  const [creditRisk, setCreditRisk] = useState({});
  const [profit, setProfit] = useState({});
  const [buyerRisk, setBuyerRisk] = useState({});
  const [govSchemes, setGovSchemes] = useState({});

  // Textile Specific
  const [textileMetrics, setTextileMetrics] = useState({});
  const [textileTrend, setTextileTrend] = useState([]);
  const [textileFlow, setTextileFlow] = useState({});
  const [quality, setQuality] = useState({});
  const [yarnOpt, setYarnOpt] = useState({});
  const [laborSkill, setLaborSkill] = useState({});
  const [downtimePrediction, setDowntimePrediction] = useState({});
  const [workflowOpt, setWorkflowOpt] = useState({});
  const [manualData, setManualData] = useState(JSON.parse(localStorage.getItem('manualFactoryData')) || {});

  // Interactive Demo States
  const [yarnReordered, setYarnReordered] = useState(false);
  const [yarnLoading, setYarnLoading] = useState(false);

  // WhatsApp Chat Sequence State (0: Initial, 1: Owner Typing, 2: Owner Replied, 3: AI Processing, 4: Done)
  const [waStep, setWaStep] = useState(0);
  const [ownerReply, setOwnerReply] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [twilioPhone, setTwilioPhone] = useState('');
  const [twilioSent, setTwilioSent] = useState(false);

  // New Conversational Feature States (0: Idle/Alert, 1: Conversation Started, 2: Action Pending, 3: Completed)
  const [yarnState, setYarnState] = useState(0);
  const [truckState, setTruckState] = useState(0);
  const [deadStockState, setDeadStockState] = useState(0);
  const [solarState, setSolarState] = useState(0);
  const [mahaparvState, setMahaparvState] = useState(0);
  const [cottonYarnState, setCottonYarnState] = useState(0); // 0: Idle, 1: Awaiting, 2: Approved
  const [machineHealthState, setMachineHealthState] = useState(0); // 0: Healthy, 1: Dispatched

  // Request ID Tracking
  const [activeRequestIds, setActiveRequestIds] = useState({
    yarn: null,
    truck: null,
    deadStock: null,
    solar: null,
    mahaparv: null,
    cottonYarn: null,
    machineHealth: null,
    whatsapp: null
  });

  // Track Request IDs specifically for the 52 Agent Library core systems
  const [coreRequestIds, setCoreRequestIds] = useState({});

  // Core Agent States (0: Idle, 1: Active/Syncing, 2: Waiting for Owner, 3: Completed)
  const [coreStates, setCoreStates] = useState({
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0
  });

  const [lastAgentMsg, setLastAgentMsg] = useState({
    yarn: "Expected 8% price hike in Bhilwara Mandi by Friday.",
    truck: "200 Rolls ready. An empty truck returning to Surat is 5km away.",
    deadStock: '3,000m of rejected "Navy Blue Poly-Cotton" taking up warehouse space.',
    solar: "Loom startup peak detected. Recommend shifting Loom 4 & 5 startup to 12:30 PM.",
    mahaparv: "Wedding season & Navratri scraping predicts 400% surge in specific design demand.",
    core: {
      1: "INITIALIZING BRAHMA KERNEL...",
      2: "ESTABLISHING NEURO-SYNC PATHWAYS...",
      3: "CALCULATING QUANTUM PERMUTATIONS...",
      4: "SYNCING MAHA-ORCHESTRATOR...",
      5: "Pinging Edge Node Bhilwara...",
      6: "Loading NLP Models...",
      7: "Scanning for Resource Conflicts..."
    }
  });

  // --- Dynamic Core Agent Data Engine (Realistic Simulation) ---
  useEffect(() => {
    const generateDynamicData = () => {
      setLastAgentMsg(prev => {
        const newCoreState = { ...prev.core };

        // Only update if the agent is in the idle ("monitoring") state
        if (coreStates[1] === 0) {
          const cpuLoad = (Math.random() * (85 - 30) + 30).toFixed(1);
          const activeNodes = Math.floor(Math.random() * (52 - 45) + 45);
          newCoreState[1] = `[Brahma Kernel] Load: ${cpuLoad}%. Balancing ${activeNodes}/52 sub-agents. Active threads: ${Math.floor(Math.random() * 5000 + 1000)}.`;
        }

        if (coreStates[2] === 0) {
          const packetLoss = (Math.random() * 0.05).toFixed(3);
          const syncRate = Math.floor(Math.random() * (1200 - 800) + 800);
          newCoreState[2] = `[Neuro-Sync] Edge telemetry sync rate: ${syncRate} ops/sec. Packet loss: ${packetLoss}%. Pathway integrity verified.`;
        }

        if (coreStates[3] === 0) {
          const permutations = (Math.random() * (9.5 - 2.1) + 2.1).toFixed(2);
          const currentEff = (Math.random() * (98.9 - 94.2) + 94.2).toFixed(1);
          newCoreState[3] = `[Quantum-Swarm] Evaluating ${permutations}M schedule permutations. Current factory efficiency isolated at ${currentEff}%.`;
        }

        if (coreStates[4] === 0) {
          const cottonIndex = (Math.random() * (102.5 - 98.1) + 98.1).toFixed(2);
          const polyDemand = (Math.random() * (15 - 2) + 2).toFixed(1);
          newCoreState[4] = `[Maha-Orch] Global Cotton Index: ${cottonIndex} (-0.2%). Poly-blend export demand rising by ${polyDemand}% in European markets.`;
        }

        if (coreStates[5] === 0) {
          const latency = (Math.random() * (2.5 - 0.8) + 0.8).toFixed(1);
          const temp = (Math.random() * (35.5 - 28.0) + 28.0).toFixed(1);
          newCoreState[5] = `[Edge Node] Zero-latency safety override active. Floor Node 4 latency: ${latency}ms. Ambient server temp: ${temp}°C.`;
        }

        if (coreStates[6] === 0) {
          const logs = Math.floor(Math.random() * (450 - 100) + 100);
          const confidence = (Math.random() * (99.9 - 92.5) + 92.5).toFixed(1);
          newCoreState[6] = `[NLP Engine] Processing ${logs} rolling Hindi/Mewari voice-logs from shop floor. Transcription confidence: ${confidence}%.`;
        }

        if (coreStates[7] === 0) {
          const locksFree = Math.floor(Math.random() * (1024 - 900) + 900);
          const resolveTime = (Math.random() * (15.5 - 2.1) + 2.1).toFixed(1);
          newCoreState[7] = `[Conflict Resolver] ${locksFree} Mutex locks available. Last resource contention resolved in ${resolveTime}ms. Zero system-lock detected.`;
        } // eslint-disable-line no-unused-vars

        return { ...prev, core: newCoreState };
      });
    };

    const interval = setInterval(generateDynamicData, 4500); // Update every 4.5 seconds
    return () => clearInterval(interval);
  }, [coreStates]);

  // --- Owner Approval Polling ---
  const [activeRequests, setActiveRequests] = useState([]);

  useEffect(() => {
    const pollRequests = async () => {
      try {
        const res = await api.get("/ai/requests");
        const currentRequests = res.data;
        if (Array.isArray(currentRequests)) {
          setActiveRequests(currentRequests);
          currentRequests.forEach(req => {
            if (req.status === 'Approved') {
              if (req._id === activeRequestIds.yarn && yarnState === 2) setYarnState(3);
              if (req._id === activeRequestIds.truck && truckState === 2) setTruckState(3);
              if (req._id === activeRequestIds.deadStock && deadStockState === 2) setDeadStockState(3);
              if (req._id === activeRequestIds.solar && solarState === 2) setSolarState(3);
              if (req._id === activeRequestIds.mahaparv && mahaparvState === 2) setMahaparvState(3);
              if (req._id === activeRequestIds.cottonYarn && cottonYarnState === 1) {
                setCottonYarnState(2);
                setYarnReordered(true);
              }
              if (req._id === activeRequestIds.machineHealth && machineHealthState === 1) {
                setMachineHealthState(2);
                setTicketGenerated(true);
              }
              if (req._id === activeRequestIds.whatsapp && waStep === 1) {
                setWaStep(2);
                setSystemEvents(p => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: `WhatsApp AI: Custom Request Approved by Owner.`, type: 'success' }, ...p]);
              }
              // Handle 52 Agent Library (Core Systems)
              Object.keys(coreRequestIds).forEach(agentId => {
                if (req._id === coreRequestIds[agentId] && coreStates[agentId] === 2) {
                  setCoreStates(prev => ({ ...prev, [agentId]: 3 }));
                  setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: `Core AI: Request Approved. Optimization complete.`, type: 'success' }, ...prev]);
                }
              });
            } else if (req.status === 'Rejected') {
              if (req._id === activeRequestIds.yarn && yarnState === 2) { setYarnState(0); setLastAgentMsg(p => ({ ...p, yarn: "Owner REJECTED the bulk order." })); }
              if (req._id === activeRequestIds.truck && truckState === 2) { setTruckState(0); setLastAgentMsg(p => ({ ...p, truck: "Owner REJECTED the booking." })); }
              if (req._id === activeRequestIds.deadStock && deadStockState === 2) { setDeadStockState(0); setLastAgentMsg(p => ({ ...p, deadStock: "Owner REJECTED the stock liquidation." })); }
              if (req._id === activeRequestIds.solar && solarState === 2) { setSolarState(0); setLastAgentMsg(p => ({ ...p, solar: "Owner REJECTED the energy shift." })); }
              if (req._id === activeRequestIds.mahaparv && mahaparvState === 2) { setMahaparvState(0); setLastAgentMsg(p => ({ ...p, mahaparv: "Owner REJECTED the pattern change." })); }
              if (req._id === activeRequestIds.whatsapp && waStep === 1) {
                setWaStep(3);
                setSystemEvents(p => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: 'WhatsApp AI: Custom Request REJECTED by Owner.', type: 'warning' }, ...p]);
              }
              // Handle 52 Agent Library Rejections
              Object.keys(coreRequestIds).forEach(agentId => {
                if (req._id === coreRequestIds[agentId] && coreStates[agentId] === 2) {
                  setCoreStates(prev => ({ ...prev, [agentId]: 0 }));
                  setLastAgentMsg(p => ({ ...p, core: { ...p.core, [agentId]: "Owner REJECTED the request." } }));
                }
              });
            }
          });
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    const hasPendingCoreState = Object.values(coreStates).some(s => s === 2);
    if (yarnState === 2 || truckState === 2 || deadStockState === 2 || solarState === 2 || mahaparvState === 2 || waStep === 1 || cottonYarnState === 1 || machineHealthState === 1 || hasPendingCoreState) {
      const interval = setInterval(pollRequests, 3000);
      return () => clearInterval(interval);
    }
  }, [yarnState, truckState, deadStockState, solarState, mahaparvState, waStep, cottonYarnState, machineHealthState, coreStates, activeRequestIds, coreRequestIds]);

  const triggerOwnerRequest = async (agentName, type, details) => {
    try {
      const res = await api.post("/ai/request", { agentName, requestType: type, details });
      setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: `Signal sent to Owner Command Terminal: ${type}`, type: 'info' }, ...prev]);
      return res.data; // Return the created request object with _id
    } catch (err) {
      console.error("Request error:", err);
      return null;
    }
  };

  // UI States
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotification, setShowNotification] = useState(false);

  // Interactive Machine Slider State
  const [machineVibration, setMachineVibration] = useState(45);
  const [ticketGenerated, setTicketGenerated] = useState(false);
  const [userRole, setUserRole] = useState('Owner'); // Admin, Manager, Operator
  const [isAiLearningMode, setIsAiLearningMode] = useState(true);
  const [lang, setLang] = useState('EN'); // EN, HI
  const [executiveSummary, setExecutiveSummary] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [machineStatus, setMachineStatus] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulation, setSimulation] = useState("");
  const [systemEvents, setSystemEvents] = useState([
    { id: 1, time: '10:42:15', msg: 'AI: Shift 1 Production Optimized (+5.2%)', type: 'info' },
    { id: 2, time: '10:40:02', msg: 'System: Solar Battery grid-sync complete', type: 'success' },
    { id: 3, time: '10:35:44', msg: 'Wear-Audit: Stenter Processor vibration high', type: 'warning' },
    { id: 4, time: '10:30:12', msg: 'Quality: AQL 2.5 Batch-42 passed', type: 'success' },
    { id: 5, time: '10:25:05', msg: 'Alert: Grid power fluctuation detected', type: 'danger' }
  ]);

  useEffect(() => {
    // Check for user-driven data overrides from LocalStorage
    const rawManualData = localStorage.getItem('manualFactoryData');
    const localManualData = rawManualData ? JSON.parse(rawManualData) : null;
    if (localManualData) setManualData(localManualData);

    // Prepare standardized payloads
    const prodPayload = localManualData ? {
      actualOutput: localManualData.actualOutput,
      expectedOutput: localManualData.expectedOutput
    } : {};

    const maintPayload = localManualData ? {
      uptime: localManualData.uptime,
      breakdowns: localManualData.breakdowns,
      daysSince: localManualData.daysSince
    } : {};

    const textilePayload = localManualData ? {
      fabricProduced: localManualData.fabricProducedMeters,
      loomHours: localManualData.loomHours,
      yarnUsed: localManualData.yarnUsedKg
    } : {};

    const financePayload = localManualData ? {
      cost: localManualData.operatingCost,
      price: localManualData.revenue
    } : {};

    const qualityPayload = localManualData ? {
      defects: localManualData.defectsCount,
      totalUnits: localManualData.totalUnitsTested
    } : {};

    /*
     * Phase 4: Winner's Final Final Polish - SaaS & Strategy
     * - [x] Implement Dynamic Role-Based Layouts (Operator/Manager/Owner)
     * - [x] Create "Strategic Intelligence" Tab (SaaS/ESG/Maturity)
     * - [x] Build "Bhilwara Gov-Portal" Section (Local Schemes)
     * - [x] Upgrade "What-If" Tool into interactive Simulation Hub
     * - [x] Final Aesthetic Sweep (Glow effects & Command Center feel)
     */

    // Basic Data
    api.get("/machine/status").then(r => setMachineStatus(r.data));
    api.get("/inventory/alerts").then(r => setInventoryAlerts(r.data));

    // Operations & Overview
    api.post("/ai/delay", { avgOutput: manualData?.actualOutput }).then(r => setDelay(r.data));
    api.post("/ai/efficiency", prodPayload).then(r => {
      setPei(r.data.current);
      if (r.data.trend) setPeiTrend(r.data.trend);
    });
    api.post("/ai/maintenance", {
      uptimeHours: manualData?.uptime,
      breakdowns: manualData?.breakdowns,
      vibration: manualData?.vibration,
      temp: manualData?.temp
    }).then(r => setMaintenance(r.data));
    api.post("/ai/quality", {
      defects: manualData?.defectsCount,
      totalUnits: manualData?.totalUnitsTested,
      gsmDeviation: manualData?.gsmDeviation,
      colorVariance: manualData?.colorVariance,
      shrinkage: manualData?.shrinkage,
      certification: manualData?.certification
    }).then(r => setQuality(r.data));
    api.post("/ai/safety", {
      accidentFreeDays: manualData?.accidentFreeDays,
      ppeComplianceRate: manualData?.ppeCompliance,
      drills: manualData?.safetyDrills,
      hazards: manualData?.unresolvedHazards
    }).then(r => setSafety(r.data));
    api.post("/ai/maintenance-score", maintPayload).then(r => setMaintenanceScore(r.data.score || r.data));
    api.post("/ai/anomaly", { todayValue: manualData?.actualOutput }).then(r => setAnomaly(r.data));
    api.post("/ai/reliability", { uptime: manualData?.uptime }).then(r => setReliability(r.data.availability !== undefined ? r.data.availability : r.data));
    api.post("/ai/digital-maturity", {}).then(r => setDigitalMaturity(r.data.score || r.data));
    api.post("/ai/benchmark", { actualOutput: manualData?.actualOutput }).then(r => setBenchmark(r.data));
    api.post("/ai/power", {
      powerUsed: manualData?.powerConsumedKwh,
      solarContribution: manualData?.solarContribution
    }).then(r => setSolar(r.data));
    api.post("/ai/workforce", { actualOutput: manualData?.actualOutput, workers: manualData?.activeWorkers }).then(r => setWorkforce(r.data));

    // Supply Chain
    api.post("/ai/yarn-price", { yarnPrice: manualData?.yarnPrice }).then(r => setYarnPrice(r.data));
    api.post("/ai/subcontractor", {}).then(r => setSubcontractor(r.data));
    api.post("/ai/seasonal-demand", {}).then(r => setSeason(r.data));
    api.post("/ai/export-score", {}).then(r => setExportScore(r.data.score || r.data));
    api.post("/ai/cluster", {
      actualOutput: manualData?.actualOutput,
      targetOutput: manualData?.expectedOutput
    }).then(r => setCluster(r.data));

    // Sustainability
    api.post("/ai/esg", { wasteKg: manualData?.wasteResaleValue, downtimeHours: (manualData?.breakdowns || 0) * 4 }).then(r => {
      setEsg(r.data);
    });
    api.post("/ai/water", {
      waterUsage: manualData?.waterUsage,
      recycledWater: manualData?.recycledWater
    }).then(r => {
      setWater(r.data);
      if (r.data.trend) setWaterTrend(r.data.trend);
    });
    api.post("/ai/waste", { actualOutput: manualData?.actualOutput }).then(r => setWaste(r.data));
    api.post("/ai/heatwave", {}).then(r => setHeatwave(r.data));

    // Finance
    api.post("/ai/cost-optimization", { actualOutputToday: manualData?.actualOutput }).then(r => {
      setCostOptimization(r.data);
      if (r.data.breakdown) setCostBreakdown(r.data.breakdown);
    });
    api.post("/ai/credit-risk", {}).then(r => setCreditRisk(r.data));
    api.post("/ai/profit", financePayload).then(r => setProfit(r.data));
    api.post("/ai/buyer-risk", {}).then(r => setBuyerRisk(r.data));
    api.post("/ai/gov-schemes", {}).then(r => setGovSchemes(r.data));

    // Textile
    api.post("/ai/textile-metrics", textilePayload).then(r => {
      setTextileMetrics(r.data);
      if (r.data.trend) setTextileTrend(r.data.trend);
    });
    api.post("/ai/textile-flow", {}).then(r => setTextileFlow(r.data));
    api.post("/ai/quality", qualityPayload).then(r => setQuality(r.data));
    api.post("/ai/yarn-optimize", {}).then(r => setYarnOpt(r.data));
    api.post("/ai/labor-skill", { trainingHours: manualData?.trainingHours }).then(r => setLaborSkill(r.data));

    // PS-005 Advanced Automation
    api.post("/ai/predict-downtime", {
      vibration: manualData?.vibration,
      temp: manualData?.temp,
      uptime: manualData?.uptime
    }).then(r => setDowntimePrediction(r.data));

    api.post("/ai/optimize-workflow", {
      grey: textileFlow.greyProduced,
      dyed: textileFlow.dyedCompleted,
      finished: textileFlow.finishedCompleted
    }).then(r => setWorkflowOpt(r.data));

    api.post("/ai/executive-summary", prodPayload).then(r => setExecutiveSummary(r.data));
    api.post("/ai/recommendations", maintPayload).then(r => setRecommendations(r.data.actions));
  }, []);

  const renderAgentGrid = (categories, title) => (
    <div className="stat-card" style={{ marginTop: '1.5rem', background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
      <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Bot size={18} color="var(--primary)" /> {title} (From 52 Agent Library)
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {agentsData.filter(a => categories.includes(a.category)).map(agent => (
          <div key={typeof agent.id === 'object' ? JSON.stringify(agent.id) : agent.id} style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '16px',
            transition: 'all 0.2s',
            cursor: 'default'
          }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)'; e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{typeof agent.category === 'object' ? JSON.stringify(agent.category) : agent.category}</span>
              {agent.status === 'Active' ? <span style={{ color: 'var(--accent)', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 1.5s infinite' }}></div> Active</span> : <span style={{ color: 'var(--warning)', fontSize: '0.7rem' }}>Learning Mode</span>}
            </div>
            <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '8px', lineHeight: 1.3 }}>{typeof agent.id === 'object' ? JSON.stringify(agent.id) : agent.id}. {typeof agent.name === 'object' ? JSON.stringify(agent.name) : agent.name}</div>

            {agent.risk !== 'Low' && agent.risk !== 'N/A' && (
              <div style={{ fontSize: '0.75rem', color: agent.risk.includes('Critical') ? 'var(--danger)' : 'var(--warning)' }}>
                Alert Policy: <strong>{typeof agent.risk === 'object' ? JSON.stringify(agent.risk) : agent.risk}</strong>
              </div>
            )}

            {/* Interactive Logic for Core Systems */}
            {agent.category === 'Core Systems' && (
              <div style={{ marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontStyle: 'italic', marginBottom: '2px', lineHeight: '1.4' }}>
                  {
                    {
                      1: "Master control node balancing 52 sub-agents to prevent system lag.",
                      2: "Central nervous system syncing telemetry between edge looms and cloud.",
                      3: "Calculates global permutations for optimum production schedule.",
                      4: "Global market sync. Adjusts local outputs to real-time demands.",
                      5: "Zero-latency processor for critical machine safety shutdowns.",
                      6: "Translates Hindi/Mewari voice commands into machine code.",
                      7: "Automatically resolves resource conflicts between AI sub-agents."
                    }[agent.id]
                  }
                </div>
                {lastAgentMsg.core[agent.id] && (
                  <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '8px', borderRadius: '6px', fontSize: '0.75rem', color: '#cbd5e1', borderLeft: '2px solid var(--primary)' }}>
                    <strong>{agent.name.split(' ')[0]}AI:</strong> {lastAgentMsg.core[agent.id]}
                  </div>
                )}

                {!coreStates[agent.id] && (
                  <button className="btn-primary"
                    style={{ width: '100%', background: 'var(--primary)', border: 'none', color: 'white', padding: '6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '800', cursor: 'pointer' }}
                    onClick={() => {
                      setCoreStates(prev => ({ ...prev, [agent.id]: 1 }));
                      const msgs = {
                        1: "Re-balancing agent weights for current shift. Efficiency delta: +2.1%. Proceed?",
                        2: "Detected neural bottleneck in Loom 4 telemetry. Run Neuro-Optimization?",
                        3: "Synchronizing global optimum across all clusters. Resource lock required. Engage?",
                        4: "Export demand rising in Bursa cluster. Sync factory patterns with Global IQ?",
                        5: "Node load high. Offload non-critical telemetry to cloud to reduce local lag?",
                        6: "Processing last 4 hours of Hindi/Mewari logs. Extract actionable insights?",
                        7: "Minor resource overlap between Yarn & Logistics agents. Run Conflict Audit?"
                      };
                      setLastAgentMsg(prev => ({ ...prev, core: { ...prev.core, [agent.id]: msgs[agent.id] } }));
                    }}
                  >
                    Engage Agent
                  </button>
                )}

                {coreStates[agent.id] === 1 && (
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button className="btn-primary"
                      style={{ flex: 1, background: 'var(--accent)', border: 'none', color: 'black', padding: '6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '800', cursor: 'pointer' }}
                      onClick={() => {
                        setCoreStates(prev => ({ ...prev, [agent.id]: 2 }));
                        triggerOwnerRequest(agent.name.split(' ')[0] + 'AI', 'System Orchestration', lastAgentMsg.core[agent.id]).then(req => {
                          if (req?._id) setCoreRequestIds(p => ({ ...p, [agent.id]: req._id }));
                        });
                      }}
                    >
                      Process Now
                    </button>
                    <button className="btn-primary" style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', padding: '6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '800', cursor: 'pointer' }} onClick={() => setCoreStates(prev => ({ ...prev, [agent.id]: 0 }))}>Hold</button>
                  </div>
                )}

                {coreStates[agent.id] === 2 && (
                  <div style={{ textAlign: 'center', color: 'var(--accent)', fontSize: '0.7rem', fontWeight: '800', padding: '4px', animation: 'pulse 2s infinite' }}>
                    Waiting for Executive Approval... ⏳
                  </div>
                )}

                {coreStates[agent.id] === 3 && (
                  <div style={{ textAlign: 'center', color: '#10b981', fontSize: '0.7rem', fontWeight: '800', padding: '4px' }}>
                    Status: OPTIMIZED ✅
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    // Generate contextual suggestions based on live dashboard state
    const contextualPool = [];
    const randomPool = [
      "Approve overtime for Shift B (Weavers)",
      "Sell 3,000m Navy Blue dead-stock for ₹4.25L",
      "Reject 1500m Substandard Denim Batch #42",
      "Re-program Looms 1-3 for Navratri design surge",
      "Release quarterly bonus for Top 5% Operators",
      "Request QA audit for incoming Cotton stock",
      "Shift export focus to European Poly-blend market",
      "Schedule complete factory deep-clean this Sunday",
      "Release payment for pending Logistics Invoice #892"
    ];

    // Priority 1: Machine Health & Maintenance
    if (machineVibration > 75) {
      contextualPool.push(`Dispatch Tech-Team to Loom (Vib: ${machineVibration}Hz)`);
      contextualPool.push("Approve ₹15k emergency parts for Loom Repair");
    } else if (maintenanceScore < 85) {
      contextualPool.push("Authorize preventative maintenance on Stenter #2");
    }

    // Priority 2: Inventory & Supply Chain
    if (cottonYarnState === 0 || inventoryAlerts.length > 0) {
      contextualPool.push("Order 500kg Cotton from Sharma Suppliers (Fastest)");
      contextualPool.push("Expedite 200kg Poly-blend from RJ Textiles");
    }

    // Priority 3: Energy & Grid
    const hour = new Date().getHours();
    if (hour >= 13 && hour <= 15) { // Afternoon peak
      contextualPool.push("Shift Looms 5-8 to Solar Grid to save power");
      contextualPool.push("Pre-heat DG Sets for expected 2PM grid cut");
    }

    // Combine contextual (high priority) with random filler to always have 3-4 suggestions
    const finalSuggestions = [...contextualPool];

    // Shuffle randompool
    for (let i = randomPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [randomPool[i], randomPool[j]] = [randomPool[j], randomPool[i]];
    }

    // Fill the rest until we have exactly 3 suggestions
    let i = 0;
    while (finalSuggestions.length < 3 && i < randomPool.length) {
      if (!finalSuggestions.includes(randomPool[i])) {
        finalSuggestions.push(randomPool[i]);
      }
      i++;
    }

    setWhatsappSuggestions(finalSuggestions.slice(0, 3));
  }, [machineVibration, cottonYarnState, maintenanceScore, inventoryAlerts]);

  return (
    <div className="dashboard-container" style={{ display: 'flex', background: '#070b14', minHeight: '100vh', color: 'white', overflow: 'hidden' }}>
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="logo">
          <Factory size={24} />
          <span>SmartFactory AI</span>
          <div style={{ fontSize: '0.7rem', color: 'var(--accent)', marginTop: '4px' }}>
            Live: {typeof executiveSummary.pei === 'object' ? JSON.stringify(executiveSummary.pei) : executiveSummary.pei || 0}% Efficiency
          </div>
        </div>
        <ul className="nav-links">
          <li className={`sidebar-link ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <LayoutDashboard size={18} />
            {lang === 'EN' ? 'SME Command Center' : 'अवलोकन'}
          </li>

          {(userRole === 'Operator' || userRole === 'Manager' || userRole === 'Owner') && (
            <li className={`sidebar-link ${activeTab === 'operations' ? 'active' : ''}`} onClick={() => setActiveTab('operations')}>
              <Cpu size={18} />
              {lang === 'EN' ? 'Plant Floor' : 'प्लांट फ्लोर'}
            </li>
          )}




          {(userRole === 'Operator' || userRole === 'Manager' || userRole === 'Owner') && (
            <li className={`sidebar-link ${activeTab === 'maintenance' ? 'active' : ''}`} onClick={() => setActiveTab('maintenance')}>
              <Settings size={18} />
              {lang === 'EN' ? 'Predictive Maintenance' : 'रखरखाव'}
            </li>
          )}




          {userRole === 'Owner' && (
            <li className={`sidebar-link ${activeTab === 'finance' ? 'active' : ''}`} onClick={() => setActiveTab('finance')}>
              <DollarSign size={20} />
              {lang === 'EN' ? 'Financial KPI' : 'वित्त और जोखिम'}
            </li>
          )}

          {(userRole === 'Operator' || userRole === 'Manager' || userRole === 'Owner') && (
            <li className={`sidebar-link ${activeTab === 'textile' ? 'active' : ''}`} onClick={() => setActiveTab('textile')}>
              <Briefcase size={18} />
              {lang === 'EN' ? 'Textile Operations' : 'वस्त्र विशेष'}
            </li>
          )}




          {userRole === 'Owner' && (
            <li className={`sidebar-link ${activeTab === 'strategy' ? 'active' : ''}`} onClick={() => setActiveTab('strategy')}>
              <TrendingUp size={20} />
              {lang === 'EN' ? 'Strategic Intelligence' : 'रणनीतिक बुद्धिमत्ता'}
            </li>
          )}

          {userRole === 'Owner' && (
            <li className={`sidebar-link ${activeTab === 'agents' ? 'active' : ''}`} onClick={() => setActiveTab('agents')}>
              <Bot size={20} />
              {lang === 'EN' ? 'AI Agent Library (52)' : 'एजंट लाइब्रेरी'}
            </li>
          )}

          {userRole === 'Owner' && (
            <li className={`sidebar-link ${activeTab === 'gov' ? 'active' : ''}`} onClick={() => setActiveTab('gov')} style={{ color: '#0ea5e9' }}>
              <Factory size={18} />
              {lang === 'EN' ? 'Bhilwara Gov-Portal' : 'भीलवाड़ा सरकार पोर्टल'}
            </li>
          )}



        </ul>

        <div className="sidebar-footer" style={{ padding: '1.5rem', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: '800', letterSpacing: '1px' }}>SYSTEM ACCESS</div>

          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            style={{ width: '100%', background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid var(--border)', padding: '10px', borderRadius: '8px', fontSize: '0.75rem', marginBottom: '1rem', cursor: 'pointer' }}
          >
            <option value="Operator">👷 OPERATOR VIEW</option>
            <option value="Manager">📊 MANAGER VIEW</option>
            <option value="Owner">👑 STRATEGIC OWNER</option>
          </select>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>{lang === 'EN' ? 'AI Learning' : 'AI लर्निंग'}</span>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              onClick={() => setIsAiLearningMode(!isAiLearningMode)}
            >
              <div className={`learning-dot ${isAiLearningMode ? 'active' : ''}`} />
              <div style={{ width: '32px', height: '18px', background: isAiLearningMode ? 'var(--primary)' : '#334155', borderRadius: '10px', position: 'relative', transition: '0.3s' }}>
                <div style={{ width: '14px', height: '14px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: isAiLearningMode ? '16px' : '2px', transition: '0.3s' }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>{lang === 'EN' ? 'Interface' : 'भाषा'}</span>
            <button
              onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
              className="lang-indicator"
              style={{ cursor: 'pointer', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.65rem' }}
            >
              {lang}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div className="welcome-text">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span className="badge" style={{ background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.65rem', fontWeight: '800', letterSpacing: '1px' }}>
                {userRole.toUpperCase()} ACCESS
              </span>
              {userRole === 'Owner' && <span className="badge" style={{ background: 'rgba(234, 179, 8, 0.1)', color: '#eab308', border: '1px solid #eab308' }}>PREMIUM ROLE</span>}
            </div>
            <h1>{lang === 'EN' ? `Welcome, ${userRole === 'Owner' ? 'Strategic Owner' : userRole}` : `${userRole === 'Owner' ? 'रणनीतिक मालिक' : userRole} का स्वागत है`}</h1>
            <p>{lang === 'EN' ? 'Real-time intelligence and AI-driven optimization' : 'रीयल-टाइम इंटेलिजेंस और एआई-संचालित अनुकूलन'}</p>
          </div>
          <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              className={`btn-primary ${isSimulating ? 'pulse-heavy' : ''}`}
              disabled={isSimulating}
              onClick={() => {
                setIsSimulating(true);
                const shiftOutput = manualData?.actualOutput || 80;
                api.post("/ai/simulate", {
                  outputPerShift: shiftOutput,
                  shifts: 3,
                  deadlineDays: 5
                })
                  .then(r => {
                    setSimulation(r.data.result);
                    setTimeout(() => setIsSimulating(false), 2000);
                  })
                  .catch(err => {
                    alert("Simulation error: " + err.message);
                    setIsSimulating(false);
                  });
              }}
            >
              <Play size={16} style={{ marginRight: '8px' }} />
              {isSimulating ? 'AI PROCESSING...' : 'Simulate Shift'}
            </button>
          </div>
        </header>

        {activeTab === 'overview' && (
          <>
            <div className="executive-banner" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #0f172a 100%)', padding: '2.5rem', borderRadius: '1.5rem', marginBottom: '2.5rem', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h2 style={{ fontSize: '2.4rem', fontWeight: '800', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>TexTech Intelligence Hub</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '700px', fontSize: '1.1rem', lineHeight: '1.6' }}>
                  The factory is performing at <span style={{ color: 'var(--accent)', fontWeight: '700' }}>{typeof pei === 'object' ? JSON.stringify(pei) : pei}%</span> efficiency.
                  AI predicts <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{String(delay || "").includes('High') ? 'moderate' : 'zero'}</span> disruption risk in the current production cycle.
                </p>
                <div style={{ display: 'flex', gap: '3rem', marginTop: '2.5rem' }}>
                  <div className="hero-stat">
                    <div style={{ fontSize: '0.75rem', fontWeight: '600', opacity: 0.6, letterSpacing: '0.05em', marginBottom: '4px' }}>PLANT HEALTH</div>
                    <div style={{ fontSize: '2rem', fontWeight: '800' }}>{typeof maintenanceScore === 'object' ? JSON.stringify(maintenanceScore) : maintenanceScore}%</div>
                  </div>
                  <div className="hero-stat">
                    <div style={{ fontSize: '0.75rem', fontWeight: '600', opacity: 0.6, letterSpacing: '0.05em', marginBottom: '4px' }}>LIVE ALERTS</div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: inventoryAlerts.length > 0 ? 'var(--danger)' : 'white' }}>{typeof inventoryAlerts.length === 'object' ? JSON.stringify(inventoryAlerts.length) : inventoryAlerts.length}</div>
                  </div>
                  <div className="hero-stat">
                    <div style={{ fontSize: '0.75rem', fontWeight: '600', opacity: 0.6, letterSpacing: '0.05em', marginBottom: '4px' }}>RELIABILITY</div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent)' }}>{typeof reliability === 'object' ? JSON.stringify(reliability) : reliability}%</div>
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', right: '-80px', top: '-80px', width: '400px', height: '400px', background: 'var(--primary)', filter: 'blur(100px)', opacity: 0.15 }}></div>
              <div style={{ position: 'absolute', left: '40%', bottom: '-50px', width: '250px', height: '250px', background: 'var(--accent)', filter: 'blur(80px)', opacity: 0.1 }}></div>
            </div>

            {/* FEATURE: Executive Summary Panel (Big Impression) */}
            <div className="alert alert-info" style={{
              marginBottom: '2rem',
              border: 'none',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
              borderLeft: '4px solid var(--primary)',
              padding: '1.5rem',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ background: 'var(--primary)', color: 'white', padding: '12px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)' }}>
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '4px' }}>Executive Strategy Summary</h2>
                  <p style={{ fontSize: '0.95rem', opacity: 0.8, lineHeight: '1.4' }}>
                    {typeof executiveSummary.summary === 'object' ? JSON.stringify(executiveSummary.summary) : executiveSummary.summary || "Analyzing plant telemetry... Overall production is stable with a 12% projected growth in net margin this month. Workforce skill index in Bhilwara cluster is up by 4%."}
                  </p>
                </div>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card" style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, padding: '10px' }}>
                  <div className="pulse" style={{ width: '8px', height: '8px', background: pei > 80 ? 'var(--accent)' : 'var(--danger)', borderRadius: '50%' }}></div>
                </div>
                <div className="stat-header">
                  <div className="stat-icon"><Activity size={20} /></div>
                  <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)' }}>AI REAL-TIME</span>
                </div>
                <div className="stat-value">{typeof pei === 'object' ? JSON.stringify(pei) : pei || 0}%</div>
                <div className="stat-label">Production Efficiency Index</div>
              </div>

              {/* FEATURE: AI Anomaly Detection */}
              <div className="stat-card" style={{ border: anomaly.hasAnomaly ? '1px solid var(--danger)' : '1px solid rgba(255,255,255,0.05)' }}>
                <div className="stat-header">
                  <div className="stat-icon" style={{ color: anomaly.hasAnomaly ? 'var(--danger)' : 'var(--accent)' }}>
                    <ShieldAlert size={20} />
                  </div>
                  <span className="badge" style={{ background: anomaly.hasAnomaly ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: anomaly.hasAnomaly ? 'var(--danger)' : 'var(--accent)' }}>
                    {anomaly.hasAnomaly ? 'ANOMALY DETECTED' : 'SECURE'}
                  </span>
                </div>
                <div className="stat-value">{typeof anomaly.type === 'object' ? JSON.stringify(anomaly.type) : anomaly.type || 'Normal'}</div>
                <div className="stat-label">AI Anomaly Monitor</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-icon"><ShieldCheck size={20} /></div>
                  <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>PREDICTIVE</span>
                </div>
                <div className="stat-value">{typeof reliability === 'object' ? JSON.stringify(reliability) : reliability || 0}%</div>
                <div className="stat-label">System Reliability Score</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-icon"><Zap size={20} /></div>
                  <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>RISK LEVEL</span>
                </div>
                <div className="stat-value">{String(delay || "").includes('High') ? 'Elevated' : 'Stable'}</div>
                <div className="stat-label">Delivery Delay Prediction</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-icon"><Briefcase size={20} /></div>
                  <span className="badge" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>STRATEGIC</span>
                </div>
                <div className="stat-value">{typeof digitalMaturity === 'number' ? digitalMaturity : (digitalMaturity?.score || 0)}/100</div>
                <div className="stat-label">MSME Digital Maturity</div>
              </div>

              {/* RESTORED: Local Yarn Predictor */}
              <div className="stat-card" style={{ border: '1px solid rgba(16, 185, 129, 0.3)', background: 'linear-gradient(180deg, rgba(6, 78, 59, 0.4) 0%, rgba(2, 44, 34, 0.8) 100%)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    <TrendingUp size={14} /> Local Yarn Predictor
                  </div>
                  <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontSize: '0.65rem', fontWeight: '800', border: '1px solid rgba(16, 185, 129, 0.3)' }}>7-DAY FORECAST</span>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#34d399', marginBottom: '8px' }}>Buy Signal: Cotton</div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ background: 'rgba(52, 211, 153, 0.1)', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', color: '#e2e8f0', borderLeft: '3px solid #34d399' }}>
                    <strong>YarnAI:</strong> {lastAgentMsg.yarn}
                  </div>

                  {yarnState === 0 && (
                    <button className="btn-primary" style={{ width: '100%', background: '#10b981', border: 'none', color: 'black', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', marginTop: 'auto' }}
                      onClick={() => {
                        setYarnState(1);
                        setLastAgentMsg(prev => ({ ...prev, yarn: "Mandi prices are rising. 500kg order will save ₹12,000 if placed now. Shall I draft the PO?" }));
                      }}
                    >Negotiate with Mandi</button>
                  )}

                  {yarnState === 1 && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                      <button className="btn-primary" style={{ flex: 1, background: '#10b981', border: 'none', color: 'black', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                        onClick={async () => {
                          setYarnState(2);
                          setLastAgentMsg(prev => ({ ...prev, yarn: "Proposed PO: 500kg. Waiting for Owner Approval in Command Terminal..." }));
                          const req = await triggerOwnerRequest('YarnAI', 'Purchase Order', 'Order 500kg Cotton Yarn from Sharma Suppliers at ₹240/kg.');
                          if (req?._id) setActiveRequestIds(prev => ({ ...prev, yarn: req._id }));
                        }}
                      >Request Approval</button>
                      <button className="btn-primary" style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }} onClick={() => setYarnState(0)}>Wait</button>
                    </div>
                  )}

                  {yarnState === 2 && (
                    <div style={{ marginTop: 'auto', textAlign: 'center', padding: '8px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '6px', color: '#60a5fa', fontWeight: 'bold', fontSize: '0.8rem', border: '1px solid rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <div className="pulse" style={{ width: '8px', height: '8px', background: '#60a5fa', borderRadius: '50%' }}></div>
                      Waiting for Owner...
                    </div>
                  )}

                  {yarnState === 3 && (
                    <div style={{ marginTop: 'auto', textAlign: 'center', padding: '8px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '6px', color: '#10b981', fontWeight: 'bold', fontSize: '0.8rem' }}>
                      Approved & Finalized ✅
                    </div>
                  )}
                </div>
              </div>

              {/* RESTORED: AI Mahaparv Swarm */}
              <div className="stat-card" style={{ border: '1px solid rgba(236, 72, 153, 0.3)', background: 'linear-gradient(180deg, rgba(131, 24, 67, 0.4) 0%, rgba(76, 29, 149, 0.6) 100%)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ec4899', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    <Activity size={14} /> AI 'Mahaparv' Swarm
                  </div>
                  <span className="badge" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', fontSize: '0.65rem', fontWeight: '800', border: '1px solid rgba(236, 72, 153, 0.3)' }}>CULTURAL PEAK</span>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#f472b6', marginBottom: '8px' }}>Dobby Weave Surge</div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ background: 'rgba(244, 114, 182, 0.1)', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', color: '#e2e8f0', borderLeft: '3px solid #f472b6' }}>
                    <strong>SwarmAI:</strong> {lastAgentMsg.mahaparv}
                  </div>

                  {mahaparvState === 0 && (
                    <button className="btn-primary" style={{ width: '100%', background: '#ec4899', border: 'none', color: 'white', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', marginTop: 'auto' }}
                      onClick={() => {
                        setMahaparvState(1);
                        setLastAgentMsg(prev => ({ ...prev, mahaparv: "I can re-program Looms 1-3 to the wedding design set. Expected revenue increase: ₹1.8L. Execute shift?" }));
                      }}
                    >Analyze Demand</button>
                  )}

                  {mahaparvState === 1 && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                      <button className="btn-primary" style={{ flex: 1, background: '#ec4899', border: 'none', color: 'white', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                        onClick={async () => {
                          setMahaparvState(2);
                          setLastAgentMsg(prev => ({ ...prev, mahaparv: "Requesting Pattern Shift approval from Owner Terminal..." }));
                          const req = await triggerOwnerRequest('SwarmAI', 'Pattern Shift', 'Re-program Looms 1-3 to Dobby Weave for wedding season surge.');
                          if (req?._id) setActiveRequestIds(prev => ({ ...prev, mahaparv: req._id }));
                        }}
                      >Request Shift</button>
                      <button className="btn-primary" style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }} onClick={() => setMahaparvState(0)}>Later</button>
                    </div>
                  )}

                  {mahaparvState === 2 && (
                    <div style={{ marginTop: 'auto', textAlign: 'center', padding: '8px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '6px', color: '#f472b6', fontWeight: 'bold', fontSize: '0.8rem', border: '1px solid rgba(236, 72, 153, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <div className="pulse" style={{ width: '8px', height: '8px', background: '#f472b6', borderRadius: '50%' }}></div>
                      Awaiting Owner...
                    </div>
                  )}

                  {mahaparvState === 3 && (
                    <div style={{ marginTop: 'auto', textAlign: 'center', padding: '8px', background: 'rgba(236, 72, 153, 0.2)', borderRadius: '6px', color: '#f472b6', fontWeight: 'bold', fontSize: '0.8rem' }}>
                      Shift Approved 🌸
                    </div>
                  )}
                </div>
              </div>

              {/* Redesigned Cotton Yarn */}
              <div className="stat-card" style={{ border: '1px solid rgba(239, 68, 68, 0.3)', background: 'linear-gradient(180deg, rgba(69, 10, 10, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f87171', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    <Zap size={14} /> Low Material Alert
                  </div>
                  <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', fontSize: '0.65rem', fontWeight: '800', border: '1px solid rgba(239, 68, 68, 0.3)' }}>LOW MATERIAL</span>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>Cotton Yarn</div>
                <p style={{ fontSize: '0.75rem', opacity: 0.8, margin: 0, marginBottom: '1rem', lineHeight: 1.4, flex: 1, color: '#e2e8f0' }}>Stock depletion in 2 days</p>
                <button
                  className="btn-primary"
                  style={{ width: '100%', background: cottonYarnState === 2 ? 'var(--accent)' : cottonYarnState === 1 ? 'rgba(59, 130, 246, 0.2)' : '#ef4444', fontSize: '0.8rem', padding: '8px', border: cottonYarnState === 1 ? '1px solid #60a5fa' : 'none', color: cottonYarnState === 1 ? '#60a5fa' : 'white', cursor: (cottonYarnState === 2 || cottonYarnState === 1) ? 'default' : 'pointer', borderRadius: '6px', fontWeight: 'bold', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  disabled={cottonYarnState === 2 || cottonYarnState === 1 || yarnLoading}
                  onClick={async () => {
                    setCottonYarnState(1);
                    const req = await triggerOwnerRequest('InventoryAI', 'Material Reorder', 'Auto-reorder 500kg Cotton Yarn due to low stock alert.');
                    if (req?._id) setActiveRequestIds(prev => ({ ...prev, cottonYarn: req._id }));
                  }}
                >
                  {cottonYarnState === 1 ? (
                    <>
                      <div className="pulse" style={{ width: '8px', height: '8px', background: '#60a5fa', borderRadius: '50%' }}></div>
                      Waiting for Owner...
                    </>
                  ) : cottonYarnState === 2 ? 'Material Ordered ✅' : 'Auto-Reorder Material'}
                </button>
              </div>

              {/* RESTORED: Empty-Truck Matchmaker */}
              <div className="stat-card" style={{ border: '1px solid rgba(59, 130, 246, 0.3)', background: 'linear-gradient(180deg, rgba(30, 58, 138, 0.4) 0%, rgba(23, 37, 84, 0.8) 100%)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#60a5fa', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    <Layers size={14} /> Empty-Truck Matchmaker
                  </div>
                  <span className="badge" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', fontSize: '0.65rem', fontWeight: '800', border: '1px solid rgba(59, 130, 246, 0.3)' }}>LOGISTICS</span>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#60a5fa', marginBottom: '8px' }}>Surat Route: 40% Off</div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', color: '#e2e8f0', borderLeft: '3px solid #3b82f6' }}>
                    <strong>LogisticsAI:</strong> {lastAgentMsg.truck}
                  </div>

                  {truckState === 0 && (
                    <button className="btn-primary" style={{ width: '100%', background: '#3b82f6', border: 'none', color: 'white', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', marginTop: 'auto' }}
                      onClick={() => {
                        setTruckState(1);
                        setLastAgentMsg(prev => ({ ...prev, truck: "I have 200 rolls ready. Negotiating ₹14,500 rate with driver MH-09. Book now?" }));
                      }}
                    >Contact Driver</button>
                  )}

                  {truckState === 1 && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                      <button className="btn-primary" style={{ flex: 1, background: '#3b82f6', border: 'none', color: 'white', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                        onClick={async () => {
                          setTruckState(2);
                          setLastAgentMsg(prev => ({ ...prev, truck: "Truck Request sent to Owner Terminal. Rate: ₹14,500." }));
                          const req = await triggerOwnerRequest('LogisticsAI', 'Truck Booking', 'Book empty return-truck MH-09 for Surat delivery at ₹14,500.');
                          if (req?._id) setActiveRequestIds(prev => ({ ...prev, truck: req._id }));
                        }}
                      >Request Booking</button>
                      <button className="btn-primary" style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }} onClick={() => setTruckState(0)}>Decline</button>
                    </div>
                  )}

                  {truckState === 2 && (
                    <div style={{ marginTop: 'auto', textAlign: 'center', padding: '8px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '6px', color: '#60a5fa', fontWeight: 'bold', fontSize: '0.8rem', border: '1px solid rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <div className="pulse" style={{ width: '8px', height: '8px', background: '#60a5fa', borderRadius: '50%' }}></div>
                      Awaiting Owner...
                    </div>
                  )}

                  {truckState === 3 && (
                    <div style={{ marginTop: 'auto', textAlign: 'center', padding: '8px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '6px', color: '#60a5fa', fontWeight: 'bold', fontSize: '0.8rem' }}>
                      Booking Approved 🚚
                    </div>
                  )}
                </div>
              </div>

              {/* RESTORED: AI Dead-Stock Liquidator */}
              <div className="stat-card" style={{ border: '1px solid rgba(245, 158, 11, 0.3)', background: 'linear-gradient(180deg, rgba(66, 32, 6, 0.6) 0%, rgba(30, 10, 0, 0.8) 100%)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    <ArrowRight size={14} /> AI Dead-Stock Liquidator
                  </div>
                  <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', fontSize: '0.65rem', fontWeight: '800', border: '1px solid rgba(245, 158, 11, 0.3)' }}>REVENUE</span>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#f59e0b', marginBottom: '8px' }}>₹4.5L Trapped Inventory</div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', color: '#e2e8f0', borderLeft: '3px solid #f59e0b' }}>
                    <strong>LiquidityAI:</strong> {lastAgentMsg.deadStock}
                  </div>

                  {deadStockState === 0 && (
                    <button className="btn-primary" style={{ width: '100%', background: '#f59e0b', border: 'none', color: 'black', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', marginTop: 'auto' }}
                      onClick={() => {
                        setDeadStockState(1);
                        setLastAgentMsg(prev => ({ ...prev, deadStock: "I found 3 buyers in Surat interested in this Poly-Cotton batch. Current best bid: ₹4.25L. Accept?" }));
                      }}
                    >Find Buyers</button>
                  )}

                  {deadStockState === 1 && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                      <button className="btn-primary" style={{ flex: 1, background: '#f59e0b', border: 'none', color: 'black', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                        onClick={async () => {
                          setDeadStockState(2);
                          setLastAgentMsg(prev => ({ ...prev, deadStock: "Sent bid of ₹4.25L to Owner Portal for final sign-off." }));
                          const req = await triggerOwnerRequest('LiquidityAI', 'Stock Liquidation', 'Sell 3,000m rejected Navy Blue stock to Surat buyer for ₹4.25L.');
                          if (req?._id) setActiveRequestIds(prev => ({ ...prev, deadStock: req._id }));
                        }}
                      >Request Sell</button>
                      <button className="btn-primary" style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }} onClick={() => setDeadStockState(0)}>Wait</button>
                    </div>
                  )}

                  {deadStockState === 2 && (
                    <div style={{ marginTop: 'auto', textAlign: 'center', padding: '8px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '6px', color: '#f59e0b', fontWeight: 'bold', fontSize: '0.8rem', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <div className="pulse" style={{ width: '8px', height: '8px', background: '#f59e0b', borderRadius: '50%' }}></div>
                      Awaiting Owner...
                    </div>
                  )}

                  {deadStockState === 3 && (
                    <div style={{ marginTop: 'auto', textAlign: 'center', padding: '8px', background: 'rgba(245, 158, 11, 0.2)', borderRadius: '6px', color: '#f59e0b', fontWeight: 'bold', fontSize: '0.8rem' }}>
                      Liquidation Approved ✅
                    </div>
                  )}
                </div>
              </div>

              {/* RESTORED: Solar-Grid Load Shifter */}
              <div className="stat-card" style={{ border: '1px solid rgba(234, 179, 8, 0.3)', background: 'linear-gradient(180deg, rgba(66, 32, 6, 0.4) 0%, rgba(20, 10, 0, 0.8) 100%)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fde047', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    <Sparkles size={14} /> Solar-Grid Load Shifter
                  </div>
                  <span className="badge" style={{ background: 'rgba(234, 179, 8, 0.15)', color: '#eab308', fontSize: '0.65rem', fontWeight: '800', border: '1px solid rgba(234, 179, 8, 0.3)' }}>ENERGY SAVE</span>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#eab308', marginBottom: '8px' }}>Peak Solar: 3.2kW</div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', color: '#e2e8f0', borderLeft: '3px solid #eab308' }}>
                    <strong>EnergyAI:</strong> {lastAgentMsg.solar}
                  </div>

                  {solarState === 0 && (
                    <button className="btn-primary" style={{ width: '100%', background: '#eab308', border: 'none', color: 'black', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', marginTop: 'auto' }}
                      onClick={() => {
                        setSolarState(1);
                        setLastAgentMsg(prev => ({ ...prev, solar: "Grid prices are spiking. Shifting 4 high-torque looms to solar grid will save ₹2,400 today. Align?" }));
                      }}
                    >Check Savings</button>
                  )}

                  {solarState === 1 && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                      <button className="btn-primary" style={{ flex: 1, background: '#eab308', border: 'none', color: 'black', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                        onClick={async () => {
                          setSolarState(2);
                          setLastAgentMsg(prev => ({ ...prev, solar: "Energy shift proposal sent to Owner Command Terminal." }));
                          const req = await triggerOwnerRequest('EnergyAI', 'Energy Grid Shift', 'Shift high-torque looms (4, 5, 8, 9) to solar grid to save ₹2,400.');
                          if (req?._id) setActiveRequestIds(prev => ({ ...prev, solar: req._id }));
                        }}
                      >Request Shift</button>
                      <button className="btn-primary" style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }} onClick={() => setSolarState(0)}>Ignore</button>
                    </div>
                  )}

                  {solarState === 2 && (
                    <div style={{ marginTop: 'auto', textAlign: 'center', padding: '8px', background: 'rgba(234, 179, 8, 0.1)', borderRadius: '6px', color: '#eab308', fontWeight: 'bold', fontSize: '0.8rem', border: '1px solid rgba(234, 179, 8, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <div className="pulse" style={{ width: '8px', height: '8px', background: '#eab308', borderRadius: '50%' }}></div>
                      Awaiting Owner...
                    </div>
                  )}

                  {solarState === 3 && (
                    <div style={{ marginTop: 'auto', textAlign: 'center', padding: '8px', background: 'rgba(234, 179, 8, 0.2)', borderRadius: '6px', color: '#eab308', fontWeight: 'bold', fontSize: '0.8rem' }}>
                      Grid Shift Approved ⚡
                    </div>
                  )}
                </div>
              </div>

              {/* NEW INTERACTIVE FEATURE: Machine Health Slider */}
              <div className="stat-card" style={{ borderLeft: `4px solid ${machineVibration > 85 ? 'var(--danger)' : machineVibration > 65 ? 'var(--warning)' : 'var(--accent)'}`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="stat-header">
                  <div className="stat-icon" style={{ color: machineVibration > 85 ? 'var(--danger)' : machineVibration > 65 ? 'var(--warning)' : 'var(--accent)' }}><Activity size={20} /></div>
                  <span className="badge" style={{ background: machineVibration > 85 ? 'rgba(239, 68, 68, 0.1)' : machineVibration > 65 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: machineVibration > 85 ? 'var(--danger)' : machineVibration > 65 ? 'var(--warning)' : 'var(--accent)' }}>
                    {machineVibration > 85 ? 'CRITICAL' : machineVibration > 65 ? 'WARNING' : 'HEALTHY'}
                  </span>
                </div>
                <div className="stat-value" style={{ color: machineVibration > 85 ? 'var(--danger)' : '#f1f5f9' }}>{typeof machineVibration === 'object' ? JSON.stringify(machineVibration) : machineVibration} Hz</div>
                <div className="stat-label">Loom Vibration Frequency (Live Drag)</div>
                <input
                  type="range"
                  min="20"
                  max="120"
                  value={typeof machineVibration === 'object' ? JSON.stringify(machineVibration) : machineVibration}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setMachineVibration(val);
                    if (val > 85 && machineHealthState === 0) {
                      setMachineHealthState(1);
                      triggerOwnerRequest('MaintenanceAI', 'Emergency Repair', `CRITICAL: Loom Vibration spiked to ${val}Hz. Dispatched technician requested.`).then(req => {
                        if (req?._id) setActiveRequestIds(p => ({ ...p, machineHealth: req._id }));
                      });
                    }
                  }}
                  style={{ width: '100%', marginTop: '1rem', accentColor: machineVibration > 85 ? 'var(--danger)' : machineVibration > 65 ? 'var(--warning)' : 'var(--accent)', cursor: 'ew-resize' }}
                />
                {machineHealthState === 1 && (
                  <div style={{ marginTop: '10px', textAlign: 'center', padding: '6px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '6px', color: '#ef4444', fontWeight: 'bold', fontSize: '0.7rem', border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <div className="pulse" style={{ width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }}></div>
                    Emergency Request Sent to Owner
                  </div>
                )}
                {machineHealthState === 2 && (
                  <div style={{ marginTop: '10px', textAlign: 'center', padding: '6px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '6px', color: '#10b981', fontWeight: 'bold', fontSize: '0.7rem' }}>
                    Technician Dispatched ✅
                  </div>
                )}
              </div>

            </div>

            <div className="charts-grid">
              <div className="chart-container">
                <h3 className="section-title">Production Efficiency Trend (7D)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={peiTrend.length > 0 ? peiTrend : [
                    { name: 'Mon', pei: 82 }, { name: 'Tue', pei: 85 }, { name: 'Wed', pei: 83 },
                    { name: 'Thu', pei: 88 }, { name: 'Fri', pei: 84 }, { name: 'Sat', pei: 86 }, { name: 'Sun', pei: 84 },
                  ]}>
                    <defs>
                      <linearGradient id="colorPei" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={typeof 0.3 === 'object' ? JSON.stringify(0.3) : 0.3} />
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" domain={['dataMin - 2', 'dataMax + 2']} />
                    <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} itemStyle={{ color: '#f8fafc' }} />
                    <Area type="monotone" dataKey="pei" stroke="var(--primary)" fillOpacity={1} fill="url(#colorPei)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-container" style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 className="section-title">Factory Risk Heatmap</h3>
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', gap: '12px' }}>
                  {[...Array(9)].map((_, i) => {
                    // Dynamic Zone Logic
                    const zones = ['Prod-A', 'Prod-B', 'Logistics', 'Supply', 'Core', 'QA', 'Energy', 'Labor', 'IT'];

                    let bgCol = 'rgba(5, 150, 105, 0.6)'; // Default Healthy Green
                    let lbl = 'Healthy';

                    // Zone 0: Prod-A (Tied to Vibration Slider)
                    if (i === 0) {
                      if (machineVibration > 85) { bgCol = 'rgba(153, 27, 27, 0.6)'; lbl = 'CRITICAL'; }
                      else if (machineVibration > 65) { bgCol = 'rgba(217, 119, 6, 0.6)'; lbl = 'Warning'; }
                      else { bgCol = 'rgba(6, 95, 70, 0.6)'; lbl = 'Stable'; }
                    }
                    // Zone 3: Supply (Tied to Yarn)
                    else if (i === 3) {
                      if (yarnReordered) { bgCol = 'rgba(5, 150, 105, 0.6)'; lbl = 'Healthy'; }
                      else { bgCol = 'rgba(217, 119, 6, 0.6)'; lbl = 'Low Stock'; }
                    }
                    // Zone 6: Energy (Also tied to Vibration friction)
                    else if (i === 6) {
                      if (machineVibration > 85) { bgCol = 'rgba(153, 27, 27, 0.6)'; lbl = 'Spike'; }
                      else { bgCol = 'rgba(6, 95, 70, 0.6)'; lbl = 'Stable'; }
                    }
                    else {
                      // Static background for others to look real
                      const randStates = [
                        { c: 'rgba(6, 95, 70, 0.6)', l: 'Stable' }, // 1: Prod-B
                        { c: 'rgba(5, 150, 105, 0.6)', l: 'Healthy' }, // 2: Logistics
                        null,
                        { c: 'rgba(5, 150, 105, 0.6)', l: 'Healthy' }, // 4: Core
                        { c: 'rgba(5, 150, 105, 0.6)', l: 'Healthy' }, // 5: QA
                        null,
                        { c: 'rgba(217, 119, 6, 0.6)', l: 'Alert' }, // 7: Labor
                        { c: 'rgba(5, 150, 105, 0.6)', l: 'Healthy' }, // 8: IT
                      ];
                      if (randStates[i]) {
                        bgCol = randStates[i].c;
                        lbl = randStates[i].l;
                      }
                    }

                    return (
                      <div key={i} style={{ background: bgCol, borderRadius: '12px', padding: '10px', fontSize: '0.7rem', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', transition: 'all 0.3s ease' }}>
                        <div style={{ fontWeight: '800', marginBottom: '2px', letterSpacing: '0.02em', fontSize: '0.65rem' }}>{lbl}</div>
                        <div style={{ opacity: 0.6, fontSize: '0.55rem' }}>{zones[i]}</div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '1.25rem', fontStyle: 'italic' }}>
                  Live visual analysis across nine factory dimensions.
                </div>
              </div>
            </div>

            {/* HACKATHON WINNER: Interactive WhatsApp Chat Simulation */}
            <div className="stat-card mt-6" style={{ background: 'linear-gradient(rgba(37, 211, 102, 0.05), transparent)', border: '1px solid rgba(37, 211, 102, 0.2)' }}>
              <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#25D366', marginBottom: '1.5rem', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><MessageCircle size={22} /> AI WhatsApp Factory Assistant (Live Sync)</span>

                {/* Real Twilio SMS Trigger */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(37,211,102,0.3)' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Live Demo:</span>
                  <input
                    type="text"
                    placeholder="+1234567890"
                    value={twilioPhone}
                    onChange={(e) => setTwilioPhone(e.target.value)}
                    style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '0.85rem', outline: 'none', width: '120px' }}
                  />
                  <button
                    onClick={async () => {
                      if (!twilioPhone) return alert("Enter a phone number including country code (e.g., +1234567890)");
                      const msg = "SmartFactory AI Alert: I am your AI Factory Assistant. You can now reply to this thread with any custom request or approval, and I will route it to the Owner Terminal.";
                      try {
                        const res = await fetch('http://localhost:5000/api/whatsapp/send', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ to: twilioPhone.trim(), message: msg })
                        });
                        if (res.ok) {
                          setTwilioSent(true);
                          setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: `Live WhatsApp Alert sent via Twilio to ${twilioPhone}`, type: 'success' }, ...prev]);
                        } else {
                          alert("Failed to send WhatsApp message. Check backend Twilio setup.");
                        }
                      } catch (err) {
                        alert("Network error. Backend not running?");
                      }
                    }}
                    disabled={twilioSent}
                    style={{ background: twilioSent ? '#334155' : '#25D366', color: twilioSent ? '#94a3b8' : '#000', border: 'none', borderRadius: '12px', padding: '4px 10px', fontSize: '0.75rem', fontWeight: 'bold', cursor: twilioSent ? 'default' : 'pointer' }}
                  >
                    {twilioSent ? 'Sent ✅' : 'Send Alert 🚀'}
                  </button>
                </div>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: '#0b141a', padding: '1.5rem', borderRadius: '16px', backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: 'cover', backgroundBlendMode: 'overlay', border: '1px solid rgba(255,255,255,0.05)' }}>

                {/* Message 1: AI General Prompt */}
                <div style={{ alignSelf: 'flex-start', background: '#202c33', padding: '10px 14px', borderRadius: '0 8px 8px 8px', maxWidth: '80%', boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#25D366', fontWeight: 'bold', marginBottom: '4px' }}>Maha-Connect AI</div>
                  <div style={{ fontSize: '0.9rem', color: '#e9edef', lineHeight: '1.4' }}>
                    Welcome to Maha-Connect. I am your SmartFactory AI Assistant. <br /><br />
                    Type your custom request for the Owner Terminal below, or tap an AI suggestion pill to draft instantly.
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#8696a0', textAlign: 'right', marginTop: '4px' }}>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>

                {/* Message 2: Exact User Request */}
                {waStep >= 1 && (
                  <div style={{ alignSelf: 'flex-end', background: '#005c4b', padding: '10px 14px', borderRadius: '8px 0 8px 8px', maxWidth: '80%', boxShadow: '0 1px 2px rgba(0,0,0,0.3)', marginTop: '8px' }}>
                    <div style={{ fontSize: '0.9rem', color: '#e9edef', lineHeight: '1.4' }}>
                      {ownerReply}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#8696a0', textAlign: 'right', marginTop: '4px' }}>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} <span style={{ color: '#53bdeb', marginLeft: '2px' }}>✓✓</span></div>
                  </div>
                )}

                {/* Message 3: AI Status Update */}
                {waStep >= 1 && (
                  <div style={{ alignSelf: 'flex-start', background: '#202c33', padding: '10px 14px', borderRadius: '0 8px 8px 8px', maxWidth: '80%', boxShadow: '0 1px 2px rgba(0,0,0,0.3)', marginTop: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#25D366', fontWeight: 'bold', marginBottom: '4px' }}>Maha-Connect AI</div>
                    <div style={{ fontSize: '0.9rem', color: '#e9edef', lineHeight: '1.4' }}>
                      {waStep === 1 ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div className="pulse" style={{ width: '8px', height: '8px', background: '#25D366', borderRadius: '50%' }}></div>
                          Request sent to Owner Terminal. Waiting for approval...
                        </div>
                      ) : waStep === 2 ? (
                        <div style={{ color: '#10b981', fontWeight: 'bold' }}>Request Approved by Owner ✅</div>
                      ) : (
                        <div style={{ color: '#ef4444', fontWeight: 'bold' }}>Request Rejected by Owner ❌</div>
                      )}
                    </div>
                    {waStep >= 2 && <div style={{ fontSize: '0.65rem', color: '#8696a0', textAlign: 'right', marginTop: '4px' }}>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>}
                  </div>
                )}
              </div>

              {/* Input Area with Suggestions */}
              {waStep === 0 && (
                <div style={{ marginTop: '1rem' }}>
                  {/* AI Suggestions Row */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    {whatsappSuggestions.map(sugg => (
                      <button
                        key={sugg}
                        onClick={() => setOwnerReply(sugg)}
                        style={{ background: 'rgba(37, 211, 102, 0.1)', border: '1px solid rgba(37, 211, 102, 0.3)', color: '#25D366', borderRadius: '12px', padding: '6px 12px', fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                        onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(37, 211, 102, 0.2)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(37, 211, 102, 0.1)'; }}
                      >
                        {sugg}
                      </button>
                    ))}
                  </div>

                  {/* Text Input Row */}
                  <div style={{ display: 'flex', gap: '8px', background: '#0b141a', padding: '10px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', alignItems: 'center' }}>
                    <input
                      type="text"
                      placeholder="Type a custom request for the Owner..."
                      value={ownerReply}
                      onChange={(e) => setOwnerReply(e.target.value)}
                      onKeyDown={async (e) => {
                        if (e.key === 'Enter' && ownerReply.trim().length > 0) {
                          setWaStep(1); // Set to waiting status immediately
                          const req = await triggerOwnerRequest('WhatsAppAI', 'Custom Request', ownerReply.trim());
                          if (req?._id) setActiveRequestIds(prev => ({ ...prev, whatsapp: req._id }));
                        }
                      }}
                      style={{ flex: 1, background: '#2a3942', border: 'none', color: '#d1d7db', padding: '12px 16px', borderRadius: '20px', fontSize: '0.95rem', outline: 'none' }}
                    />
                    <button
                      style={{ background: '#00a884', color: '#111b21', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: ownerReply.trim().length > 0 ? 'pointer' : 'not-allowed', opacity: ownerReply.trim().length > 0 ? 1 : 0.5, transition: '0.2s' }}
                      disabled={ownerReply.trim().length === 0}
                      onClick={async () => {
                        setWaStep(1); // Set to waiting status immediately
                        const req = await triggerOwnerRequest('WhatsAppAI', 'Custom Request', ownerReply.trim());
                        if (req?._id) setActiveRequestIds(prev => ({ ...prev, whatsapp: req._id }));
                      }}
                    >
                      <svg viewBox="0 0 24 24" height="20" width="20" preserveAspectRatio="xMidYMid meet" fill="currentColor">
                        <path d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {renderAgentGrid(['Core Systems'], 'Core AI & Orchestration')}
          </>
        )}

        {
          activeTab === 'operations' && (
            <>
              <div className="stats-grid">
                <div className="stat-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                  <div className="stat-header"><span className="stat-label">Predictive Maintenance</span><Activity size={20} color="var(--primary)" /></div>
                  <div className="stat-value" style={{ color: maintenance.maintenanceProbability?.includes('critical') ? 'var(--danger)' : 'white' }}>
                    {typeof maintenance.maintenanceProbability === 'object' ? JSON.stringify(maintenance.maintenanceProbability) : maintenance.maintenanceProbability || '0%'}
                  </div>
                  <div className="stat-label">{typeof maintenance.status === 'object' ? JSON.stringify(maintenance.status) : maintenance.status || 'Optimizing...'}</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #f59e0b', background: 'linear-gradient(rgba(245, 158, 11, 0.05), transparent)' }}>
                  <div className="stat-header"><span className="stat-label">Bhilwara Grid Predictor</span><Zap size={20} color="#f59e0b" /></div>
                  <div className="stat-value" style={{ color: '#f59e0b', fontSize: '1.5rem' }}>Cut Warning: 2 PM</div>
                  <div className="stat-label font-bold text-red-400">Action: Pre-heat DG Sets</div>
                  <button
                    className="btn-primary"
                    style={{ width: '100%', marginTop: '1rem', background: '#f59e0b', fontSize: '0.75rem', padding: '0.5rem', border: 'none', color: 'black', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}
                    onClick={() => alert('Generators Synced. Loom downtime prevented during load shedding.')}
                  >
                    <Cpu size={14} style={{ display: 'inline', marginRight: '4px' }} /> Auto-Sync Generators
                  </button>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--accent)' }}>
                  <div className="stat-header"><span className="stat-label">Active Loom Count</span><LayoutDashboard size={20} color="var(--accent)" /></div>
                  <div className="stat-value">18 / 20</div>
                  <div className="stat-label">2 Looms in Cycle-Maint</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #f97316' }}>
                  <div className="stat-header"><span className="stat-label">AI Fatigue Predictor</span><Users size={20} color="#f97316" /></div>
                  <div className="stat-value" style={{ color: '#f97316' }}>High Risk</div>
                  <div className="stat-label">Shift B (Weavers)</div>
                  <button
                    className="btn-primary"
                    style={{ width: '100%', marginTop: '1rem', background: '#f97316', fontSize: '0.75rem', padding: '0.5rem', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px' }}
                    onClick={() => {
                      alert('Shift Rotation Optimized! Relief workers assigned to Sector 4.');
                      setSafety(prev => ({ ...prev, ppeCompliance: 100 }));
                    }}
                  >
                    Optimize Shift Rotation
                  </button>
                </div>
              </div>

              {/* RESTORED: Voice-Assisted Operator Panel */}
              <div className="stat-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1, paddingRight: '20px' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#60a5fa', margin: '0 0 10px 0' }}><Mic size={20} /> Voice-Assisted Operator Panel (Hindi/Marwari)</h3>
                    <p style={{ opacity: 0.8, fontSize: '0.9rem', margin: 0 }}>Designed for shop-floor workers. No typing required. Just tap and speak to log downtime or request maintenance.</p>
                  </div>
                  <button className="btn-primary" style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '15px 30px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)' }}>
                    <Mic size={18} /> Hold to Speak
                  </button>
                </div>
              </div>

              <div className="charts-grid" style={{ marginTop: '1.5rem' }}>
                <div className="chart-container">
                  <h3 className="section-title">Live System Events Log</h3>
                  <div style={{ maxHeight: '250px', overflowY: 'auto', paddingRight: '10px' }}>
                    {systemEvents.map(ev => (
                      <div key={typeof ev.id === 'object' ? JSON.stringify(ev.id) : ev.id} style={{ display: 'flex', gap: '1rem', padding: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.8rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontWeight: '600', minWidth: '60px' }}>{typeof ev.time === 'object' ? JSON.stringify(ev.time) : ev.time}</span>
                        <span style={{
                          color: ev.type === 'danger' ? 'var(--danger)' :
                            ev.type === 'warning' ? '#f59e0b' :
                              ev.type === 'success' ? 'var(--accent)' : 'white',
                          fontWeight: ev.type === 'danger' || ev.type === 'warning' ? '700' : '400'
                        }}>
                          {typeof ev.msg === 'object' ? JSON.stringify(ev.msg) : ev.msg}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className="btn-primary" style={{ width: '100%', marginTop: '1rem', background: 'rgba(255,255,255,0.05)', fontSize: '0.75rem', padding: '0.5rem' }}>
                    View Full Audit Log
                  </button>
                </div>
                <div className="stat-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'linear-gradient(rgba(16, 185, 129, 0.1), transparent)' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent)', marginBottom: '0.5rem' }}>SAFETY PULSE</div>
                    <div style={{ fontSize: '3rem', fontWeight: '900', color: '#10b981' }}>{typeof safety.accidentFreeRecord === 'object' ? JSON.stringify(safety.accidentFreeRecord) : safety.accidentFreeRecord || '120'}</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>Accident-Free Days</div>
                    <div className="learning-dot active" style={{ margin: '1rem auto' }}></div>
                    <p style={{ fontSize: '0.7rem', opacity: 0.6 }}>Top 1% National Excellence</p>
                  </div>
                </div>
              </div>

              {/* RESTORED: Holographic & Quantum Orchestrator */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="stat-card" style={{ background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.1) 0%, transparent 100%)', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Box size={22} color="#a855f7" />
                      <h3 style={{ margin: 0, color: '#a855f7' }}>Holographic 'Digital Twin' Analytics</h3>
                    </div>
                    <div className="pulse" style={{ width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }}></div>
                  </div>
                  <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '1.5rem' }}>Projected spatial AI view of machine telemetry. Visualizes invisible mechanical stress points using "Heatwave" spatial mapping.</p>
                  <button className="btn-primary" style={{ width: '100%', background: 'linear-gradient(90deg, #a855f7, #8b5cf6)', border: 'none', color: 'white', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Load 3D Spatial Twin</button>
                </div>

                <div className="stat-card" style={{ background: 'linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Network size={22} color="#3b82f6" />
                      <h3 style={{ margin: 0, color: '#3b82f6' }}>Quantum-Swarm 'Omni-Orchestrator'</h3>
                    </div>
                    <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', color: '#60a5fa', padding: '4px 8px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', textAlign: 'center' }}>
                      GLOBAL OPTIMUM<br />99.98%
                    </div>
                  </div>
                  <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '1.5rem' }}>Meta-AI synchronizing all 28 agents. Micro-adjusts looms 100x/sec to perfectly balance Speed vs. Energy vs. Quality.</p>
                  <button className="btn-primary" style={{ width: '100%', background: 'linear-gradient(90deg, #3b82f6, #6366f1)', border: 'none', color: 'white', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Engage Universal Orchestration</button>
                </div>

                {/* RESTORED: Thermal AI Lint-Fire Predictor */}
                <div className="stat-card" style={{ background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.05) 0%, transparent 100%)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1, paddingRight: '20px' }}>
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444', margin: '0 0 10px 0' }}><Flame size={20} /> Thermal AI Lint-Fire Predictor</h3>
                      <p style={{ opacity: 0.8, fontSize: '0.9rem', margin: 0 }}>Textile mills are fire hazards. Our AI uses thermal cameras to detect "hot-spots" in accumulated lint before they ignite, automatically triggering the overhead misting system.</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: 'bold', textTransform: 'uppercase' }}>Surface Temp</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white' }}>42<span style={{ fontSize: '1rem', color: '#94a3b8' }}>°C</span></div>
                      <div style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 'bold' }}>SAFE RANGE</div>
                    </div>
                  </div>
                </div>

                {/* RESTORED: ML 'Karigar' Skill-Atlas */}
                <div className="stat-card" style={{ background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.05) 0%, transparent 100%)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#8b5cf6', margin: '0 0 10px 0' }}><Users size={20} /> ML 'Karigar' (Skill-Atlas) Indexer</h3>
                      <p style={{ opacity: 0.8, fontSize: '0.9rem', margin: 0 }}>Automatically maps worker output quality against specific machines and yarn types. Suggests the best weaver for complex Suiting/Shirting orders to minimize loom-stoppage.</p>
                    </div>
                    <button className="btn-primary" style={{ background: '#8b5cf6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Assign Best Karigar</button>
                  </div>
                </div>
              </div>

              <div className="stat-card" style={{ marginTop: '1.5rem' }}>
                <h3 className="section-title">Plant Floor Status</h3>
                <div className="machine-grid">
                  {machineStatus.map(m => (
                    <div key={typeof m.id === 'object' ? JSON.stringify(m.id) : m.id} className="stat-card" style={{ padding: '1.25rem', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                      {m.status === 'Running' && (
                        <div className="learning-dot active" style={{ position: 'absolute', top: '15px', right: '15px' }}></div>
                      )}
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '4px' }}>{typeof m.name === 'object' ? JSON.stringify(m.name) : m.name}</div>
                        <span className={`badge ${m.status === 'Running' ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.6rem' }}>{typeof m.status === 'object' ? JSON.stringify(m.status) : m.status}</span>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                          <span>Loom Health</span>
                          <span>{typeof m.health === 'object' ? JSON.stringify(m.health) : m.health}%</span>
                        </div>
                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
                          <div style={{ height: '100%', width: `${typeof m.health === 'object' ? JSON.stringify(m.health) : m.health}%`, background: m.health > 70 ? 'var(--accent)' : 'var(--danger)', borderRadius: '3px', boxShadow: `0 0 10px ${m.health > 70 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}` }}></div>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                          <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Temp</div>
                          <div style={{ fontSize: '0.85rem', fontWeight: '800', color: m.temp > 80 && m.name.includes('Loom') ? 'var(--danger)' : 'white' }}>{typeof m.temp === 'object' ? JSON.stringify(m.temp) : m.temp}°C</div>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
                          <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>RPM/Spd</div>
                          <div style={{ fontSize: '0.85rem', fontWeight: '800' }}>{typeof m.rpm === 'object' ? JSON.stringify(m.rpm) : m.rpm}</div>
                        </div>
                      </div>

                      <div style={{ marginTop: '0.75rem', fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '5px', opacity: 0.6 }}>
                        <Activity size={10} /> Vibration: <span style={{ color: m.vibration === 'High' ? 'var(--danger)' : 'var(--accent)' }}>{typeof m.vibration === 'object' ? JSON.stringify(m.vibration) : m.vibration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* HACKATHON WINNER: Computer Vision Mockup */}
              <div className="stat-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(rgba(139, 92, 246, 0.15), transparent)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 className="section-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px', color: '#a78bfa' }}>
                    <Video size={22} /> Live Computer Vision Defect Detection
                  </h3>
                  <span className="badge" style={{ background: '#8b5cf6', color: 'white' }}>MODEL: YOLOv8 (EDGE)</span>
                </div>
                <div style={{
                  width: '100%', height: '220px', background: '#000', borderRadius: '12px', position: 'relative', overflow: 'hidden',
                  backgroundImage: 'url("https://www.fibre2fashion.com/news/images/270/shutterstock_1854497641_289356.jpg")',
                  backgroundSize: 'cover', backgroundPosition: 'center', border: '2px solid #1e293b'
                }}>
                  {/* Simulated Scanner Line */}
                  <div style={{ position: 'absolute', top: 0, left: '30%', width: '4px', height: '100%', background: 'rgba(139, 92, 246, 0.7)', boxShadow: '0 0 15px #8b5cf6', animation: 'scan 3s infinite linear' }}></div>
                  {/* Simulated Defect Box */}
                  <div style={{ position: 'absolute', top: '40%', left: '45%', border: '2px solid #f43f5e', width: '50px', height: '50px', backgroundColor: 'rgba(244, 63, 94, 0.2)' }}>
                    <div style={{ background: '#f43f5e', color: 'white', fontSize: '0.6rem', padding: '2px 4px', fontWeight: 'bold', position: 'absolute', top: '-18px', left: '-2px', whiteSpace: 'nowrap' }}>
                      1.2mm Yarn Breakage (97%)
                    </div>
                  </div>
                  {/* Recording indicator */}
                  <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(0,0,0,0.5)', padding: '4px 8px', borderRadius: '4px' }}>
                    <div style={{ width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></div>
                    <span style={{ fontSize: '0.7rem', color: 'white', fontWeight: 'bold' }}>LIVE FEED - Loom 4</span>
                  </div>
                </div>
                <style>{`
                    @keyframes scan { 0% { left: 10%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { left: 90%; opacity: 0; } }
                    @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
                  `}</style>
              </div>

              {renderAgentGrid(['Operations', 'Quality Control', 'Labor & HR'], 'Production & Operations AI')}
            </>
          )
        }

        {
          activeTab === 'maintenance' && (
            <div className="maintenance-panel animate-fade-in">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-header"><span className="stat-label">Next Service In</span><Activity size={20} color="var(--primary)" /></div>
                  <div className="stat-value">{typeof downtimePrediction.daysToNextService === 'object' ? JSON.stringify(downtimePrediction.daysToNextService) : downtimePrediction.daysToNextService || '15'} Days</div>
                  <div className="stat-label">Failure Risk: <span style={{ color: downtimePrediction.failureRisk === 'CRITICAL' ? 'var(--danger)' : 'var(--accent)' }}>{typeof downtimePrediction.failureRisk === 'object' ? JSON.stringify(downtimePrediction.failureRisk) : downtimePrediction.failureRisk || 'Low'}</span></div>
                  <div style={{ marginTop: '1rem', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--primary)' }}>
                    <BrainCircuit size={14} /> Powered by LSTM Time-Series Algortihm
                  </div>
                </div>
                <div className="stat-card" style={{ border: downtimePrediction.failureRisk === 'CRITICAL' ? '1px solid var(--danger)' : 'none' }}>
                  <div className="stat-header"><span className="stat-label">Downtime Loss Risk</span><Zap size={20} color="var(--danger)" /></div>
                  <div className="stat-value">{typeof downtimePrediction.potentialLoss === 'object' ? JSON.stringify(downtimePrediction.potentialLoss) : downtimePrediction.potentialLoss || '₹0'}</div>
                  <div className="stat-label">Projected Revenue Impact/Day</div>
                  <button
                    className="btn-primary"
                    style={{ width: '100%', marginTop: '1rem', background: downtimePrediction.failureRisk === 'CRITICAL' ? 'var(--danger)' : 'rgba(255,255,255,0.05)', fontSize: '0.75rem', padding: '0.5rem', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '4px' }}
                    onClick={() => {
                      alert('Maintenance Team Dispatched! Risk levels resetting...');
                      setDowntimePrediction(prev => ({ ...prev, failureRisk: 'Low', daysToNextService: '30+', potentialLoss: '₹0' }));
                    }}
                  >
                    Dispatch Maintenance Team
                  </button>
                </div>
                <div className="stat-card">
                  <div className="stat-header"><span className="stat-label">System Health</span><ShieldCheck size={20} color="var(--accent)" /></div>
                  <div className="stat-value">{typeof maintenanceScore === 'object' ? JSON.stringify(maintenanceScore) : maintenanceScore}%</div>
                  <div className="stat-label">Overall Plant Condition</div>
                </div>
              </div>

              <div className="chart-container" style={{ marginTop: '1.5rem' }}>
                <h3 className="section-title">AI Maintenance Recommendations</h3>
                <div className="recommendations-list">
                  {recommendations.length > 0 ? recommendations.map((rec, i) => (
                    <div key={i} className="alert alert-info" style={{ marginBottom: '1rem', borderLeft: '4px solid var(--primary)' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <Settings size={18} style={{ marginTop: '2px' }} />
                        <div>
                          <div style={{ fontWeight: '700', marginBottom: '4px' }}>Recommendation #{i + 1}</div>
                          <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{rec}</div>
                        </div>
                      </div>
                    </div>
                  )) : (
                    <p style={{ opacity: 0.6 }}>Running deep diagnostics... No immediate actions required.</p>
                  )}
                </div>
              </div>

              {/* RESTORED: Acoustic Bearing & Lube-Pulse */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                <div className="stat-card" style={{ background: 'linear-gradient(90deg, rgba(236, 72, 153, 0.05) 0%, transparent 100%)', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1, paddingRight: '20px' }}>
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ec4899', margin: '0 0 10px 0' }}><Mic size={20} /> Acoustic Bearing AI Failure Detector</h3>
                      <p style={{ opacity: 0.8, fontSize: '0.9rem', margin: 0 }}>Uses floor microphones to analyze motor "hum" frequencies. Detects microscopic bearing wear and pits by identifying 4kHz ultrasonic resonance signatures.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div style={{ height: '40px', width: '60px', borderBottom: '1px solid #ec4899', display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
                        {[40, 60, 30, 80, 50, 90, 40, 60, 100, 30].map((h, i) => (
                          <div key={i} style={{ width: '4px', height: `${h}%`, background: h > 70 ? '#f43f5e' : '#ec4899', opacity: 0.8 }}></div>
                        ))}
                      </div>
                      <button className="btn-primary" style={{ background: '#ec4899', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap' }}>Listen for Bearing Wear</button>
                    </div>
                  </div>
                </div>

                <div className="stat-card" style={{ background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.05) 0%, transparent 100%)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', margin: '0 0 10px 0' }}><Droplet size={20} /> AI 'Swayam-Siddha' (Self-Healing) Lube-Pulse</h3>
                      <p style={{ opacity: 0.8, fontSize: '0.9rem', margin: 0 }}>Analyzes molecular friction heat. Delivers micro-precision lubrication pulses exactly when metal stress peaks, extending machine life by 400%.</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: '#cbd5e1', fontWeight: 'bold', letterSpacing: '1px' }}>FRICTION REDUCED</span>
                      <span style={{ fontSize: '1.8rem', fontWeight: '900', color: '#10b981' }}>-82%</span>
                    </div>
                  </div>
                  <button className="btn-primary" style={{ width: '100%', background: '#10b981', color: 'black', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Execute Maintenance Micro-Pulse</button>
                </div>
              </div>

              {renderAgentGrid(['Predictive Maintenance'], 'Predictive Diagnostics AI')}
            </div>
          )
        }



        {
          activeTab === 'textile' && (
            <div className="textile-panel animate-fade-in">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-header"><span className="stat-label">Production Flow</span><Cpu size={20} color="var(--primary)" /></div>
                  <div className="stat-value">{typeof textileFlow.rejectionRate === 'object' ? JSON.stringify(textileFlow.rejectionRate) : textileFlow.rejectionRate || '0'}%</div>
                  <div className="stat-label">Rejection Rate (Grey to Finished)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #0ea5e9', background: 'linear-gradient(rgba(14, 165, 233, 0.05), transparent)' }}>
                  <div className="stat-header"><span className="stat-label">AI ZLD Water Monitor</span><Droplets size={20} color="#0ea5e9" /></div>
                  <div className="stat-value" style={{ color: '#0ea5e9' }}>94% Reused</div>
                  <div className="stat-label">pH imbalance in Dye Tank 2</div>
                  <button
                    className="btn-primary"
                    style={{ width: '100%', marginTop: '1rem', background: '#0ea5e9', fontSize: '0.75rem', padding: '0.5rem', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}
                    onClick={() => alert('Chemical Dosing Adjusted via IoT! ZLD (Zero Liquid Discharge) Compliance Restored.')}
                  >
                    <Wind size={14} style={{ display: 'inline', marginRight: '4px' }} /> Auto-Adjust Dosing
                  </button>
                </div>
                <div className="stat-card">
                  <div className="stat-header"><span className="stat-label">Labor skill index</span><Users size={20} color="var(--primary)" /></div>
                  <div className="stat-value">{typeof laborSkill.overallScore === 'object' ? JSON.stringify(laborSkill.overallScore) : laborSkill.overallScore || '78'}/100</div>
                  <div className="stat-label">Bhilwara Cluster Avg: 72</div>
                </div>
              </div>

              {/* FEATURE: Grey to Finished Fabric Tracking */}
              <div className="stat-card" style={{ marginTop: '1.5rem', padding: '2rem' }}>
                <h3 className="section-title">Grey Fabric to Finished Fabric Flow</h3>
                {/* AI Learning Mode / Simulation Banner */}
                {isAiLearningMode && (
                  <div style={{
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    background: 'linear-gradient(90deg, rgba(14, 165, 233, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)',
                    border: '1px solid rgba(14, 165, 233, 0.3)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    animation: 'pulse-glow 2s infinite'
                  }}>
                    <BrainCircuit size={20} color="#0ea5e9" />
                    <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0ea5e9' }}>
                      AI LEARNING MODE ACTIVE:
                    </span>
                    <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                      Simulator is modeling "What-If" scenarios based on current production data. Insights are projected.
                    </span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <div style={{ textAlign: 'center', zIndex: 1 }}>
                    <div style={{ width: '60px', height: '60px', background: 'rgba(99, 102, 241, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}><Layers size={24} color="var(--primary)" /></div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>Grey</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{typeof textileFlow.greyProduced === 'object' ? JSON.stringify(textileFlow.greyProduced) : textileFlow.greyProduced || 0}m</div>
                  </div>
                  <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', margin: '0 10px', marginTop: '-30px', position: 'relative' }}>
                    <div style={{ width: '100%', height: '100%', background: 'var(--primary)', opacity: 0.3 }}></div>
                  </div>
                  <div style={{ textAlign: 'center', zIndex: 1 }}>
                    <div style={{ width: '60px', height: '60px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}><Droplets size={24} color="var(--accent)" /></div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>Dyed</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{typeof textileFlow.dyedCompleted === 'object' ? JSON.stringify(textileFlow.dyedCompleted) : textileFlow.dyedCompleted || 0}m</div>
                  </div>
                  <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', margin: '0 10px', marginTop: '-30px', position: 'relative' }}>
                    <div style={{ width: '100%', height: '100%', background: 'var(--accent)', opacity: 0.3 }}></div>
                  </div>
                  <div style={{ textAlign: 'center', zIndex: 1 }}>
                    <div style={{ width: '60px', height: '60px', background: 'rgba(139, 92, 246, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}><CheckCircle size={24} color="#8b5cf6" /></div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>Finished</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{typeof textileFlow.finishedCompleted === 'object' ? JSON.stringify(textileFlow.finishedCompleted) : textileFlow.finishedCompleted || 0}m</div>
                  </div>
                </div>
                <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h4 style={{ margin: 0, color: 'var(--accent)' }}>Workflow Optimization Engine</h4>
                      <span style={{ fontSize: '0.7rem', padding: '4px 8px', background: 'rgba(14, 165, 233, 0.2)', border: '1px solid #0ea5e9', borderRadius: '4px', color: '#0ea5e9', display: 'flex', alignItems: 'center', gap: '4px' }}><BrainCircuit size={12} /> XGBoost Classifier</span>
                    </div>
                    <span className="badge" style={{ background: 'var(--accent)', color: '#000' }}>+{typeof workflowOpt.projectedEfficiencyGain === 'object' ? JSON.stringify(workflowOpt.projectedEfficiencyGain) : workflowOpt.projectedEfficiencyGain || '0%'} GAIN</span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <BrainCircuit size={20} color="var(--accent)" style={{ marginTop: '2px' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '4px' }}>Bottleneck Detected: {typeof workflowOpt.bottleneck === 'object' ? JSON.stringify(workflowOpt.bottleneck) : workflowOpt.bottleneck || 'None'}</div>
                      <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>{typeof workflowOpt.recommendedAction === 'object' ? JSON.stringify(workflowOpt.recommendedAction) : workflowOpt.recommendedAction || 'All systems are operating at peak efficiency.'}</div>

                      {workflowOpt.bottleneck && workflowOpt.bottleneck !== 'None' && (
                        <button
                          style={{ marginTop: '1rem', background: 'var(--accent)', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}
                          onClick={() => {
                            alert('Resource reallocation executed! Synchronizing production speeds...');
                            setWorkflowOpt(prev => ({ ...prev, bottleneck: 'Resolved', recommendedAction: 'Flow synchronized successfully.', projectedEfficiencyGain: 'Optimized' }));
                          }}
                        >
                          Execute Reassignment
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)', borderRadius: '12px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Zap size={16} color="var(--danger)" />
                  <span><strong>AI Flow Analytics:</strong> {typeof textileFlow.bottleneck === 'object' ? JSON.stringify(textileFlow.bottleneck) : textileFlow.bottleneck || 'Analyzing production steps for bottlenecks...'}</span>
                </div>
              </div>

              {/* RESTORED: AI Mending Copilot */}
              <div className="stat-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(90deg, rgba(234, 179, 8, 0.05) 0%, transparent 100%)', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1, paddingRight: '20px' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#eab308', margin: '0 0 10px 0' }}><CheckCircle size={20} /> AI Mending (Quality Repair) Copilot</h3>
                    <p style={{ opacity: 0.8, fontSize: '0.9rem', margin: 0 }}>Bridges Loom Computer Vision data directly to manual mending workers. Instead of checking an entire 100m roll manually, the AI points the worker exactly to the defect locations.</p>
                  </div>
                  <button className="btn-primary" style={{ background: '#eab308', color: 'black', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Wind size={18} /> Alert Mending Team
                  </button>
                </div>
              </div>

              {/* SECTION: Yarn Count */}
              <div className="stat-card" style={{ marginTop: '1.5rem', background: 'rgba(99, 102, 241, 0.05)' }}>
                <h3 className="section-title">Yarn Count & Fabric Mix Optimization</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Suggested Count</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800' }}>{typeof yarnOpt.suggestedCount === 'object' ? JSON.stringify(yarnOpt.suggestedCount) : yarnOpt.suggestedCount || '30s Cotton'}</div>
                  </div>
                  <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Cost Saving per kg</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent)' }}>₹{typeof yarnOpt.costSavingPerKg === 'object' ? JSON.stringify(yarnOpt.costSavingPerKg) : yarnOpt.costSavingPerKg || '12.5'}</div>
                  </div>
                  <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Blend Quality Factor</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800' }}>{typeof yarnOpt.qualityFactor === 'object' ? JSON.stringify(yarnOpt.qualityFactor) : yarnOpt.qualityFactor || 'Exquisite'}</div>
                  </div>
                </div>
              </div>

              {/* RESTORED: GSM Auto-Corrector */}
              <div className="stat-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(90deg, rgba(236, 72, 153, 0.05) 0%, transparent 100%)', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1, paddingRight: '20px' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ec4899', margin: '0 0 10px 0' }}><Activity size={20} /> Real-Time GSM (Fabric Weight) Auto-Corrector</h3>
                    <p style={{ opacity: 0.8, fontSize: '0.9rem', margin: 0 }}>Bhilwara's main cause of buyer rejection is uneven GSM. AI monitors yarn tension and automatically adjusts the take-up roller speed to keep GSM perfectly flat at 170g.</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.8rem', color: '#f472b6', fontWeight: 'bold' }}>GSM:</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white' }}>170<span style={{ fontSize: '1rem', color: '#94a3b8' }}>g</span></div>
                    </div>
                    <button className="btn-primary" style={{ background: '#ec4899', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Settings size={18} /> Auto-Calibrate
                    </button>
                  </div>
                </div>
              </div>

              {/* RESTORED: Chindi Matchmaker */}
              <div className="stat-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.05) 0%, transparent 100%)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div style={{ flex: 1, paddingRight: '20px' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', margin: '0 0 10px 0' }}><Recycle size={20} /> AI 'Chindi' (Textile Waste) Matchmaker</h3>
                    <p style={{ opacity: 0.8, fontSize: '0.9rem', margin: 0 }}>Stop sending fabric waste to the landfill. Our AI tracks your current "Chindi" volume and instantly matches you with local Bhilwara recyclers buying at the best per-kg rate.</p>
                  </div>
                  <span className="badge" style={{ background: '#10b981', color: 'black', fontWeight: '900' }}>CIRCULAR ECONOMY</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '20px', alignItems: 'center' }}>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '5px' }}>Current Scrap Volume</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: '900', color: 'white' }}>420 kg</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '5px' }}>Market Rate (Bhilwara)</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#10b981' }}>₹12 / kg</div>
                  </div>
                  <button className="btn-primary" style={{ background: '#10b981', color: 'black', border: 'none', padding: '15px 30px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', height: '100%' }}>
                    Sell Scrap Locally
                  </button>
                </div>
              </div>

              {/* RESTORED: Textile Operations Premium Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                <div className="stat-card" style={{ background: 'linear-gradient(90deg, #0b1e2a 0%, transparent 100%)', border: '1px solid #0ea5e9', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: '0 0 5px 0', color: '#0ea5e9', display: 'flex', alignItems: 'center', gap: '8px' }}><Droplets size={20} /> ZLD (Zero Liquid Discharge) Water Optimizer</h3>
                      <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>Optimizes chemical dosing in the recycling plant based on dye-waste turbidity. Maximizes water recovery in Bhilwara's water-scarce environment.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', textAlign: 'right' }}>
                      <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0ea5e9' }}>88.4%</div>
                        <div style={{ fontSize: '0.65rem', opacity: 0.6, letterSpacing: '1px' }}>RECOVERY RATE</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#10b981' }}>₹8.2k</div>
                        <div style={{ fontSize: '0.65rem', opacity: 0.6, letterSpacing: '1px' }}>SLUDGE SAVING</div>
                      </div>
                    </div>
                  </div>
                  <button className="btn-primary" style={{ background: '#0ea5e9', border: 'none', color: 'black', fontWeight: 'bold', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}><RefreshCcw size={16} style={{ display: 'inline', marginRight: '8px' }} /> Optimize Water Dosing</button>
                </div>

                <div className="stat-card" style={{ background: 'linear-gradient(90deg, #1f1406 0%, transparent 100%)', border: '1px solid #f97316', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: '0 0 5px 0', color: '#f97316', display: 'flex', alignItems: 'center', gap: '8px' }}><Fingerprint size={20} /> Micro-Texture 'Fabric Fingerprint'</h3>
                      <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>Uses Deep-CV to map the unique microscopic weave of every Bhilwara roll. Generates a blockchain-ready authenticity certificate to prevent counterfeits.</p>
                    </div>
                    <div style={{ background: 'rgba(249, 115, 22, 0.1)', padding: '8px 16px', borderRadius: '8px', textAlign: 'center', border: '1px solid #f97316' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: '900', color: '#f97316', letterSpacing: '1px' }}>GENUINE</div>
                      <div style={{ fontSize: '0.6rem', opacity: 0.7 }}>Roll #BH902-X</div>
                    </div>
                  </div>
                  <button className="btn-primary" style={{ background: '#f97316', border: 'none', color: 'white', fontWeight: 'bold', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>Authenticate Roll Texture</button>
                </div>

                <div className="stat-card" style={{ background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.1) 0%, transparent 100%)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1, paddingRight: '20px' }}>
                      <h3 style={{ margin: '0 0 5px 0', color: '#10b981', display: 'flex', alignItems: 'center', gap: '8px' }}><MessageSquare size={20} /> Mewari-Dialect 'Anuvad' Voice-to-Log</h3>
                      <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>Captures local weaver slang and translates it into formal ISO-compliant audit logs. Bridges the communication gap for export-quality documentation.</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontStyle: 'italic', color: '#10b981', fontSize: '0.9rem' }}>"Loom me hichki hai"</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', color: '#60a5fa' }}><ArrowRight size={12} /> Periodic oscillation in motor drive detected.</div>
                    </div>
                  </div>
                  <button className="btn-primary" style={{ background: '#10b981', border: 'none', color: 'black', fontWeight: 'bold', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}><Mic size={16} style={{ display: 'inline', marginRight: '8px' }} /> Listen to Karigar Slang</button>
                </div>

                <div className="stat-card" style={{ background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.1) 0%, transparent 100%)', border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: '0 0 5px 0', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px' }}><Wand2 size={20} /> 'Virasat' (Heritage) Pattern GenAI</h3>
                      <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>Infuses traditional Bandhani/Phad mathematical logic into modern export-grade weave patterns. Creates a "Bhilwara-Exclusive" premium product line.</p>
                    </div>
                    <div style={{ width: '40px', height: '40px', background: 'radial-gradient(circle, #ef4444 2px, transparent 2px)', backgroundSize: '8px 8px', opacity: 0.5, borderRadius: '4px' }}></div>
                  </div>
                  <button className="btn-primary" style={{ background: '#ef4444', border: 'none', color: 'white', fontWeight: 'bold', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>Generate Heritage Weave</button>
                </div>
              </div>

              {renderAgentGrid(['Supply Chain', 'Sustainability'], 'Supply Chain & Sustainability AI')}
            </div>
          )
        }





        {
          activeTab === 'finance' && (
            <div className="finance-panel animate-fade-in">
              <div className="stats-grid">
                <div className="stat-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(30, 41, 59, 0) 100%)' }}>
                  <div className="stat-header"><span className="stat-label">Real-Time Profit Margin</span><DollarSign size={20} color="var(--accent)" /></div>
                  <div className="stat-value">₹{typeof profit.monthlyProfit === 'object' ? JSON.stringify(profit.monthlyProfit) : profit.monthlyProfit || '0'} Cr</div>
                  <div className="stat-label">Projection (Next 30D)</div>
                </div>
                <div className="stat-card">
                  <div className="stat-header"><span className="stat-label">Credit & Payment Risk</span><ShieldCheck size={20} color="var(--accent)" /></div>
                  <div className="stat-value">{typeof creditRisk.riskScore === 'object' ? JSON.stringify(creditRisk.riskScore) : creditRisk.riskScore || 'Low'}</div>
                  <div className="stat-label">Status: {typeof creditRisk.status === 'object' ? JSON.stringify(creditRisk.status) : creditRisk.status || 'Excellent'}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-header"><span className="stat-label">Cost Optimization</span><Cpu size={20} color="var(--primary)" /></div>
                  <div className="stat-value">₹{typeof costOptimization.totalSavings === 'object' ? JSON.stringify(costOptimization.totalSavings) : costOptimization.totalSavings || '1.2'}L</div>
                  <div className="stat-label">Potential Monthly Savings</div>
                </div>
                <div className="stat-card">
                  <div className="stat-header"><span className="stat-label">Cost per Meter</span><Activity size={20} color="var(--primary)" /></div>
                  <div className="stat-value">{typeof profit.costPerMeter === 'object' ? JSON.stringify(profit.costPerMeter) : profit.costPerMeter || '₹8.50'}</div>
                  <div className="stat-label">Textile Cluster Benchmark</div>
                </div>
              </div>

              {/* RESTORED: Finance Arbitrage Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
                <div className="stat-card" style={{ background: 'linear-gradient(180deg, #0f172a 0%, #172554 100%)', border: '1px solid #3b82f6', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ margin: 0, color: '#93c5fd', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Globe size={16} /> Global Price Arbitrage</h4>
                    <span style={{ fontSize: '0.6rem', color: '#60a5fa', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>London/Bursa/China</span>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#3b82f6', marginBottom: '8px' }}>Arbitrage Gap: +₹14.2/m</div>
                    <p style={{ fontSize: '0.8rem', opacity: 0.8, margin: 0, lineHeight: 1.4 }}>Detected price-drop in Turkish cotton yarn. Buy window open for next 3 hours.</p>
                  </div>
                  <div style={{ marginTop: 'auto' }}>
                    <button className="btn-primary" style={{ width: '100%', background: '#3b82f6', border: 'none', color: 'white', fontWeight: 'bold', padding: '10px', borderRadius: '8px', cursor: 'pointer' }} onClick={async () => { try { const res = await fetch('http://localhost:3001/owner/arbitrage', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ commodity: 'cotton', market: 'Bursa', volume: 500 }) }); const data = await res.json(); alert(data.message || 'Arbitrage locked successfully.'); } catch (err) { alert('Error: Could not reach the owner server at http://localhost:3001/owner/arbitrage. Please ensure the backend is running.'); } }}>Lock Arbitrage Window</button>
                  </div>
                </div>

                <div className="stat-card" style={{ background: 'linear-gradient(180deg, #0f172a 0%, #064e3b 100%)', border: '1px solid #10b981', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, color: '#6ee7b7', fontSize: '1rem' }}>AI Cash-Crunch Predictor</h4>
                    <Landmark size={18} color="#10b981" />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#10b981', marginBottom: '8px' }}>Deficit Risk: 14 Days</div>
                    <p style={{ fontSize: '0.8rem', opacity: 0.8, margin: 0, lineHeight: 1.4 }}>₹12 Lakh locked in unpaid invoices. Recommending immediate factoring.</p>
                  </div>
                  <div style={{ marginTop: 'auto' }}>
                    <button className="btn-primary" style={{ width: '100%', background: '#10b981', border: 'none', color: 'black', fontWeight: 'bold', padding: '10px', borderRadius: '8px', cursor: 'pointer' }} onClick={async () => { try { const res = await fetch('http://localhost:3001/owner/cash-crunch', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ totalUnpaid: 1200000, deficitDays: 14 }) }); const data = await res.json(); alert(data.message || 'Invoice factoring initiated successfully.'); } catch (err) { alert('Error: Could not reach the owner server at http://localhost:3001/owner/cash-crunch. Please ensure the backend is running.'); } }}><RefreshCcw size={14} style={{ display: 'inline', marginRight: '6px' }} /> Auto-Factor Unpaid Invoices</button>
                  </div>
                </div>

                <div className="stat-card" style={{ background: 'linear-gradient(180deg, #0f172a 0%, #312e81 100%)', border: '1px solid #6366f1', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ margin: 0, color: '#a5b4fc', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><BookOpen size={16} /> AI 'Bahi-Khata' Scanner</h4>
                    <span style={{ fontSize: '0.6rem', color: '#818cf8', fontWeight: 'bold', letterSpacing: '1px', background: 'rgba(99,102,241,0.2)', padding: '2px 6px', borderRadius: '4px' }}>LEGACY SYNC</span>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#6366f1', marginBottom: '8px' }}>Digital Conversion Ready</div>
                    <p style={{ fontSize: '0.8rem', opacity: 0.8, margin: 0, lineHeight: 1.4 }}>Detected handwritten Marwari/Hindi ledger entries in red 'Bahi-Khata'. Extraction is pending.</p>
                  </div>
                  <div style={{ marginTop: 'auto' }}>
                    <button className="btn-primary" style={{ width: '100%', background: 'transparent', border: '1px solid #6366f1', color: '#a5b4fc', fontWeight: 'bold', padding: '10px', borderRadius: '8px', cursor: 'pointer' }} onClick={async () => { try { const res = await fetch('http://localhost:3001/owner/ledger-scan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ledgerType: 'Bahi-Khata', language: 'Marwari/Hindi' }) }); const data = await res.json(); alert(data.message || 'Ledger scanned and synced successfully.'); } catch (err) { alert('Error: Could not reach the owner server at http://localhost:3001/owner/ledger-scan. Please ensure the backend is running.'); } }}><FileScan size={14} style={{ display: 'inline', marginRight: '6px' }} /> Scan & Sync Traditional Ledger</button>
                  </div>
                </div>

                <div className="stat-card" style={{ background: 'linear-gradient(180deg, #0f172a 0%, #422006 100%)', border: '1px solid #eab308', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ margin: 0, color: '#fde047', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Award size={16} /> AI 'Mahajan' Trust-Score</h4>
                    <span style={{ fontSize: '0.6rem', color: '#eab308', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>Cluster Reputation</span>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#eab308', marginBottom: '8px' }}>A+ (Trust Index: 94)</div>
                    <p style={{ fontSize: '0.8rem', opacity: 0.8, margin: 0, lineHeight: 1.4 }}>Peer-verified reputation for payment punctuality & quality consistency in Bhilwara.</p>
                  </div>
                  <div style={{ marginTop: 'auto' }}>
                    <button className="btn-primary" style={{ width: '100%', background: '#eab308', border: 'none', color: 'black', fontWeight: 'bold', padding: '10px', borderRadius: '8px', cursor: 'pointer' }} onClick={async () => { try { const res = await fetch('http://localhost:3001/owner/trust-score', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ score: 'A+', trustIndex: 94, suppliers: 15 }) }); const data = await res.json(); alert(data.message || 'Trust-Score shared successfully.'); } catch (err) { alert('Error: Could not reach the owner server at http://localhost:3001/owner/trust-score. Please ensure the backend is running.'); } }}>Share Trust-Score with Suppliers</button>
                  </div>
                </div>
              </div>

              <div className="charts-grid" style={{ marginTop: '1.5rem' }}>
                <div className="stat-card">
                  <h3 className="section-title">Payment Cycle & Credit Risk Tracker</h3>
                  <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Avg. Payment Collection Period</span>
                      <span style={{ fontWeight: '700' }}>{typeof creditRisk.avgCollectionDays === 'object' ? JSON.stringify(creditRisk.avgCollectionDays) : creditRisk.avgCollectionDays || '28'} Days</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>ECGC Export Insurance</span>
                      <span style={{ color: 'var(--accent)', fontWeight: '700' }}>COVERED (Grade A)</span>
                    </div>
                    <div style={{ marginTop: '1rem', padding: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--accent)' }}>
                      High-trust buyer network detected in current pipeline.
                    </div>
                  </div>
                </div>

                <div className="chart-container">
                  <h3 className="section-title">Cost Breakdown & Optimization Target</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={costBreakdown.length > 0 ? costBreakdown : [
                      { name: 'Labor', target: 80, actual: 70 },
                      { name: 'Yarn', target: 90, actual: 85 },
                      { name: 'Power', target: 60, actual: 40 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip contentStyle={{ background: '#1e293b', border: 'none' }} />
                      <Bar dataKey="actual" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="target" fill="rgba(255,255,255,0.1)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              {renderAgentGrid(['Finance'], 'Finance & Sector Analytics AI')}
            </div>
          )
        }

        {
          activeTab === 'strategy' && (
            <div className="strategy-panel animate-fade-in">
              <div className="stats-grid">
                <div className="stat-card" style={{ border: '1px solid var(--accent)', background: 'rgba(16, 185, 129, 0.05)' }}>
                  <div className="stat-header"><span className="stat-label">MSME Growth Score</span><TrendingUp size={20} color="var(--accent)" /></div>
                  <div className="stat-value">{typeof digitalMaturity === 'object' ? JSON.stringify(digitalMaturity) : digitalMaturity || 0}/100</div>
                  <div className="stat-label">Digital Transformation Index</div>
                </div>
                <div className="stat-card">
                  <div className="stat-header"><span className="stat-label">Cluster Rank</span><Award size={20} color="var(--primary)" /></div>
                  <div className="stat-value">TOP 15%</div>
                  <div className="stat-label">Bhilwara Textile Cluster</div>
                </div>
                <div className="stat-card">
                  <div className="stat-header"><span className="stat-label">Subsidy Status</span><Building2 size={20} color="var(--accent)" /></div>
                  <div className="stat-value">{typeof govSchemes.tufsStatus === 'object' ? JSON.stringify(govSchemes.tufsStatus) : govSchemes.tufsStatus || 'Eligible'}</div>
                  <div className="stat-label">TUFS / RIPS Potential</div>
                </div>
              </div>

              <div className="charts-grid" style={{ marginTop: '1.5rem' }}>
                <div className="stat-card">
                  <h3 className="section-title">Eligible MSME Schemes</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {govSchemes.eligibleSchemes && govSchemes.eligibleSchemes.length > 0 ? govSchemes.eligibleSchemes.map((s, i) => (
                      <div key={i} style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderLeft: '3px solid var(--accent)', borderRadius: '8px', fontSize: '0.9rem' }}>
                        <strong>{s}</strong>
                      </div>
                    )) : (
                      <div style={{ opacity: 0.6 }}>No specific schemes detected for current investment profile.</div>
                    )}
                  </div>
                </div>

                <div className="stat-card">
                  <h3 className="section-title">Strategic ROI Insights</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px' }}>
                      <p style={{ fontWeight: '700', marginBottom: '5px' }}>Solar Transition ROI</p>
                      <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Current solar at {typeof solar.solarPercentage === 'object' ? JSON.stringify(solar.solarPercentage) : solar.solarPercentage || 0}%. Increasing to 40% will save ₹85,000/month in power costs.</p>
                    </div>
                    <div style={{ padding: '1rem', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '12px' }}>
                      <p style={{ fontWeight: '700', marginBottom: '5px' }}>Labor Skill Impact</p>
                      <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Workers are {typeof laborSkill.overallScore === 'object' ? JSON.stringify(laborSkill.overallScore) : laborSkill.overallScore || 0}% proficient. 10 hours of extra training will boost PEI by 4%.</p>
                    </div>
                  </div>
                </div>
              </div>
              {renderAgentGrid(['Core Systems', 'Finance'], 'Strategic Intelligence AI')}
            </div>
          )
        }

        {
          activeTab === 'agents' && (
            <div className="agents-panel animate-fade-in" style={{ paddingBottom: '2rem' }}>
              <div className="stat-card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.1) 0%, transparent 100%)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ padding: '12px', background: 'var(--primary)', borderRadius: '12px' }}>
                    <Bot size={32} color="#fff" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', margin: 0 }}>SmartFactory AI: The Power of 52</h2>
                    <p style={{ opacity: 0.6, margin: 0, marginTop: '4px' }}>Browse the complete directory of 52 specialized autonomous agents powering the Nirvana factory.</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {agentsData.map(agent => (
                  <div key={typeof agent.id === 'object' ? JSON.stringify(agent.id) : agent.id} style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    padding: '16px',
                    transition: 'all 0.2s',
                    cursor: 'default'
                  }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)'; e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{typeof agent.category === 'object' ? JSON.stringify(agent.category) : agent.category}</span>
                      {agent.status === 'Active' ? <span style={{ color: 'var(--accent)', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 1.5s infinite' }}></div> Active</span> : <span style={{ color: 'var(--warning)', fontSize: '0.7rem' }}>Learning Mode</span>}
                    </div>
                    <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '8px', lineHeight: 1.3 }}>{typeof agent.id === 'object' ? JSON.stringify(agent.id) : agent.id}. {typeof agent.name === 'object' ? JSON.stringify(agent.name) : agent.name}</div>

                    {agent.risk !== 'Low' && agent.risk !== 'N/A' && (
                      <div style={{ fontSize: '0.75rem', color: agent.risk.includes('Critical') ? 'var(--danger)' : 'var(--warning)' }}>
                        Alert Policy: <strong>{typeof agent.risk === 'object' ? JSON.stringify(agent.risk) : agent.risk}</strong>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        }

        {
          activeTab === 'gov' && (
            <div className="gov-panel animate-fade-in">
              <div className="stat-card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(90deg, #1e293b 0%, #0f172a 100%)', border: '1px solid #0ea5e9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ padding: '12px', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '12px' }}>
                    <Building2 size={32} color="#0ea5e9" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Bhilwara MSME Gov-Portal</h2>
                    <p style={{ opacity: 0.6, margin: 0 }}>Integrated Hub for Textile Subsidies & Benefits</p>
                  </div>
                </div>
              </div>

              <div className="charts-grid">
                <div className="stat-card">
                  <h3 className="section-title">Active Applications</h3>
                  <div style={{ opacity: 0.6, textAlign: 'center', padding: '2rem' }}>
                    <Database size={48} style={{ marginBottom: '10px' }} />
                    <p style={{ margin: '1rem 0' }}>Connect your Udyam Aadhar to track live applications.</p>
                    <button className="btn-cyan-gradient" style={{ padding: '10px 30px', border: 'none', borderRadius: '8px', color: 'white', fontWeight: '700', cursor: 'pointer', background: '#0ea5e9' }}>LINK TO UDYAM</button>
                  </div>
                </div>
                <div className="stat-card">
                  <h3 className="section-title">Cluster Notifications</h3>
                  <div className="recommendations-list">
                    <div className="alert alert-info" style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '8px', fontSize: '0.85rem' }}>New Rajasthan Energy Policy (2024) released for Textile Clusters.</div>
                    <div className="alert alert-info" style={{ padding: '1rem', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '8px', fontSize: '0.85rem' }}>Deadline for SITP Interest Subvention: Oct 31st.</div>
                  </div>
                </div>
              </div>

              <div className="stat-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(rgba(14, 165, 233, 0.1), transparent)' }}>
                <h3 className="section-title" style={{ color: '#0ea5e9', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Factory size={22} /> Rajasthan MSME Policy Support
                </h3>
                <div className="stats-grid" style={{ marginTop: '2rem' }}>
                  <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                    <div style={{ fontWeight: '800', color: '#0ea5e9' }}>PMEGP Eligibility</div>
                    <div style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>{govSchemes.pmegpEligible ? 'Qualified ✅' : 'Review Needed ⏳'}</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>Subsidy: Up to 35% of project cost.</div>
                  </div>
                  <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                    <div style={{ fontWeight: '800', color: '#0ea5e9' }}>CLCSS (Tech Upgrade)</div>
                    <div style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>High Probability</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>15% capital subsidy for machinery.</div>
                  </div>
                  <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                    <div style={{ fontWeight: '800', color: '#0ea5e9' }}>RIPS 2022 Benefits</div>
                    <div style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>Eligible (Textile Focus)</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>Electricity duty & Land tax exemptions.</div>
                  </div>
                </div>
              </div>

              <div className="stat-card" style={{ marginTop: '1.5rem', background: 'rgba(16, 185, 129, 0.05)' }}>
                <h4 style={{ marginBottom: '1rem' }}>Live Government Insights for Bhilwara</h4>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>AI recommends applying for **M-SME Excellence Awards** based on your current PEI of {typeof pei === 'object' ? JSON.stringify(pei) : pei}% and ZLD compliance status.</p>
                <button className="btn-primary" style={{ marginTop: '1.5rem', background: '#0ea5e9', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Download Compliance Report</button>
              </div>

              {/* HACKATHON WINNER: GenAI Auto-Filler */}
              <div className="stat-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(rgba(236, 72, 153, 0.1), transparent)', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 className="section-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px', color: '#ec4899' }}>
                    <Wand2 size={22} /> GenAI Subsidy Auto-Filler
                  </h3>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Tired of complex government forms? Our Generative AI reads your factory's live data (production, power, employment) and instantly drafts the Rajasthan RIPS 2022 subsidy application.
                </p>
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                  <button
                    className="btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ec4899', color: 'white', fontWeight: 'bold', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                    onClick={() => alert('GenAI is drafting your RIPS 2022 application... Factory data extracted successfully! PDF generated.')}
                  >
                    <Bot size={18} /> GENERATE RIPS APPLICATION
                  </button>
                </div>
              </div>
              {renderAgentGrid(['Finance'], 'MSME Compliance & Growth AI')}
            </div>
          )
        }

      </main >
    </div >
  );
}

