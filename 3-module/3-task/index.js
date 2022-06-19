function camelize(str) {
  return str.split('-').reduce(reducer);
}

function reducer(prev, cur) {
  return prev + (cur[0].toUpperCase() + cur.slice(1));
}
