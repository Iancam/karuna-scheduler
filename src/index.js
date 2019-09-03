const { constantState } = require("./data");
const { assignDaysFactory, chooseFlowFactory } = require("./logic");
const assignDays = assignDaysFactory(constantState);
const chooseFlow = chooseFlowFactory({ assignDays });

module.exports = (request, response) => {
  response.json(chooseFlow(request(chooseFlow(request.query))));
  console.log(request.query);
};
