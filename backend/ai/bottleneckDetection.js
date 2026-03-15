module.exports.detectBottleneck = (stageTimes) => {
  // stageTimes = [{stage: 'Spinning', time: 120}, ...]
  if (!stageTimes || stageTimes.length === 0) return { bottleneckStage: null, time: 0 };
  let maxStage = stageTimes[0];
  for (let s of stageTimes) {
      if (s.time > maxStage.time) maxStage = s;
  }
  return { bottleneckStage: maxStage.stage, time: maxStage.time };
};