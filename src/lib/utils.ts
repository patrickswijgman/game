export function remove(a: Array<unknown>, e: unknown) {
  const i = a.indexOf(e);
  if (i !== -1) {
    a.splice(i, 1);
  }
}
