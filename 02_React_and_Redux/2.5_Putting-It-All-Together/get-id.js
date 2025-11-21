function makeCounter(start = 0) {
  let current = start;
  return {
    next() {
      return current++;
    },
    peek() {
      return current;
    },
    reset(newStart = 0) {
      current = newStart;
    },
  };
}

function createIdGenerator(start = 0, step = 1) {
  let current = start;
  return function nextId() {
    const id = current;
    current += step;
    return id;
  };
}

function createIdGenerator() {
  let current = 0;
  return () => {
    return current++;
  };
}

const getId = createIdGenerator();
