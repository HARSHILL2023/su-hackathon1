const mongoose = require('mongoose');
const FYPJob = require('./models/FYPJob');
const FYPMachine = require('./models/FYPMachine');
const FYPSchedule = require('./models/FYPSchedule');

const MONGO_URI = 'mongodb://127.0.0.1:27017/smartfactory';

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB...');

    // Clear existing data
    await FYPJob.deleteMany({});
    await FYPMachine.deleteMany({});
    await FYPSchedule.deleteMany({});
    console.log('Cleared old FYP data.');

    // === MACHINES — Real Bhilwara Textile Cluster ===
    const machines = await FYPMachine.insertMany([
      { machineId: 'M-01', machineName: 'Jacquard Loom #01', status: 'running', color: '#3b82f6' },
      { machineId: 'M-02', machineName: 'Air-Jet Loom #02', status: 'running', color: '#10b981' },
      { machineId: 'M-03', machineName: 'Rapier Loom #03', status: 'idle', color: '#f59e0b' },
      { machineId: 'M-04', machineName: 'High-Temp Stenter', status: 'running', color: '#8b5cf6' },
      { machineId: 'M-05', machineName: 'Dyeing Vat Alpha', status: 'running', color: '#ec4899' },
      { machineId: 'M-06', machineName: 'Rotary Print M/C', status: 'idle', color: '#f97316' },
      { machineId: 'M-07', machineName: 'Inspection Frame #01', status: 'running', color: '#06b6d4' },
    ]);
    console.log(`Seeded ${machines.length} machines.`);

    // === JOBS — Real Bhilwara textile production orders ===
    const jobs = await FYPJob.insertMany([
      {
        jobId: 'JP-101',
        jobName: 'Premium Denim Bulk',
        priority: 5,
        color: '#3b82f6',
        operations: [
          { machineId: 'M-01', duration: 5, task: 'Warping' },
          { machineId: 'M-04', duration: 3, task: 'Finishing' },
          { machineId: 'M-07', duration: 2, task: 'QC Inspection' }
        ]
      },
      {
        jobId: 'JP-102',
        jobName: 'Export Silk Saree',
        priority: 5,
        color: '#ec4899',
        operations: [
          { machineId: 'M-01', duration: 6, task: 'Weaving' },
          { machineId: 'M-05', duration: 4, task: 'Dyeing' },
          { machineId: 'M-07', duration: 1, task: 'QC Inspection' }
        ]
      },
      {
        jobId: 'JP-103',
        jobName: 'Cotton Twill Uniform',
        priority: 3,
        color: '#10b981',
        operations: [
          { machineId: 'M-02', duration: 4, task: 'Weaving' },
          { machineId: 'M-05', duration: 3, task: 'Dyeing' },
          { machineId: 'M-04', duration: 2, task: 'Stentering' }
        ]
      },
      {
        jobId: 'JP-104',
        jobName: 'Poly-Blend Shirt Fabric',
        priority: 4,
        color: '#8b5cf6',
        operations: [
          { machineId: 'M-02', duration: 5, task: 'Weaving' },
          { machineId: 'M-06', duration: 3, task: 'Printing' },
          { machineId: 'M-04', duration: 2, task: 'Finishing' }
        ]
      },
      {
        jobId: 'JP-105',
        jobName: 'Indigo Denim Wash',
        priority: 3,
        color: '#f59e0b',
        operations: [
          { machineId: 'M-03', duration: 6, task: 'Weaving' },
          { machineId: 'M-05', duration: 5, task: 'Dyeing' }
        ]
      },
      {
        jobId: 'JP-106',
        jobName: 'Linen Upholstery',
        priority: 2,
        color: '#f97316',
        operations: [
          { machineId: 'M-03', duration: 7, task: 'Weaving' },
          { machineId: 'M-04', duration: 2, task: 'Finishing' },
          { machineId: 'M-07', duration: 1, task: 'QC Inspection' }
        ]
      },
      {
        jobId: 'JP-107',
        jobName: 'Synthetic Blend B-12',
        priority: 4,
        color: '#06b6d4',
        operations: [
          { machineId: 'M-02', duration: 3, task: 'Weaving' },
          { machineId: 'M-06', duration: 4, task: 'Printing' },
          { machineId: 'M-07', duration: 2, task: 'QC Inspection' }
        ]
      }
    ]);
    console.log(`Seeded ${jobs.length} jobs.`);

    // === Pre-computed Schedule (based on real priority-based scheduling) ===
    const scheduleEntries = [
      // JP-101: Premium Denim Bulk (Priority 5)
      { jobId: 'JP-101', jobName: 'Premium Denim Bulk',    machineId: 'M-01', task: 'Warping',        start: 0, duration: 5, end: 5,  color: '#3b82f6' },
      { jobId: 'JP-101', jobName: 'Premium Denim Bulk',    machineId: 'M-04', task: 'Finishing',       start: 5, duration: 3, end: 8,  color: '#3b82f6' },
      { jobId: 'JP-101', jobName: 'Premium Denim Bulk',    machineId: 'M-07', task: 'QC Inspection',   start: 8, duration: 2, end: 10, color: '#3b82f6' },

      // JP-102: Export Silk Saree (Priority 5)
      { jobId: 'JP-102', jobName: 'Export Silk Saree',     machineId: 'M-01', task: 'Weaving',         start: 5, duration: 6, end: 11, color: '#ec4899' },
      { jobId: 'JP-102', jobName: 'Export Silk Saree',     machineId: 'M-05', task: 'Dyeing',          start: 0, duration: 4, end: 4,  color: '#ec4899' },
      { jobId: 'JP-102', jobName: 'Export Silk Saree',     machineId: 'M-07', task: 'QC Inspection',   start: 11,duration: 1, end: 12, color: '#ec4899' },

      // JP-103: Cotton Twill Uniform (Priority 3)
      { jobId: 'JP-103', jobName: 'Cotton Twill Uniform',  machineId: 'M-02', task: 'Weaving',         start: 0, duration: 4, end: 4,  color: '#10b981' },
      { jobId: 'JP-103', jobName: 'Cotton Twill Uniform',  machineId: 'M-05', task: 'Dyeing',          start: 4, duration: 3, end: 7,  color: '#10b981' },
      { jobId: 'JP-103', jobName: 'Cotton Twill Uniform',  machineId: 'M-04', task: 'Stentering',      start: 8, duration: 2, end: 10, color: '#10b981' },

      // JP-104: Poly-Blend Shirt Fabric (Priority 4)
      { jobId: 'JP-104', jobName: 'Poly-Blend Shirt',      machineId: 'M-02', task: 'Weaving',         start: 4, duration: 5, end: 9,  color: '#8b5cf6' },
      { jobId: 'JP-104', jobName: 'Poly-Blend Shirt',      machineId: 'M-06', task: 'Printing',        start: 0, duration: 3, end: 3,  color: '#8b5cf6' },
      { jobId: 'JP-104', jobName: 'Poly-Blend Shirt',      machineId: 'M-04', task: 'Finishing',       start: 10,duration: 2, end: 12, color: '#8b5cf6' },

      // JP-105: Indigo Denim Wash (Priority 3)
      { jobId: 'JP-105', jobName: 'Indigo Denim Wash',     machineId: 'M-03', task: 'Weaving',         start: 0, duration: 6, end: 6,  color: '#f59e0b' },
      { jobId: 'JP-105', jobName: 'Indigo Denim Wash',     machineId: 'M-05', task: 'Dyeing',          start: 7, duration: 5, end: 12, color: '#f59e0b' },

      // JP-106: Linen Upholstery (Priority 2)
      { jobId: 'JP-106', jobName: 'Linen Upholstery',      machineId: 'M-03', task: 'Weaving',         start: 6, duration: 7, end: 13, color: '#f97316' },
      { jobId: 'JP-106', jobName: 'Linen Upholstery',      machineId: 'M-04', task: 'Finishing',       start: 13,duration: 2, end: 15, color: '#f97316' },
      { jobId: 'JP-106', jobName: 'Linen Upholstery',      machineId: 'M-07', task: 'QC Inspection',   start: 15,duration: 1, end: 16, color: '#f97316' },

      // JP-107: Synthetic Blend (Priority 4)
      { jobId: 'JP-107', jobName: 'Synthetic Blend B-12',  machineId: 'M-02', task: 'Weaving',         start: 9, duration: 3, end: 12, color: '#06b6d4' },
      { jobId: 'JP-107', jobName: 'Synthetic Blend B-12',  machineId: 'M-06', task: 'Printing',        start: 3, duration: 4, end: 7,  color: '#06b6d4' },
      { jobId: 'JP-107', jobName: 'Synthetic Blend B-12',  machineId: 'M-07', task: 'QC Inspection',   start: 12,duration: 2, end: 14, color: '#06b6d4' },
    ];

    await FYPSchedule.insertMany(scheduleEntries);
    console.log(`Seeded ${scheduleEntries.length} schedule entries.`);

    console.log('\n✅ FYP Data Seeded Successfully!');
    console.log('   Machines: 7 (Jacquard, Air-Jet, Rapier Looms, Stenter, Dyeing, Printing, QC)');
    console.log('   Jobs: 7 (Premium Denim, Silk Saree, Cotton Twill, Poly-Blend, Indigo Denim, Linen, Synthetic)');
    console.log('   Schedule Entries: 20 (Full production timeline)');
    process.exit(0);
  } catch (err) {
    console.error('Seed Error:', err);
    process.exit(1);
  }
};

seed();
