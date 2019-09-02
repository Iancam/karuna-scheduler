// collection must contain objects with an id field
function chooseFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
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

function merge(
  fromStream,
  toStream,
  mergeFunction = (a, b) => {
    a, b;
  }
) {
  return () => mergeFunction(fromStream(), toStream());
}

const choose = ({ collection: _collection, id }) => {
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

function orderedSelect({ list, cursor }) {
  return {
    list,
    cursor: cursor + 1,
    selection: list[cursor]
  };
}

// looks like an observable getter setter sort of thing
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

function willDie({ streamfx, state, deathTests, dead }) {
  if (dead) return dead;
  for (const test of deathTests) {
    if (test(streamfx, state)) return { dead: true };
  }
  return { dead: false };
}

function setEvery(stream, step, currentStep, replacement) {
  let steps = currentStep;
  return override => {
    if (override) return stream(override);
    if (steps % step === 0) {
      stream(replacement);
    }
  };
}

// function steadyState(streamfx, state, diffFxPredicate){
//   const nextState = streamfx(state)
//   if (!diffFx(state, nextState)) return true;
// }

//choose a day of the week, assign it to a question
const daysOfWeek = "mo,tu,we,th,fr,sa,su"
  .split(",")
  .map((id, i) => ({ id, index: i }));

const questions = "12345678"
  .split("")
  .map((q, i) => ({ id: q, text: `question ${q}: ` }));

const questionLooper = toSimpleStream(orderedSelect, {
  list: questions,
  cursor: 0
});

const dateChooser = toSimpleStream(choose, {
  collection: daysOfWeek,
  id: "id"
});

function mergeDateAndQuestion(date, _question) {
  const {
    selection: { id: dayOfWeek }
  } = date;
  const {
    selection: { text }
  } = _question;
  return { dayOfWeek, question: text };
}

const ticker = merge(dateChooser, questionLooper, mergeDateAndQuestion);
const interface = questions.map(ticker).reduce((obj, cur) => {
  obj[cur.dayOfWeek] = cur.question;
  return obj;
}, {});

interface;

// console.log(chooseMultiple({ step: 2, nextCollection: daysOfWeek }, "id"));

// TESTS
// const things = [
//   {
//     id: "ian",
//     color: "red"
//   },
//   { id: "joy", color: "red" },
//   { id: "jam", color: "purple" }
// ];

// const c1 = choose(things, "id");

// questions = data.get("questions");
// chosenQuestions = choose(2, questions);

// if (chosenQuestions.length) {
// }

// }.map(q=>d = choose(day of week, no repeat), {date; d, question}).keyBy("date")

// send(deeners[getDate] || standardQuestion)
// (
// function chooseMultiple({ step, nextCollection: collection, id }) {
//   let retval = [];
//   let _collection = collection;
//   for (let i = 0; i < step; i++) {
//     const { nextCollection, selection } = choose({
//       nextCollection: _collection,
//       id
//     });
//     _collection = nextCollection;
//     retval.push(selection);
//   }
//   return { nextCollection: _collection, selection: retval, id };
// })
