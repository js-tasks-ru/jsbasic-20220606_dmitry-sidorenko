function getMinMax(str) {
  let numbers = str
                  .split(' ')
                  .map(elem => +elem)
                  .filter(elem => isFinite(elem));
  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
  };
}
