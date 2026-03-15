module.exports.checkEligibility = (isMSMERegistered) => {
  if (isMSMERegistered) {
     return { schemes: ['RIPS 2022', 'TUF Scheme', 'Solar Subsidy'] };
  }
  return { schemes: [] };
};