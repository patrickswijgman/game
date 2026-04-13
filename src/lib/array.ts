export function removeFromArray<T>(a: Array<T>, v: T) {
  const i = a.indexOf(v);
  if (i !== -1) {
    a.splice(i, 1);
  }
}
