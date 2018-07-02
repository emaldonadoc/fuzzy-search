export default (x, y) => {  
  let distance = 0;
  let i = 0;
  const length = x.length
  for (i; i < length; i++) {
    if (x[i] !== y[i]) {
      distance++;
    }
  }
  return distance;
}

