/**
 * Production Scheduling Optimizer using Genetic Algorithms
 * Solves the Job Shop Scheduling Problem (JSSP)
 */

module.exports.optimizeScheduling = ({ jobs, machines }) => {
  // Genetic Algorithm Parameters
  const POP_SIZE = 100;
  const GENERATIONS = 150;
  const MUTATION_RATE = 0.15;
  const ELITISM = 0.2;

  // Input Validation & Fallbacks
  if (!jobs || jobs.length === 0) return { error: "No jobs provided" };
  if (!machines || machines.length === 0) return { error: "No machines provided" };

  // Standardize Jobs
  const formattedJobs = jobs.map(j => ({
    ...j,
    priority: j.priority || 1, // Default priority
    operations: j.operations || []
  }));

  // Helper: Calculate Fitness (Makespan)
  const evaluate = (chromosome) => {
    const machineNextFreeTime = {};
    const jobNextFreeTime = {};
    const jobOpProgress = {}; // Which operation is next for each job
    const localSchedule = [];

    // Chromosome is a list of Job IDs. 
    // Each time a job ID appears, it represents the next operation for that job.
    chromosome.forEach(jobId => {
      const job = formattedJobs.find(j => j.id === jobId);
      const opIdx = jobOpProgress[jobId] || 0;
      const op = job.operations[opIdx];

      if (!op) return; // Should not happen with valid chromosome

      const mId = op.machineId;

      // Operation can start only when both machine and job are free
      const startTime = Math.max(machineNextFreeTime[mId] || 0, jobNextFreeTime[jobId] || 0);
      const endTime = startTime + op.duration;

      machineNextFreeTime[mId] = endTime;
      jobNextFreeTime[jobId] = endTime;
      jobOpProgress[jobId] = opIdx + 1;

      localSchedule.push({
        jobId,
        jobName: job.name,
        machineId: mId,
        task: op.task,
        start: startTime,
        duration: op.duration,
        end: endTime,
        color: job.color || "#6366f1"
      });
    });

    const makespan = Math.max(...Object.values(machineNextFreeTime), 0);
    return { makespan, schedule: localSchedule };
  };

  // Chromosome Template: Each job appears as many times as it has operations
  const chromosomeTemplate = [];
  formattedJobs.forEach(job => {
    for (let i = 0; i < job.operations.length; i++) {
      chromosomeTemplate.push(job.id);
    }
  });

  // Create Initial Individual (considering priority)
  const createIndividual = () => {
    const ind = [...chromosomeTemplate];
    // Priority adjustment: higher priority jobs likely to appear earlier
    // but still maintain valid operation sequence
    return ind.sort((a, b) => {
      const pA = formattedJobs.find(j => j.id === a).priority;
      const pB = formattedJobs.find(j => j.id === b).priority;
      if (pA !== pB) return (pB - pA) * Math.random();
      return Math.random() - 0.5;
    });
  };

  // Initialize Population
  let population = Array.from({ length: POP_SIZE }, () => createIndividual());

  let bestResult = null;
  const history = [];

  for (let gen = 0; gen < GENERATIONS; gen++) {
    // Evaluate Population
    const evaluated = population.map(chrom => {
      const result = evaluate(chrom);
      return { chrom, fitness: 10000 / (result.makespan || 1), ...result };
    });

    // Sort by Fitness
    evaluated.sort((a, b) => b.fitness - a.fitness);

    // Track Global Best
    if (!bestResult || evaluated[0].makespan < bestResult.makespan) {
      bestResult = evaluated[0];
    }

    // Track history for chart (every 5 generations to keep it light)
    if (gen % 5 === 0 || gen === GENERATIONS - 1) {
      history.push({ gen, makespan: evaluated[0].makespan, efficiency: ((10000 / (evaluated[0].makespan || 1)) / 10).toFixed(1) });
    }

    // Selection & Evolution
    const survivalCount = Math.floor(POP_SIZE * ELITISM);
    const nextGen = evaluated.slice(0, survivalCount).map(ind => ind.chrom);

    while (nextGen.length < POP_SIZE) {
      // Rank-based selection for parents
      const p1 = nextGen[Math.floor(Math.random() * nextGen.length)];
      const p2 = nextGen[Math.floor(Math.random() * nextGen.length)];

      // Single Point Crossover preserved Job Order
      const crossoverPoint = Math.floor(Math.random() * p1.length);
      const child = [...p1.slice(0, crossoverPoint)];

      // Fill remaining from p2 preserving count constraints
      const counts = {};
      child.forEach(id => counts[id] = (counts[id] || 0) + 1);

      p2.forEach(id => {
        const maxCount = formattedJobs.find(j => j.id === id).operations.length;
        if ((counts[id] || 0) < maxCount) {
          child.push(id);
          counts[id] = (counts[id] || 0) + 1;
        }
      });

      // Mutation
      if (Math.random() < MUTATION_RATE) {
        const i = Math.floor(Math.random() * child.length);
        const j = Math.floor(Math.random() * child.length);
        [child[i], child[j]] = [child[j], child[i]];
      }

      nextGen.push(child);
    }
    population = nextGen;
  }

  // Final Statistics
  const machineUtilization = {};
  machines.forEach(m => {
    const busyTime = bestResult.schedule
      .filter(op => op.machineId === m.id)
      .reduce((acc, op) => acc + op.duration, 0);
    machineUtilization[m.id] = parseFloat((busyTime / (bestResult.makespan || 1) * 100).toFixed(1));
  });

  const jobCompletionTimes = formattedJobs.map(j => {
    const jobOps = bestResult.schedule.filter(s => s.jobId === j.id);
    return {
      jobId: j.id,
      jobName: j.name,
      completionTime: Math.max(...jobOps.map(s => s.end), 0)
    };
  });

  return {
    makespan: bestResult.makespan,
    schedule: bestResult.schedule,
    machineUtilization,
    jobCompletionTimes,
    history,
    optimizationLog: "Genetic Algorithm Optimized across 150 generations."
  };
};
