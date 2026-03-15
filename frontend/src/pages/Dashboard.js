import api from "../api";
import React, { useEffect, useState, useRef, memo } from "react";
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
  Box, Network, Mic, Droplet, RefreshCcw, Fingerprint, MessageSquare, ArrowRight, Landmark, BookOpen, FileScan, Sparkles, Recycle, Flame,
  Waves, Clock, Map, Bell, History, X, ClipboardCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { agentsData } from "../data/agentsData";
import FYPOptimizer from "./FYPOptimizer";
import GovAssist from "./GovAssist";

// --- High-Fidelity Styles ---
const industrialStyles = `
  @keyframes scan-vertical {
    0% { top: 0%; opacity: 0; }
    50% { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }
  @keyframes progress-infinite {
    0% { left: -100%; }
    100% { left: 100%; }
  }
  @keyframes pulse-slow {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.05); opacity: 1; }
  }
  .scan-line { animation: progress-infinite 1.5s linear infinite; }
  .pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
  .micro-grid { background-image: radial-gradient(circle, var(--accent) 0.5px, transparent 0.5px); background-size: 15px 15px; }
  
  @keyframes thermal-pulse {
    0%, 100% { background: rgba(244, 63, 94, 0.1); }
    50% { background: rgba(244, 63, 94, 0.3); }
  }
  @keyframes spectral-wave {
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
  }
  @keyframes voice-pulse {
    0% { transform: scaleY(1); }
    50% { transform: scaleY(3); }
    100% { transform: scaleY(1); }
  }
  .thermal-active { animation: thermal-pulse 1s infinite; }
  .spectral-bar { animation: spectral-wave 0.5s infinite ease-in-out; }
  .voice-bar { animation: voice-pulse 0.8s infinite ease-in-out; }
`;

const AgentGrid = React.memo(({ categories, title, focusedAgent, setFocusedAgent }) => {
  return (
    <div className="industrial-panel" style={{ padding: '2rem', marginTop: '3rem', borderTop: '2px solid var(--primary-20)', borderRadius: '1rem' }}>
      <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>
        <Network size={22} /> {title} (From 52 Agent Library)
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginTop: '1.5rem' }}>
        {agentsData.filter(a => categories.includes(a.category)).map(agent => (
          <div key={agent.id} style={{
            background: focusedAgent?.id === agent.id ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.02)',
            border: focusedAgent?.id === agent.id ? '2px solid var(--primary)' : '1px solid rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '16px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
            onClick={() => setFocusedAgent(focusedAgent?.id === agent.id ? null : agent)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{agent.category}</span>
              {agent.status === 'Active' ? <span style={{ color: 'var(--accent)', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 1.5s infinite' }}></div> Active</span> : <span style={{ color: 'var(--warning)', fontSize: '0.7rem' }}>Learning Mode</span>}
            </div>
            <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '8px', lineHeight: 1.3 }}>{agent.id}. {agent.name}</div>

            {agent.risk !== 'Low' && agent.risk !== 'N/A' && (
              <div style={{ fontSize: '0.75rem', color: agent.risk.includes('Critical') ? 'var(--danger)' : 'var(--warning)' }}>
                Alert Policy: <strong>{agent.risk}</strong>
              </div>
            )}

            {focusedAgent?.id === agent.id && (
              <div className="animate-fade-in" style={{ marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '6px', letterSpacing: '1px' }}>AGENT TELEMETRY STREAM</div>
                <div style={{ height: '40px', display: 'flex', alignItems: 'flex-end', gap: '2px', background: 'rgba(0,0,0,0.2)', padding: '4px', borderRadius: '4px' }}>
                  {[...Array(15)].map((_, i) => (
                    <div key={i} style={{ flex: 1, background: 'var(--primary)', height: `${20 + (Math.sin(i + Date.now() / 1000) * 40 + 50)}%`, opacity: 0.3 + (i / 15 * 0.5) }}></div>
                  ))}
                </div>
                <div style={{ marginTop: '10px', fontSize: '0.7rem', color: '#94a3b8', fontStyle: 'italic', lineHeight: '1.4' }}>
                  {
                    agent.category === 'Core Systems' ? ({
                      1: "Master control node balancing 52 sub-agents to prevent system lag.",
                      2: "Central nervous system syncing telemetry between edge looms and cloud.",
                      3: "Calculates global permutations for optimum production schedule.",
                      4: "Global market sync. Adjusts local outputs to real-time demands.",
                      5: "Zero-latency processor for critical machine safety shutdowns.",
                      6: "Translates Hindi/Mewari voice commands into machine code.",
                      7: "Automatically resolves resource conflicts between AI sub-agents."
                    }[agent.id] || "Analyzing core system throughput...") : "Agent actively monitoring cluster performance and optimizing local edge compute."
                  }
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.title === nextProps.title &&
    prevProps.focusedAgent?.id === nextProps.focusedAgent?.id &&
    JSON.stringify(prevProps.categories) === JSON.stringify(nextProps.categories);
});

export default function Dashboard({ defaultTab = 'overview' }) {
  const navigate = useNavigate();
  // --- AI States ---
  const [delay, setDelay] = useState("");
  const [agentMessage, setAgentMessage] = useState("Monitoring... Ready for Owner Command.");
  const [pei, setPei] = useState(82.4);
  const [peiTrend, setPeiTrend] = useState([78, 80, 79, 81, 82, 82.4]);
  const [maintenanceScore, setMaintenanceScore] = useState(91.2);
  const [reliability, setReliability] = useState(94.5);
  const [digitalMaturity, setDigitalMaturity] = useState(72);
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

  // Gov-Portal New States
  const [udyamLinked, setUdyamLinked] = useState(false);
  const [isLinkingUdyam, setIsLinkingUdyam] = useState(false);
  const [govApplications, setGovApplications] = useState([]);
  const [subsidyDraftStatus, setSubsidyDraftStatus] = useState(null); // 'drafting', 'completed', null
  const [draftProgress, setDraftProgress] = useState(0);

  // Phase 2: High-Fidelity Realism States
  const [showUdyamModal, setShowUdyamModal] = useState(false);
  const [udyamFile, setUdyamFile] = useState(null);
  const [isOcrScanning, setIsOcrScanning] = useState(false);
  const [ocrData, setOcrData] = useState(null);

  const [growthSliders, setGrowthSliders] = useState({ solar: 10, training: 20, automation: 5 });
  const [projectedRoi, setProjectedRoi] = useState(12.4);

  const [isScanningTexture, setIsScanningTexture] = useState(false);
  const [textureHash, setTextureHash] = useState(null);
  const [showArbitrageTable, setShowArbitrageTable] = useState(false);

  // Phase 3: Advanced Gov Insights States
  const [isScanningSchemes, setIsScanningSchemes] = useState(false);
  const [grantProbability, setGrantProbability] = useState(0);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [scanSteps, setScanSteps] = useState([]);

  // Phase 4: Final Industrial Polish States
  const [isThermalScanning, setIsThermalScanning] = useState(false);
  const [thermalMap, setThermalMap] = useState(null);
  const [spectralWave, setSpectralWave] = useState(false);
  const [logisticsManifest, setLogisticsManifest] = useState(null);
  const [isSyncingBlockchain, setIsSyncingBlockchain] = useState(false);

  // Textile Specific
  const [textileMetrics, setTextileMetrics] = useState({});
  const [textileTrend, setTextileTrend] = useState([]);
  const [textileFlow, setTextileFlow] = useState({});
  const [quality, setQuality] = useState({});
  const [yarnOpt, setYarnOpt] = useState({});
  const [laborSkill, setLaborSkill] = useState({});
  const [downtimePrediction, setDowntimePrediction] = useState({});
  const [workflowOpt, setWorkflowOpt] = useState({});
  const getManualData = () => {
    try {
      const raw = localStorage.getItem('manualFactoryData');
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.error("Failed to parse manualFactoryData:", e);
      return {};
    }
  };

  const [manualData, setManualData] = useState(getManualData());

  // Helper to safely render values from AI responses
  const renderSafeValue = (val, fallback = "0") => {
    if (val === null || val === undefined) return fallback;
    if (typeof val === 'object') {
      // If it's a giant object, don't stringify the whole thing in the UI
      return val.value || val.score || val.amount || JSON.stringify(val).substring(0, 50);
    }
    return val;
  };

  // Interactive Demo States
  const [yarnReordered, setYarnReordered] = useState(false);
  const [yarnLoading, setYarnLoading] = useState(false);

  // WhatsApp Chat Sequence State (0: Initial, 1: Owner Typing, 2: Owner Replied, 3: AI Processing, 4: Done)
  const [waStep, setWaStep] = useState(0);
  const [ownerReply, setOwnerReply] = useState('');
  const [whatsappSuggestions, setWhatsappSuggestions] = useState([]);
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

  const [isOptimizing, setIsOptimizing] = useState(false);
  const [scheduleData, setScheduleData] = useState([]);
  const [schedulerStats, setSchedulerStats] = useState({ makespan: 0, machineUtilization: {}, jobCompletionTimes: [] });
  const [pendingJobs, setPendingJobs] = useState([]);

  const addPendingJob = () => {
    if (!fleetData || fleetData.length === 0) {
      alert("No machines available in cluster. Please sync assets first.");
      return;
    }
    const newId = `JOB-${100 + pendingJobs.length + 1}`;
    // Safer selection: pick from any available machine
    const randomIndex = Math.floor(Math.random() * fleetData.length);
    const randomMachine = fleetData[randomIndex].id;

    setPendingJobs([...pendingJobs, {
      id: newId,
      name: "New Batch Order",
      priority: 1,
      color: ["#f59e0b", "#ec4899", "#8b5cf6", "#0ea5e9"][Math.floor(Math.random() * 4)],
      operations: [
        { machineId: randomMachine, duration: 5, task: "Standard Process" }
      ]
    }]);
  };

  // --- New Overhaul States ---
  const [strategicAiLogs, setStrategicAiLogs] = useState([
    { id: 1, time: new Date().toLocaleTimeString(), msg: "SYSTEM INITIALIZED: Brahma Kernel v2.1.0", type: "system" },
    { id: 2, time: new Date().toLocaleTimeString(), msg: "Neural-Sync complete across 52 edge nodes.", type: "success" }
  ]);
  const [focusedAgent, setFocusedAgent] = useState(null);

  // Plant Floor Interactive States
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceStep, setVoiceStep] = useState(0); // 0: Idle, 1: Listening, 2: Transcribing, 3: Completed
  const [isTwinLoading, setIsTwinLoading] = useState(false);
  const [isOrchestrating, setIsOrchestrating] = useState(false);
  const [karigarAssigned, setKarigarAssigned] = useState(false);
  const [isSyncingGenerators, setIsSyncingGenerators] = useState(false);
  const [isOptimizingShift, setIsOptimizingShift] = useState(false);
  const [cvDefect, setCvDefect] = useState({ top: '40%', left: '45%', label: '1.2mm Yarn Breakage (97%)', color: '#f43f5e' });

  // --- PdM Advanced States ---
  const [currentShift, setCurrentShift] = useState("Day Shift (08:00 - 16:00)");
  const [isScanning, setIsScanning] = useState(false);
  const [showShiftModal, setShowShiftModal] = useState(false);
  const [advancedPdM, setAdvancedPdM] = useState({
    remainingLifeHours: 1930,
    failureProbability: 30.2,
    productionLossEstimate: "₹50,000",
    healthScore: 82.5,
    lastMaintenance: "12 MAR",
    backlogItems: 4,
    techAvailability: "75%",
    downtimePrevented: "148 Hrs",
    netSavingsPotential: "₹75,000"
  });

  const [strategicPdM, setStrategicPdM] = useState({
    totalDepreciation: "₹1,42,000",
    revenueAtRisk: "₹8,52,000",
    netEbitdaImpact: "₹12,40,000",
    pdmRoi: "340%",
    capitalRecovery: "₹3,45,000",
    portfolioHealth: 91.5
  });
  const [fleetData, setFleetData] = useState([]);
  const [liveSensors, setLiveSensors] = useState({
    temp: 42,
    tempTrend: 1.5,
    vibration: 4.8,
    vibrationTrend: 0.8,
    pressure: 120,
    power: 12.4
  });
  const [failureTrend, setFailureTrend] = useState([
    { time: '08:00', risk: 20 },
    { time: '10:00', risk: 25 },
    { time: '12:00', risk: 45 },
    { time: '14:00', risk: 30 },
    { time: '16:00', risk: 35 },
    { time: '18:00', risk: 60 },
    { time: '20:00', risk: 30 },
  ]);
  const [workOrderStep, setWorkOrderStep] = useState(0);
  const [budgetApplied, setBudgetApplied] = useState(false);
  const [isBudgeting, setIsBudgeting] = useState(false);
  const [ledgerData, setLedgerData] = useState([
    { date: '12 MAR', task: 'Hydraulic Seal Replacement', tech: 'Rahul S.', res: 'Complete' },
    { date: '08 MAR', task: 'Motor Bearing Lubrication', tech: 'Amit K.', res: 'Complete' },
    { date: '01 MAR', task: 'Sensor Calibration Cluster B', tech: 'System AI', res: 'Complete' }
  ]);

  // --- Financial Failure Reporting States ---
  const [selectedMachineReport, setSelectedMachineReport] = useState(null);
  const [failureReports, setFailureReports] = useState({
    'Loom #1': {
      analysis: "Spindle bearing friction anomaly detected at 8.2kHz. Lubrication film breakdown.",
      costOfFailure: "₹1,50,000 (Reactive)",
      depreciation: "₹12,000 (Accelerated due to heat stress)",
      costRecover: "₹1,15,000 (Via Predictive Intervention)",
      profitGain: "₹42,000 (Avoided downtime & emergency logistics)",
      solution: "Apply high-temp lithium grease & recalibrate spindle alignment.",
      lastResolved: "12 MAR"
    },
    'Loom #7': {
      analysis: "Stalled motor logic detected. Potential capacitor leakage in control board.",
      costOfFailure: "₹2,80,000 (Major PCB Replacement)",
      depreciation: "₹25,000 (Critical Component Fatigue)",
      costRecover: "₹2,10,000 (Part Refurbishment vs Replacement)",
      profitGain: "₹65,000 (Zero-latency failover to Backup Section)",
      solution: "Replace C42/C44 capacitors & update firmware to v2.1.4.",
      lastResolved: "Pending"
    },
    'Loom #4': {
      analysis: "Optimal performance. Harmonic signature within 0.2% variance.",
      costOfFailure: "₹0",
      depreciation: "₹4,500 (Standard)",
      costRecover: "₹0",
      profitGain: "₹18,000 (Over-performance optimization)",
      solution: "Continue monitoring. Next audit in 450 hours.",
      lastResolved: "08 MAR"
    }
  });

  // Camera States
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [isStreamReady, setIsStreamReady] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [showTwinModal, setShowTwinModal] = useState(false);
  const [microAdjustments, setMicroAdjustments] = useState([]);

  useEffect(() => {
    const logInterval = setInterval(() => {
      const logPool = [
        { msg: "[Agent-14] Detecting yarn tension micro-drift on Loom 4. Recalibrating...", type: "info" },
        { msg: "[Agent-22] Quality Audit: Purity check on Batch-92 passed (99.8%).", type: "success" },
        { msg: "[Agent-05] Energy Spike detected in Section B. Transitioning to Solar Grid.", type: "warning" },
        { msg: "[Agent-51] Sentiment Analysis: Buyer 'Surat-A1' showing high reorder intent.", type: "info" },
        { msg: "[Brahma] Balancing network load. Syncing telemetry to Edge Node 12.", type: "system" },
        { msg: "[Agent-33] Warehouse Temp stable. Humidity drift corrected (+1.5% RH).", type: "success" }
      ];
      const randomLog = logPool[Math.floor(Math.random() * logPool.length)];
      setStrategicAiLogs(prev => {
        const newId = Date.now() + Math.random();
        return [{ id: newId, time: new Date().toLocaleTimeString(), ...randomLog }, ...prev.slice(0, 49)];
      });
    }, 8000);
    return () => clearInterval(logInterval);
  }, []);

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
          newCoreState[5] = `[Edge Node] Zero-latency safety override active. Floor Node 4 latency: ${latency}ms. Ambient server temp: ${temp}C.`;
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
                  setStrategicAiLogs(prev => {
                    const newId = Date.now() + Math.random();
                    return [{ id: newId, time: new Date().toLocaleTimeString(), msg: `Core AI: Request Approved. Optimization complete.`, type: 'success' }, ...prev];
                  });
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
  const [isMsmeModalOpen, setIsMsmeModalOpen] = useState(false);
  const [isClusterModalOpen, setIsClusterModalOpen] = useState(false);
  const [isSubsidyModalOpen, setIsSubsidyModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [showNotification, setShowNotification] = useState(false);

  // Interactive Machine Slider State
  const [machineVibration, setMachineVibration] = useState(45);
  const [ticketGenerated, setTicketGenerated] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'Strategic Owner'); // Operator, Manager, Strategic Owner
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [isAiLearningMode, setIsAiLearningMode] = useState(true);
  const [lang, setLang] = useState('EN'); // EN, HI
  const [executiveSummary, setExecutiveSummary] = useState({ summary: "Analyzing plant telemetry... Overall production is stable with a 12% projected growth in net margin this month. Workforce skill index in Bhilwara cluster is up by 4%." });
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

  // --- Consolidated Data Fetching Engine ---
  const [isInitialLoading, setIsInitialLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!isMounted) return;
      setIsInitialLoading(true);

      // Safety fallback: ensure loading is dismissed after 15s even if APIs hang
      const safetyTimeout = setTimeout(() => {
        if (isMounted) setIsInitialLoading(false);
      }, 15000);

      try {
        // Essential Data First
        const [mStatus, iAlerts, fJobs, fMachines, fSchedule] = await Promise.all([
          api.get("/machine/status"),
          api.get("/inventory/alerts"),
          api.get("/fyp/jobs"),
          api.get("/fyp/machines"),
          api.get("/fyp/schedule")
        ]);
        if (isMounted) {
          setMachineStatus(mStatus.data);
          setInventoryAlerts(iAlerts.data);
          const formattedJobs = fJobs.data.map(j => ({ id: j.jobId, name: j.jobName, priority: j.priority, color: j.color, operations: j.operations }));
          const formattedMachines = fMachines.data.map(m => ({ id: m.machineId, name: m.machineName, status: m.status, color: m.color || '#3b82f6' }));

          setPendingJobs(formattedJobs);
          setFleetData(formattedMachines);
          setScheduleData(fSchedule.data);

          // Auto-run optimizer initially to populate KPI stats
          if (formattedJobs.length > 0 && formattedMachines.length > 0) {
            api.post("/ai/scheduler/optimize", {
              jobs: formattedJobs,
              machines: formattedMachines
            }).then(optimizeRes => {
              if (isMounted && optimizeRes.data && optimizeRes.data.schedule) {
                setScheduleData(optimizeRes.data.schedule);
                setSchedulerStats({
                  makespan: optimizeRes.data.makespan,
                  machineUtilization: optimizeRes.data.machineUtilization,
                  jobCompletionTimes: optimizeRes.data.jobCompletionTimes
                });
              }
            }).catch(e => console.error("Auto-optimize error:", e));
          }
        }

        // Prepare standardized payloads
        const localManualData = manualData;
        const prodPayload = {
          actualOutput: localManualData?.actualOutput,
          expectedOutput: localManualData?.expectedOutput
        };
        const maintPayload = {
          uptime: localManualData?.uptime,
          breakdowns: localManualData?.breakdowns,
          daysSince: localManualData?.daysSince
        };
        const textilePayload = {
          fabricProduced: localManualData?.fabricProducedMeters,
          loomHours: localManualData?.loomHours,
          yarnUsed: localManualData?.yarnUsedKg
        };
        const financePayload = {
          cost: localManualData?.operatingCost,
          price: localManualData?.revenue
        };
        const qualityPayload = {
          defects: localManualData?.defectsCount,
          totalUnits: localManualData?.totalUnitsTested
        };

        // Operations & Overview Batch
        const opsBatch = await Promise.all([
          api.post("/ai/delay", { avgOutput: localManualData?.actualOutput }),
          api.post("/ai/efficiency", prodPayload),
          api.post("/ai/maintenance", {
            uptimeHours: localManualData?.uptime,
            breakdowns: localManualData?.breakdowns,
            vibration: localManualData?.vibration,
            temp: localManualData?.temp
          }),
          api.post("/ai/quality", {
            defects: localManualData?.defectsCount,
            totalUnits: localManualData?.totalUnitsTested,
            gsmDeviation: localManualData?.gsmDeviation,
            colorVariance: localManualData?.colorVariance,
            shrinkage: localManualData?.shrinkage,
            certification: localManualData?.certification
          }),
          api.post("/ai/safety", {
            accidentFreeDays: localManualData?.accidentFreeDays,
            ppeComplianceRate: localManualData?.ppeCompliance,
            drills: localManualData?.safetyDrills,
            hazards: localManualData?.unresolvedHazards
          }),
          api.post("/ai/maintenance-score", maintPayload),
          api.post("/ai/anomaly", { todayValue: localManualData?.actualOutput }),
          api.post("/ai/reliability", { uptime: localManualData?.uptime }),
          api.post("/ai/digital-maturity", {}),
          api.post("/ai/benchmark", { actualOutput: localManualData?.actualOutput }),
          api.post("/ai/power", {
            powerUsed: localManualData?.powerConsumedKwh,
            solarContribution: localManualData?.solarContribution
          }),
          api.post("/ai/workforce", { actualOutput: localManualData?.actualOutput, workers: localManualData?.activeWorkers })
        ]);

        if (isMounted) {
          setDelay(opsBatch[0].data);
          setPei(opsBatch[1].data.current);
          if (opsBatch[1].data.trend) setPeiTrend(opsBatch[1].data.trend);
          setMaintenance(opsBatch[2].data);
          setQuality(opsBatch[3].data);
          setSafety(opsBatch[4].data);
          setMaintenanceScore(opsBatch[5].data.score || opsBatch[5].data);
          setAnomaly(opsBatch[6].data);
          setReliability(opsBatch[7].data.availability !== undefined ? opsBatch[7].data.availability : opsBatch[7].data);
          setDigitalMaturity(opsBatch[8].data.score || opsBatch[8].data);
          setBenchmark(opsBatch[9].data);
          setSolar(opsBatch[10].data);
          setWorkforce(opsBatch[11].data);
        }

        // Supply Chain & Sustainability Batch
        const scBatch = await Promise.all([
          api.post("/ai/yarn-price", { yarnPrice: localManualData?.yarnPrice }),
          api.post("/ai/subcontractor", {}),
          api.post("/ai/seasonal-demand", {}),
          api.post("/ai/export-score", {}),
          api.post("/ai/cluster", { actualOutput: localManualData?.actualOutput, targetOutput: localManualData?.expectedOutput }),
          api.post("/ai/esg", { wasteKg: localManualData?.wasteResaleValue, downtimeHours: (localManualData?.breakdowns || 0) * 4 }),
          api.post("/ai/water", { waterUsage: localManualData?.waterUsage, recycledWater: localManualData?.recycledWater }),
          api.post("/ai/waste", { actualOutput: localManualData?.actualOutput }),
          api.post("/ai/heatwave", {}),
          api.post("/ai/cost-optimization", { actualOutputToday: localManualData?.actualOutput }),
          api.post("/ai/credit-risk", {}),
          api.post("/ai/profit", financePayload),
          api.post("/ai/buyer-risk", {}),
          api.post("/ai/gov-schemes", {})
        ]);

        if (isMounted) {
          setYarnPrice(scBatch[0].data);
          setSubcontractor(scBatch[1].data);
          setSeason(scBatch[2].data);
          setExportScore(scBatch[3].data.score || scBatch[3].data);
          setCluster(scBatch[4].data);
          setEsg(scBatch[5].data);
          setWater(scBatch[6].data);
          if (scBatch[6].data.trend) setWaterTrend(scBatch[6].data.trend);
          setWaste(scBatch[7].data);
          setHeatwave(scBatch[8].data);
          setCostOptimization(scBatch[9].data);
          if (scBatch[9].data.breakdown) setCostBreakdown(scBatch[9].data.breakdown);
          setCreditRisk(scBatch[10].data);
          setProfit(scBatch[11].data);
          setBuyerRisk(scBatch[12].data);
          setGovSchemes(scBatch[13].data);
        }

        // textile & Advanced Batch
        const textileBatch = await Promise.all([
          api.post("/ai/textile-metrics", textilePayload),
          api.post("/ai/textile-flow", {}),
          api.post("/ai/yarn-optimize", {}),
          api.post("/ai/labor-skill", { trainingHours: localManualData?.trainingHours }),
          api.post("/ai/predict-downtime", {
            vibration: localManualData?.vibration,
            temp: localManualData?.temp,
            uptime: localManualData?.uptime
          }),
          api.post("/ai/executive-summary", prodPayload),
          api.post("/ai/recommendations", maintPayload)
        ]);

        if (isMounted) {
          setTextileMetrics(textileBatch[0].data);
          if (textileBatch[0].data.trend) setTextileTrend(textileBatch[0].data.trend);
          setTextileFlow(textileBatch[1].data);
          setYarnOpt(textileBatch[2].data);
          setLaborSkill(textileBatch[3].data);
          setDowntimePrediction(textileBatch[4].data);
          setExecutiveSummary(textileBatch[5].data);
          setRecommendations(textileBatch[6].data.actions);
        }

      } catch (err) {
        console.error("Dashboard data fetch error:", err);
      } finally {
        if (isMounted) {
          setIsInitialLoading(false);
          clearTimeout(safetyTimeout);
        }
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [manualData]);

  // --- Unified Simulation Engine ---
  useEffect(() => {
    let isMounted = true;
    const intervals = [];

    // Rapid Telemetry (Operations Tab) - 3s
    intervals.push(setInterval(() => {
      if (!isMounted || activeTab !== 'operations') return;
      setMachineStatus(prev => Array.isArray(prev) ? prev.map(m => ({
        ...m,
        temp: Math.max(30, Math.min(110, m.temp + (Math.random() * 4 - 2))),
        rpm: Math.max(500, Math.min(1200, m.rpm + (Math.random() * 20 - 10))),
        vibration: Math.random() > 0.8 ? 'High' : (Math.random() > 0.4 ? 'Normal' : 'Low')
      })) : prev);
    }, 3000));

    // AI Strategic Logging - 8s
    intervals.push(setInterval(() => {
      if (!isMounted) return;
      const logOptions = [
        { msg: "Predictive AI: Shift rotation recommended for Sector 7 to optimize energy.", type: "info" },
        { msg: "Quality AI: Grain thickness deviation detected on Loom 12.", type: "warning" },
        { msg: "Supply Chain AI: Yarn shipment from Bursa delayed by 4 hours.", type: "warning" },
        { msg: "Sustainability AI: Solar contribution peaked at 42%.", type: "success" },
        { msg: "Finance AI: Export margin optimized via currency arbitrage.", type: "success" }
      ];
      const randomLog = logOptions[Math.floor(Math.random() * logOptions.length)];
      setStrategicAiLogs(prev => {
        const newId = Date.now() + Math.random();
        return [{ id: newId, time: new Date().toLocaleTimeString(), ...randomLog }, ...prev.slice(0, 49)];
      });
    }, 8000));

    // Dynamic Context Changes - 4.5s
    intervals.push(setInterval(() => {
      if (!isMounted) return;
      const messages = [
        "Processing demand forecast for Q3 Suiting...",
        "Evaluating ESG impact of Loom cluster 4...",
        "Generating executive summary for Bhilwara cluster...",
        "Monitoring real-time yarn pricing from Global markets...",
        "Optimizing workforce distribution for night shift..."
      ];
      setAgentMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 4500));

    // Owner Approval Polling - 3s
    intervals.push(setInterval(async () => {
      if (!isMounted) return;
      try {
        const response = await api.get('/owner/requests');
        if (isMounted) setActiveRequests(response.data || []);
      } catch (err) {
        console.error("Owner polling error:", err);
      }
    }, 3000));

    // CV Defect Simulation - 5s
    intervals.push(setInterval(() => {
      if (!isMounted) return;
      const defects = [
        { label: "Broken End", color: "#ef4444", top: "20%", left: "40%" },
        { label: "Double Pick", color: "#f59e0b", top: "60%", left: "30%" },
        { label: "Slub", color: "#8b5cf6", top: "40%", left: "70%" },
        { label: "Oil Stain", color: "#3b82f6", top: "15%", left: "60%" }
      ];
      setCvDefect(defects[Math.floor(Math.random() * defects.length)]);
    }, 5000));

    return () => {
      isMounted = false;
      intervals.forEach(clearInterval);
    };
  }, [activeTab]);

  const handleVoiceAction = () => {
    setVoiceStep(1);
    setIsVoiceActive(true);
    setTimeout(() => {
      setVoiceStep(2);
      setTimeout(() => {
        setVoiceStep(3);
        setStrategicAiLogs(prev => [{
          id: Date.now(),
          time: new Date().toLocaleTimeString(),
          msg: "Voice Assistant: 'Loom 4 thread-break logged. Requesting maintenance.'",
          type: 'success'
        }, ...prev]);
        setTimeout(() => {
          setIsVoiceActive(false);
          setVoiceStep(0);
        }, 3000);
      }, 2000);
    }, 2000);
  };

  const toggleCamera = async () => {
    if (isCameraActive) {
      // Stop Camera
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
      setCameraStream(null);
      setIsCameraActive(false);
      setIsStreamReady(false);
      setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: "Vision AI: Live Camera Deactivated.", type: 'info' }, ...prev]);
    } else {
      // Start Camera
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setCameraStream(stream);
        setIsCameraActive(true);
        setCameraError("");
        setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: "Vision AI: Live Camera Activated. Calibrating...", type: 'success' }, ...prev]);
      } catch (err) {
        console.error("Camera error:", err);
        setCameraError("Camera Access Denied or Missing.");
        setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: "Vision AI Error: Failed to access camera.", type: 'danger' }, ...prev]);
        alert("Camera access is required for live CV functions. Please check your permissions.");
      }
    }
  };

  // Robust Camera Binding and Forced Play Effect
  useEffect(() => {
    let isMounted = true;
    const bindCamera = async () => {
      if (isCameraActive && cameraStream && videoRef.current) {
        try {
          videoRef.current.srcObject = cameraStream;
          videoRef.current.onloadedmetadata = async () => {
            if (isMounted) {
              try {
                await videoRef.current.play();
                setIsStreamReady(true);
              } catch (err) {
                console.error("Video play error:", err);
                setCameraError("Autoplay blocked. Please click the camera again.");
              }
            }
          };
        } catch (err) {
          console.error("Camera binding error:", err);
          if (isMounted) setCameraError("Failed to bind camera stream.");
        }
      } else if (videoRef.current) {
        videoRef.current.srcObject = null;
        if (isMounted) setIsStreamReady(false);
      }
    };
    bindCamera();
    return () => { isMounted = false; };
  }, [isCameraActive, cameraStream]);

  const renderLoadingOverlay = () => (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#070b14',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px'
    }}>
      <div className="spin" style={{ width: '40px', height: '40px', border: '3px solid var(--primary-20)', borderTopColor: 'var(--primary)', borderRadius: '50%' }}></div>
      <div style={{ color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.8rem' }}>SYNCING BRAHMA KERNEL...</div>
    </div>
  );

  const handleUdyamLink = () => {
    setShowUdyamModal(true);
  };

  const executeOcrScan = () => {
    setIsOcrScanning(true);
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step >= 100) {
        clearInterval(interval);
        setOcrData({
          company: "NIRVANA TEXTILES",
          udyamId: "UDYAM-RJ-14-0029312",
          category: "Small Enterprise",
          date: "12-MAR-2026"
        });
        setIsOcrScanning(false);
        setUdyamLinked(true);
        setGovApplications([
          { id: 'APP1024', name: 'RIPS 2022 Interest Subvention', status: 'In Review', date: '2026-03-01' },
          { id: 'APP1055', name: 'Solar Grid Subsidy (Phase 1)', status: 'Approved', date: '2026-02-15' }
        ]);
        setSystemEvents(prev => [{ id: Date.now() + Math.random(), time: new Date().toLocaleTimeString(), msg: "OCR Extraction Complete: UdyamRJ-14 Verified.", type: 'success' }, ...prev]);
        setTimeout(() => setShowUdyamModal(false), 2000);
      }
    }, 40);
  };

  const handleTextureScan = () => {
    setIsScanningTexture(true);
    setStrategicAiLogs(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: "Initializing Microscopic Texture Analysis...", type: "system" }, ...prev]);

    setTimeout(() => {
      setTextureHash("BH-ROLL-902-X-CONFIRMED");
      setIsScanningTexture(false);
      setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: "Texture Fingerprint Verified: Roll #BH902-X AUTHENTIC", type: 'success' }, ...prev]);
    }, 4000);
  };

  const updateStrategyRoi = (key, val) => {
    const newSliders = { ...growthSliders, [key]: val };
    setGrowthSliders(newSliders);
    // Dynamic ROI Formula: Base 8% + weights
    const calculated = 8 + (newSliders.solar * 0.1) + (newSliders.training * 0.15) + (newSliders.automation * 0.4);
    setProjectedRoi(calculated.toFixed(1));
  };

  const handleSchemeScan = () => {
    setIsScanningSchemes(true);
    setScanSteps([]);
    setGrantProbability(0);

    const steps = [
      "Analyzing Factory Registration (Udyam Verified)",
      "Checking PEI (Production Effectiveness Index) Thresholds",
      "Scanning ZLD (Zero Liquid Discharge) Compliance",
      "Verifying Karigar Training Hours vs RIPS 2022",
      "Calculating Solar Grid Offset Factor"
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setScanSteps(prev => [...prev, steps[currentStep]]);
        setGrantProbability(prev => Math.min(85, prev + Math.floor(Math.random() * 20) + 10));
      }
    }, 8000 / steps.length);
  };

  const renderFailureReportModal = () => {
    if (!selectedMachineReport) return null;
    const report = failureReports[selectedMachineReport];
    if (!report) return null;

    return (
      <div className="modal-overlay" style={{ zIndex: 10000 }}>
        <div className="premium-card animate-slide-up" style={{ width: '90%', maxWidth: '800px', maxHeight: '85vh', overflowY: 'auto', padding: '2.5rem', background: '#0f172a', border: '1px solid var(--accent)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div className="glass-icon" style={{ background: 'rgba(244, 63, 94, 0.1)', borderColor: 'rgba(244, 63, 94, 0.2)' }}>
                <ShieldAlert size={28} color="var(--danger)" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'white', margin: 0 }}>Failure Analysis: {selectedMachineReport}</h2>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Security Verified: Industrial Audit v4.1</div>
              </div>
            </div>
            <button className="modal-close" onClick={() => setSelectedMachineReport(null)}><X size={20} /></button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div className="gov-section-card" style={{ borderLeft: '4px solid var(--primary)', background: 'rgba(15, 23, 42, 0.6)' }}>
              <div style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '0.75rem', marginBottom: '8px' }}>FINANCIAL IMPACT (REACTIVE)</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--danger)' }}>{report.costOfFailure}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Projected loss without AI intervention</div>
            </div>
            <div className="gov-section-card" style={{ borderLeft: '4px solid var(--accent)', background: 'rgba(15, 23, 42, 0.6)' }}>
              <div style={{ color: 'var(--accent)', fontWeight: '800', fontSize: '0.75rem', marginBottom: '8px' }}>RECOVERY GAIN (PREDICTIVE)</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--accent)' }}>{report.costRecover}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Actual savings recorded via preventative fix</div>
            </div>
            <div className="gov-section-card" style={{ background: 'rgba(15, 23, 42, 0.6)' }}>
              <div style={{ color: '#94a3b8', fontWeight: '800', fontSize: '0.75rem', marginBottom: '8px' }}>ASSET DEPRECIATION</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#e2e8f0' }}>{report.depreciation}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Value leakage due to machine wear</div>
            </div>
            <div className="gov-section-card" style={{ background: 'rgba(15, 23, 42, 0.6)', borderRight: '4px solid #FBC02D' }}>
              <div style={{ color: '#FBC02D', fontWeight: '800', fontSize: '0.75rem', marginBottom: '8px' }}>NET PROFIT GAIN</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FBC02D' }}>{report.profitGain}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Direct EBITDA impact from optimization</div>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BrainCircuit size={20} color="var(--primary)" /> Smart Analytics & Solution Solution
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#e2e8f0', marginBottom: '1.5rem', background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '10px' }}>
              <strong>AI Root Cause:</strong> {report.analysis}
            </p>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '15px', borderLeft: '4px solid var(--accent)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--accent)', marginBottom: '8px', letterSpacing: '1px' }}>PRO-INDUSTRIAL SOLUTION</div>
              <div style={{ fontSize: '0.95rem', color: 'white', fontWeight: '600' }}>{report.solution}</div>
            </div>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '1.5rem', textAlign: 'center' }}>Machine Cost Comparison (Financial Risk Index)</h3>
            <div style={{ height: '250px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={Object.entries(failureReports).map(([name, data]) => ({
                  name,
                  cost: parseInt(data.costOfFailure.replace(/[^\d]/g, '') || 0),
                  recovery: parseInt(data.costRecover.replace(/[^\d]/g, '') || 0)
                }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                  <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                  <Tooltip
                    contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Bar dataKey="cost" fill="var(--danger)" radius={[4, 4, 0, 0]} name="Failure Cost" />
                  <Bar dataKey="recovery" fill="var(--accent)" radius={[4, 4, 0, 0]} name="Recovery Gain" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button
              className="btn-primary"
              style={{ flex: 1, padding: '15px', background: 'var(--primary)', border: 'none' }}
              onClick={() => {
                setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: `Maintenance Solution Applied for ${selectedMachineReport}.`, type: 'success' }, ...prev]);
                setSelectedMachineReport(null);
              }}
            >
              Authorize Immediate Solution
            </button>
            <button className="btn-primary" style={{ flex: 1, padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} onClick={() => setSelectedMachineReport(null)}>
              Generate Full PDF Audit
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleGenAiSubsidy = () => {
    setSubsidyDraftStatus('drafting');
    setDraftProgress(0);
    const steps = [
      "Analyzing factory OEE stats...",
      "Extracting energy grid data...",
      "Calculating labor compliance score...",
      "Formatting Rajasthan RIPS 2022 XML...",
      "Generating final PDF draft..."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setDraftProgress(Math.round((currentStep / steps.length) * 100));
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setSubsidyDraftStatus('completed');
        setSystemEvents(prev => [{ id: Date.now() + Math.random(), time: new Date().toLocaleTimeString(), msg: "GenAI: RIPS 2022 Application drafted successfully.", type: 'success' }, ...prev]);
      } else {
        setAgentMessage(`GenAI: ${steps[currentStep]}`);
      }
    }, 1000);
  };

  const handleDownloadReport = () => {
    setAgentMessage("Generating Compliance Report...");
    setTimeout(() => {
      alert("Compliance Report Downloaded: smartfactory_bhilwara_compliance_2026.pdf");
      setSystemEvents(prev => [{ id: Date.now() + Math.random(), time: new Date().toLocaleTimeString(), msg: "Compliance report generated & downloaded.", type: "info" }, ...prev]);
    }, 1500);
  };

  const handleThermalScan = () => {
    setIsThermalScanning(true);
    setSpectralWave(true);
    setStrategicAiLogs(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: "Spectral Scan Initiated: Analyzing Loom-Motor Harmonics...", type: "system" }, ...prev]);

    setTimeout(() => {
      setThermalMap({ loom4: 78.4, loom7: 92.1, stenter1: 65.2 });
      setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: "Thermal Scan Complete: Critical Heat Gradient detected on Motor B-7.", type: "warning" }, ...prev]);
      setTimeout(() => {
        setIsThermalScanning(false);
        setSpectralWave(false);
      }, 5000);
    }, 3000);
  };

  const handleLogisticsSync = () => {
    setIsSyncingBlockchain(true);
    setTimeout(() => {
      setLogisticsManifest({
        container: "MSKU-9921-X",
        vessel: "Maersk Bhilwara-Express",
        origin: "Mundra Port, Gujarat",
        destination: "Bursa, Turkey",
        verified: true,
        hash: "0x882a...912c"
      });
      setIsSyncingBlockchain(false);
      setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: "Blockchain Manifest Synced: Yarn Batch #902 Verified for Export.", type: "success" }, ...prev]);
    }, 2500);
  };

  useEffect(() => {
    // Generate contextual suggestions based on live dashboard state
    const contextualPool = [];
    const randomPool = [
      "Approve overtime for Shift B (Weavers)",
      "Sell 3,000m Navy Blue dead-stock for 4.25L",
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
      contextualPool.push("Approve 15k emergency parts for Loom Repair");
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
      <style>{industrialStyles}</style>
      {isInitialLoading && renderLoadingOverlay()}
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="logo">
          <Factory size={24} />
          <span>SmartFactory AI</span>
          <div style={{ fontSize: '0.7rem', color: 'var(--accent)', marginTop: '4px' }}>
            Live: {typeof executiveSummary.pei === 'object' ? JSON.stringify(executiveSummary.pei) : executiveSummary.pei || 0}% Efficiency
          </div>
        </div>

        <div style={{ padding: '0 1rem 1.5rem 1rem', position: 'relative' }}>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '800', letterSpacing: '1px' }}>SESSION ACTIVE</div>
        </div>
        <ul className="nav-links">
          <li className={`sidebar-link ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <LayoutDashboard size={18} />
            {lang === 'EN' ? 'SME Command Center' : ''}
          </li>

          {(userRole === 'Manager' || userRole === 'Owner') && (
            <li className={`sidebar-link ${activeTab === 'operations' ? 'active' : ''}`} onClick={() => setActiveTab('operations')}>
              <Cpu size={18} />
              {lang === 'EN' ? 'Plant Floor' : ' '}
            </li>
          )}




          {(userRole === 'Manager' || userRole === 'Owner') && (
            <li className={`sidebar-link ${activeTab === 'maintenance' ? 'active' : ''}`} onClick={() => setActiveTab('maintenance')}>
              <Settings size={18} />
              {lang === 'EN' ? 'Predictive Maintenance' : ''}
            </li>
          )}




          {userRole === 'Owner' && (
            <li className={`sidebar-link ${activeTab === 'finance' ? 'active' : ''}`} onClick={() => setActiveTab('finance')}>
              <DollarSign size={20} />
              {lang === 'EN' ? 'Financial KPI' : '  '}
            </li>
          )}

          {(userRole === 'Manager' || userRole === 'Owner') && (
            <li className={`sidebar-link ${activeTab === 'textile' ? 'active' : ''}`} onClick={() => setActiveTab('textile')}>
              <Briefcase size={18} />
              {lang === 'EN' ? 'Textile Operations' : ' '}
            </li>
          )}

          {(userRole === 'Manager' || userRole === 'Owner') && (
            <li className={`sidebar-link ${activeTab === 'scheduler' ? 'active' : ''}`} onClick={() => setActiveTab('scheduler')} style={{ color: 'var(--accent)' }}>
              <Clock size={18} />
              {lang === 'EN' ? 'Production Scheduler' : ' '}
            </li>
          )}

          {(userRole === 'Manager' || userRole === 'Owner' || userRole === 'Strategic Owner') && (
            <li className={`sidebar-link ${activeTab === 'fyp' ? 'active' : ''}`}
              onClick={() => setActiveTab('fyp')}
              style={{
                color: activeTab === 'fyp' ? '#60a5fa' : '#3b82f6',
                borderLeft: activeTab === 'fyp' ? '3px solid #3b82f6' : 'none',
                background: activeTab === 'fyp' ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%)' : 'transparent'
              }}>
              <Zap size={18} className={activeTab === 'fyp' ? 'pulse-slow text-blue-400' : ''} />
              {lang === 'EN' ? 'FYP Optimizer' : ' '}
              {activeTab !== 'fyp' && <div className="ml-auto w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]"></div>}
            </li>
          )}




          {userRole === 'Owner' && (
            <li className={`sidebar-link ${activeTab === 'strategy' ? 'active' : ''}`} onClick={() => setActiveTab('strategy')}>
              <TrendingUp size={20} />
              {lang === 'EN' ? 'Strategic Intelligence' : ' '}
            </li>
          )}

          {userRole === 'Owner' && (
            <li className={`sidebar-link ${activeTab === 'agents' ? 'active' : ''}`} onClick={() => setActiveTab('agents')}>
              <Bot size={20} />
              {lang === 'EN' ? 'AI Agent Library (52)' : ' '}
            </li>
          )}

          {userRole === 'Owner' && (
            <li className={`sidebar-link ${activeTab === 'gov' ? 'active' : ''}`} onClick={() => setActiveTab('gov')} style={{ color: '#0ea5e9' }}>
              <Factory size={18} />
              {lang === 'EN' ? 'Bhilwara Gov-Portal' : '  '}
            </li>
          )}
          
          <li className={`sidebar-link ${activeTab === 'govassist' ? 'active' : ''}`} onClick={() => { setActiveTab('govassist'); navigate('/govassist'); }} style={{ color: 'var(--accent)' }}>
            <ClipboardCheck size={20} className={activeTab === 'govassist' ? 'pulse-slow' : ''} />
            {lang === 'EN' ? 'GovAssist AI' : ' '}
            {activeTab === 'govassist' && <div className="ml-auto w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_8px_#22d3ee]"></div>}
          </li>



        </ul>

        <div className="sidebar-footer" style={{ padding: '1.5rem', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: '800', letterSpacing: '1px' }}>SESSION ACTIVE</div>
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
            <h1>
              {activeTab === 'govassist' 
                ? 'GovAssist AI' 
                : (lang === 'EN' ? `Welcome, ${userRole === 'Owner' ? 'Strategic Owner' : userRole}` : `${userRole === 'Owner' ? ' ' : userRole}   `)}
            </h1>
            <p>
              {activeTab === 'govassist' 
                ? (lang === 'EN' ? 'Bhilwara Industrial Hub // Regulatory Intelligence Engine' : ' ')
                : (lang === 'EN' ? 'Real-time intelligence and AI-driven optimization' : '-   - ')}
            </p>
          </div>
          <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {activeTab === 'govassist' && (
              <div style={{ background: 'rgba(34, 211, 238, 0.1)', border: '1px solid var(--accent)', padding: '8px 16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 'bold' }}>GOV-SYSTEM STATUS</div>
                <div style={{ fontSize: '0.8rem', color: 'white', fontWeight: 'bold' }}>SYNCHRONIZED</div>
              </div>
            )}
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

        <div className="scanner-overlay" />

        {activeTab === 'overview' && (
          <div className="cyber-grid" style={{ padding: '0 1rem' }}>
            {/* NEW: Neural Orchestrator Panel */}
            <div className="industrial-panel" style={{ padding: '2.5rem', marginBottom: '2.5rem', borderRadius: '1rem', border: '1px solid var(--primary-20)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                <div style={{ position: 'relative', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Neural Brain SVG Visualization */}
                  <svg width="300" height="300" viewBox="0 0 100 100" style={{ animation: 'neural-pulse 4s infinite ease-in-out' }}>
                    <circle cx="50" cy="50" r="10" fill="var(--primary)" opacity="0.4" />
                    <circle cx="50" cy="50" r="15" stroke="var(--primary)" fill="none" strokeWidth="0.5" strokeDasharray="2 2" />
                    <circle cx="50" cy="50" r="25" stroke="var(--primary-20)" fill="none" strokeWidth="0.5" />
                    {[...Array(12)].map((_, i) => (
                      <g key={i} transform={`rotate(${i * 30} 50 50)`}>
                        <line x1="50" y1="25" x2="50" y2="10" stroke="var(--primary)" strokeWidth="0.2" opacity="0.5" />
                        <circle cx="50" cy="10" r="1" fill={i % 3 === 0 ? "var(--accent)" : "var(--primary)"}>
                          <animate attributeName="opacity" values="0.2;1;0.2" dur={`${2 + i % 3}s`} repeatCount="indefinite" />
                        </circle>
                      </g>
                    ))}
                    <text x="50" y="52" fontSize="6" textAnchor="middle" fill="white" fontWeight="bold">HQ</text>
                  </svg>
                  <div style={{ position: 'absolute', bottom: '0', textAlign: 'center', width: '100%' }}>
                    <div style={{ fontSize: '0.65rem', letterSpacing: '2px', color: 'var(--primary)', fontWeight: 'bold' }}>NEURAL ORCHESTRATOR</div>
                    <div style={{ fontSize: '0.9rem', color: 'white', fontWeight: 'bold' }}>52 Agents Synced</div>
                  </div>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '1.5rem', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: 'var(--primary)' }}>
                    <Activity size={18} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px' }}>STRATEGIC AI COMMAND LOG</span>
                  </div>
                  <div style={{ flex: 1, overflowY: 'auto', maxHeight: '200px', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                    {strategicAiLogs.map(log => (
                      <div key={log.id} style={{ marginBottom: '6px', borderLeft: `2px solid ${log.type === 'success' ? 'var(--accent)' : log.type === 'warning' ? 'var(--amber-glow)' : log.type === 'system' ? 'var(--primary)' : 'var(--slate-500)'}`, paddingLeft: '8px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>[{log.time}]</span> <span style={{ color: log.type === 'success' ? 'var(--accent)' : log.type === 'warning' ? 'var(--amber-glow)' : 'white' }}>{log.msg}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="executive-banner" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #0f172a 100%)', padding: '2.5rem', borderRadius: '1.5rem', marginBottom: '2.5rem', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h2 style={{ fontSize: '2.4rem', fontWeight: '800', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>TexTech Intelligence Hub</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '700px', fontSize: '1.1rem', lineHeight: '1.6' }}>
                  The factory is performing at <span style={{ color: 'var(--accent)', fontWeight: '700' }}>{renderSafeValue(pei)}%</span> efficiency.
                  AI predicts <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{String(delay || "").includes('High') ? 'moderate' : 'zero'}</span> disruption risk in the current production cycle.
                </p>
                <div style={{ display: 'flex', gap: '3rem', marginTop: '2.5rem' }}>
                  <div className="hero-stat">
                    <div style={{ fontSize: '0.75rem', fontWeight: '600', opacity: 0.6, letterSpacing: '0.05em', marginBottom: '4px' }}>PLANT HEALTH</div>
                    <div style={{ fontSize: '2rem', fontWeight: '800' }}>{renderSafeValue(maintenanceScore)}%</div>
                  </div>
                  <div className="hero-stat">
                    <div style={{ fontSize: '0.75rem', fontWeight: '600', opacity: 0.6, letterSpacing: '0.05em', marginBottom: '4px' }}>LIVE ALERTS</div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: inventoryAlerts.length > 0 ? 'var(--danger)' : 'white' }}>{typeof inventoryAlerts.length === 'object' ? JSON.stringify(inventoryAlerts.length) : inventoryAlerts.length}</div>
                  </div>
                  <div className="hero-stat">
                    <div style={{ fontSize: '0.75rem', fontWeight: '600', opacity: 0.6, letterSpacing: '0.05em', marginBottom: '4px' }}>RELIABILITY</div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent)' }}>{renderSafeValue(reliability)}%</div>
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
                    {renderSafeValue(executiveSummary?.summary, "Analyzing plant telemetry... Overall production is stable with a 12% projected growth in net margin this month. Workforce skill index in Bhilwara cluster is up by 4%.")}
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
                <div className="stat-value">{renderSafeValue(pei, 0)}%</div>
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
                <div className="stat-value">{renderSafeValue(anomaly?.type, 'Normal')}</div>
                <div className="stat-label">AI Anomaly Monitor</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-icon"><ShieldCheck size={20} /></div>
                  <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>PREDICTIVE</span>
                </div>
                <div className="stat-value">{renderSafeValue(reliability, 0)}%</div>
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

              {/* RESTORED: Local Yarn Predictor */}
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
                        setLastAgentMsg(prev => ({ ...prev, yarn: "Mandi prices are rising. 500kg order will save 12,000 if placed now. Shall I draft the PO?" }));
                      }}
                    >Negotiate with Mandi</button>
                  )}

                  {yarnState === 1 && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                      <button className="btn-primary" style={{ flex: 1, background: '#10b981', border: 'none', color: 'black', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                        onClick={async () => {
                          setYarnState(2);
                          setLastAgentMsg(prev => ({ ...prev, yarn: "Proposed PO: 500kg. Waiting for Owner Approval in Command Terminal..." }));
                          const req = await triggerOwnerRequest('YarnAI', 'Purchase Order', 'Order 500kg Cotton Yarn from Sharma Suppliers at 240/kg.');
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
                      Approved & Finalized
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
                        setLastAgentMsg(prev => ({ ...prev, mahaparv: "I can re-program Looms 1-3 to the wedding design set. Expected revenue increase: 1.8L. Execute shift?" }));
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
                      Shift Approved
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
                  ) : cottonYarnState === 2 ? 'Material Ordered ' : 'Auto-Reorder Material'}
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
                        setLastAgentMsg(prev => ({ ...prev, truck: "I have 200 rolls ready. Negotiating 14,500 rate with driver MH-09. Book now?" }));
                      }}
                    >Contact Driver</button>
                  )}

                  {truckState === 1 && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                      <button className="btn-primary" style={{ flex: 1, background: '#3b82f6', border: 'none', color: 'white', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                        onClick={async () => {
                          setTruckState(2);
                          setLastAgentMsg(prev => ({ ...prev, truck: "Truck Request sent to Owner Terminal. Rate: 14,500." }));
                          const req = await triggerOwnerRequest('LogisticsAI', 'Truck Booking', 'Book empty return-truck MH-09 for Surat delivery at 14,500.');
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
                      Booking Approved
                    </div>
                  )}
                </div>
              </div>

              {/* NEW: Blockchain Logistics Manifest */}
              <div className="stat-card" style={{ border: '1px solid rgba(14, 165, 233, 0.3)', background: 'linear-gradient(180deg, rgba(8, 47, 73, 0.6) 0%, rgba(2, 6, 23, 0.9) 100%)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0ea5e9', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    <Box size={14} /> Blockchain Supply Ledger
                  </div>
                  <span className="badge" style={{ background: 'rgba(14, 165, 233, 0.15)', color: '#38bdf8', fontSize: '0.65rem', fontWeight: '800', border: '1px solid #0ea5e9' }}>VERIFIED</span>
                </div>

                {isSyncingBlockchain ? (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                    <div className="spin" style={{ width: '40px', height: '40px', border: '3px solid rgba(14, 165, 233, 0.1)', borderTopColor: '#0ea5e9', borderRadius: '50%' }}></div>
                    <div style={{ fontSize: '0.75rem', color: '#0ea5e9', letterSpacing: '1px' }}>SYNCING LEDGER NODES...</div>
                  </div>
                ) : logisticsManifest ? (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(14, 165, 233, 0.1)' }}>
                      <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginBottom: '4px' }}>IMMUTABLE BATCH ID</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{logisticsManifest.container}</div>
                      <div style={{ fontSize: '0.6rem', color: '#0ea5e9', marginTop: '4px', fontFamily: 'monospace' }}>HASH: {logisticsManifest.hash}</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div style={{ fontSize: '0.7rem' }}>
                        <div style={{ opacity: 0.5 }}>Origin</div>
                        <div style={{ fontWeight: 'bold' }}>Mundra Port</div>
                      </div>
                      <div style={{ fontSize: '0.7rem', textAlign: 'right' }}>
                        <div style={{ opacity: 0.5 }}>Destination</div>
                        <div style={{ fontWeight: 'bold' }}>Bursa, Turkey</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#10b981', padding: '6px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '4px', textAlign: 'center', border: '1px solid #10b981' }}>
                      <ShieldCheck size={12} style={{ display: 'inline', marginRight: '4px' }} /> Smart Contract Verified
                    </div>
                  </div>
                ) : (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '1.5rem' }}>Real-time export tracking secured by Solana blockchain nodes.</p>
                    <button className="btn-primary" style={{ background: '#0ea5e9', border: 'none', color: 'white', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }} onClick={handleLogisticsSync}>Fetch Verified Manifest</button>
                  </div>
                )}
              </div>

              {/* RESTORED: AI Dead-Stock Liquidator */}
              <div className="stat-card" style={{ border: '1px solid rgba(245, 158, 11, 0.3)', background: 'linear-gradient(180deg, rgba(66, 32, 6, 0.6) 0%, rgba(30, 10, 0, 0.8) 100%)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    <ArrowRight size={14} /> AI Dead-Stock Liquidator
                  </div>
                  <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', fontSize: '0.65rem', fontWeight: '800', border: '1px solid rgba(245, 158, 11, 0.3)' }}>REVENUE</span>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#f59e0b', marginBottom: '8px' }}>4.5L Trapped Inventory</div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', color: '#e2e8f0', borderLeft: '3px solid #f59e0b' }}>
                    <strong>LiquidityAI:</strong> {lastAgentMsg.deadStock}
                  </div>

                  {deadStockState === 0 && (
                    <button className="btn-primary" style={{ width: '100%', background: '#f59e0b', border: 'none', color: 'black', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', marginTop: 'auto' }}
                      onClick={() => {
                        setDeadStockState(1);
                        setLastAgentMsg(prev => ({ ...prev, deadStock: "I found 3 buyers in Surat interested in this Poly-Cotton batch. Current best bid: 4.25L. Accept?" }));
                      }}
                    >Find Buyers</button>
                  )}

                  {deadStockState === 1 && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                      <button className="btn-primary" style={{ flex: 1, background: '#f59e0b', border: 'none', color: 'black', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                        onClick={async () => {
                          setDeadStockState(2);
                          setLastAgentMsg(prev => ({ ...prev, deadStock: "Sent bid of 4.25L to Owner Portal for final sign-off." }));
                          const req = await triggerOwnerRequest('LiquidityAI', 'Stock Liquidation', 'Sell 3,000m rejected Navy Blue stock to Surat buyer for 4.25L.');
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
                      Liquidation Approved
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
                        setLastAgentMsg(prev => ({ ...prev, solar: "Grid prices are spiking. Shifting 4 high-torque looms to solar grid will save 2,400 today. Align?" }));
                      }}
                    >Check Savings</button>
                  )}

                  {solarState === 1 && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                      <button className="btn-primary" style={{ flex: 1, background: '#eab308', border: 'none', color: 'black', fontWeight: 'bold', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                        onClick={async () => {
                          setSolarState(2);
                          setLastAgentMsg(prev => ({ ...prev, solar: "Energy shift proposal sent to Owner Command Terminal." }));
                          const req = await triggerOwnerRequest('EnergyAI', 'Energy Grid Shift', 'Shift high-torque looms (4, 5, 8, 9) to solar grid to save 2,400.');
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
                      Grid Shift Approved
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
                    Technician Dispatched
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
            <div className="industrial-panel mt-6" style={{ background: 'linear-gradient(rgba(37, 211, 102, 0.05), transparent)', border: '1px solid rgba(37, 211, 102, 0.2)', padding: '1.5rem', borderRadius: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#25D366', margin: 0 }}>
                  <MessageCircle size={22} /> AI WhatsApp Factory Assistant (Voice & Signal Hub)
                </h3>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '15px' }}>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} style={{ width: '3px', height: `${20 * (i + 1)}%`, background: '#25D366', opacity: 0.8 }}></div>
                    ))}
                    <span style={{ fontSize: '0.6rem', color: '#25D366', fontWeight: 'bold', marginLeft: '5px' }}>SIGNAL: ENCRYPTED</span>
                  </div>
                </div>
              </div>

              {/* Real Twilio SMS Trigger */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'rgba(0,0,0,0.5)', padding: '6px 12px', borderRadius: '20px', border: '1px solid rgba(37,211,102,0.2)', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>External Link:</span>
                <input
                  type="text"
                  placeholder="+CountryCodeNumber"
                  value={twilioPhone}
                  onChange={(e) => setTwilioPhone(e.target.value)}
                  style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '0.8rem', outline: 'none', width: '150px' }}
                />
                <button
                  onClick={async () => {
                    if (!twilioPhone) return alert("Enter a phone number including country code (e.g., +1234567890)");
                    const msg = "SmartFactory AI Alert: I am your AI Factory Assistant. Core system synchronized. Waiting for your commands.";
                    try {
                      const res = await fetch('/api/whatsapp/send', {
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
                  style={{ background: twilioSent ? '#334155' : 'linear-gradient(90deg, #25D366, #128C7E)', color: 'white', border: 'none', borderRadius: '12px', padding: '6px 16px', fontSize: '0.75rem', fontWeight: 'bold', cursor: twilioSent ? 'default' : 'pointer', transition: 'all 0.3s' }}
                >
                  {twilioSent ? 'Transmitted ' : 'Engage Twilio Relay'}
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: '#0b141a', padding: '1.5rem', borderRadius: '16px', backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: 'cover', backgroundBlendMode: 'overlay', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>

                {/* Voice Feed Decoration */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #25D366, transparent)', opacity: 0.3, animation: 'neural-pulse 3s infinite' }}></div>

                {/* Message 1: AI General Prompt */}
                <div style={{ alignSelf: 'flex-start', background: '#202c33', padding: '10px 14px', borderRadius: '0 8px 8px 8px', maxWidth: '80%', boxShadow: '0 1px 2px rgba(0,0,0,0.3)', borderLeft: '3px solid #25D366' }}>
                  <div style={{ fontSize: '0.75rem', color: '#25D366', fontWeight: 'bold', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Mic size={12} /> Maha-Connect Voice Assistant
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '0.9rem', color: '#e9edef', lineHeight: '1.4', flex: 1 }}>
                      System online. I am monitoring the factory floor. <br /><br />
                      State your request or use the tactical suggestions below to command the factory.
                    </div>
                    <div style={{ display: 'flex', gap: '3px', height: '24px', alignItems: 'center' }}>
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="voice-bar" style={{ width: '3px', background: '#25D366', height: '8px', animationDelay: `${i * 0.2}s` }}></div>
                      ))}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#8696a0', textAlign: 'right', marginTop: '4px' }}>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>

                {/* Message 2: Exact User Request */}
                {waStep >= 1 && (
                  <div style={{ alignSelf: 'flex-end', background: '#005c4b', padding: '10px 14px', borderRadius: '8px 0 8px 8px', maxWidth: '80%', boxShadow: '0 1px 2px rgba(0,0,0,0.3)', marginTop: '8px', borderRight: '3px solid #53bdeb' }}>
                    <div style={{ fontSize: '0.9rem', color: '#e9edef', lineHeight: '1.4' }}>
                      {ownerReply}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#8696a0', textAlign: 'right', marginTop: '4px' }}>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} <span style={{ color: '#53bdeb', marginLeft: '2px' }}></span></div>
                  </div>
                )}

                {/* Message 3: AI Status Update */}
                {waStep >= 1 && (
                  <div style={{ alignSelf: 'flex-start', background: '#202c33', padding: '10px 14px', borderRadius: '0 8px 8px 8px', maxWidth: '80%', boxShadow: '0 1px 2px rgba(0,0,0,0.3)', marginTop: '8px', borderLeft: '3px solid #25D366' }}>
                    <div style={{ fontSize: '0.75rem', color: '#25D366', fontWeight: 'bold', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Zap size={12} /> Command Relay
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#e9edef', lineHeight: '1.4' }}>
                      {waStep === 1 ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div className="pulse" style={{ width: '8px', height: '8px', background: '#25D366', borderRadius: '50%' }}></div>
                          Transmitting command to Executive Terminal...
                        </div>
                      ) : waStep === 2 ? (
                        <div style={{ color: '#10b981', fontWeight: 'bold' }}>Command Executed by Owner </div>
                      ) : (
                        <div style={{ color: '#ef4444', fontWeight: 'bold' }}>Command Aborted by Owner </div>
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
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    {whatsappSuggestions.map(sugg => (
                      <button
                        key={sugg}
                        onClick={() => setOwnerReply(sugg)}
                        style={{ background: 'rgba(37, 211, 102, 0.05)', border: '1px solid rgba(37, 211, 102, 0.2)', color: '#25D366', borderRadius: '12px', padding: '6px 14px', fontSize: '0.7rem', cursor: 'pointer', transition: 'all 0.3s', whiteSpace: 'nowrap', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.5px' }}
                        onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(37, 211, 102, 0.1)'; e.currentTarget.style.borderColor = '#25D366'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(37, 211, 102, 0.05)'; e.currentTarget.style.borderColor = 'rgba(37, 211, 102, 0.2)'; }}
                      >
                        {sugg}
                      </button>
                    ))}
                  </div>

                  {/* Text Input Row */}
                  <div style={{ display: 'flex', gap: '8px', background: '#0b141a', padding: '10px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', alignItems: 'center' }}>
                    <input
                      type="text"
                      placeholder="State command for factory owner..."
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

            <AgentGrid categories={['Core Systems']} title="Core AI & Orchestration" focusedAgent={focusedAgent} setFocusedAgent={setFocusedAgent} />
          </div>
        )}


        {
          activeTab === 'operations' && (
            <div className="animate-fade-in" style={{ padding: '0 1rem 2rem', overflowY: 'auto' }}>

              {/* ======================================================================================
                  PLANT FLOOR HEADER + LIVE STATUS BAR
              ====================================================================================== */}
              <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(99,102,241,0.02) 40px, rgba(99,102,241,0.02) 80px)', pointerEvents: 'none' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                      <div style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 10px #10b981', animation: 'pulse 1.5s infinite' }} />
                      <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase', color: 'white' }}>Plant Floor Command</h2>
                      <span style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid #6366f1', color: '#a5b4fc', fontSize: '0.6rem', padding: '2px 8px', borderRadius: '4px', letterSpacing: '1px', fontWeight: 'bold' }}>BHILWARA {'\u2014'} UNIT 1</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', letterSpacing: '1px' }}>52 AI AGENTS ACTIVE {'\u2014'} REAL-TIME TELEMETRY SYNC {'\u2014'} EDGE NODE 4 ONLINE</div>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    {[
                      { label: 'LOOMS ACTIVE', value: '18/20', color: '#10b981' },
                      { label: 'OEE', value: '87.4%', color: '#6366f1' },
                      { label: 'DEFECT RATE', value: '0.8%', color: '#f59e0b' },
                      { label: 'ENERGY', value: '42kW', color: '#0ea5e9' },
                    ].map(s => (
                      <div key={s.label} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '1.4rem', fontWeight: '900', color: s.color, lineHeight: 1 }}>{s.value}</div>
                        <div style={{ fontSize: '0.55rem', color: '#64748b', letterSpacing: '1px', marginTop: '2px' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ======================================================================================
                  LIVE LOOM MAP - Animated Factory Floor Bird's Eye View
              ====================================================================================== */}
              <div style={{ background: '#0a0f1e', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: '#a5b4fc', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    <Factory size={18} /> Live Loom Floor Map \u2014 Section A & B
                  </h3>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '0.6rem', color: '#64748b' }}>
                    {[['#10b981', 'RUNNING'], ['#f59e0b', 'MAINTENANCE'], ['#ef4444', 'ALERT'], ['#334155', 'IDLE']].map(([c, l]) => (
                      <span key={l} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: c, display: 'inline-block' }} />{l}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '6px', marginBottom: '8px' }}>
                  {Array.isArray(machineStatus) && machineStatus.length > 0
                    ? machineStatus.map((m, i) => (
                      <div key={m.id} title={`${m.name} | Temp: ${m.temp}\u00B0C | RPM: ${m.rpm} | ${m.status}`} style={{
                        height: '42px', borderRadius: '6px', cursor: 'pointer',
                        background: m.status === 'Running' ? (m.temp > 85 ? 'rgba(239,68,68,0.4)' : 'rgba(16,185,129,0.25)') : m.status === 'Maintenance' ? 'rgba(245,158,11,0.25)' : 'rgba(30,41,59,0.8)',
                        border: `1px solid ${m.status === 'Running' ? (m.temp > 85 ? '#ef4444' : '#10b981') : m.status === 'Maintenance' ? '#f59e0b' : '#1e293b'}`,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.55rem', color: '#94a3b8', transition: 'all 0.3s',
                        boxShadow: m.status === 'Running' ? `0 0 8px ${m.temp > 85 ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.2)'}` : 'none',
                        position: 'relative', overflow: 'hidden'
                      }}>
                        {m.status === 'Running' && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${m.temp > 85 ? '#ef4444' : '#10b981'}, transparent)`, animation: 'scan 2s infinite' }} />}
                        <span style={{ fontWeight: '700', color: 'white', fontSize: '0.6rem' }}>{m.name?.replace('Loom ', 'L').replace(' Machine', '')}</span>
                        <span style={{ color: m.temp > 85 ? '#ef4444' : '#10b981', fontSize: '0.55rem' }}>{m.temp}\u00B0C</span>
                      </div>
                    ))
                    : [...Array(20)].map((_, i) => {
                      const statuses = ['Running', 'Running', 'Running', 'Running', 'Running', 'Running', 'Running', 'Running', 'Running', 'Running', 'Running', 'Running', 'Running', 'Running', 'Running', 'Running', 'Running', 'Maintenance', 'Running', 'Alert'];
                      const st = statuses[i];
                      const temp = Math.floor(Math.random() * 30) + 55;
                      return (
                        <div key={i} title={`Loom ${i + 1}`} style={{
                          height: '42px', borderRadius: '6px', cursor: 'pointer',
                          background: st === 'Running' ? 'rgba(16,185,129,0.25)' : st === 'Maintenance' ? 'rgba(245,158,11,0.25)' : 'rgba(239,68,68,0.25)',
                          border: `1px solid ${st === 'Running' ? '#10b981' : st === 'Maintenance' ? '#f59e0b' : '#ef4444'}`,
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.55rem', color: '#94a3b8',
                          boxShadow: st === 'Running' ? '0 0 8px rgba(16,185,129,0.2)' : 'none',
                          position: 'relative', overflow: 'hidden'
                        }}>
                          {st === 'Running' && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #10b981, transparent)', animation: 'scan 2s infinite' }} />}
                          <span style={{ fontWeight: '700', color: 'white', fontSize: '0.6rem' }}>L-{i + 1}</span>
                          <span style={{ color: '#10b981', fontSize: '0.55rem' }}>{temp}\u00B0C</span>
                        </div>
                      );
                    })
                  }
                </div>
                <div style={{ fontSize: '0.65rem', color: '#475569', textAlign: 'center', letterSpacing: '1px' }}>HOVER LOOM FOR TELEMETRY &#x2014; CLICK TO DISPATCH MAINTENANCE</div>
              </div>

              {/* ======================================================================================
                  REAL-TIME TELEMETRY GAUGES + QUICK STATS
              ====================================================================================== */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                {[
                  { label: 'Loom Vibration', value: machineVibration, max: 120, unit: 'Hz', warn: 80, color: '#6366f1', icon: Activity },
                  { label: 'Avg Temp', value: 68, max: 110, unit: '\u00B0C', warn: 85, color: '#f59e0b', icon: Thermometer },
                  { label: 'Production Speed', value: 87, max: 100, unit: '%', warn: 50, color: '#10b981', icon: TrendingUp },
                  { label: 'Grid Power Draw', value: 42, max: 80, unit: 'kW', warn: 65, color: '#0ea5e9', icon: Zap },
                  { label: 'Yarn Tension', value: 3.2, max: 6, unit: 'N/m', warn: 4.5, color: '#a855f7', icon: Layers },
                  { label: 'Safety Score', value: renderSafeValue(safety.ppeCompliance, 95), max: 100, unit: '%', warn: 80, color: '#ef4444', icon: ShieldCheck },
                ].map(({ label, value, max, unit, warn, color, icon: Icon }) => {
                  const numVal = parseFloat(value) || 0;
                  const pct = Math.min((numVal / max) * 100, 100);
                  const isWarn = numVal >= warn;
                  return (
                    <div key={label} style={{ background: '#0d1117', border: `1px solid ${isWarn ? color + '66' : 'rgba(255,255,255,0.05)'}`, borderRadius: '12px', padding: '1rem', transition: 'all 0.3s', boxShadow: isWarn ? `0 0 20px ${color}22` : 'none' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</span>
                        <Icon size={14} color={color} />
                      </div>
                      <div style={{ fontSize: '1.6rem', fontWeight: '900', color: isWarn ? color : 'white', lineHeight: 1 }}>
                        {numVal}<span style={{ fontSize: '0.7rem', color: '#64748b', marginLeft: '2px' }}>{unit}</span>
                      </div>
                      <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginTop: '10px' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: isWarn ? `linear-gradient(90deg, ${color}, #fff)` : color, borderRadius: '2px', transition: 'width 1s ease', boxShadow: isWarn ? `0 0 6px ${color}` : 'none' }} />
                      </div>
                      {isWarn && <div style={{ fontSize: '0.55rem', color, marginTop: '4px', fontWeight: 'bold', letterSpacing: '1px' }}>\u26A0 HIGH {'\u2014'} ACTION RECOMMENDED</div>}
                    </div>
                  );
                })}
              </div>

              {/* ======================================================================================
                  MACHINE LOOM VIBRATION SLIDER + LIVE AI RESPONSE
              ===================================================================================== */}
              <div style={{ background: '#0d1117', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: '0 0 1rem', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#a5b4fc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={16} /> Loom Vibration Frequency Controller (Live AI Feedback)
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.7rem', color: '#64748b' }}>0 Hz</span>
                      <span style={{ fontSize: '1.1rem', fontWeight: '900', color: machineVibration > 80 ? '#ef4444' : machineVibration > 60 ? '#f59e0b' : '#10b981' }}>{machineVibration} Hz</span>
                      <span style={{ fontSize: '0.7rem', color: '#64748b' }}>120 Hz</span>
                    </div>
                    <input type="range" min="0" max="120" value={machineVibration}
                      onChange={e => {
                        setMachineVibration(parseInt(e.target.value));
                        if (parseInt(e.target.value) > 80) setTicketGenerated(false);
                      }}
                      style={{ width: '100%', accentColor: machineVibration > 80 ? '#ef4444' : machineVibration > 60 ? '#f59e0b' : '#10b981', cursor: 'pointer' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '0.55rem', color: '#334155' }}>
                      <span>NORMAL</span><span>CAUTION</span><span>CRITICAL</span>
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: '200px', background: machineVibration > 80 ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.08)', border: `1px solid ${machineVibration > 80 ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.2)'}`, borderRadius: '12px', padding: '1rem' }}>
                    <div style={{ fontSize: '0.65rem', color: '#64748b', letterSpacing: '1px', marginBottom: '4px' }}>AI DIAGNOSIS {'\u2014'} LOOM 7</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '600', color: machineVibration > 80 ? '#ef4444' : '#10b981' }}>
                      {machineVibration > 80 ? '\u26A0 CRITICAL: Bearing wear detected. Lubrication failure likely.' : machineVibration > 60 ? '\u26A1 CAUTION: Elevated vibration. Monitor tension settings.' : '\u2713 NOMINAL: All mechanical parameters within spec.'}
                    </div>
                    {machineVibration > 80 && (
                      <button onClick={() => { setTicketGenerated(true); setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: `Maintenance AI: Emergency ticket raised for Loom 7 (Vib: ${machineVibration}Hz). Technician dispatched.`, type: 'warning' }, ...prev]); triggerOwnerRequest('MaintenanceAI', 'Emergency Bearing Repair', `Loom 7 vibration at ${machineVibration}Hz. Bearing failure imminent.`); }}
                        style={{ marginTop: '10px', background: ticketGenerated ? '#10b981' : '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', cursor: ticketGenerated ? 'default' : 'pointer', width: '100%' }}>
                        {ticketGenerated ? '\u2713 MAINTENANCE TICKET RAISED' : 'RAISE EMERGENCY TICKET \u2192'}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* —————————————————————————————————————————————————————————————————————————————————————
                  TWIN PANEL: COMPUTER VISION + LIVE AI CONSOLE
              ————————————————————————————————————————————————————————————————————————————————————— */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>

                {/* Computer Vision Camera */}
                <div style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(0,0,0,0) 100%)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '16px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Video size={16} /> CV Defect Detection
                    </h3>
                    <button onClick={toggleCamera} style={{ background: isCameraActive ? '#ef4444' : '#7c3aed', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Video size={11} /> {isCameraActive ? 'STOP' : 'ACTIVATE'}
                    </button>
                  </div>
                  <div style={{ width: '100%', height: '200px', background: '#000', borderRadius: '10px', position: 'relative', overflow: 'hidden', border: '1px solid rgba(139,92,246,0.2)' }}>
                    {/* Live camera video */}
                    <video ref={videoRef} autoPlay playsInline muted onPlaying={() => setIsStreamReady(true)}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, opacity: (isCameraActive && isStreamReady) ? 1 : 0, zIndex: 5, transition: 'opacity 0.5s' }} />
                    <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none', display: (isCameraActive && isStreamReady) ? 'block' : 'none' }} />
                    {/* Simulated loom texture background */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, #0a0a0a 25%, #1a1a2e 50%, #0a0a0a 75%)', backgroundSize: '4px 4px', opacity: (!isCameraActive || !isStreamReady) ? 1 : 0, zIndex: 2, transition: 'opacity 0.5s' }}>
                      {/* Grid lines simulating fabric */}
                      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(99,102,241,0.08) 8px, rgba(99,102,241,0.08) 9px), repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(99,102,241,0.08) 8px, rgba(99,102,241,0.08) 9px)' }} />
                    </div>
                    {/* Scanner line always visible */}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: 'linear-gradient(180deg, transparent, #8b5cf6, transparent)', boxShadow: '0 0 12px #8b5cf6', animation: 'scan 3s infinite linear', zIndex: 15 }} />
                    {/* Dynamic defect markers */}
                    <div style={{ position: 'absolute', top: cvDefect.top, left: cvDefect.left, border: `2px solid ${cvDefect.color}`, width: '50px', height: '50px', backgroundColor: `${cvDefect.color}22`, transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)', boxShadow: `0 0 15px ${cvDefect.color}66`, zIndex: 20 }}>
                      <div style={{ background: cvDefect.color, color: 'white', fontSize: '0.5rem', padding: '1px 4px', fontWeight: 'bold', position: 'absolute', top: '-18px', left: '-2px', whiteSpace: 'nowrap', borderRadius: '2px' }}>{cvDefect.label}</div>
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '4px', height: '4px', background: cvDefect.color, borderRadius: '50%', boxShadow: `0 0 8px ${cvDefect.color}` }} />
                    </div>
                    {/* Top-left model badge */}
                    <div style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '4px', padding: '2px 8px', fontSize: '0.55rem', color: '#a78bfa', fontWeight: 'bold', zIndex: 25, letterSpacing: '1px' }}>YOLOv8 ACTIVE</div>
                    {/* REC badge */}
                    <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(0,0,0,0.7)', padding: '3px 8px', borderRadius: '4px', zIndex: 25 }}>
                      <div style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%', animation: 'pulse 1s infinite' }} />
                      <span style={{ fontSize: '0.55rem', color: 'white', fontWeight: 'bold', letterSpacing: '1px' }}>{isCameraActive ? 'LIVE' : 'SIM'}</span>
                    </div>
                    {cameraError && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', fontSize: '0.75rem', fontWeight: 'bold', textAlign: 'center', padding: '1rem', zIndex: 30 }}>{cameraError}<br /><span style={{ color: '#64748b', fontSize: '0.65rem', marginTop: '4px', display: 'block' }}>Simulated feed active</span></div>}
                  </div>
                  {/* Defect Stats */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '6px', marginTop: '10px' }}>
                    {[['DEFECTS/HR', '3'], ['CONFIDENCE', '97.2%'], ['FPS', '24']].map(([l, v]) => (
                      <div key={l} style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: '6px', padding: '6px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#a78bfa' }}>{v}</div>
                        <div style={{ fontSize: '0.5rem', color: '#475569', letterSpacing: '1px' }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live AI System Console */}
                <div style={{ background: '#030712', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '16px', padding: '1.25rem', fontFamily: 'monospace' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '0.8rem', letterSpacing: '2px', color: '#10b981', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Cpu size={14} /> AI System Console
                    </h3>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {['#ef4444', '#f59e0b', '#10b981'].map(c => <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />)}
                    </div>
                  </div>
                  <div style={{ maxHeight: '230px', overflowY: 'auto', fontSize: '0.65rem', lineHeight: '1.8' }}>
                    {Array.isArray(systemEvents) && systemEvents.map(ev => (
                      <div key={ev.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '3px', marginBottom: '3px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ color: '#334155', minWidth: '55px', flexShrink: 0 }}>[{ev.time}]</span>
                        <span style={{ color: ev.type === 'danger' ? '#ef4444' : ev.type === 'warning' ? '#f59e0b' : ev.type === 'success' ? '#10b981' : '#a5b4fc' }}>
                          {ev.type === 'danger' ? '\u2716 ' : ev.type === 'warning' ? '\u26A0 ' : ev.type === 'success' ? '\u2714 ' : '\u203A '}{ev.msg}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* —————————————————————————————————————————————————————————————————————————————————————
                  AI ACTION COMMAND PANELS
              ————————————————————————————————————————————————————————————————————————————————————— */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>

                {/* 1. Voice-Assisted Panel */}
                <div style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, transparent 100%)', border: `1px solid ${isVoiceActive ? '#3b82f6' : 'rgba(59,130,246,0.2)'}`, borderRadius: '14px', padding: '1.25rem', transition: 'all 0.3s', boxShadow: isVoiceActive ? '0 0 30px rgba(59,130,246,0.2)' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontSize: '0.65rem', color: '#60a5fa', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '4px' }}>VOICE AI {'\u2014'} HINDI/MARWARI</div>
                      <h4 style={{ margin: 0, color: 'white', fontSize: '0.95rem' }}>Karigar Voice Log</h4>
                    </div>
                    <Mic size={20} color="#3b82f6" />
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 1rem', lineHeight: '1.5' }}>
                    Shop-floor workers tap and speak in Hindi/Marwari to log downtime, thread breaks, or request maintenance {'\u2014'} no typing required.
                  </p>
                  {isVoiceActive && (
                    <div style={{ display: 'flex', gap: '3px', height: '30px', alignItems: 'flex-end', marginBottom: '10px' }}>
                      {[...Array(12)].map((_, i) => (
                        <div key={i} style={{ flex: 1, background: '#3b82f6', borderRadius: '2px', animation: `pulse ${0.3 + i * 0.07}s infinite alternate`, height: `${20 + Math.random() * 80}%`, opacity: 0.7 + i / 20 }} />
                      ))}
                    </div>
                  )}
                  <button onClick={handleVoiceAction} disabled={isVoiceActive} style={{ width: '100%', background: isVoiceActive ? '#1d4ed8' : '#3b82f6', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: isVoiceActive ? 'default' : 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: isVoiceActive ? '0 0 15px rgba(59,130,246,0.4)' : 'none', transition: 'all 0.3s' }}>
                    <Mic size={15} /> {voiceStep === 0 ? '\uD83C\uDFA4 Tap to Log (Hindi/Marwari)' : voiceStep === 1 ? '\uD83D\uDD34 LISTENING...' : voiceStep === 2 ? '\u26A1 TRANSCRIBING...' : '\u2713 LOGGED TO SYSTEM'}
                  </button>
                </div>

                {/* 2. Digital Twin */}
                <div style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.08) 0%, transparent 100%)', border: `1px solid ${isTwinLoading ? '#a855f7' : 'rgba(168,85,247,0.2)'}`, borderRadius: '14px', padding: '1.25rem', boxShadow: isTwinLoading ? '0 0 30px rgba(168,85,247,0.2)' : 'none', transition: 'all 0.3s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontSize: '0.65rem', color: '#c084fc', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '4px' }}>SPATIAL AI {'\u2014'} 3D HEATWAVE</div>
                      <h4 style={{ margin: 0, color: 'white', fontSize: '0.95rem' }}>Holographic Digital Twin</h4>
                    </div>
                    <Box size={20} color="#a855f7" />
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 1rem', lineHeight: '1.5' }}>
                    Projects a spatial mesh of the factory floor. Red zones = high mechanical resonance. Detects micro-fractures before failures occur.
                  </p>
                  {isTwinLoading && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '3px', marginBottom: '10px' }}>
                      {[...Array(20)].map((_, i) => {
                        const heat = Math.random();
                        return <div key={i} style={{ height: '12px', borderRadius: '2px', background: heat > 0.7 ? '#ef4444' : heat > 0.4 ? '#f59e0b' : '#10b981', opacity: 0.6 + heat * 0.4, animation: `pulse ${0.5 + Math.random()}s infinite` }} />;
                      })}
                    </div>
                  )}
                  <button onClick={() => { if (isTwinLoading) return; setIsTwinLoading(true); setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: 'Digital Twin: Loading spatial mesh. Heatwave layers active...', type: 'info' }, ...prev]); setTimeout(() => { setIsTwinLoading(false); setShowTwinModal(true); setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: 'Digital Twin: Loom 7 \u2014 High resonance at bearing housing. Schedule inspection.', type: 'warning' }, ...prev]); }, 5000); }} style={{ width: '100%', background: isTwinLoading ? '#7c3aed' : 'linear-gradient(90deg, #a855f7, #8b5cf6)', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: isTwinLoading ? 'default' : 'pointer', fontSize: '0.8rem', transition: 'all 0.3s' }}>
                    {isTwinLoading ? '\u26A1 LOADING SPATIAL MESH...' : '\uD83D\uDCE1 Load 3D Spatial Twin'}
                  </button>
                </div>

                {/* 3. Omni Orchestrator */}
                <div style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, transparent 100%)', border: `1px solid ${isOrchestrating ? '#3b82f6' : 'rgba(59,130,246,0.2)'}`, borderRadius: '14px', padding: '1.25rem', position: 'relative', overflow: 'hidden', boxShadow: isOrchestrating ? '0 0 30px rgba(59,130,246,0.2)' : 'none', transition: 'all 0.3s' }}>
                  {isOrchestrating && microAdjustments.map(ma => (
                    <div key={ma.id} style={{ position: 'absolute', top: ma.top, left: ma.left, background: '#3b82f6', color: 'white', fontSize: '0.5rem', padding: '2px 5px', borderRadius: '3px', fontWeight: 'bold', pointerEvents: 'none', animation: 'fadeIn 0.3s ease', zIndex: 5 }}>{ma.text}</div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontSize: '0.65rem', color: '#60a5fa', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '4px' }}>QUANTUM SWARM {'\u2014'} 28 AGENTS</div>
                      <h4 style={{ margin: 0, color: 'white', fontSize: '0.95rem' }}>Omni-Orchestrator</h4>
                    </div>
                    <Network size={20} color="#3b82f6" />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Global Optimum</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#10b981' }}>99.98%</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 1rem', lineHeight: '1.5' }}>
                    Micro-adjusts all 28 looms 100\u00D7/sec simultaneously {'\u2014'} balancing Speed vs Energy vs Quality in real-time.
                  </p>
                  <button onClick={() => { if (isOrchestrating) return; setIsOrchestrating(true); setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: 'Quantum-Swarm: Engaging Universal Orchestration across Cluster B...', type: 'info' }, ...prev]); const adj = setInterval(() => { const labels = ['SPD +0.2%', 'TEN -1.5g', 'LUB ON', 'VOLT ADJ', 'SYNC OK', 'RPM +3', 'TMP OK']; setMicroAdjustments(prev => [...prev, { id: Date.now(), text: labels[Math.floor(Math.random() * labels.length)], top: `${Math.random() * 70}%`, left: `${Math.random() * 70}%` }].slice(-6)); }, 600); setTimeout(() => { clearInterval(adj); setIsOrchestrating(false); setMicroAdjustments([]); setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: 'Quantum-Swarm: Global Optimum achieved. All looms synchronized.', type: 'success' }, ...prev]); }, 6000); }} style={{ width: '100%', background: isOrchestrating ? '#1e3a5f' : 'linear-gradient(90deg, #3b82f6, #6366f1)', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: isOrchestrating ? 'default' : 'pointer', fontSize: '0.8rem', transition: 'all 0.3s' }}>
                    {isOrchestrating ? '\u26A1 OPTIMIZING ALL LOOMS...' : '\uD83D\uDD17 Engage Universal Orchestration'}
                  </button>
                </div>

                {/* 4. Karigar Skill Atlas */}
                <div style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, transparent 100%)', border: `1px solid ${karigarAssigned ? 'rgba(16,185,129,0.4)' : 'rgba(139,92,246,0.2)'}`, borderRadius: '14px', padding: '1.25rem', transition: 'all 0.3s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontSize: '0.65rem', color: '#a78bfa', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '4px' }}>ML {'\u2014'} SKILL MAPPING</div>
                      <h4 style={{ margin: 0, color: 'white', fontSize: '0.95rem' }}>Karigar Skill-Atlas</h4>
                    </div>
                    <Users size={20} color="#8b5cf6" />
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 10px', lineHeight: '1.5' }}>
                    Maps each weaver's output quality against specific loom types and yarn batches. Assigns the optimal Karigar to minimize loom stoppage.
                  </p>
                  {karigarAssigned && (
                    <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '8px', padding: '8px 12px', marginBottom: '10px', fontSize: '0.75rem', color: '#10b981' }}>
                      \u2713 Ramesh K. \u2192 Loom 14 (Suiting Batch-92) | Skill Match: 96%
                    </div>
                  )}
                  <button onClick={() => { if (karigarAssigned) return; setKarigarAssigned(true); setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: "Karigar ML: Ramesh K. matched to Loom 14 for Suiting Batch-92 (96% skill match).", type: 'success' }, ...prev]); }} style={{ width: '100%', background: karigarAssigned ? '#065f46' : '#7c3aed', color: 'white', border: `1px solid ${karigarAssigned ? '#10b981' : 'transparent'}`, padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: karigarAssigned ? 'default' : 'pointer', fontSize: '0.8rem', transition: 'all 0.3s' }}>
                    {karigarAssigned ? '\u2713 KARIGAR ASSIGNED \u2014 LOOM 14' : '\uD83E\uDDE0 Assign Best Karigar'}
                  </button>
                </div>

                {/* 5. Grid Predictor */}
                <div style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, transparent 100%)', border: `1px solid ${isSyncingGenerators ? '#f59e0b' : 'rgba(245,158,11,0.2)'}`, borderRadius: '14px', padding: '1.25rem', transition: 'all 0.3s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontSize: '0.65rem', color: '#fbbf24', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '4px' }}>BHILWARA GRID {'\u2014'} DISCOM AI</div>
                      <h4 style={{ margin: 0, color: 'white', fontSize: '0.95rem' }}>Grid Power Predictor</h4>
                    </div>
                    <Zap size={20} color="#f59e0b" />
                  </div>
                  <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '8px', padding: '8px 12px', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                      <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>\u26A1 Grid Cut Predicted: 2:00 PM</span>
                      <span style={{ color: '#64748b' }}>Confidence: 89%</span>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px' }}>Action: Pre-heat DG Sets by 1:45 PM</div>
                  </div>
                  <button onClick={() => { if (isSyncingGenerators) return; setIsSyncingGenerators(true); setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: 'Bhilwara Grid AI: Syncing DG Sets with main metering. ETA 4s.', type: 'warning' }, ...prev]); setTimeout(() => { setIsSyncingGenerators(false); setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: 'Bhilwara Grid: Generators synced. Load-shedding protection ACTIVE until 3PM.', type: 'success' }, ...prev]); }, 4000); }} style={{ width: '100%', background: isSyncingGenerators ? '#92400e' : '#f59e0b', color: isSyncingGenerators ? 'white' : 'black', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: isSyncingGenerators ? 'default' : 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'all 0.3s' }}>
                    <Cpu size={14} className={isSyncingGenerators ? 'spin' : ''} /> {isSyncingGenerators ? 'SYNCING GENERATORS...' : '\u26A1 Auto-Sync DG Sets'}
                  </button>
                </div>

                {/* 6. Thermal Fire Predictor */}
                <div style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.08) 0%, transparent 100%)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '14px', padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontSize: '0.65rem', color: '#f87171', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '4px' }}>THERMAL AI {'\u2014'} FIRE SAFETY</div>
                      <h4 style={{ margin: 0, color: 'white', fontSize: '0.95rem' }}>Lint-Fire Predictor</h4>
                    </div>
                    <Flame size={20} color="#ef4444" />
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    {[['42\u00B0C', 'Sec A', '#10b981'], ['47\u00B0C', 'Sec B', '#f59e0b'], ['39\u00B0C', 'Sec C', '#10b981'], ['52\u00B0C', 'Sec D', '#ef4444']].map(([t, s, c]) => (
                      <div key={s} style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '6px', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '800', color: c }}>{t}</div>
                        <div style={{ fontSize: '0.5rem', color: '#64748b' }}>{s}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '8px', fontSize: '0.7rem', color: '#f87171', marginBottom: '10px' }}>
                    \u26A0 Section D (52\u00B0C) {'\u2014'} Lint accumulation detected. Misting trigger threshold: 55\u00B0C
                  </div>
                  <button onClick={() => { setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: 'Thermal AI: Overhead misting activated for Section D. Fire risk neutralized.', type: 'success' }, ...prev]); alert('Overhead misting system activated for Section D. Lint hotspot suppressed.'); }} style={{ width: '100%', background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem', transition: 'all 0.3s' }}>
                    \uD83D\uDD25 Activate Section D Misting
                  </button>
                </div>

                {/* 7. Shift Optimizer */}
                <div style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, transparent 100%)', border: `1px solid ${isOptimizingShift ? '#f97316' : 'rgba(249,115,22,0.2)'}`, borderRadius: '14px', padding: '1.25rem', transition: 'all 0.3s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontSize: '0.65rem', color: '#fb923c', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '4px' }}>LABOR AI {'\u2014'} FATIGUE MONITOR</div>
                      <h4 style={{ margin: 0, color: 'white', fontSize: '0.95rem' }}>Shift Rotation Optimizer</h4>
                    </div>
                    <Users size={20} color="#f97316" />
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', fontSize: '0.7rem' }}>
                    {[['Shift A', '8', '#10b981'], ['Shift B', '\u26A0 6h+', '#ef4444'], ['Relief', '4 avail', '#6366f1']].map(([l, v, c]) => (
                      <div key={l} style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '6px', padding: '6px', textAlign: 'center' }}>
                        <div style={{ fontWeight: '800', color: c }}>{v}</div>
                        <div style={{ color: '#64748b', fontSize: '0.55rem' }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => { if (isOptimizingShift) return; setIsOptimizingShift(true); setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: 'Labor AI: Analyzing fatigue vectors for Shift B. Calculating rotation...', type: 'info' }, ...prev]); setTimeout(() => { setIsOptimizingShift(false); setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: 'Labor AI: 4 relief weavers assigned to Sector 4. Shift B fatigue risk eliminated.', type: 'success' }, ...prev]); }, 3500); }} style={{ width: '100%', background: isOptimizingShift ? '#7c2d12' : '#f97316', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: isOptimizingShift ? 'default' : 'pointer', fontSize: '0.8rem', transition: 'all 0.3s' }}>
                    {isOptimizingShift ? '\u26A1 CALCULATING ROTATION...' : '\uD83D\uDC77 Optimize Shift Rotation'}
                  </button>
                </div>
              </div>

              {/* ======================================================================================
                  LIVE MACHINE STATUS \u2014 DETAILED CARDS
              ===================================================================================== */}
              <div style={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: '0 0 1rem', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={16} /> Live Machine Telemetry
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                  {Array.isArray(machineStatus) && machineStatus.map(m => (
                    <div key={m.id} style={{ background: '#0d1117', border: `1px solid ${m.status === 'Running' ? (m.temp > 85 ? 'rgba(239,68,68,0.4)' : 'rgba(16,185,129,0.2)') : 'rgba(245,158,11,0.3)'}`, borderRadius: '12px', padding: '1rem', position: 'relative', overflow: 'hidden', transition: 'all 0.3s' }}>
                      {m.status === 'Running' && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${m.temp > 85 ? '#ef4444' : '#10b981'}, transparent)`, animation: 'scan 2s infinite linear' }} />}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'white' }}>{m.name}</span>
                        <span style={{ fontSize: '0.55rem', padding: '2px 6px', borderRadius: '3px', fontWeight: 'bold', letterSpacing: '0.5px', background: m.status === 'Running' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)', color: m.status === 'Running' ? '#10b981' : '#f59e0b', border: `1px solid ${m.status === 'Running' ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}` }}>{m.status?.toUpperCase()}</span>
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: '#475569', marginBottom: '3px' }}>
                          <span>Health</span><span style={{ color: m.health > 70 ? '#10b981' : '#ef4444' }}>{m.health}%</span>
                        </div>
                        <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                          <div style={{ height: '100%', width: `${m.health}%`, background: m.health > 70 ? '#10b981' : '#ef4444', borderRadius: '2px', boxShadow: `0 0 6px ${m.health > 70 ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}` }} />
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
                        {[['TEMP', `${m.temp}\u00B0C`, m.temp > 85 ? '#ef4444' : '#94a3b8'], ['RPM', m.rpm, '#6366f1'], ['VIB', m.vibration, m.vibration === 'High' ? '#ef4444' : '#10b981']].map(([l, v, c]) => (
                          <div key={l} style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '6px', padding: '5px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: '800', color: c }}>{v}</div>
                            <div style={{ fontSize: '0.45rem', color: '#334155', letterSpacing: '0.5px' }}>{l}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <AgentGrid categories={['Operations', 'Quality Control', 'Labor & HR']} title="Production & Operations AI" focusedAgent={focusedAgent} setFocusedAgent={setFocusedAgent} />

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
            </div>
          )
        }








        {
          activeTab === 'maintenance' && (
            <div className="maintenance-panel animate-fade-in mesh-bg" style={{ padding: '2rem', borderRadius: '30px', minHeight: '100vh' }}>

              {/* 1. Header & Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
                <div>
                  <h1 className="text-gradient-primary" style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '0.5rem' }}>Predictive Maintenance</h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div className="pulse" style={{ width: '8px', height: '8px', background: '#A2CB8B', borderRadius: '50%' }}></div> Live Telemetry Active</div>
                    <span>•</span>
                    <div>Factory: <strong>Bhilwara Cluster - A</strong></div>
                    <span>•</span>
                    <div>Shift: <strong style={{ color: 'var(--accent)' }}>{currentShift}</strong></div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    className={`btn-primary ${isScanning ? 'pulse' : ''}`}
                    style={{ background: 'rgba(132, 177, 121,0.05)', border: '1px solid rgba(132, 177, 121,0.1)', backdropFilter: 'blur(10px)', color: '#fff' }}
                    onClick={() => {
                      setIsScanning(true);
                      setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: 'Full System Scan Initiated...', type: 'info' }, ...prev]);
                      setTimeout(() => {
                        setIsScanning(false);
                        setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: 'System integrity verified. All nodes responding.', type: 'success' }, ...prev]);
                      }, 3000);
                    }}
                  >
                    <BrainCircuit size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> {isScanning ? 'Scanning...' : 'Full System Scan'}
                  </button>
                  <button className="btn-primary" onClick={() => setShowShiftModal(true)}>
                    <Zap size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> {userRole === 'Strategic Owner' ? 'Strategy Hub' : 'Optimize Power'}
                  </button>
                  {userRole !== 'Operator' && (
                    <button
                      className="btn-primary"
                      style={{ background: 'var(--accent)', color: 'black' }}
                      onClick={() => setSelectedMachineReport('Loom #1')}
                    >
                      <FileScan size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Financial Reports
                    </button>
                  )}
                </div>
              </div>

              {/* 2. Advanced KPI Dashboard (Role-Differentiated) */}
              <div className="stats-grid" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
                {userRole === 'Strategic Owner' ? (
                  <>
                    {/* OWNER VIEW: Financial Metrics */}
                    {/* STRATEGIC OWNER VIEW (Admin): Financial Metrics */}
                    <div className="premium-card" style={{ padding: '1.5rem', borderBottom: '3px solid #84B179' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <div className="glass-icon"><DollarSign size={24} color="#84B179" /></div>
                        <div className="badge badge-success">Asset Protection</div>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Machine Depreciation Index</div>
                      <div style={{ fontSize: '2.2rem', fontWeight: '900' }}>{strategicPdM.totalDepreciation}</div>
                      <div style={{ marginTop: '15px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Net asset value loss across Loom fleet</div>
                    </div>

                    <div className="premium-card" style={{ padding: '1.5rem', borderBottom: '3px solid #F43F5E' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <div className="glass-icon" style={{ background: 'rgba(244, 63, 94, 0.1)' }}><Zap size={24} color="#F43F5E" /></div>
                        <div className="badge badge-danger">Critical Risk</div>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>At-Risk Capital Forecast</div>
                      <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#F43F5E' }}>{strategicPdM.revenueAtRisk}</div>
                      <div style={{ marginTop: '15px', fontSize: '0.8rem', color: 'rgba(244, 63, 94, 0.8)', fontWeight: 'bold' }}>Unplanned downtime threat to revenue</div>
                    </div>

                    <div className="premium-card" style={{ padding: '1.5rem', borderBottom: '3px solid var(--accent)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <div className="glass-icon" style={{ background: 'rgba(162, 203, 139, 0.1)' }}><TrendingUp size={24} color="var(--accent)" /></div>
                        <div className="badge" style={{ background: 'rgba(162, 203, 139, 0.1)', color: 'var(--accent)' }}>+ROI Optimization</div>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Net Profit Gain from PdM</div>
                      <div style={{ fontSize: '2.2rem', fontWeight: '900' }}>{strategicPdM.netEbitdaImpact}</div>
                      <div style={{ marginTop: '15px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Additional profit secured via AI overrides</div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* MANAGER/OPERATOR VIEW: Operational Metrics */}
                    <div className="premium-card" style={{ padding: '1.5rem', borderBottom: '3px solid #A2CB8B' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <div className="glass-icon"><Clock size={24} color="#A2CB8B" /></div>
                        <div className="badge badge-success">Optimal</div>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Remaining Useful Life</div>
                      <div style={{ fontSize: '2.2rem', fontWeight: '900' }}>{advancedPdM.remainingLifeHours}<span style={{ fontSize: '1rem', color: 'var(--text-muted)', marginLeft: '4px' }}>Hrs</span></div>
                      <div className="maturity-bar-bg"><div className="maturity-bar-fill" style={{ width: '92%', background: '#A2CB8B' }}></div></div>
                    </div>

                    <div className="premium-card" style={{ padding: '1.5rem', borderBottom: '3px solid #84B179', position: 'relative' }}>
                      {(userRole === 'Operator') && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px' }}>
                          <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#fff', textAlign: 'center', padding: '10px' }}>Manager Authorization Required</div>
                        </div>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <div className="glass-icon"><ShieldAlert size={24} color="#84B179" /></div>
                        <div className="badge badge-warning" style={{ color: '#1E1E1E' }}>Attention</div>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Cumulative Failure Risk</div>
                      <div style={{ fontSize: '2.2rem', fontWeight: '900' }}>{advancedPdM.failureProbability}%</div>
                      <div style={{ marginTop: '15px', fontSize: '0.85rem', color: 'var(--danger)', fontWeight: '800' }}>
                        {advancedPdM.productionLossEstimate} potential loss
                      </div>
                    </div>

                    <div className="premium-card" style={{ padding: '1.5rem', borderBottom: '3px solid #A2CB8B' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <div className="glass-icon"><Activity size={24} color="#A2CB8B" /></div>
                        <div className="badge badge-success">Live Sync</div>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Fleet Health Score</div>
                      <div style={{ fontSize: '2.2rem', fontWeight: '900' }}>{advancedPdM.healthScore}%</div>
                      <div className="maturity-bar-bg"><div className="maturity-bar-fill" style={{ width: `${advancedPdM.healthScore}%`, background: '#A2CB8B' }}></div></div>
                    </div>

                    <div className="premium-card" style={{ padding: '1.5rem', borderBottom: '3px solid var(--primary)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <div className="glass-icon"><Briefcase size={24} color="var(--primary)" /></div>
                        <div className="badge" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>Critical Priority</div>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Technical Backlog Depth</div>
                      <div style={{ fontSize: '2.2rem', fontWeight: '900' }}>{advancedPdM.backlogItems} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Units</span></div>
                      <div style={{ marginTop: '15px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        High-latency maintenance queue items
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* 3. Fleet Analytics & Live Sensors (Show only key highlights for Operator) */}
              <div className="charts-grid" style={{ gap: '1.5rem', marginBottom: '2rem', gridTemplateColumns: userRole === 'Operator' ? '1fr' : 'minmax(0, 1fr) 400px' }}>
                <div className="premium-card" style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h3 className="section-title"><LayoutDashboard size={20} color="var(--primary)" /> Machine Fleet Intelligence</h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '15px' }}>
                      <span>🟢 Healthy: 4</span>
                      <span>🟡 Warning: 1</span>
                      <span>🔴 Critical: 1</span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                    {fleetData.map((m, i) => (
                      <div
                        key={i}
                        className="ecosystem-item"
                        onClick={() => {
                          setSelectedMachineReport(m.name);
                          document.querySelector('.section-title')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{ border: `1px solid ${m.color}20`, padding: '1rem', background: 'rgba(132, 177, 121,0.01)', cursor: 'pointer' }}
                      >
                        <div className="node-dot" style={{ background: m.color }}>
                          <div className="node-pulse" style={{ background: m.color }}></div>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{m.name}</span>
                            <span style={{ color: m.color, fontWeight: '900' }}>{m.score}%</span>
                          </div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                            <span>{m.status}</span>
                            <span>{m.trend}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {userRole !== 'Operator' && (
                  <div className="premium-card" style={{ padding: '2rem' }}>
                    <h3 className="section-title"><Waves size={20} color="#84B179" /> Real-Time Telemetry</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      {[
                        { icon: <Thermometer size={18} />, label: 'Chasis Temperature', value: liveSensors.temp, unit: ' °C', color: '#1E1E1E', trend: liveSensors.tempTrend },
                        { icon: <Activity size={18} />, label: 'Spindle Vibration', value: liveSensors.vibration, unit: ' mm/s', color: '#1E1E1E', trend: liveSensors.vibrationTrend },
                        { icon: <Wind size={18} />, label: 'Hydraulic Pressure', value: liveSensors.pressure, unit: ' PSI', color: '#1E1E1E', trend: 2 },
                        { icon: <Zap size={18} />, label: 'Bus Power Consumption', value: liveSensors.power, unit: ' kW', color: '#A2CB8B', trend: -0.5 },
                      ].map((s, i) => (
                        <div key={i} style={{ background: 'rgba(132, 177, 121,0.03)', padding: '1.2rem', borderRadius: '15px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                              <div style={{ color: s.color }}>{s.icon}</div> {s.label}
                            </div>
                            <div style={{ fontSize: '1.2rem', fontWeight: '900' }}>{s.value}<span style={{ fontSize: '0.8rem', opacity: 0.5 }}>{s.unit}</span></div>
                          </div>
                          <div style={{ position: 'relative', height: '30px' }}>
                            <svg width="100%" height="30" viewBox="0 0 200 30" preserveAspectRatio="none">
                              <path d={`M 0 15 Q 25 ${15 - s.trend * 10} 50 15 T 100 15 T 150 15 T 200 15`} fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round">
                                <animate attributeName="d" dur="3s" repeatCount="indefinite" values={`M 0 15 Q 25 ${15 - s.trend * 10} 50 15 T 100 15 T 150 15 T 200 15; M 0 15 Q 25 ${15 + s.trend * 10} 50 15 T 100 15 T 150 15 T 200 15; M 0 15 Q 25 ${15 - s.trend * 10} 50 15 T 100 15 T 150 15 T 200 15`} />
                              </path>
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {userRole !== 'Operator' && (
                <>
                  {/* 4. Failure Report Hub (Machine Comparison & Role-Specific Audits) */}
                  <div className="premium-card" style={{ padding: '2.5rem', marginBottom: '2rem', background: 'rgba(0,0,0,0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                      <div>
                        <h3 className="section-title" style={{ fontSize: '1.4rem' }}><FileScan size={24} color="var(--primary)" /> Failure Analysis & Strategic Report Hub</h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Compare machine failure metrics and authorize role-specific interventions.</p>
                      </div>
                      <div className="badge badge-success" style={{ padding: '8px 15px' }}>Data Integrity: 100%</div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
                      {/* Machine Selector Sidebar */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {['Loom #1', 'Loom #7', 'Loom #4'].map(machine => (
                          <div
                            key={machine}
                            onClick={() => setSelectedMachineReport(machine)}
                            className={`ecosystem-item ${selectedMachineReport === machine ? 'active' : ''}`}
                            style={{
                              padding: '1.2rem',
                              cursor: 'pointer',
                              border: selectedMachineReport === machine ? '2px solid var(--primary)' : '1px solid rgba(255,255,255,0.05)',
                              background: selectedMachineReport === machine ? 'rgba(99, 102, 241, 0.05)' : 'rgba(255,255,255,0.01)',
                              borderRadius: '15px',
                              transition: 'all 0.3s'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontWeight: '900', fontSize: '1rem' }}>{machine}</span>
                              <div className="node-dot" style={{ background: fleetData.find(f => f.name === machine)?.color || '#fff' }}></div>
                            </div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                              Status: <span style={{ color: fleetData.find(f => f.name === machine)?.color }}>{fleetData.find(f => f.name === machine)?.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Dynamic Report Content */}
                      <div className="premium-card" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', minHeight: '400px' }}>
                        {!selectedMachineReport ? (
                          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                            <History size={48} color="rgba(255,255,255,0.1)" />
                            <div style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Select a machine to generate <br /> <b>{userRole === 'Strategic Owner' ? 'Financial Industry Report' : 'Technical Diagnostics Audit'}</b></div>
                          </div>
                        ) : (
                          <div className="animate-fade-in">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div className="glass-icon"><Bot size={20} color="var(--primary)" /></div>
                                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '900' }}>{selectedMachineReport} - AI Failure Analysis</h4>
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Last Audit Trace: {failureReports[selectedMachineReport].lastResolved}</div>
                            </div>

                            {userRole === 'Strategic Owner' ? (
                              /* ADMIN / STRATEGIC OWNER: FINANCIAL AUDIT */
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                <div>
                                  <h5 style={{ color: 'var(--primary)', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '1rem' }}>Financial Impact Audit</h5>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div>
                                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Cost of Failure (Projected)</div>
                                      <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#f43f5e' }}>{failureReports[selectedMachineReport].costOfFailure}</div>
                                    </div>
                                    <div>
                                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Accelerated Depreciation Impact</div>
                                      <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--warning)' }}>{failureReports[selectedMachineReport].depreciation}</div>
                                    </div>
                                  </div>
                                </div>
                                <div style={{ borderLeft: '1px solid rgba(255,255,255,0.05)', paddingLeft: '2rem' }}>
                                  <h5 style={{ color: '#A2CB8B', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '1rem' }}>Recovery & Profitability</h5>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <div style={{ background: 'rgba(162, 203, 139, 0.05)', padding: '1rem', borderRadius: '12px', borderLeft: '3px solid #A2CB8B' }}>
                                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Potential Cost Recovered</div>
                                      <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#A2CB8B' }}>{failureReports[selectedMachineReport].costRecover}</div>
                                    </div>
                                    <div>
                                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Net Profit Secured (EBITDA)</div>
                                      <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#fff' }}>{failureReports[selectedMachineReport].profitGain}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              /* MANAGER: TECHNICAL DIAGNOSTICS & SOLUTIONS */
                              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
                                <div>
                                  <h5 style={{ color: 'var(--primary)', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '1rem' }}>Technical Diagnostics Root Cause</h5>
                                  <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#fff', background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '15px', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
                                    {failureReports[selectedMachineReport].analysis}
                                  </p>
                                  <div style={{ marginTop: '1.5rem', display: 'flex', gap: '10px' }}>
                                    <div className="badge" style={{ background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e' }}>Vibration Spike: 8.2kHz</div>
                                    <div className="badge" style={{ background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e' }}>Thermal Drift: +12%</div>
                                  </div>
                                </div>
                                <div style={{ background: 'rgba(162, 203, 139, 0.03)', padding: '1.5rem', borderRadius: '20px', border: '1px solid rgba(162, 203, 139, 0.1)' }}>
                                  <h5 style={{ color: '#A2CB8B', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '1.2rem' }}>AI Prescriptive Solution</h5>
                                  <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '2rem' }}>
                                    {failureReports[selectedMachineReport].solution}
                                  </div>
                                  <button
                                    className="btn-primary"
                                    style={{ width: '100%', background: '#A2CB8B', borderColor: '#A2CB8B' }}
                                    onClick={() => alert(`Initiating repair sequence for ${selectedMachineReport}...`)}
                                  >
                                    Authorize Technical Fix
                                  </button>
                                </div>
                              </div>
                            )}

                            <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                              <button className="btn-primary" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }} onClick={() => setSelectedMachineReport(null)}>Clear Report</button>
                              <button className="btn-primary" onClick={() => alert(`Exporting Industrial Failure Audit for ${selectedMachineReport}...`)}>Export Failure Report (PDF)</button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 5. Visualization Waveforms & AI Forecast */}
                  <div className="charts-grid" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
                    <div className="premium-card" style={{ padding: '2rem' }}>
                      <h3 className="section-title"><TrendingUp size={20} color="#84B179" /> Failure Probability Waveform</h3>
                      <div style={{ height: '300px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={failureTrend}>
                            <defs>
                              <linearGradient id="premiumFailColor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#84B179" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#84B179" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(132, 177, 121,0.05)" vertical={false} />
                            <XAxis dataKey="time" stroke="#64748b" fontSize={11} axisLine={false} tickLine={false} />
                            <YAxis stroke="#64748b" fontSize={11} axisLine={false} tickLine={false} domain={[0, 100]} />
                            <Tooltip
                              contentStyle={{ background: 'rgba(199, 234, 187, 0.9)', border: '1px solid rgba(132, 177, 121,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                              itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="risk" stroke="#84B179" strokeWidth={3} fillOpacity={1} fill="url(#premiumFailColor)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="premium-card" style={{ padding: '2rem', background: userRole === 'Strategic Owner' ? 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.2), transparent)' : 'radial-gradient(circle at top right, rgba(132, 177, 121, 0.2), transparent)' }}>
                      <div style={{ display: 'flex', gap: '15px', marginBottom: '2rem' }}>
                        <div className="glass-icon" style={{ background: userRole === 'Strategic Owner' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(132, 177, 121, 0.2)', borderColor: 'var(--primary)' }}>
                          {userRole === 'Strategic Owner' ? <Landmark size={28} color="var(--primary)" /> : <BrainCircuit size={28} color="var(--primary)" />}
                        </div>
                        <div>
                          <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '900' }}>{userRole === 'Strategic Owner' ? 'Executive AI Brief' : 'Maintenance AI Advisory'}</h3>
                          <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 'bold' }}>{userRole === 'Strategic Owner' ? 'EBITDA Protection Log' : 'Neural Health Diagnostics'}</div>
                        </div>
                      </div>

                      {userRole === 'Strategic Owner' ? (
                        <>
                          <div style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '20px', marginBottom: '2.5rem' }}>
                            <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '10px' }}>Revenue Recovery Pipeline: Loom fleet</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                              Strategic risk indexing identifies <span style={{ color: '#fff', fontWeight: 'bold' }}>₹{strategicPdM.revenueAtRisk}</span> in at-risk outputs. PdM protocols are securing <span style={{ color: '#A2CB8B', fontWeight: 'bold' }}>98.5%</span> of targeted quarterly EBITDA gain.
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '20px', marginBottom: '2.5rem' }}>
                            <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '10px' }}>Critical Tech Backlog Hub</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                              Fleet health is currently baseline at <span style={{ color: '#fff', fontWeight: 'bold' }}>{advancedPdM.healthScore}%</span>. Technical swarm is focusing on high-vibration spindles to prevent immediate shift stalling.
                            </p>
                          </div>
                        </>
                      )}

                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          className="btn-primary"
                          style={{
                            flex: 1,
                            background: workOrderStep === 2 ? '#A2CB8B' : 'var(--primary)',
                            borderColor: workOrderStep === 2 ? '#A2CB8B' : 'var(--primary)'
                          }}
                          onClick={async () => {
                            if (workOrderStep === 2) return;
                            setWorkOrderStep(1);
                            const msg = userRole === 'Strategic Owner' ? 'Approve Revenue Recovery Protocol' : 'Emergency Repair Authorization';
                            const req = await triggerOwnerRequest('Maintenance AI', msg, `Urgent: Machine friction threshold exceeded.`);
                            if (req?._id) {
                              setMachineHealthState(1);
                              setWorkOrderStep(2);
                            }
                          }}
                        >
                          {workOrderStep === 0 ? (userRole === 'Strategic Owner' ? 'Authorize Recovery' : 'Initiate Work Order') : workOrderStep === 1 ? 'Dispatching...' : 'Approved & Logged'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 5. Shop Floor Digital Twin (Role-Aware Visualization) */}
                  <div className="premium-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                      <h3 className="section-title" style={{ fontSize: '1.4rem' }}>
                        <Map size={24} color="var(--primary)" /> {userRole === 'Strategic Owner' ? 'Strategic Asset Value Map' : 'Shop Floor Digital Twin (Edge Sync)'}
                      </h3>
                      <div style={{ background: 'rgba(132, 177, 121,0.05)', padding: '8px 16px', borderRadius: '10px', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className="pulse" style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%' }}></div>
                        {userRole === 'Strategic Owner' ? 'Financial Hub Sync | Real-time ROI' : '15ms Edge Latency | Bhilwara Hub'}
                      </div>
                    </div>

                    <div style={{
                      height: '450px',
                      background: userRole === 'Strategic Owner' ? 'rgba(99, 102, 241, 0.05)' : 'rgba(199, 234, 187, 0.2)',
                      borderRadius: '24px',
                      border: '1px solid rgba(132, 177, 121,0.08)',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(132, 177, 121, 0.05) 1px, transparent 1px)', backgroundSize: '30px 30px', pointerEvents: 'none' }}></div>
                      <div className="animate-scan" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(rgba(132, 177, 121, 0.05) 0%, transparent 100%)', opacity: 0.3 }}></div>

                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gridTemplateRows: 'repeat(2, 1fr)',
                        gap: '4rem',
                        padding: '3rem',
                        width: '100%',
                        height: '100%'
                      }}>
                        {fleetData.map((m, i) => (
                          <div key={i} className="premium-card"
                            onClick={() => {
                              setSelectedMachineReport(m.name);
                              // Smooth scroll to Report Hub
                              document.querySelector('.section-title')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            style={{
                              background: 'rgba(255, 255, 255, 0.02)',
                              border: `1px solid ${m.status === 'Critical' ? '#f43f5e' : m.status === 'Warning' ? '#f59e0b' : 'var(--primary)'}40`,
                              padding: '1.2rem',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                              gap: '12px',
                              cursor: 'pointer',
                              transform: (m.status === 'Critical') ? 'scale(1.05)' : 'none',
                              boxShadow: (m.status === 'Critical') ? `0 0 30px ${m.color}30` : 'none',
                              transition: 'all 0.3s'
                            }}>
                            <div style={{ fontSize: '0.65rem', color: m.color, fontWeight: '900', letterSpacing: '2px' }}>{m.type}</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#fff' }}>{m.name}</div>

                            <div style={{ position: 'relative', width: '60px', height: '60px' }}>
                              <svg width="60" height="60" viewBox="0 0 60 60">
                                <circle cx="30" cy="30" r="25" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                                <circle cx="30" cy="30" r="25" fill="none" stroke={m.color} strokeWidth="4"
                                  strokeDasharray={`${(m.score / 100) * 157}, 157`}
                                  strokeLinecap="round"
                                  transform="rotate(-90 30 30)" />
                              </svg>
                              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                {userRole === 'Strategic Owner' ? `${m.score}%` : `${m.score}%`}
                              </div>
                            </div>

                            <div className="badge" style={{ background: `${m.color}15`, color: m.color }}>
                              {userRole === 'Strategic Owner' ? (m.status === 'Critical' ? 'At Risk' : 'Performing') : m.status}
                            </div>
                            {userRole === 'Strategic Owner' && (
                              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                                Value: <span style={{ color: '#fff' }}>₹{m.score * 1200}L</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 6. Lower Dashboard (Alerts & Timeline Mix) */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="premium-card" style={{ padding: '2rem' }}>
                      <h3 className="section-title"><Bell size={20} color="#84B179" /> System Events & Security</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {systemEvents.slice(0, 4).map((e, i) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(132, 177, 121,0.02)', borderRadius: '10px' }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: e.type === 'critical' || e.type === 'danger' ? '#84B179' : e.type === 'warning' ? '#84B179' : '#84B179' }}></div>
                              <span style={{ fontSize: '0.85rem' }}>{e.msg}</span>
                            </div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{e.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="premium-card" style={{ padding: '2rem' }}>
                      <h3 className="section-title"><History size={20} color="var(--primary)" /> Service Ledger</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {ledgerData.map((s, i) => (
                          <div key={i} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                            <div style={{ textAlign: 'center', minWidth: '50px' }}>
                              <div style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--primary)' }}>{s.date.split(' ')[0]}</div>
                              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{s.date.split(' ')[1]}</div>
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '4px' }}>{s.task}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Technician: {s.tech} • Status: <span style={{ color: '#A2CB8B' }}>{s.res}</span></div>
                            </div>
                          </div>
                        ))}
                        <button style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left', padding: 0 }}>+ View Archive Ledger</button>
                      </div>
                    </div>
                  </div>

                  {/* 7. Strategic Maintenance Metrics */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
                    <div className="premium-card" style={{ padding: '2rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h3 className="section-title"><Package size={20} color="var(--accent)" /> Maintenance-Production Link</h3>
                        <div className="badge badge-success">Live: +3.1% Output</div>
                      </div>

                      <div style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', display: 'grid' }}>
                        <div style={{ padding: '1.2rem', background: 'rgba(132, 177, 121,0.02)', borderRadius: '15px', borderLeft: '3px solid var(--primary)' }}>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Units Produced</div>
                          <div style={{ fontSize: '1.5rem', fontWeight: '900' }}>{Math.floor((manualData.actualOutput || 960) * 1.03)} <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>/ 1200</span></div>
                          <div className="maturity-bar-bg" style={{ height: '4px', marginTop: '10px' }}><div className="maturity-bar-fill" style={{ width: '82%', background: 'var(--primary)' }}></div></div>
                        </div>
                        <div style={{ padding: '1.2rem', background: 'rgba(132, 177, 121,0.02)', borderRadius: '15px', borderLeft: '3px solid var(--accent)' }}>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>PdM Efficiency</div>
                          <div style={{ fontSize: '1.5rem', fontWeight: '900' }}>98.4%</div>
                          <div className="maturity-bar-bg" style={{ height: '4px', marginTop: '10px' }}><div className="maturity-bar-fill" style={{ width: '98%', background: 'var(--accent)' }}></div></div>
                        </div>
                        <div style={{ padding: '1.2rem', background: 'rgba(132, 177, 121,0.02)', borderRadius: '15px', borderLeft: '3px solid #84B179' }}>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Downtime Prevented</div>
                          <div style={{ fontSize: '1.5rem', fontWeight: '900' }}>12.5 <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>Hrs</span></div>
                          <div className="maturity-bar-bg" style={{ height: '4px', marginTop: '10px' }}><div className="maturity-bar-fill" style={{ width: '75%', background: '#84B179' }}></div></div>
                        </div>
                      </div>
                    </div>

                    <div className="premium-card" style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.05) 0%, transparent 100%)', borderLeft: '4px solid #84B179' }}>
                      <h3 className="section-title"><DollarSign size={20} color="#84B179" /> Cost Interference Simulation</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>Reactive Repair Cost</span>
                          <span style={{ fontWeight: 'bold' }}>₹{advancedPdM.reactiveCostEstimate || '1,50,000'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                          <span style={{ color: '#A2CB8B' }}>PdM Intervention Cost</span>
                          <span style={{ fontWeight: 'bold' }}>₹{advancedPdM.pdmInterventionCost || '35,000'}</span>
                        </div>
                        <div style={{ height: '1px', background: 'rgba(132, 177, 121,0.1)', margin: '5px 0' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: '900', color: 'var(--accent)' }}>Net ROI Potential</span>
                          <span style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--accent)' }}>₹{budgetApplied ? (parseInt((String(advancedPdM.netSavingsPotential || '115000')).replace(/[^\d]/g, '')) + 12500).toLocaleString('en-IN') : (advancedPdM.netSavingsPotential || '1,15,000')}</span>
                        </div>
                        <button
                          className={`btn-primary ${isBudgeting ? 'pulse' : ''}`}
                          style={{
                            marginTop: '10px',
                            background: budgetApplied ? 'rgba(162, 203, 139, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                            border: `1px solid ${budgetApplied ? '#A2CB8B' : '#84B179'}`,
                            color: budgetApplied ? '#A2CB8B' : '#84B179'
                          }}
                          onClick={() => {
                            if (budgetApplied) return;
                            setIsBudgeting(true);
                            setTimeout(() => {
                              setIsBudgeting(false);
                              setBudgetApplied(true);
                              setSystemEvents(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: 'Neural Budgeting Applied: Maintenance ROI optimized.', type: 'success' }, ...prev]);
                            }, 2000);
                          }}
                        >
                          {isBudgeting ? 'Calculating Assets...' : budgetApplied ? 'Budget Optimized' : 'Apply Neural Budgeting'}
                        </button>
                      </div>
                    </div>
                  </div>

                  <AgentGrid categories={['Predictive Maintenance']} title="Maintenance Execution AI Library (52 Agents)" focusedAgent={focusedAgent} setFocusedAgent={setFocusedAgent} />
                </>
              )}
            </div>
          )
        }



        {
          activeTab === 'textile' && (
            <div className="textile-panel animate-fade-in">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-header"><span className="stat-label">Production Flow</span><Cpu size={20} color="var(--primary)" /></div>
                  <div className="stat-value">{renderSafeValue(textileFlow.rejectionRate, '0')}%</div>
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
                  <div className="stat-value">{renderSafeValue(laborSkill.overallScore, '78')}/100</div>
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
                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{renderSafeValue(textileFlow.greyProduced, 0)}m</div>
                  </div>
                  <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', margin: '0 10px', marginTop: '-30px', position: 'relative' }}>
                    <div style={{ width: '100%', height: '100%', background: 'var(--primary)', opacity: 0.3 }}></div>
                  </div>
                  <div style={{ textAlign: 'center', zIndex: 1 }}>
                    <div style={{ width: '60px', height: '60px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}><Droplets size={24} color="var(--accent)" /></div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>Dyed</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{renderSafeValue(textileFlow.dyedCompleted, 0)}m</div>
                  </div>
                  <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', margin: '0 10px', marginTop: '-30px', position: 'relative' }}>
                    <div style={{ width: '100%', height: '100%', background: 'var(--accent)', opacity: 0.3 }}></div>
                  </div>
                  <div style={{ textAlign: 'center', zIndex: 1 }}>
                    <div style={{ width: '60px', height: '60px', background: 'rgba(139, 92, 246, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}><CheckCircle size={24} color="#8b5cf6" /></div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>Finished</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{renderSafeValue(textileFlow.finishedCompleted, 0)}m</div>
                  </div>
                </div>
                <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h4 style={{ margin: 0, color: 'var(--accent)' }}>Workflow Optimization Engine</h4>
                      <span style={{ fontSize: '0.7rem', padding: '4px 8px', background: 'rgba(14, 165, 233, 0.2)', border: '1px solid #0ea5e9', borderRadius: '4px', color: '#0ea5e9', display: 'flex', alignItems: 'center', gap: '4px' }}><BrainCircuit size={12} /> XGBoost Classifier</span>
                    </div>
                    <span className="badge" style={{ background: 'var(--accent)', color: '#000' }}>+{renderSafeValue(workflowOpt.projectedEfficiencyGain, '0%')} GAIN</span>
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
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent)' }}>{typeof yarnOpt.costSavingPerKg === 'object' ? JSON.stringify(yarnOpt.costSavingPerKg) : yarnOpt.costSavingPerKg || '12.5'}</div>
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px' }}>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '5px' }}>Current Scrap Volume</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: '900', color: 'white' }}>420 kg</div>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '8px' }}>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '5px' }}>Market Rate (Bhilwara)</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#10b981' }}>₹12 / kg</div>
                    </div>
                    <button className="btn-primary" style={{ background: '#10b981', color: 'black', border: 'none', padding: '15px 30px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                      Sell Scrap Locally
                    </button>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                    <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Nearby Verified Recyclers</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[
                        { name: "Bhilwara Green Fiber", distance: "2.4 km", price: "₹12.2", capacity: "Full" },
                        { name: "Marwar Recycle Hub", distance: "4.1 km", price: "₹11.8", capacity: "Open" },
                        { name: "Rajasthan Textile Salvage", distance: "8.5 km", price: "₹12.5", capacity: "Open" }
                      ].map((r, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '0.8rem' }}>
                          <div style={{ fontWeight: 'bold' }}>{r.name} <span style={{ opacity: 0.5, fontWeight: 'normal' }}>({r.distance})</span></div>
                          <div style={{ color: '#10b981', fontWeight: 'bold' }}>{r.price}/kg</div>
                        </div>
                      ))}
                    </div>
                  </div>
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
                        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#10b981' }}>8.2k</div>
                        <div style={{ fontSize: '0.65rem', opacity: 0.6, letterSpacing: '1px' }}>SLUDGE SAVING</div>
                      </div>
                    </div>
                  </div>
                  <button className="btn-primary" style={{ background: '#0ea5e9', border: 'none', color: 'black', fontWeight: 'bold', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}><RefreshCcw size={16} style={{ display: 'inline', marginRight: '8px' }} /> Optimize Water Dosing</button>
                </div>

                <div className="stat-card" style={{ background: 'linear-gradient(90deg, #1f1406 0%, transparent 100%)', border: '1px solid #f97316', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', overflow: 'hidden' }}>
                  {isScanningTexture && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <div className="micro-grid" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, #f97316 1px, transparent 1px)', backgroundSize: '10px 10px', opacity: 0.3 }}></div>
                      <div className="scan-bar" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: '#f97316', boxShadow: '0 0 15px #f97316', animation: 'scan-vertical 3s linear infinite' }}></div>
                      <Fingerprint size={48} color="#f97316" className="spin-slow" />
                      <div style={{ color: '#f97316', fontWeight: 'bold', marginTop: '1rem', letterSpacing: '2px', fontSize: '0.7rem' }}>ANALYZING MICROSCOPIC WEAVE...</div>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: '0 0 5px 0', color: '#f97316', display: 'flex', alignItems: 'center', gap: '8px' }}><Fingerprint size={20} /> Micro-Texture 'Fabric Fingerprint'</h3>
                      <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>Uses Deep-CV to map the unique microscopic weave of every Bhilwara roll. Generates a blockchain-ready authenticity certificate to prevent counterfeits.</p>
                    </div>
                    <div style={{ background: 'rgba(249, 115, 22, 0.1)', padding: '8px 16px', borderRadius: '8px', textAlign: 'center', border: '1px solid #f97316' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: '900', color: textureHash ? '#10b981' : '#f97316', letterSpacing: '1px' }}>{textureHash ? 'VERIFIED' : 'GENUINE'}</div>
                      <div style={{ fontSize: '0.6rem', opacity: 0.7 }}>{textureHash || 'Roll #BH902-X'}</div>
                    </div>
                  </div>
                  <button className="btn-primary" style={{ background: '#f97316', border: 'none', color: 'white', fontWeight: 'bold', padding: '10px', borderRadius: '8px', cursor: 'pointer' }} onClick={handleTextureScan}>Authenticate Roll Texture</button>
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

              <AgentGrid categories={['Supply Chain', 'Sustainability']} title="Supply Chain & Sustainability AI" focusedAgent={focusedAgent} setFocusedAgent={setFocusedAgent} />
            </div>
          )
        }





        {
          activeTab === 'finance' && (
            <div className="finance-panel animate-fade-in">
              <div className="stats-grid">
                <div className="stat-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(30, 41, 59, 0) 100%)' }}>
                  <div className="stat-header"><span className="stat-label">Real-Time Profit Margin</span><DollarSign size={20} color="var(--accent)" /></div>
                  <div className="stat-value">{renderSafeValue(profit.monthlyProfit, '0')} Cr</div>
                  <div className="stat-label">Projection (Next 30D)</div>
                </div>
                <div className="stat-card">
                  <div className="stat-header"><span className="stat-label">Credit & Payment Risk</span><ShieldCheck size={20} color="var(--accent)" /></div>
                  <div className="stat-value">{typeof creditRisk.riskScore === 'object' ? JSON.stringify(creditRisk.riskScore) : creditRisk.riskScore || 'Low'}</div>
                  <div className="stat-label">Status: {typeof creditRisk.status === 'object' ? JSON.stringify(creditRisk.status) : creditRisk.status || 'Excellent'}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-header"><span className="stat-label">Cost Optimization</span><Cpu size={20} color="var(--primary)" /></div>
                  <div className="stat-value">{typeof costOptimization.totalSavings === 'object' ? JSON.stringify(costOptimization.totalSavings) : costOptimization.totalSavings || '1.2'}L</div>
                  <div className="stat-label">Potential Monthly Savings</div>
                </div>
                <div className="stat-card">
                  <div className="stat-header"><span className="stat-label">Cost per Meter</span><Activity size={20} color="var(--primary)" /></div>
                  <div className="stat-value">{typeof profit.costPerMeter === 'object' ? JSON.stringify(profit.costPerMeter) : profit.costPerMeter || '8.50'}</div>
                  <div className="stat-label">Textile Cluster Benchmark</div>
                </div>
              </div>

              {/* RESTORED: Finance Arbitrage Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1.5rem' }}>
                <div className="stat-card" style={{ gridColumn: 'span 2', background: 'linear-gradient(180deg, #0f172a 0%, #172554 100%)', border: '1px solid #3b82f6', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ margin: 0, color: '#93c5fd', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Globe size={16} /> Global Price Arbitrage</h4>
                    <span style={{ fontSize: '0.6rem', color: '#60a5fa', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>Live Market Sync: TURKEY - INDIA</span>
                  </div>

                  <div style={{ overflowX: 'auto', marginBottom: '8px' }}>
                    <table style={{ width: '100%', fontSize: '0.75rem', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ color: '#94a3b8', borderBottom: '1px solid rgba(148, 163, 184, 0.1)' }}>
                          <th style={{ padding: '8px 4px' }}>Market</th>
                          <th style={{ padding: '8px 4px' }}>Price (INR/kg)</th>
                          <th style={{ padding: '8px 4px' }}>Quality Index</th>
                          <th style={{ padding: '8px 4px' }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: '8px 4px' }}>Bhilwara (Local)</td>
                          <td style={{ padding: '8px 4px' }}>232.2</td>
                          <td style={{ padding: '8px 4px' }}>92%</td>
                          <td style={{ padding: '8px 4px', color: '#cbd5e1' }}>Stable</td>
                        </tr>
                        <tr style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
                          <td style={{ padding: '8px 4px' }}>Bursa (Turkey)</td>
                          <td style={{ padding: '8px 4px', fontWeight: 'bold', color: '#3b82f6' }}>218.0</td>
                          <td style={{ padding: '8px 4px' }}>94%</td>
                          <td style={{ padding: '8px 4px', color: '#10b981', fontWeight: 'bold' }}>-6.2% DROP</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '8px 4px' }}>Guangzhou</td>
                          <td style={{ padding: '8px 4px' }}>241.5</td>
                          <td style={{ padding: '8px 4px' }}>88%</td>
                          <td style={{ padding: '8px 4px', color: '#ef4444' }}>Rising</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#3b82f6', marginBottom: '4px' }}>Arbitrage Gap: +₹14.2/m</div>
                    <p style={{ fontSize: '0.8rem', opacity: 0.8, margin: 0, lineHeight: 1.4 }}>Detected price-drop in Turkish cotton yarn. 5,000kg window open for 2h 42m.</p>
                  </div>

                  <div style={{ marginTop: 'auto' }}>
                    <button className="btn-primary" style={{ width: '100%', background: '#3b82f6', border: 'none', color: 'white', fontWeight: 'bold', padding: '10px', borderRadius: '8px', cursor: 'pointer' }} onClick={async () => { try { const res = await api.post('/owner/arbitrage', { commodity: 'cotton', market: 'Bursa', volume: 500 }); alert(res.data.message || 'Arbitrage locked successfully.'); } catch (err) { alert('Error: Could not reach the API. Please ensure the backend is running.'); console.error(err); } }}>Lock Arbitrage Window</button>
                  </div>
                </div>

                <div className="stat-card" style={{ background: 'linear-gradient(180deg, #0f172a 0%, #064e3b 100%)', border: '1px solid #10b981', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, color: '#6ee7b7', fontSize: '1rem' }}>AI Cash-Crunch Predictor</h4>
                    <Landmark size={18} color="#10b981" />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#10b981', marginBottom: '8px' }}>Deficit Risk: 14 Days</div>
                    <p style={{ fontSize: '0.8rem', opacity: 0.8, margin: 0, lineHeight: 1.4 }}>12 Lakh locked in unpaid invoices. Recommending immediate factoring.</p>
                  </div>
                  <div style={{ marginTop: 'auto' }}>
                    <button className="btn-primary" style={{ width: '100%', background: '#10b981', border: 'none', color: 'black', fontWeight: 'bold', padding: '10px', borderRadius: '8px', cursor: 'pointer' }} onClick={async () => { try { const res = await api.post('/owner/cash-crunch', { totalUnpaid: 1200000, deficitDays: 14 }); alert(res.data.message || 'Invoice factoring initiated successfully.'); } catch (err) { alert('Error: Could not reach the API. Please ensure the backend is running.'); console.error(err); } }}><RefreshCcw size={14} style={{ display: 'inline', marginRight: '6px' }} /> Auto-Factor Unpaid Invoices</button>
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
                    <button className="btn-primary" style={{ width: '100%', background: 'transparent', border: '1px solid #6366f1', color: '#a5b4fc', fontWeight: 'bold', padding: '10px', borderRadius: '8px', cursor: 'pointer' }} onClick={async () => { try { const res = await api.post('/owner/ledger-scan', { ledgerType: 'Bahi-Khata', language: 'Marwari/Hindi' }); alert(res.data.message || 'Ledger scanned and synced successfully.'); } catch (err) { alert('Error: Could not reach the API. Please ensure the backend is running.'); console.error(err); } }}><FileScan size={14} style={{ display: 'inline', marginRight: '6px' }} /> Scan & Sync Traditional Ledger</button>
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
                    <button className="btn-primary" style={{ width: '100%', background: '#eab308', border: 'none', color: 'black', fontWeight: 'bold', padding: '10px', borderRadius: '8px', cursor: 'pointer' }} onClick={async () => { try { const res = await api.post('/owner/trust-score', { score: 'A+', trustIndex: 94, suppliers: 15 }); alert(res.data.message || 'Trust-Score shared successfully.'); } catch (err) { alert('Error: Could not reach the API. Please ensure the backend is running.'); console.error(err); } }}>Share Trust-Score with Suppliers</button>
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
              <AgentGrid categories={['Finance']} title="Finance & Sector Analytics AI" focusedAgent={focusedAgent} setFocusedAgent={setFocusedAgent} />
            </div>
          )
        }

        {
          activeTab === 'strategy' && (
            <div className="strategy-panel animate-fade-in">
              <div className="stats-grid">
                <div className="stat-card" style={{ border: '1px solid var(--accent)', background: 'rgba(16, 185, 129, 0.05)', cursor: 'pointer', transition: 'all 0.3s ease' }} onClick={() => setIsMsmeModalOpen(true)} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.2)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div className="stat-header"><span className="stat-label">MSME Growth Score</span><TrendingUp size={20} color="var(--accent)" /></div>
                  <div className="stat-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {typeof digitalMaturity === 'object' ? JSON.stringify(digitalMaturity) : digitalMaturity || 0}/100
                    <span style={{ fontSize: '0.7rem', padding: '2px 8px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '12px', color: 'var(--accent)' }}>View Details</span>
                  </div>
                  <div className="stat-label">Digital Transformation Index</div>
                </div>
                <div className="stat-card" style={{ cursor: 'pointer', transition: 'all 0.3s ease' }} onClick={() => setIsClusterModalOpen(true)} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(34, 211, 238, 0.2)'; e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.5)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}>
                  <div className="stat-header"><span className="stat-label">Cluster Rank</span><Award size={20} color="var(--primary)" /></div>
                  <div className="stat-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    TOP 15%
                    <span style={{ fontSize: '0.7rem', padding: '2px 8px', background: 'rgba(34, 211, 238, 0.1)', borderRadius: '12px', color: '#22d3ee', border: '1px solid rgba(34, 211, 238, 0.3)' }}>View Intelligence</span>
                  </div>
                  <div className="stat-label">Bhilwara Textile Cluster</div>
                </div>
                <div className="stat-card" style={{ cursor: 'pointer', transition: 'all 0.3s ease' }} onClick={() => setIsSubsidyModalOpen(true)} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.2)'; e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}>
                  <div className="stat-header"><span className="stat-label">Subsidy Status</span><Building2 size={20} color="var(--accent)" /></div>
                  <div className="stat-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {typeof govSchemes.tufsStatus === 'object' ? JSON.stringify(govSchemes.tufsStatus) : govSchemes.tufsStatus || 'Eligible'}
                    <span style={{ fontSize: '0.7rem', padding: '2px 8px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.3)' }}>View Intel</span>
                  </div>
                  <div className="stat-label">TUFS / RIPS Potential</div>
                  <button className="btn-primary" style={{ width: '100%', marginTop: '1rem', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', fontSize: '0.8rem', padding: '0.5rem', border: '1px solid rgba(59, 130, 246, 0.3)', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }} onClick={(e) => { e.stopPropagation(); setIsSubsidyModalOpen(true); }}>Check Subsidy Eligibility</button>
                </div>
              </div>

              <div className="charts-grid" style={{ marginTop: '1.5rem' }}>
                <div className="stat-card">
                  <h3 className="section-title">Eligible MSME Schemes</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {Array.isArray(govSchemes?.eligibleSchemes) && govSchemes.eligibleSchemes.length > 0 ? govSchemes.eligibleSchemes.map((s, i) => (
                      <div key={i} style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderLeft: '3px solid var(--accent)', borderRadius: '8px', fontSize: '0.9rem', cursor: 'pointer', transition: '0.2s' }} onClick={() => {
                        alert(`Generating auto-filled application for: ${s}. Connecting to CA portal... Click OK to download draft!`);

                        const doc = new jsPDF();

                        // Government Header
                        doc.setFillColor(248, 250, 252);
                        doc.rect(0, 0, 210, 297, 'F');
                        doc.setTextColor(30, 58, 138);
                        doc.setFontSize(18);
                        doc.setFont("helvetica", "bold");
                        doc.text('GOVERNMENT OF RAJASTHAN', 105, 20, { align: 'center' });
                        doc.setFontSize(14);
                        doc.text(s.toUpperCase(), 105, 30, { align: 'center' });
                        doc.setFontSize(12);
                        doc.setTextColor(71, 85, 105);
                        doc.text('Auto-Generated Application Form', 105, 38, { align: 'center' });

                        doc.setDrawColor(203, 213, 225);
                        doc.line(14, 45, 196, 45);

                        // Form Content
                        doc.setTextColor(15, 23, 42);
                        doc.setFontSize(12);
                        doc.setFont("helvetica", "bold");
                        doc.text('ENTERPRISE DETAILS (Data Auto-Extracted)', 14, 55);

                        doc.setFont("helvetica", "normal");
                        doc.setFontSize(11);
                        const formY = 65;
                        const lineSpacing = 10;

                        doc.text('Name of Enterprise:', 14, formY);
                        doc.setFont("helvetica", "bold"); doc.text('Bhilwara Smart Textiles Pvt. Ltd.', 80, formY); doc.setFont("helvetica", "normal");

                        doc.text('Udyam Registration No:', 14, formY + lineSpacing);
                        doc.setFont("helvetica", "bold"); doc.text('UDYAM-RJ-08-10245', 80, formY + lineSpacing); doc.setFont("helvetica", "normal");

                        doc.text('Registered Address:', 14, formY + (lineSpacing * 2));
                        doc.text('Plot 42, RIICO Industrial Area, Bhilwara, Rajasthan 311001', 80, formY + (lineSpacing * 2));

                        doc.text('Category of Enterprise:', 14, formY + (lineSpacing * 3));
                        doc.text('Medium Enterprise (Textile & Technical Textiles)', 80, formY + (lineSpacing * 3));

                        doc.line(14, formY + (lineSpacing * 4), 196, formY + (lineSpacing * 4));

                        doc.setFont("helvetica", "bold");
                        doc.text('SUBSIDY CLAIM DETAILS', 14, formY + (lineSpacing * 5));
                        doc.setFont("helvetica", "normal");

                        autoTable(doc, {
                          startY: formY + (lineSpacing * 5.5),
                          head: [['Investment Type', 'Amount Invested', 'Eligible Subsidy (%)', 'Claim Amount']],
                          body: [
                            ['Plant & Machinery', 'INR 4.0 Crore', '25%', 'INR 1.0 Crore'],
                            ['Green Energy System', 'INR 1.0 Crore', '20%', 'INR 20 Lakh']
                          ],
                          headStyles: { fillColor: [30, 58, 138] },
                          alternateRowStyles: { fillColor: [241, 245, 249] },
                          theme: 'grid'
                        });

                        let finalY = doc.lastAutoTable.finalY || 150;

                        doc.setFont("helvetica", "bold");
                        doc.text('DECLARATION', 14, finalY + 15);
                        doc.setFont("helvetica", "normal");
                        doc.setFontSize(10);

                        const declarationText = doc.splitTextToSize("I hereby declare that the information provided above is automatically calculated from real-time secure IoT sensors and ERP logs integrated via the SmartFactory Platform. The generated values are verified against manufacturing production records.", 182);
                        doc.text(declarationText, 14, finalY + 25);

                        // Stamp & Signature Simulation
                        doc.setDrawColor(16, 185, 129);
                        doc.setLineWidth(1);
                        doc.rect(140, finalY + 45, 50, 25);
                        doc.setTextColor(16, 185, 129);
                        doc.text('e-Verified by', 145, finalY + 52);
                        doc.text('SmartFactory AI', 145, finalY + 58);
                        doc.text('Date: ' + new Date().toLocaleDateString(), 145, finalY + 66);

                        // Download
                        const safeFileName = s.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                        doc.save(`${safeFileName}_draft_application.pdf`);
                      }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'}>
                        <strong>{s}</strong>
                      </div>
                    )) : (
                      <div style={{ opacity: 0.6 }}>No specific schemes detected for current investment profile.</div>
                    )}
                  </div>
                </div>

                <div className="stat-card">

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 className="section-title" style={{ margin: 0 }}>Strategic ROI Simulator</h3>
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '4px 12px', borderRadius: '20px', border: '1px solid #10b981', color: '#10b981', fontWeight: '900', fontSize: '0.8rem' }}>
                      PROJECTED ROI: {projectedRoi}%
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '8px' }}>
                        <span>SOLAR TRANSITION</span>
                        <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{growthSliders.solar}%</span>
                      </div>
                      <input type="range" min="0" max="100" value={growthSliders.solar} onChange={(e) => updateStrategyRoi('solar', parseInt(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent)' }} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '8px' }}>
                        <span>Loom Automation Depth</span>
                        <span style={{ color: '#0ea5e9', fontWeight: 'bold' }}>{growthSliders.automation}%</span>
                      </div>
                      <input type="range" min="0" max="100" value={growthSliders.automation} onChange={(e) => updateStrategyRoi('automation', parseInt(e.target.value))} style={{ width: '100%', accentColor: '#0ea5e9' }} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '8px' }}>
                        <span>Karigar Upskilling Focus</span>
                        <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>{growthSliders.training}%</span>
                      </div>
                      <input type="range" min="0" max="100" value={growthSliders.training} onChange={(e) => updateStrategyRoi('training', parseInt(e.target.value))} style={{ width: '100%', accentColor: '#f59e0b' }} />
                    </div>

                    <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                      <div style={{ fontSize: '0.7rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '1px' }}>Simulation Impact</div>
                      <p style={{ margin: '8px 0 0 0', fontSize: '0.85rem', lineHeight: '1.5' }}>
                        Increasing **Automation** to {growthSliders.automation}% while maintaining **Solar** at {growthSliders.solar}% will yield a net margin improvement of ₹{(projectedRoi * 2.5).toFixed(2)} Lakh/Year.
                      </p>
                      <div style={{ marginTop: '1.5rem' }}>
                        <h4 style={{ fontSize: '0.85rem', color: '#a5b4fc', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Strategic High-Impact Reports</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                          <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', cursor: 'pointer', transition: '0.2s' }} onClick={() => {
                            alert("Simulating Solar Transition... Projected break-even reduced from 2.5 years to 1.8 years using AI load-balancing. Click OK to download ROI Report.");

                            const doc = new jsPDF();
                            doc.setFillColor(252, 211, 77); // Amber/Yellow
                            doc.rect(0, 0, 210, 35, 'F');
                            doc.setTextColor(30, 41, 59);
                            doc.setFontSize(22);
                            doc.setFont("helvetica", "bold");
                            doc.text('SOLAR TRANSITION ROI SIMULATION', 105, 20, { align: 'center' });
                            doc.setFontSize(12);
                            doc.setFont("helvetica", "normal");
                            doc.text('Financial & Energy Impact Projection', 105, 30, { align: 'center' });

                            doc.setTextColor(30, 41, 59);
                            doc.setFontSize(14);
                            doc.setFont("helvetica", "bold");
                            doc.text('1. Existing Metrics', 14, 50);
                            doc.setFontSize(11);
                            doc.setFont("helvetica", "normal");
                            doc.text(`Current Solar Dependence: ${typeof solar.solarPercentage === 'object' ? JSON.stringify(solar.solarPercentage) : solar.solarPercentage || 0}%`, 14, 60);
                            doc.text('Current Average Monthly Energy Bill: INR 2.3 Lakhs', 14, 68);

                            doc.setFontSize(14);
                            doc.setFont("helvetica", "bold");
                            doc.text('2. Proposed Upgrade: 40% Solar Dependence', 14, 85);

                            autoTable(doc, {
                              startY: 90,
                              head: [['Financial Metric', 'Current State', 'Projected State']],
                              body: [
                                ['Monthly Energy Bill', 'INR 2,30,000', 'INR 1,45,000'],
                                ['Monthly Savings', '-', 'INR 85,000'],
                                ['Annual Savings', '-', 'INR 10,20,000'],
                                ['Initial System Cost', '-', 'INR 18,36,000'],
                                ['Estimated Break-Even', 'N/A', '1.8 Years']
                              ],
                              headStyles: { fillColor: [99, 102, 241] },
                              theme: 'striped'
                            });

                            const finalY = doc.lastAutoTable.finalY + 20;
                            doc.setFontSize(12);
                            doc.setTextColor(16, 185, 129);
                            doc.setFont("helvetica", "bold");
                            doc.text('✓ AI Insights: Smart Machine Load Balancing will reduce the actual break-even time from 2.5 years to 1.8 years.', 14, finalY);

                            doc.save('Solar_Transition_ROI.pdf');
                          }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                            <p style={{ fontWeight: '700', marginBottom: '5px' }}>Solar Transition ROI</p>
                            <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Current solar at {typeof solar.solarPercentage === 'object' ? JSON.stringify(solar.solarPercentage) : solar.solarPercentage || 0}%. Increasing to 40% will save ₹85,000/month in power costs.</p>
                          </div>
                          <div style={{ padding: '1rem', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '12px', cursor: 'pointer', transition: '0.2s' }} onClick={() => {
                            alert("Allocating 10 training hours to weavers... Projected Production Efficiency Index (PEI) increase to 89%. Click OK to download Report.");

                            const doc = new jsPDF();
                            doc.setFillColor(56, 189, 248); // Sky Blue
                            doc.rect(0, 0, 210, 35, 'F');
                            doc.setTextColor(15, 23, 42);
                            doc.setFontSize(22);
                            doc.setFont("helvetica", "bold");
                            doc.text('LABOR SKILL IMPACT SIMULATION', 105, 20, { align: 'center' });
                            doc.setFontSize(12);
                            doc.setFont("helvetica", "normal");
                            doc.text('Workforce Intelligence & AI Training Projections', 105, 30, { align: 'center' });

                            doc.setTextColor(30, 41, 59);
                            doc.setFontSize(14);
                            doc.setFont("helvetica", "bold");
                            doc.text('1. Current Workforce Status', 14, 50);
                            doc.setFontSize(11);
                            doc.setFont("helvetica", "normal");
                            doc.text(`Current Workforce Proficiency: ${typeof laborSkill.overallScore === 'object' ? JSON.stringify(laborSkill.overallScore) : laborSkill.overallScore || 0}%`, 14, 60);
                            doc.text('Current Production Efficiency Index (PEI): 85%', 14, 68);

                            doc.setFontSize(14);
                            doc.setFont("helvetica", "bold");
                            doc.text('2. Proposed Intervention', 14, 85);

                            autoTable(doc, {
                              startY: 90,
                              head: [['Target Resource', 'Training Allocation', 'Projected Impact']],
                              body: [
                                ['Weavers (Grade B)', '10 Hours / Week', '+4% General Machine Speed'],
                                ['Machine Technicians', '5 Hours / Week', '-12% Machine Downtime'],
                                ['Floor Supervisors', '2 Hours AI Dashboard', '+8% Quality Control']
                              ],
                              headStyles: { fillColor: [14, 165, 233] },
                              theme: 'grid'
                            });

                            const finalY = doc.lastAutoTable.finalY + 20;
                            doc.setFontSize(12);
                            doc.setTextColor(234, 88, 12);
                            doc.setFont("helvetica", "bold");
                            doc.text('✓ Executive Summary: Adding just 10 hours of training raises PEI to 89%, effectively reducing late deliveries by 14%.', 14, finalY, { maxWidth: 180 });

                            doc.save('Labor_Skill_Impact_Report.pdf');
                          }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                            <p style={{ fontWeight: '700', marginBottom: '5px' }}>Labor Skill Impact</p>
                            <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Workers are {typeof laborSkill.overallScore === 'object' ? JSON.stringify(laborSkill.overallScore) : laborSkill.overallScore || 0}% proficient. 10 hours of extra training will boost PEI by 4%.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <AgentGrid categories={['Core Systems', 'Finance']} title="Strategic Intelligence AI" focusedAgent={focusedAgent} setFocusedAgent={setFocusedAgent} />
            </div>
          )
        }

        {activeTab === 'scheduler' && (
          <div className="scheduler-panel animate-fade-in" style={{ padding: '0 1rem' }}>
            <div className="industrial-panel" style={{ padding: '2.5rem', marginBottom: '2.5rem', borderRadius: '1rem', border: '1px solid var(--primary-20)', background: 'rgba(15, 23, 42, 0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                  <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Clock className="pulse-slow" size={32} color="var(--accent)" />
                    AI Production Scheduling Optimizer (EM4)
                  </h2>
                  <p style={{ opacity: 0.6, marginTop: '8px', fontSize: '1.1rem' }}>Dynamically planning jobs across {fleetData.length} machines and {workforce.activeWorkers || 42} staff members using Reinforcement Learning.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '10px 20px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: '0.65rem', opacity: 0.6, letterSpacing: '1px' }}>ALGORITHM STATUS</span>
                    <span style={{ color: '#10b981', fontWeight: '900', fontSize: '1rem' }}>ACTIVE RL-SYNC</span>
                  </div>
                  <button
                    className={`btn-primary ${isOptimizing ? 'pulse-heavy' : ''}`}
                    onClick={async () => {
                      setIsOptimizing(true);
                      setStrategicAiLogs(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: "SCHEDULER: Initiating Genetic Algorithm Optimization...", type: "system" }, ...prev]);

                      try {
                        const res = await api.post("/ai/scheduler/optimize", {
                          jobs: pendingJobs,
                          machines: fleetData.map(m => ({ id: m.id, name: m.name, color: m.color }))
                        });

                        if (res.data && res.data.schedule) {
                          setScheduleData(res.data.schedule);
                          setSchedulerStats({
                            makespan: res.data.makespan,
                            machineUtilization: res.data.machineUtilization,
                            jobCompletionTimes: res.data.jobCompletionTimes
                          });
                          setStrategicAiLogs(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: `SCHEDULER: Optimization complete. Makespan: ${res.data.makespan}h. ${res.data.optimizationLog}`, type: "success" }, ...prev]);
                        } else if (res.data && res.data.error) {
                          setStrategicAiLogs(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: `SCHEDULER ERROR: ${res.data.error}. Ensure backend is running.`, type: "system" }, ...prev]);
                        }
                      } catch (err) {
                        console.error("Scheduling failed:", err);
                        setStrategicAiLogs(prev => [{ id: Date.now(), time: new Date().toLocaleTimeString(), msg: `SCHEDULER: Critical failure. check console.`, type: "system" }, ...prev]);
                      } finally {
                        setIsOptimizing(false);
                      }
                    }}
                    disabled={isOptimizing}
                    style={{ background: 'var(--primary)', color: 'white', padding: '0 2rem', fontWeight: 'bold', fontSize: '0.9rem' }}
                  >
                    {isOptimizing ? 'EVOLVING GENERATIONS...' : 'OPTIMIZE SCHEDULE'}
                  </button>
                </div>
              </div>

              {/* Interactive Gantt Chart */}
              <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
                <div className="micro-grid" style={{ position: 'absolute', inset: 0, opacity: 0.1 }}></div>
                <div style={{ position: 'relative', zIndex: 1, minWidth: '900px' }}>
                  {/* Timeline Ruler */}
                  <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: '250px', fontWeight: '900', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px' }}>Resources & Staff</div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8', padding: '0 10px' }}>
                      {Array.from({ length: 9 }).map((_, i) => <span key={i}>{i * 4}:00</span>)}
                    </div>
                  </div>

                  {/* Machine Tracks */}
                  {fleetData.map((machine, idx) => (
                    <div key={machine.id} style={{ display: 'flex', alignItems: 'center', height: '70px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '800', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Cpu size={14} color={machine.color} /> {machine.name}
                        </div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>
                          Utilization: <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{schedulerStats.machineUtilization[machine.id] || 0}%</span>
                        </div>
                      </div>
                      <div style={{ flex: 1, position: 'relative', height: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)' }}>
                        {scheduleData && scheduleData.filter(s => s.machineId === machine.id).map((task, tIdx) => (
                          <div
                            key={tIdx}
                            style={{
                              position: 'absolute',
                              left: `${(task.start / 32) * 100}%`,
                              width: `${(task.duration / 32) * 100}%`,
                              height: '100%',
                              background: isOptimizing ? 'rgba(99, 102, 241, 0.3)' : task.color,
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.7rem',
                              fontWeight: '900',
                              color: 'white',
                              boxShadow: isOptimizing ? '0 0 20px rgba(99, 102, 241, 0.5)' : `0 4px 15px ${task.color}33`,
                              transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                              cursor: 'pointer',
                              border: '1px solid rgba(255,255,255,0.1)',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              padding: '0 5px'
                            }}
                            title={`${task.jobName} | Task: ${task.task} | Start: ${task.start}h | End: ${task.end}h`}
                          >
                            {!isOptimizing && task.task}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {(!scheduleData || scheduleData.length === 0) && !isOptimizing && (
                    <div style={{ textAlign: 'center', padding: '3rem', opacity: 0.5 }}>
                      No active schedule. Click "OPTIMIZE SCHEDULE" to run the Genetic Algorithm.
                    </div>
                  )}
                </div>
              </div>

              {/* Job Configuration Input Section */}
              <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2rem', marginTop: '2.5rem' }}>
                <div className="industrial-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '800', margin: 0 }}>Input Job Queue</h3>
                    <button onClick={addPendingJob} style={{ background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px', fontSize: '0.7rem', cursor: 'pointer' }}>+ ADD JOB</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '400px', overflowY: 'auto', paddingRight: '5px' }}>
                    {pendingJobs.map((job, idx) => (
                      <div key={idx} style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontWeight: 'bold', fontSize: '0.8rem', color: job.color }}>{job.id}</span>
                          <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>Priority: {job.priority}</span>
                        </div>
                        <input
                          value={job.name}
                          onChange={(e) => {
                            const newJobs = [...pendingJobs];
                            newJobs[idx].name = e.target.value;
                            setPendingJobs(newJobs);
                          }}
                          style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '0.85rem', width: '100%', marginBottom: '8px' }}
                        />
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.65rem', opacity: 0.5 }}>Durations:</span>
                          {job.operations.map((op, oIdx) => (
                            <input
                              key={oIdx}
                              type="number"
                              value={op.duration}
                              onChange={(e) => {
                                const newJobs = [...pendingJobs];
                                newJobs[idx].operations[oIdx].duration = parseInt(e.target.value) || 0;
                                setPendingJobs(newJobs);
                              }}
                              style={{ width: '35px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '0.7rem', textAlign: 'center', borderRadius: '4px' }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.65rem', opacity: 0.4, marginTop: '1rem' }}>* Adjust priorities (1-5) and processing times (hours) to see how the Genetic Algorithm evolves the makespan.</p>
                </div>

                <div className="industrial-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '1.5rem' }}>Optimization Diagnostics</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px' }}>
                      <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginBottom: '5px' }}>BOTTLENECK ANALYSIS</div>
                      <div style={{ color: 'var(--danger)', fontWeight: 'bold', fontSize: '0.9rem' }}>
                        {Object.entries(schedulerStats.machineUtilization).sort((a, b) => b[1] - a[1])[0]?.[0] || "Calculating..."}
                        <span style={{ marginLeft: '10px', fontSize: '0.7rem', opacity: 0.6 }}>@ {Object.entries(schedulerStats.machineUtilization).sort((a, b) => b[1] - a[1])[0]?.[1] || 0}% load</span>
                      </div>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px' }}>
                      <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginBottom: '5px' }}>ALGORITHM SYNC</div>
                      <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '0.9rem' }}>Genetic v4.2</div>
                    </div>
                  </div>
                  <div style={{ marginTop: '1.5rem' }}>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '10px' }}>JOB COMPLETION PREDICTIONS</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {schedulerStats.jobCompletionTimes.map((j, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', background: 'rgba(255,255,255,0.03)', padding: '5px 10px', borderRadius: '4px' }}>
                          <span style={{ opacity: 0.8 }}>{j.jobName}</span>
                          <span style={{ fontWeight: 'bold', color: 'var(--accent)' }}>T+{j.completionTime}h</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Impact Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginTop: '2.5rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '8px' }}>TOTAL MAKESPAN</div>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: 'white' }}>{schedulerStats.makespan}h</div>
                  <div style={{ fontSize: '0.7rem', color: '#10b981', marginTop: '4px' }}>Minimal path found.</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '8px' }}>AVG. UTILIZATION</div>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: 'white' }}>
                    {Object.values(schedulerStats.machineUtilization || {}).length > 0
                      ? (Object.values(schedulerStats.machineUtilization || {}).reduce((a, b) => a + parseFloat(b || 0), 0) / Object.values(schedulerStats.machineUtilization || {}).length).toFixed(1)
                      : "0"}%
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#10b981', marginTop: '4px' }}>Machine sync active.</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--warning)', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '8px' }}>JOBS OPTIMIZED</div>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: 'white' }}>{schedulerStats.jobCompletionTimes.length}</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px' }}>Full factory load.</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '0.65rem', color: '#ec4899', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '8px' }}>IDLE TIME COST</div>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: 'white' }}>₹{(Math.max(0, 100 - (Object.values(schedulerStats.machineUtilization || {}).length > 0 ? (Object.values(schedulerStats.machineUtilization).reduce((a, b) => a + parseFloat(b || 0), 0) / Object.values(schedulerStats.machineUtilization).length) : 100)) * 150).toFixed(0)}</div>
                  <div style={{ fontSize: '0.7rem', color: '#34d399', marginTop: '4px' }}>Minimized loss.</div>
                </div>
              </div>
            </div>

            <AgentGrid categories={['Core Systems']} title="Scheduling Optimization Agents" focusedAgent={focusedAgent} setFocusedAgent={setFocusedAgent} />
          </div>
        )
        }

        {activeTab === 'fyp' && (
          <div className="fyp-panel p-4 animate-fade-in" style={{ paddingBottom: '3rem' }}>
            <FYPOptimizer />
          </div>
        )}


        {activeTab === 'agents' && (
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
              {Array.isArray(agentsData) && agentsData.map(agent => (
                <div key={agent.id} style={{
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
                    <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{agent.category}</span>
                    {agent.status === 'Active' ? <span style={{ color: 'var(--accent)', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 1.5s infinite' }}></div> Active</span> : <span style={{ color: 'var(--warning)', fontSize: '0.7rem' }}>Learning Mode</span>}
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '8px', lineHeight: 1.3 }}>{agent.id}. {agent.name}</div>

                  {agent.risk !== 'Low' && agent.risk !== 'N/A' && (
                    <div style={{ fontSize: '0.75rem', color: agent.risk?.includes('Critical') ? 'var(--danger)' : 'var(--warning)' }}>
                      Alert Policy: <strong>{agent.risk}</strong>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {showTwinModal && (
          <div className="glass-modal animate-fade-in" style={{ textAlign: 'center' }}>
            <div className="hologram-mesh" style={{ position: 'absolute', inset: 0, borderRadius: '20px' }}></div>
            <div style={{ position: 'relative', zIndex: 10 }}>
              <h2 style={{ color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                <Box size={32} /> HOLOGRAPHIC DIGITAL TWIN ACTIVE
              </h2>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '2rem', borderRadius: '15px', border: '1px solid rgba(168, 85, 247, 0.3)', marginBottom: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                  <div style={{ padding: '10px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>STRESS LOAD</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ef4444' }}>88%</div>
                  </div>
                  <div style={{ padding: '10px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>RESONANCE</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f59e0b' }}>High</div>
                  </div>
                  <div style={{ padding: '10px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>MESH STATUS</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981' }}>SYNKED</div>
                  </div>
                </div>
                <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
                  Spatial analysis indicates high mechanical stress on **Loom 7 (Cluster B)**. Recommend speed reduction to 80% to prevent motor overheating.
                </p>
              </div>
              <button
                className="btn-primary"
                style={{ background: 'linear-gradient(90deg, #a855f7, #6366f1)', padding: '12px 40px' }}
                onClick={() => setShowTwinModal(false)}
              >
                CLOSE HOLOGRAM
              </button>
            </div>
          </div>
        )}

        {showUdyamModal && (
          <div className="glass-modal animate-fade-in" style={{ width: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, color: '#0ea5e9', display: 'flex', alignItems: 'center', gap: '8px' }}><Landmark size={20} /> LINK TO UDYAM GATEWAY</h3>
              <button onClick={() => setShowUdyamModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>✕</button>
            </div>

            {!udyamFile ? (
              <div
                style={{ border: '2px dashed rgba(14, 165, 233, 0.3)', borderRadius: '12px', padding: '3rem 1rem', textAlign: 'center', background: 'rgba(14, 165, 233, 0.05)', cursor: 'pointer' }}
                onClick={() => setUdyamFile("udyam_certificate_final.pdf")}
              >
                <div style={{ padding: '15px', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '50%', width: 'fit-content', margin: '0 auto 1rem auo' }}><FileScan size={32} color="#0ea5e9" /></div>
                <div style={{ fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Drop Udyam Certificate Here</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>Supported: PDF, JPG (Max 5MB)</div>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ padding: '15px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 'bold' }}>FILE ATTACHED: {udyamFile}</div>
                </div>

                {isOcrScanning ? (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.75rem', color: '#0ea5e9', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '1px' }}>AI NEURAL OCR SCANNING...</div>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '2px', overflow: 'hidden', position: 'relative' }}>
                      <div className="scan-line" style={{ position: 'absolute', top: 0, left: '-100%', width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, #0ea5e9, transparent)', animation: 'progress-infinite 1s linear infinite' }}></div>
                    </div>
                  </div>
                ) : ocrData ? (
                  <div className="animate-fade-in" style={{ textAlign: 'left', background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 'bold', marginBottom: '10px' }}>VERIFIED DATA EXTRACTED:</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(100px, auto) 1fr', gap: '8px', fontSize: '0.85rem' }}>
                      <span style={{ opacity: 0.6 }}>Entity:</span> <span style={{ fontWeight: 'bold' }}>{ocrData.company}</span>
                      <span style={{ opacity: 0.6 }}>Udyam ID:</span> <span style={{ fontWeight: 'bold', color: '#0ea5e9' }}>{ocrData.udyamId}</span>
                      <span style={{ opacity: 0.6 }}>Type:</span> <span style={{ fontWeight: 'bold' }}>{ocrData.category}</span>
                    </div>
                    <div style={{ marginTop: '1rem', textAlign: 'center', color: '#10b981', fontWeight: 'bold', fontSize: '0.8rem' }}>SYNC SUCCESSFUL</div>
                  </div>
                ) : (
                  <button onClick={executeOcrScan} className="btn-primary" style={{ width: '100%', background: '#0ea5e9', color: 'white', padding: '12px', borderRadius: '8px', fontWeight: 'bold' }}>START OCR EXTRACTION</button>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'gov' && (
          <div className="gov-panel animate-fade-in">
            {/* 🏛️ PREMIUM HERO SECTION WITH LIVE KPI TICKER */}
            <div className="gov-hero-section" style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              borderRadius: '24px',
              padding: '2.5rem',
              marginBottom: '2rem',
              border: '1px solid rgba(14, 165, 233, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
            }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 70%)', pointerEvents: 'none' }}></div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ padding: '18px', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '20px', border: '1px solid rgba(14, 165, 233, 0.3)', boxShadow: '0 0 20px rgba(14, 165, 233, 0.2)' }}>
                    <Building2 size={40} color="#0ea5e9" />
                  </div>
                  <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '900', margin: 0, letterSpacing: '-0.5px', background: 'linear-gradient(90deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      Bhilwara MSME Gov-Portal
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                      <span style={{ fontSize: '0.85rem', color: '#0ea5e9', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>District Industrial Center (DIC) Integrated</span>
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#64748b' }}></div>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Industry 4.0 Compliance Hub</span>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Cluster Connectivity</div>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    {['Udyam', 'RIPS', 'SIDBI', 'GSTN'].map(tag => (
                      <span key={tag} style={{ fontSize: '0.65rem', fontWeight: '800', padding: '4px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* LIVE KPI TICKER */}
              <div style={{ marginTop: '2.5rem', background: 'rgba(0,0,0,0.2)', borderRadius: '16px', padding: '12px 20px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: '900', color: '#10b981', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '20px' }}>
                  <TrendingUp size={16} /> TEXTILE INDEX
                </div>
                <div className="ticker-wrap" style={{ flex: 1, overflow: 'hidden' }}>
                  <div className="ticker-content" style={{ display: 'flex', gap: '40px', animation: 'ticker 30s linear infinite' }}>
                    {[
                      { label: 'RIPS 2022 Interest Rate', val: '5.0%', trend: 'Fixed' },
                      { label: 'Cotton Yarn (Bhilwara)', val: '₹242/kg', trend: '+1.2%' },
                      { label: 'Solar Subvention Gap', val: '12%', trend: '-2.1%' },
                      { label: 'Export Credit Limit', val: '₹5.0Cr', trend: 'Base' },
                      { label: 'GST Input Refund Avg', val: '14 Days', trend: '-2 Days' },
                      { label: 'DIC Clearance Rate', val: '98.2%', trend: '+0.5%' },
                    ].map((kpi, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' }}>
                        <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>{kpi.label}:</span>
                        <span style={{ fontSize: '0.8rem', color: '#e2e8f0', fontWeight: '800' }}>{kpi.val}</span>
                        <span style={{ fontSize: '0.65rem', color: kpi.trend.includes('+') ? '#10b981' : kpi.trend.includes('-') ? '#f43f5e' : '#0ea5e9', fontWeight: '700' }}>{kpi.trend}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="stat-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 78, 59, 0.05) 100%)', border: '1px solid rgba(16, 185, 129, 0.2)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <h3 className="section-title" style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
                    <BrainCircuit size={22} /> AI Scheme Intelligence Center
                  </h3>
                  <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '5px' }}>Cross-referencing Factory Telemetry with Rajasthan RIPS 2022 Policies</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 'bold', color: '#10b981', letterSpacing: '1px' }}>SYSTEM UPTIME: 99.9%</div>
                  <div style={{ fontSize: '0.6rem', opacity: 0.5 }}>Last Policy Sync: 12-MAR-2026</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>GRANT PROBABILITY SCORE</span>
                    <span style={{ fontSize: '1.2rem', fontWeight: '900', color: '#10b981' }}>{grantProbability}%</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                    <div style={{ width: `${grantProbability}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #34d399)', transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
                  </div>
                  {isScanningSchemes ? (
                    <div className="animate-fade-in" style={{ fontSize: '0.8rem' }}>
                      {scanSteps.map((step, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#10b981', opacity: i === scanSteps.length - 1 ? 1 : 0.5 }}>
                          <div className="spin" style={{ width: '12px', height: '12px', border: '2px solid transparent', borderTopColor: '#10b981', borderRadius: '50%' }}></div>
                          {step}...
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '1.5rem', lineHeight: '1.5' }}>
                        Based on your **PEI ({renderSafeValue(executiveSummary.pei)}%)**, **ZLD Compliance**, and **Solar Offset**, you are in the top 5% of eligible factories for the **Textile Excellence Subsidy**.
                      </p>
                      <button className="btn-primary" style={{ width: '100%', background: '#10b981', color: 'black', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }} onClick={handleSchemeScan}>RERUN ELIGIBILITY DEEP-SCAN</button>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#94a3b8', letterSpacing: '1px' }}>LIVE BHILWARA FEED</div>
                  {[
                    { title: "RIPS 2022 Electricity Exemption", benefit: "100% Duty Waiver", risk: "Low", icon: <Zap size={16} /> },
                    { title: "ZED Certification Subsidy", benefit: "90% Cost Refund", risk: "Immediate", icon: <Award size={16} /> },
                    { title: "Textile Skill Development Fund", benefit: "₹15,000 / Karigar", risk: "High", icon: <Users size={16} /> }
                  ].map((scheme, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => setSelectedScheme(scheme)}>
                      <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', color: '#10b981' }}>{scheme.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{scheme.title}</div>
                        <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>Benefit: {scheme.benefit}</div>
                      </div>
                      <span style={{ fontSize: '0.6rem', padding: '2px 6px', borderRadius: '4px', background: scheme.risk === 'Immediate' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: scheme.risk === 'Immediate' ? '#f43f5e' : '#10b981' }}>{scheme.risk}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <button className="btn-primary" style={{ background: 'transparent', color: '#10b981', border: '1px solid #10b981', padding: '8px 20px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold' }} onClick={handleDownloadReport}>Download AI Compliance Report (PDF)</button>
              </div>
            </div>

            <div className="stat-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(rgba(236, 72, 153, 0.1), transparent)', border: '1px solid rgba(236, 72, 153, 0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 className="section-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px', color: '#ec4899' }}>
                  <Wand2 size={22} /> GenAI Subsidy Auto-Filler
                </h3>
                {subsidyDraftStatus === 'drafting' && (
                  <div style={{ fontSize: '0.75rem', color: '#ec4899', fontWeight: 'bold' }}>DRAFTING {draftProgress}%</div>
                )}
                {subsidyDraftStatus === 'completed' && (
                  <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>COMPLETED!</div>
                )}
              </div>

              {subsidyDraftStatus === 'drafting' ? (
                <div style={{ width: '100%', height: '4px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '2px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                  <div style={{ width: `${draftProgress}%`, height: '100%', background: '#ec4899', transition: 'width 0.3s' }}></div>
                </div>
              ) : (
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Tired of complex government forms? Our Generative AI reads your factory's live data (production, power, employment) and instantly drafts the Rajasthan RIPS 2022 subsidy application.
                </p>
              )}

              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                {subsidyDraftStatus !== 'completed' ? (
                  <button
                    className="btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ec4899', color: 'white', fontWeight: 'bold', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', cursor: subsidyDraftStatus === 'drafting' ? 'not-allowed' : 'pointer', opacity: subsidyDraftStatus === 'drafting' ? 0.7 : 1 }}
                    disabled={subsidyDraftStatus === 'drafting'}
                    onClick={handleGenAiSubsidy}
                  >
                    <Bot size={18} /> {subsidyDraftStatus === 'drafting' ? 'PROCESSING DATA...' : 'GENERATE RIPS APPLICATION'}
                  </button>
                ) : (
                  <button
                    className="btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#10b981', color: 'white', fontWeight: 'bold', padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                    onClick={() => alert('Opening Rajasthan Gov Portal for submission... (Simulated)')}
                  >
                    <CheckCircle2 size={18} /> SUBMIT TO RAJASTHAN GOV PORTAL
                  </button>
                )}
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════
                   ADVANCED INDUSTRY-GRADE SECTIONS — MASSIVE UPGRADE
              ═══════════════════════════════════════════════════════════ */}

            {/* SECTION: Application Pipeline Tracker */}
            <div className="gov-section-card" style={{ marginTop: '1.5rem' }}>
              <div className="gov-section-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="gov-icon-badge" style={{ background: 'rgba(99,102,241,0.15)', color: '#6366f1' }}>
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <div className="gov-section-title">Application Pipeline Tracker</div>
                    <div className="gov-section-subtitle">Real-time status across all submitted schemes</div>
                  </div>
                </div>
                <div className="gov-live-badge">● LIVE</div>
              </div>

              {/* Pipeline Status Bar */}
              <div className="pipeline-container">
                {[
                  { label: 'Applied', count: 3, color: '#6366f1', icon: '📋' },
                  { label: 'Under Review', count: 2, color: '#f59e0b', icon: '🔍' },
                  { label: 'Field Verification', count: 1, color: '#0ea5e9', icon: '🏭' },
                  { label: 'Approved', count: 1, color: '#10b981', icon: '✅' },
                  { label: 'Disbursed', count: 1, color: '#34d399', icon: '💰' }
                ].map((stage, i) => (
                  <div key={i} className="pipeline-stage">
                    <div className="pipeline-bubble" style={{ background: `rgba(${stage.color === '#6366f1' ? '99,102,241' : stage.color === '#f59e0b' ? '245,158,11' : stage.color === '#0ea5e9' ? '14,165,233' : stage.color === '#10b981' ? '16,185,129' : '52,211,153'},0.15)`, border: `1px solid ${stage.color}`, color: stage.color }}>
                      <span style={{ fontSize: '1.2rem' }}>{stage.icon}</span>
                      <span className="pipeline-count" style={{ color: stage.color }}>{stage.count}</span>
                    </div>
                    <div className="pipeline-label">{stage.label}</div>
                    {i < 4 && <div className="pipeline-connector" style={{ background: `linear-gradient(90deg, ${stage.color}, ${['#6366f1', '#f59e0b', '#0ea5e9', '#10b981', '#34d399'][i + 1]})` }}></div>}
                  </div>
                ))}
              </div>

              {/* Application Table */}
              <div className="gov-table-wrap">
                <table className="gov-table">
                  <thead>
                    <tr>
                      <th>Scheme Name</th>
                      <th>Application ID</th>
                      <th>Applied Date</th>
                      <th>Scheme Value</th>
                      <th>Stage</th>
                      <th>Est. Disbursal</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'RIPS 2022 Interest Subvention', id: 'APP1024', date: '01-Mar-2026', value: '₹18.5L', stage: 'Under Review', stageColor: '#f59e0b', disbursal: 'Apr 2026' },
                      { name: 'Solar Grid Subsidy (Phase 1)', id: 'APP1055', date: '15-Feb-2026', value: '₹12.0L', stage: 'Approved', stageColor: '#10b981', disbursal: 'Mar 2026' },
                      { name: 'ZED Certification Grant', id: 'APP1067', date: '10-Feb-2026', value: '₹3.6L', stage: 'Field Verification', stageColor: '#0ea5e9', disbursal: 'May 2026' },
                      { name: 'CLCSS Machinery Upgrade', id: 'APP1078', date: '20-Jan-2026', value: '₹28.0L', stage: 'Applied', stageColor: '#6366f1', disbursal: 'Jun 2026' },
                      { name: 'Textile Skill Dev. Fund', id: 'APP0998', date: '05-Jan-2026', value: '₹4.5L', stage: 'Disbursed', stageColor: '#34d399', disbursal: 'Completed ✓' },
                    ].map((row, i) => (
                      <tr key={i} className="gov-table-row">
                        <td style={{ fontWeight: '600', color: '#e2e8f0' }}>{row.name}</td>
                        <td><span className="gov-id-badge">{row.id}</span></td>
                        <td style={{ color: '#94a3b8' }}>{row.date}</td>
                        <td style={{ fontWeight: '700', color: '#34d399' }}>{row.value}</td>
                        <td><span className="gov-status-pill" style={{ background: `${row.stageColor}20`, color: row.stageColor, border: `1px solid ${row.stageColor}40` }}>{row.stage}</span></td>
                        <td style={{ color: '#94a3b8' }}>{row.disbursal}</td>
                        <td>
                          <button className="gov-action-btn" onClick={() => alert(`Viewing details for ${row.id}`)}>View →</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION: Subsidy Savings Dashboard */}
            <div className="gov-section-card gov-savings-card" style={{ marginTop: '1.5rem' }}>
              <div className="gov-section-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="gov-icon-badge" style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399' }}>
                    <Award size={20} />
                  </div>
                  <div>
                    <div className="gov-section-title">Subsidy Savings Impact Dashboard</div>
                    <div className="gov-section-subtitle">Total government benefit unlocked for your factory</div>
                  </div>
                </div>
              </div>

              <div className="savings-kpi-grid">
                {[
                  { label: 'Total Applied Value', value: '₹66.6L', sub: 'Across 5 active schemes', color: '#6366f1', icon: '📊' },
                  { label: 'Confirmed Savings', value: '₹16.5L', sub: 'Approved + Disbursed', color: '#10b981', icon: '✅' },
                  { label: 'Pending Benefit', value: '₹50.1L', sub: 'Under review / Processing', color: '#f59e0b', icon: '⏳' },
                  { label: 'Electricity Duty Saved', value: '₹8.2L/yr', sub: 'RIPS 2022 exemption', color: '#0ea5e9', icon: '⚡' },
                ].map((kpi, i) => (
                  <div key={i} className="savings-kpi-card" style={{ borderTop: `3px solid ${kpi.color}` }}>
                    <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{kpi.icon}</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{kpi.label}</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: '900', color: kpi.color }}>{kpi.value}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px' }}>{kpi.sub}</div>
                  </div>
                ))}
              </div>

              {/* Savings Breakdown Bar */}
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '8px', letterSpacing: '1px', textTransform: 'uppercase' }}>Scheme-wise Benefit Allocation</div>
                <div style={{ height: '28px', borderRadius: '14px', overflow: 'hidden', display: 'flex', gap: '2px' }}>
                  {[
                    { pct: 28, color: '#6366f1', label: 'RIPS' },
                    { pct: 18, color: '#0ea5e9', label: 'Solar' },
                    { pct: 42, color: '#8b5cf6', label: 'CLCSS' },
                    { pct: 5, color: '#10b981', label: 'ZED' },
                    { pct: 7, color: '#34d399', label: 'Skill' },
                  ].map((seg, i) => (
                    <div key={i} style={{ flex: seg.pct, background: seg.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: '700', color: 'white', minWidth: '30px', transition: 'flex 0.8s ease', cursor: 'default' }} title={`${seg.label}: ${seg.pct}%`}>
                      {seg.pct > 10 ? `${seg.label} ${seg.pct}%` : ''}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
                  {[{ label: 'RIPS 2022', color: '#6366f1' }, { label: 'Solar', color: '#0ea5e9' }, { label: 'CLCSS', color: '#8b5cf6' }, { label: 'ZED', color: '#10b981' }, { label: 'Skill Fund', color: '#34d399' }].map((l, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#94a3b8' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: l.color }}></div>
                      {l.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SECTION: Compliance Calendar */}
            <div className="gov-section-card" style={{ marginTop: '1.5rem' }}>
              <div className="gov-section-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="gov-icon-badge" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>
                    <Activity size={20} />
                  </div>
                  <div>
                    <div className="gov-section-title">Compliance & Deadline Calendar</div>
                    <div className="gov-section-subtitle">AI-monitored critical dates for your registered schemes</div>
                  </div>
                </div>
                <div style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: '700', background: 'rgba(245,158,11,0.1)', padding: '4px 10px', borderRadius: '20px', border: '1px solid rgba(245,158,11,0.3)' }}>⚠ 2 URGENT</div>
              </div>

              <div className="calendar-grid">
                {[
                  { date: '31 Mar', scheme: 'RIPS 2022 – Annual Return Submission', urgency: 'CRITICAL', daysLeft: 17, color: '#ef4444', action: 'File Now' },
                  { date: '10 Apr', scheme: 'ZED Audit Documentation Upload', urgency: 'URGENT', daysLeft: 27, color: '#f59e0b', action: 'Prepare' },
                  { date: '30 Apr', scheme: 'Solar Subsidy Phase 1 – Equipment Invoice', urgency: 'UPCOMING', daysLeft: 47, color: '#0ea5e9', action: 'Review' },
                  { date: '31 May', scheme: 'CLCSS – Progress Report Submission', urgency: 'SCHEDULED', daysLeft: 78, color: '#6366f1', action: 'Schedule' },
                  { date: '31 Oct', scheme: 'SITP Interest Subvention Deadline', urgency: 'SCHEDULED', daysLeft: 231, color: '#94a3b8', action: 'Noted' },
                ].map((item, i) => (
                  <div key={i} className="calendar-item" style={{ borderLeft: `3px solid ${item.color}` }}>
                    <div className="calendar-date-box" style={{ background: `${item.color}15`, border: `1px solid ${item.color}40` }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: '900', color: item.color }}>{item.date.split(' ')[0]}</div>
                      <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{item.date.split(' ')[1]}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', fontSize: '0.88rem', marginBottom: '4px', color: '#e2e8f0' }}>{item.scheme}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: '700', color: item.color, background: `${item.color}15`, padding: '2px 6px', borderRadius: '4px' }}>{item.urgency}</span>
                        <span style={{ fontSize: '0.65rem', color: '#64748b' }}>{item.daysLeft} days remaining</span>
                      </div>
                    </div>
                    <button className="gov-action-btn" style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }} onClick={() => alert(`Action: ${item.action} for ${item.scheme}`)}>{item.action}</button>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION: Premium Policy Matrix */}
            <div className="gov-section-card" style={{ marginTop: '1.5rem' }}>
              <div className="gov-section-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="gov-icon-badge" style={{ background: 'rgba(139,92,246,0.15)', color: '#8b5cf6' }}>
                    <Factory size={20} />
                  </div>
                  <div>
                    <div className="gov-section-title">Rajasthan Scheme Eligibility Matrix</div>
                    <div className="gov-section-subtitle">AI-scored suitability for your factory profile</div>
                  </div>
                </div>
              </div>

              <div className="policy-matrix-grid">
                {[
                  { name: 'RIPS 2022', fullName: 'Rajasthan Investment Promotion Scheme', eligibility: 95, category: 'Capital Subsidy', benefit: '₹18–25L', status: 'Active', color: '#6366f1', features: ['Electricity Duty Waiver', 'Land Tax Exemption', 'Interest Subvention @5%', 'Employment Incentive'] },
                  { name: 'CLCSS', fullName: 'Credit Linked Capital Subsidy Scheme', eligibility: 88, category: 'Machinery Upgrade', benefit: '₹28L', status: 'Applied', color: '#0ea5e9', features: ['15% Capital Subsidy', 'Up to ₹15L ceiling', 'SIDBI Nodal Agency', 'Textile Focus Priority'] },
                  { name: 'PMEGP', fullName: 'Prime Minister Employment Generation', eligibility: 92, category: 'Enterprise Subsidy', benefit: '₹35%', status: 'Eligible', color: '#10b981', features: ['35% Urban Subsidy', 'Credit facility via Banks', 'KVIC Implementation', 'SC/ST Priority'] },
                  { name: 'ZED', fullName: 'Zero Defect Zero Effect Scheme', eligibility: 78, category: 'Quality Certification', benefit: '₹3.6L', status: 'In Progress', color: '#f59e0b', features: ['90% Cost Refund', 'Quality Stamp', 'Export Market Access', 'Rating Certificate'] },
                  { name: 'SITP', fullName: 'Scheme for Integrated Textile Parks', eligibility: 65, category: 'Cluster Development', benefit: 'Infrastructure', status: 'Available', color: '#ec4899', features: ['Plug & Play Factory', 'Common Infrastructure', 'Logistics Support', 'Skill Centre Access'] },
                  { name: 'TSDF', fullName: 'Textile Skill Development Fund', eligibility: 99, category: 'Worker Upskilling', benefit: '₹15K/Worker', status: 'Approved', color: '#34d399', features: ['₹15,000 per Karigar', 'Govt Certified Training', 'Digital Skill Modules', 'Attendance Incentive'] },
                ].map((policy, i) => (
                  <div key={i} className="policy-card" style={{ borderTop: `3px solid ${policy.color}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <div>
                        <div style={{ fontSize: '1.1rem', fontWeight: '900', color: policy.color }}>{policy.name}</div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '2px' }}>{policy.fullName}</div>
                      </div>
                      <span style={{ fontSize: '0.6rem', fontWeight: '700', padding: '3px 8px', borderRadius: '20px', background: `${policy.color}20`, color: policy.color, border: `1px solid ${policy.color}40`, whiteSpace: 'nowrap' }}>{policy.status}</span>
                    </div>

                    {/* Eligibility Score Bar */}
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', marginBottom: '4px' }}>
                        <span style={{ color: '#94a3b8' }}>AI Eligibility Score</span>
                        <span style={{ color: policy.color, fontWeight: '700' }}>{policy.eligibility}%</span>
                      </div>
                      <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${policy.eligibility}%`, height: '100%', background: `linear-gradient(90deg, ${policy.color}, ${policy.color}aa)`, borderRadius: '3px', boxShadow: `0 0 8px ${policy.color}60`, transition: 'width 1s ease' }}></div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.75rem' }}>
                      <div>
                        <div style={{ color: '#64748b' }}>Category</div>
                        <div style={{ color: '#e2e8f0', fontWeight: '600' }}>{policy.category}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: '#64748b' }}>Max Benefit</div>
                        <div style={{ color: policy.color, fontWeight: '800' }}>{policy.benefit}</div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '14px' }}>
                      {policy.features.map((f, fi) => (
                        <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: '#94a3b8', marginBottom: '3px' }}>
                          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: policy.color, flexShrink: 0 }}></div>
                          {f}
                        </div>
                      ))}
                    </div>

                    <button className="gov-apply-btn" style={{ background: `linear-gradient(135deg, ${policy.color}20, ${policy.color}10)`, border: `1px solid ${policy.color}50`, color: policy.color }} onClick={() => alert(`Initiating application for ${policy.name}`)}>
                      {policy.status === 'Applied' || policy.status === 'In Progress' ? '📋 Track Application' : policy.status === 'Approved' ? '✅ Download Sanction Letter' : '⚡ Apply Now'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION: Gov Contacts & Fast Track */}
            <div className="gov-section-card" style={{ marginTop: '1.5rem' }}>
              <div className="gov-section-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="gov-icon-badge" style={{ background: 'rgba(14,165,233,0.15)', color: '#0ea5e9' }}>
                    <Landmark size={20} />
                  </div>
                  <div>
                    <div className="gov-section-title">Bhilwara Gov. Contact Directory & Fast-Track Portals</div>
                    <div className="gov-section-subtitle">Direct access to district offices and online government portals</div>
                  </div>
                </div>
              </div>

              <div className="contacts-grid">
                {[
                  { name: 'District Industries Centre', short: 'DIC Bhilwara', phone: '01482-230710', email: 'dic.bhilwara@rajasthan.gov.in', role: 'RIPS, PMEGP, CLCSS Nodal Office', color: '#6366f1', link: 'https://industries.rajasthan.gov.in' },
                  { name: 'MSME Development Institute', short: 'MSME-DI Jaipur', phone: '0141-2390557', email: 'msmedi-jaipur@dcmsme.gov.in', role: 'Technology & Capacity Building', color: '#0ea5e9', link: 'https://msme.gov.in' },
                  { name: 'Rajasthan RCSS Portal', short: 'Single Window', phone: '0141-2385562', email: 'helpdesk.rajnivesh@rajasthan.gov.in', role: 'All Clearances & NOC Gateway', color: '#10b981', link: 'https://rajnivesh.rajasthan.gov.in' },
                  { name: 'ZED Certification Authority', short: 'QCI–ZED', phone: '011-23357820', email: 'zed@qcin.org', role: 'Zero Defect Certification Body', color: '#f59e0b', link: 'https://zed.org.in' },
                ].map((c, i) => (
                  <div key={i} className="contact-card" style={{ borderLeft: `3px solid ${c.color}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#e2e8f0' }}>{c.name}</div>
                        <div style={{ fontSize: '0.7rem', color: c.color, fontWeight: '600' }}>{c.short}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '10px', fontStyle: 'italic' }}>{c.role}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>📞 {c.phone}</div>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>✉️ {c.email}</div>
                    </div>
                    <button className="gov-apply-btn" style={{ background: `${c.color}15`, border: `1px solid ${c.color}40`, color: c.color, width: '100%' }} onClick={() => window.open(c.link, '_blank')}>
                      🌐 Open Portal →
                    </button>
                  </div>
                ))}
              </div>

              {/* Quick Links Row */}
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(14,165,233,0.05)', borderRadius: '12px', border: '1px solid rgba(14,165,233,0.15)' }}>
                <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>⚡ Fast-Track Direct Links</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {[
                    { label: 'Udyam Registration', url: 'https://udyamregistration.gov.in' },
                    { label: 'RIPS 2022 Portal', url: 'https://invest.rajasthan.gov.in' },
                    { label: 'SIDBI CLCSS', url: 'https://www.sidbi.in' },
                    { label: 'GST E-Invoice', url: 'https://einvoice1.gst.gov.in' },
                    { label: 'TReDS Platform', url: 'https://www.m1xchange.com' },
                    { label: 'NSIC Tender Portal', url: 'https://nsic.co.in' },
                  ].map((link, i) => (
                    <button key={i} onClick={() => window.open(link.url, '_blank')} style={{ background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.2)', color: '#0ea5e9', padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseOver={e => { e.currentTarget.style.background = 'rgba(14,165,233,0.2)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                      onMouseOut={e => { e.currentTarget.style.background = 'rgba(14,165,233,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      {link.label} ↗
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <AgentGrid categories={['Finance']} title="Finance & Sector Analytics AI" focusedAgent={focusedAgent} setFocusedAgent={setFocusedAgent} />
          </div>
        )}
        {activeTab === 'govassist' && (
          <div className="cyber-grid" style={{ padding: '0' }}>
            <GovAssist />
          </div>
        )}
      </main>

      {/* MSME Growth Score Modal */}
      {
        isMsmeModalOpen && (
          <div className="modal-overlay" onClick={() => setIsMsmeModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setIsMsmeModalOpen(false)}>✕</button>

              <div className="modal-header">
                <div className="modal-title">Overall Transformation Index</div>
                <div className="modal-score-wrap">
                  <div className="modal-score-glow"></div>
                  <div className="modal-score">78<span> / 100</span></div>
                </div>
              </div>

              <div className="modal-grid">
                <div className="metric-card" style={{ '--metric-color': '#10b981' }}>
                  <div className="metric-icon">📈</div>
                  <div className="metric-content">
                    <div className="metric-title">Production Efficiency</div>
                    <div className="metric-value">
                      82%
                      <div className="circular-progress" style={{ '--progress': '82%' }}></div>
                    </div>
                    <div className="metric-desc">Machines running efficiently with minimal downtime.</div>
                  </div>
                </div>

                <div className="metric-card" style={{ '--metric-color': '#f59e0b' }}>
                  <div className="metric-icon">⚡</div>
                  <div className="metric-content">
                    <div className="metric-title">Energy Efficiency</div>
                    <div className="metric-value">
                      70%
                      <div className="circular-progress" style={{ '--progress': '70%' }}></div>
                    </div>
                    <div className="metric-desc">High electricity usage detected, optimization recommended.</div>
                  </div>
                </div>

                <div className="metric-card" style={{ '--metric-color': '#10b981' }}>
                  <div className="metric-icon">👷</div>
                  <div className="metric-content">
                    <div className="metric-title">Workforce Productivity</div>
                    <div className="metric-value">
                      85%
                      <div className="circular-progress" style={{ '--progress': '85%' }}></div>
                    </div>
                    <div className="metric-desc">Worker productivity is above the cluster average.</div>
                  </div>
                </div>

                <div className="metric-card" style={{ '--metric-color': '#10b981' }}>
                  <div className="metric-icon">💰</div>
                  <div className="metric-content">
                    <div className="metric-title">Financial Stability</div>
                    <div className="metric-value">
                      75%
                      <div className="circular-progress" style={{ '--progress': '75%' }}></div>
                    </div>
                    <div className="metric-desc">Factory shows stable profit growth and positive cash flow.</div>
                  </div>
                </div>
              </div>

              <div className="modal-recommendations">
                <div className="rec-title">
                  <Bot size={20} /> AI Strategic Recommendations
                </div>
                <ul className="rec-list">
                  <li className="rec-item">Install solar hybrid energy system to boost Energy Efficiency score.</li>
                  <li className="rec-item">Upgrade 2 old weaving machines to reduce unexpected downtime.</li>
                  <li className="rec-item">Provide worker skill training to further increase productivity yields.</li>
                </ul>
              </div>
            </div>
          </div>
        )
      }

      {/* Cluster AI Modal */}
      {
        isClusterModalOpen && (
          <div className="modal-overlay" onClick={() => setIsClusterModalOpen(false)}>
            <div className="cluster-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setIsClusterModalOpen(false)}>✕</button>

              <div className="modal-header" style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem' }}>
                <div className="modal-title" style={{ color: '#22d3ee', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Cluster AI – Industrial Benchmark Intelligence</div>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>AI-powered comparison of factory performance across the entire industrial cluster.</p>
              </div>

              <div className="cluster-section-title"><Activity size={18} /> Cluster Performance Overview</div>
              <div className="modal-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '1.5rem' }}>
                <div className="cluster-metric-card">
                  <div className="metric-title">Your Factory Performance</div>
                  <div className="metric-value">82% Efficiency</div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginTop: '10px' }}>
                    <div className="cluster-glow-bar" style={{ width: '82%' }}></div>
                  </div>
                </div>
                <div className="cluster-metric-card">
                  <div className="metric-title">Cluster Average Performance</div>
                  <div className="metric-value" style={{ color: '#fbbf24' }}>74% Efficiency</div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginTop: '10px' }}>
                    <div className="cluster-glow-bar" style={{ width: '74%', background: '#fbbf24', boxShadow: '0 0 10px #fbbf24' }}></div>
                  </div>
                </div>
                <div className="cluster-metric-card">
                  <div className="metric-title">Top Factory Performance</div>
                  <div className="metric-value" style={{ color: '#8b5cf6' }}>91% Efficiency</div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginTop: '10px' }}>
                    <div className="cluster-glow-bar" style={{ width: '91%', background: '#8b5cf6', boxShadow: '0 0 10px #8b5cf6' }}></div>
                  </div>
                </div>
              </div>

              <div className="modal-grid" style={{ marginBottom: '1.5rem' }}>
                <div className="cluster-metric-card">
                  <div className="cluster-section-title" style={{ border: 'none', padding: 0 }}><Factory size={18} /> Production Benchmark</div>
                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}><span style={{ color: '#94a3b8' }}>Your Production:</span> <span style={{ fontWeight: 'bold' }}>12,500 units/day</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}><span style={{ color: '#94a3b8' }}>Cluster Average:</span> <span style={{ fontWeight: 'bold', color: '#fbbf24' }}>10,800 units/day</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}><span style={{ color: '#94a3b8' }}>Top Factory:</span> <span style={{ fontWeight: 'bold', color: '#8b5cf6' }}>15,200 units/day</span></div>
                  </div>
                </div>

                <div className="cluster-metric-card">
                  <div className="cluster-section-title" style={{ border: 'none', padding: 0 }}><Zap size={18} /> Energy Intelligence</div>
                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}><span style={{ color: '#94a3b8' }}>Your Cost:</span> <span style={{ fontWeight: 'bold', color: '#ef4444' }}>₹2.3L / month</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}><span style={{ color: '#94a3b8' }}>Cluster Average:</span> <span style={{ fontWeight: 'bold' }}>₹2.0L / month</span></div>
                  </div>
                  <div className="cluster-insight" style={{ borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5' }}>
                    Your factory energy cost is slightly higher than the cluster average. AI recommends energy optimization.
                  </div>
                </div>

                <div className="cluster-metric-card">
                  <div className="cluster-section-title" style={{ border: 'none', padding: 0 }}><Users size={18} /> Workforce Productivity</div>
                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}><span style={{ color: '#94a3b8' }}>Your Productivity:</span> <span style={{ fontWeight: 'bold', color: '#10b981' }}>85%</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}><span style={{ color: '#94a3b8' }}>Cluster Average:</span> <span style={{ fontWeight: 'bold' }}>78%</span></div>
                  </div>
                  <div className="cluster-insight">
                    Your workforce productivity is above the cluster average.
                  </div>
                </div>

                <div className="cluster-metric-card">
                  <div className="cluster-section-title" style={{ border: 'none', padding: 0 }}><TrendingUp size={18} /> Demand Prediction</div>
                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}><span style={{ color: '#94a3b8' }}>Next Month Trend:</span> <span style={{ fontWeight: 'bold', color: '#10b981' }}>HIGH</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}><span style={{ color: '#94a3b8' }}>Market Price Exp:</span> <span style={{ fontWeight: 'bold', color: '#10b981' }}>+6% Increase</span></div>
                  </div>
                  <div className="cluster-insight" style={{ borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#93c5fd' }}>
                    Demand for textile products is expected to increase across the cluster.
                  </div>
                </div>
              </div>

              <div className="modal-grid">
                <div className="cluster-metric-card" style={{ gridColumn: '1 / -1' }}>
                  <div className="cluster-section-title"><Award size={18} /> Top Performing Factories</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                      <div style={{ width: '30px', height: '30px', background: '#fbbf24', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: 'black' }}>1</div>
                      <div style={{ flex: 1, fontWeight: 'bold' }}>Shree Textiles</div>
                      <div style={{ color: '#fbbf24', fontWeight: 'bold' }}>Growth Score: 91</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                      <div style={{ width: '30px', height: '30px', background: '#94a3b8', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: 'black' }}>2</div>
                      <div style={{ flex: 1, fontWeight: 'bold' }}>Surya Fabrics</div>
                      <div style={{ color: '#94a3b8', fontWeight: 'bold' }}>Growth Score: 88</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', borderRadius: '8px' }}>
                      <div style={{ width: '30px', height: '30px', background: '#10b981', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: 'black' }}>3</div>
                      <div style={{ flex: 1, fontWeight: 'bold', color: '#10b981' }}>Your Factory</div>
                      <div style={{ color: '#10b981', fontWeight: 'bold' }}>Growth Score: 82</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-recommendations" style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                <div className="rec-title" style={{ color: '#10b981' }}>
                  <Bot size={20} /> Cluster AI Recommendations
                </div>
                <ul className="rec-list">
                  <li className="rec-item" style={{ color: '#e2e8f0' }}>Upgrade to Air Jet Loom technology for higher production efficiency.</li>
                  <li className="rec-item" style={{ color: '#e2e8f0' }}>Install solar hybrid energy system to reduce electricity costs.</li>
                  <li className="rec-item" style={{ color: '#e2e8f0' }}>Increase production capacity by 12% to match cluster leaders.</li>
                </ul>
              </div>

              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button
                  className="btn-cyan-gradient"
                  style={{ padding: '12px 30px', borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}
                  onClick={() => {
                    alert("Connecting to Cluster Nodes... Generating Your Custom PDF Report! Click OK to download.");

                    const doc = new jsPDF();

                    // Report Header
                    doc.setFillColor(15, 23, 42); // Dark slate bg
                    doc.rect(0, 0, 210, 40, 'F');
                    doc.setTextColor(34, 211, 238); // Cyan title
                    doc.setFontSize(22);
                    doc.text('BHILWARA CLUSTER AI REPORT', 105, 20, { align: 'center' });
                    doc.setTextColor(148, 163, 184); // Subtitle
                    doc.setFontSize(12);
                    doc.text('Industrial Benchmark Intelligence - Confidential', 105, 30, { align: 'center' });

                    // Main Body
                    doc.setTextColor(30, 41, 59);
                    doc.setFontSize(14);
                    doc.text('1. Performance Overview', 14, 50);

                    autoTable(doc, {
                      startY: 55,
                      head: [['Metric', 'Your Factory', 'Cluster Average', 'Cluster Leader']],
                      body: [
                        ['Production Efficiency', '82%', '74%', '91%'],
                        ['Workforce Productivity', '85%', '78%', '88%'],
                        ['Energy Cost (per month)', 'INR 2.3L', 'INR 2.0L', 'INR 1.8L']
                      ],
                      headStyles: { fillColor: [16, 185, 129] },
                      alternateRowStyles: { fillColor: [241, 245, 249] },
                      theme: 'grid'
                    });

                    let finalY = doc.lastAutoTable.finalY || 55;

                    doc.setFontSize(14);
                    doc.text('2. Top Performing Factories (Leaderboard)', 14, finalY + 15);

                    autoTable(doc, {
                      startY: finalY + 20,
                      head: [['Rank', 'Factory Name', 'Growth Score']],
                      body: [
                        ['1', 'Shree Textiles', '91'],
                        ['2', 'Surya Fabrics', '88'],
                        ['3', 'Your Factory', '82']
                      ],
                      headStyles: { fillColor: [59, 130, 246] },
                      theme: 'striped'
                    });

                    finalY = doc.lastAutoTable.finalY || finalY + 20;

                    doc.setFontSize(14);
                    doc.setTextColor(30, 41, 59);
                    doc.text('3. AI Strategic Recommendations', 14, finalY + 15);

                    doc.setFontSize(11);
                    doc.setTextColor(71, 85, 105);
                    const splitText = doc.splitTextToSize(
                      "• Upgrade to Air Jet Loom technology for higher production efficiency.\n\n" +
                      "• Install a solar hybrid energy system to reduce your high electricity costs down to cluster average.\n\n" +
                      "• Increase production capacity by 12% to effectively match cluster leaders and capitalize on the +6% expected demand trend.",
                      180
                    );
                    doc.text(splitText, 14, finalY + 25);

                    // Footer
                    doc.setFontSize(10);
                    doc.setTextColor(148, 163, 184);
                    doc.text('Generated by SmartFactory AI System', 105, 280, { align: 'center' });

                    doc.save('Bhilwara_Cluster_Report.pdf');
                  }}
                >
                  View Full Cluster Intelligence Report
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* Government Subsidy AI Modal */}
      {
        isSubsidyModalOpen && (
          <div className="modal-overlay" onClick={() => setIsSubsidyModalOpen(false)}>
            <div className="subsidy-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setIsSubsidyModalOpen(false)}>✕</button>

              <div className="modal-header" style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(59, 130, 246, 0.2)' }}>
                <div className="modal-title" style={{ color: '#60a5fa', fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <Landmark size={24} /> Government Subsidy Intelligence
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>AI-powered system that identifies government subsidies available for the factory.</p>
              </div>

              <div className="cluster-section-title" style={{ color: '#60a5fa', borderBottomColor: 'rgba(96, 165, 250, 0.2)' }}><Briefcase size={18} /> Eligible Government Schemes</div>
              <div className="modal-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '1.5rem' }}>
                <div className="subsidy-card subsidy-card-glow">
                  <div className="metric-title" style={{ color: '#f8fafc' }}>RIPS 2022</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '10px' }}>Rajasthan Investment Promotion Scheme</div>
                  <div className="metric-value" style={{ color: '#10b981', fontSize: '1.2rem' }}>₹1.2 Crore Capital Subsidy</div>
                  <div style={{ marginTop: '10px' }}><span className="status-badge badge-eligible">Eligible</span></div>
                </div>
                <div className="subsidy-card subsidy-card-glow">
                  <div className="metric-title" style={{ color: '#f8fafc' }}>TUFS</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '10px' }}>Technology Upgradation Fund Scheme</div>
                  <div className="metric-value" style={{ color: '#3b82f6', fontSize: '1.2rem' }}>25% Machinery Subsidy</div>
                  <div style={{ marginTop: '10px' }}><span className="status-badge badge-review">In Review</span></div>
                </div>
                <div className="subsidy-card subsidy-card-glow">
                  <div className="metric-title" style={{ color: '#f8fafc' }}>Solar Energy Subsidy</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '10px' }}>State Renewable Energy Board</div>
                  <div className="metric-value" style={{ color: '#fbbf24', fontSize: '1.2rem' }}>₹85,000 Monthly Savings</div>
                  <div style={{ marginTop: '10px' }}><span className="status-badge badge-approved">Approved</span></div>
                </div>
              </div>

              <div className="modal-grid" style={{ marginBottom: '1.5rem', gridTemplateColumns: '1fr 1fr' }}>
                <div className="subsidy-card">
                  <div className="cluster-section-title" style={{ color: '#60a5fa', borderBottom: 'none', padding: 0 }}><Activity size={18} /> Application Status</div>
                  <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ fontWeight: 'bold' }}>RIPS 2022</span>
                        <span className="status-badge badge-not-applied">Not Applied</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
                        <div style={{ width: '0%', height: '100%', background: '#94a3b8', borderRadius: '3px' }}></div>
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ fontWeight: 'bold' }}>TUFS Scheme</span>
                        <span className="status-badge badge-review">In Review</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
                        <div style={{ width: '65%', height: '100%', background: '#f59e0b', borderRadius: '3px', boxShadow: '0 0 8px #f59e0b' }}></div>
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <span style={{ fontWeight: 'bold' }}>Solar Subsidy</span>
                        <span className="status-badge badge-approved">Approved</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
                        <div style={{ width: '100%', height: '100%', background: '#3b82f6', borderRadius: '3px', boxShadow: '0 0 8px #3b82f6' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="subsidy-card">
                  <div className="cluster-section-title" style={{ color: '#60a5fa', borderBottom: 'none', padding: 0 }}><DollarSign size={18} /> Estimated Financial Benefit</div>
                  <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
                      <span style={{ color: '#94a3b8' }}>Capital Subsidy:</span>
                      <span style={{ fontWeight: 'bold', color: '#10b981', fontSize: '1.1rem' }}>₹1.2 Crore</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
                      <span style={{ color: '#94a3b8' }}>Machinery Subsidy:</span>
                      <span style={{ fontWeight: 'bold', color: '#10b981', fontSize: '1.1rem' }}>₹45 Lakh</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94a3b8' }}>Energy Savings:</span>
                      <span style={{ fontWeight: 'bold', color: '#10b981', fontSize: '1.1rem' }}>₹10 Lakh / year</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-grid" style={{ marginBottom: '1.5rem', gridTemplateColumns: '1.5fr 1fr' }}>
                <div className="subsidy-card" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.05))', borderColor: 'rgba(59, 130, 246, 0.3)' }}>
                  <div className="cluster-section-title" style={{ color: '#60a5fa', borderBottom: 'none', padding: 0 }}><Sparkles size={18} /> AI Auto-Fill Application</div>
                  <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.5', margin: '1rem 0' }}>
                    The system automatically collects factory data including energy usage, worker count, and machinery details to generate government-ready application forms.
                  </p>
                  <button
                    className="btn-cyan-gradient"
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                    onClick={() => {
                      alert("GenAI extracting factory data... Fetching Udyam Registration... Applying Machine Specs... Click OK to download draft!");

                      const doc = new jsPDF();

                      // Government Header
                      doc.setFillColor(248, 250, 252);
                      doc.rect(0, 0, 210, 297, 'F');
                      doc.setTextColor(30, 58, 138);
                      doc.setFontSize(18);
                      doc.setFont("helvetica", "bold");
                      doc.text('GOVERNMENT OF RAJASTHAN', 105, 20, { align: 'center' });
                      doc.setFontSize(14);
                      doc.text('RAJASTHAN INVESTMENT PROMOTION SCHEME (RIPS-2022)', 105, 30, { align: 'center' });
                      doc.setFontSize(12);
                      doc.setTextColor(71, 85, 105);
                      doc.text('Auto-Generated Application Form - Form A', 105, 38, { align: 'center' });

                      doc.setDrawColor(203, 213, 225);
                      doc.line(14, 45, 196, 45);

                      // Form Content
                      doc.setTextColor(15, 23, 42);
                      doc.setFontSize(12);
                      doc.setFont("helvetica", "bold");
                      doc.text('ENTERPRISE DETAILS (Data Auto-Extracted)', 14, 55);

                      doc.setFont("helvetica", "normal");
                      doc.setFontSize(11);
                      const formY = 65;
                      const lineSpacing = 10;

                      doc.text('Name of Enterprise:', 14, formY);
                      doc.setFont("helvetica", "bold"); doc.text('Bhilwara Smart Textiles Pvt. Ltd.', 80, formY); doc.setFont("helvetica", "normal");

                      doc.text('Udyam Registration No:', 14, formY + lineSpacing);
                      doc.setFont("helvetica", "bold"); doc.text('UDYAM-RJ-08-10245', 80, formY + lineSpacing); doc.setFont("helvetica", "normal");

                      doc.text('Registered Address:', 14, formY + (lineSpacing * 2));
                      doc.text('Plot 42, RIICO Industrial Area, Bhilwara, Rajasthan 311001', 80, formY + (lineSpacing * 2));

                      doc.text('Category of Enterprise:', 14, formY + (lineSpacing * 3));
                      doc.text('Medium Enterprise (Textile & Technical Textiles)', 80, formY + (lineSpacing * 3));

                      doc.line(14, formY + (lineSpacing * 4), 196, formY + (lineSpacing * 4));

                      doc.setFont("helvetica", "bold");
                      doc.text('SUBSIDY CLAIM DETAILS', 14, formY + (lineSpacing * 5));
                      doc.setFont("helvetica", "normal");

                      autoTable(doc, {
                        startY: formY + (lineSpacing * 5.5),
                        head: [['Investment Type', 'Amount Invested', 'Eligible Subsidy (%)', 'Claim Amount']],
                        body: [
                          ['Plant & Machinery (Air Jet Looms)', 'INR 4.0 Crore', '25%', 'INR 1.0 Crore'],
                          ['Green Energy (Solar Hybrid System)', 'INR 1.0 Crore', '20%', 'INR 20 Lakh'],
                          ['Total Capital Subsidy Claim', '-', '-', 'INR 1.2 Crore']
                        ],
                        headStyles: { fillColor: [30, 58, 138] },
                        alternateRowStyles: { fillColor: [241, 245, 249] },
                        theme: 'grid'
                      });

                      let finalY = doc.lastAutoTable.finalY || 150;

                      doc.setFont("helvetica", "bold");
                      doc.text('DECLARATION', 14, finalY + 15);
                      doc.setFont("helvetica", "normal");
                      doc.setFontSize(10);

                      const declarationText = doc.splitTextToSize("I hereby declare that the information provided above is automatically calculated from real-time secure IoT sensors and ERP logs integrated via the SmartFactory Platform. The generated values are verified against manufacturing production records.", 182);
                      doc.text(declarationText, 14, finalY + 25);

                      // Stamp & Signature Simulation
                      doc.setDrawColor(16, 185, 129);
                      doc.setLineWidth(1);
                      doc.rect(140, finalY + 45, 50, 25);
                      doc.setTextColor(16, 185, 129);
                      doc.text('e-Verified by', 145, finalY + 52);
                      doc.text('SmartFactory AI', 145, finalY + 58);
                      doc.text('Date: ' + new Date().toLocaleDateString(), 145, finalY + 66);

                      // Download
                      doc.save('RIPS-2022-Application-Draft.pdf');
                    }}
                  >
                    <FileScan size={18} /> Generate Auto-Filled Subsidy Application
                  </button>
                </div>

                <div className="subsidy-card">
                  <div className="cluster-section-title" style={{ color: '#60a5fa', borderBottom: 'none', padding: 0 }}><Activity size={18} /> Subsidy Deadline Tracker</div>
                  <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '10px', borderRadius: '8px', borderLeft: '3px solid #f59e0b' }}>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>TUFS Application Deadline:</div>
                      <div style={{ fontWeight: 'bold', color: '#f59e0b', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '5px' }}>12 April <span style={{ fontSize: '0.75rem', background: '#f59e0b', color: 'black', padding: '2px 6px', borderRadius: '10px' }}>Urgent</span></div>
                    </div>
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Solar Subsidy Window:</div>
                      <div style={{ fontWeight: 'bold', color: '#10b981', fontSize: '1.1rem' }}>25 days remaining</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button
                  style={{ background: 'transparent', border: '1px solid #3b82f6', color: '#3b82f6', padding: '10px 25px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease' }}
                  onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  onClick={() => {
                    alert("Compiling Subsidy Eligibility Data... Click OK to download your report.");

                    const doc = new jsPDF();

                    doc.setFillColor(15, 23, 42);
                    doc.rect(0, 0, 210, 40, 'F');
                    doc.setTextColor(34, 211, 238);
                    doc.setFontSize(22);
                    doc.setFont("helvetica", "bold");
                    doc.text('SUBSIDY ELIGIBILITY REPORT', 105, 20, { align: 'center' });
                    doc.setTextColor(148, 163, 184);
                    doc.setFontSize(12);
                    doc.setFont("helvetica", "normal");
                    doc.text('SmartFactory Financial Intelligence', 105, 30, { align: 'center' });

                    doc.setTextColor(30, 41, 59);
                    doc.setFontSize(14);
                    doc.setFont("helvetica", "bold");
                    doc.text('1. Identified Government Schemes', 14, 50);

                    doc.setFont("helvetica", "normal");
                    autoTable(doc, {
                      startY: 55,
                      head: [['Scheme Name', 'Benefit Type', 'Estimated Value', 'Status']],
                      body: [
                        ['RIPS 2022 (Rajasthan)', 'Capital Subsidy', 'INR 1.2 Crore', 'Eligible'],
                        ['TUFS (Textiles)', 'Machinery Subsidy', '25% (Est. 45L)', 'In Review'],
                        ['Solar Energy Board', 'Energy Savings', 'INR 10L / year', 'Approved']
                      ],
                      headStyles: { fillColor: [59, 130, 246] },
                      alternateRowStyles: { fillColor: [241, 245, 249] },
                      theme: 'grid'
                    });

                    let finalY = doc.lastAutoTable.finalY || 55;

                    doc.setFontSize(14);
                    doc.setFont("helvetica", "bold");
                    doc.text('2. Action Items & Next Steps', 14, finalY + 15);

                    doc.setFontSize(11);
                    doc.setFont("helvetica", "normal");
                    doc.setTextColor(71, 85, 105);
                    const actionsText = doc.splitTextToSize(
                      "• The RIPS 2022 application requires immediate submission. All prerequisite data has been collected by the SmartFactory platform.\n\n" +
                      "• TUFS Scheme is under review. The designated nodal officer will process the machine specs within 14 working days.\n\n" +
                      "• The Solar Subsidy is approved and installation should be scheduled before the 25-day deadline expires.",
                      180
                    );
                    doc.text(actionsText, 14, finalY + 25);

                    // Footer
                    doc.setFontSize(10);
                    doc.setTextColor(148, 163, 184);
                    doc.text('Confidential - Generated by SmartFactory AI', 105, 280, { align: 'center' });

                    doc.save('Subsidy_Eligibility_Report.pdf');
                  }}
                >
                  Download Subsidy Report
                </button>
              </div>
            </div>
          </div>
        )
      }


      {renderFailureReportModal()}
    </div>
  );
};


