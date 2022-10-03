export function getPrice(num) {
  return (num / 100).toFixed(2);
}

export function setPrice(num) {
  return num * 100;
}
