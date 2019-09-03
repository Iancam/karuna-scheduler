function toSimpleStream(fx, initialState, selector = a => a.selection) {
  let state = initialState;
  return stateOverride => {
    if (stateOverride) {
      state = stateOverride;
      return { state, fx };
    }
    return selector((state = fx(state)) || { state, fx });
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

const take = (simpleStream, steps) => {
  const retval = [];
  for (let x = 0; x < steps; x++) {
    retval.push(simpleStream());
  }
  return retval;
};

//const mapToObject = (list, iteratee, keyValue)=>{

// }

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

module.exports.toSimpleStream = toSimpleStream;
module.exports.chooseFromArray = chooseFromArray;
module.exports.keyBy = keyBy;
module.exports.take = take;
module.exports.chooseWithoutReplacement = chooseWithoutReplacement;
