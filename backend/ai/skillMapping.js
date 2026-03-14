module.exports.mapBestSkill = (workers, machines) => {
  // Simple demonstration matching highest productivity worker to a needed machine
  if (!workers || workers.length === 0 || !machines || machines.length === 0) return { assignments: [] };
  let wList = [...workers].sort((a,b)=> b.productivityScore - a.productivityScore);
  let assignments = [];
  for (let i = 0; i < Math.min(wList.length, machines.length); i++) {
    assignments.push({ workerId: wList[i].id, machineId: machines[i].id });
  }
  return { assignments };
};