const { toSimpleStream, chooseWithoutReplacement } = require("./streamUtils");
const assignDaysFactory = ({
  questionsPerWeek,
  dienerQuestionIds,
  resetDay
}) => state => {
  const { questionCursor, chosenDaysOfWeek: cdw, day } = state;
  if (cdw && day !== resetDay) return state;

  const daysOfWeek = [0, 1, 2, 3, 4, 5, 6].map(v => ({ id: v }));
  const dayChooser = toSimpleStream(chooseWithoutReplacement, {
    collection: daysOfWeek,
    id: "id"
  });

  let chosenDaysOfWeek = {};
  for (let x = 0; x < questionsPerWeek; x++) {
    const cursor = questionCursor + (x % dienerQuestionIds.length);
    chosenDaysOfWeek[dayChooser().id] = dienerQuestionIds[cursor];
  }

  return {
    chosenDaysOfWeek,
    questionCursor:
      questionCursor + (questionsPerWeek % dienerQuestionIds.length)
  };
};

/**
 *
 * @param {Date} date
 * @param {Object.<number, number>} dateToQuestionID
 * @param {number} questionsCursor
 */
const chooseFlowFactory = ({ assignDays }) => state => {
  let { chosenDaysOfWeek = undefined, day = new Date() } = state;
  if (day instanceof Date) day = day.getDay();
  console.log(day);

  const { chosenDaysOfWeek: cdw, questionCursor: qc } = assignDays(state);
  const questionId = (chosenDaysOfWeek && chosenDaysOfWeek[day]) || "default";
  return {
    day,
    questionId,
    chosenDaysOfWeek: cdw,
    questionCursor: qc
  };
};

module.exports.assignDaysFactory = assignDaysFactory;
module.exports.chooseFlowFactory = chooseFlowFactory;
