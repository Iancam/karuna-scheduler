function toSimpleStream(fx, initialState) {
  let state = initialState;
  return stateOverride => {
    if (stateOverride) {
      state = stateOverride;
      return { state, fx };
    }
    return (state = fx(state)) || { state, fx };
  };
}
// collection must contain objects with an id field
function chooseFromArray(array, testValue = undefined) {
  return array[Math.floor((testValue || Math.random()) * array.length)];
}

function keyBy(list, key) {
  let retval = {};
  for (const item of list) {
    retval[key] &&
      // throw {
      console.error(
        "data was lost in the keyBy function. Keys were not unique",
        { list, key }
      );
    // };
    retval[item[key]] = item;
  }
  return retval;
}

const chooseWithoutReplacement = ({ collection: _collection, id }) => {
  const nextCollection =
    _collection instanceof Array ? keyBy(_collection, id) : _collection;
  const mark = v => ({ ...v, _chosen: true });

  const unchosenValues = Object.values(nextCollection).filter(
    ({ _chosen }) => !_chosen
  );
  const selection = mark(chooseFromArray(unchosenValues));
  return {
    collection: { ...nextCollection, [selection[id]]: selection },
    selection,
    id
  };
};

function assignDays(questionsPerWeek, questionCursor, dienerQuestionIds) {
  const daysOfWeek = [0, 1, 2, 3, 4, 5, 6].map(v => ({ id: v }));
  const dayChooser = toSimpleStream(chooseWithoutReplacement, {
    collection: daysOfWeek,
    id: "id"
  });
  nextChosenDaysOfWeek = {};
  for (let x = 0; x < questionsPerWeek; x++) {
    const cursor = questionCursor + (x % dienerQuestionIds.length);
    nextChosenDaysOfWeek[dayChooser().id] = dienerQuestionIds[cursor];
  }
  return nextChosenDaysOfWeek;
}

/**
 *
 * @param {Date} date
 * @param {Object.<number, number>} dateToQuestionID
 * @param {number} questionsCursor
 */
function chooseFlow(
  questionCursor = 0,
  inpChosenDaysOfWeek = undefined,
  date = new Date()
) {
  const dienerQuestionIds = [
    "Engaged",
    "Future",
    "Purpose",
    "Respect",
    "Competent",
    "Good"
  ];
  const questionsPerWeek = 2;
  const dayToStandardQuestionId = []; //? how to say to use the default question
  dayToStandardQuestionId;
  const day = date.getDay();
  let chosenDaysOfWeek = inpChosenDaysOfWeek;
  if (!inpChosenDaysOfWeek) {
    chosenDaysOfWeek = assignDays(
      questionsPerWeek,
      questionCursor,
      dienerQuestionIds
    );
    console.log(chosenDaysOfWeek);
  }

  const questionId =
    chosenDaysOfWeek[day] ||
    dayToStandardQuestionId[day] ||
    "I don't exist yet";
  let nextChosenDaysOfWeek = day === 0 ? assignDays() : chosenDaysOfWeek;
  const nextQuestionCursor =
    questionCursor + (questionsPerWeek % dienerQuestionIds.length);
  return [questionId, nextChosenDaysOfWeek, nextQuestionCursor];
}

console.log(chooseFlow());
