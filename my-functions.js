

function generateRandomData(userContext, events, done) {
  const id = Math.floor(Math.random() * (10000000)) + 1;
  userContext.vars.id = id;
  return done();
}

module.exports = {
  generateRandomData,
};
