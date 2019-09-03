const { constantState } = require("./data");
const { assignDaysFactory, chooseFlowFactory } = require("./logic");
const assignDays = assignDaysFactory(constantState);
const chooseFlow = chooseFlowFactory({ assignDays });

let op = [chooseFlow({ day: 1, questionCursor: 0 })];
let last = op[op.length - 1];
for (let x = 0; x < 10; x++) {
  op.push(chooseFlow({ ...last, day: (last.day + 1) % 7 }));
  last = op[op.length - 1];
}
console.log(JSON.stringify(op));
