export function table<T>(length: number, fill: (i: number) => T) {
  return Array.from({ length }, (_, i) => fill(i));
}
