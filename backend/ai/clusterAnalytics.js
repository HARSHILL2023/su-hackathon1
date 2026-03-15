module.exports.aggregateCluster = (factories) => {
  if (!factories || factories.length === 0) return { averagePEI: 0, averageDowntime: 0 };
  let sumPEI = 0, sumDowntime = 0;
  for (let f of factories) {
     sumPEI += f.pei || 0;
     sumDowntime += f.downtime || 0;
  }
  return { 
     averagePEI: (sumPEI / factories.length).toFixed(2), 
     averageDowntime: (sumDowntime / factories.length).toFixed(2) 
  };
};