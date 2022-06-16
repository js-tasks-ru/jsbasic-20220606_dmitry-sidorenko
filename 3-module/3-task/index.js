function camelize(str) {
  return str.split("-").reduce(reducer);
}

function reducer(prev, cur) {
  const res = prev + (cur[0].toUpperCase() + cur.slice(1));
  return res;
}
