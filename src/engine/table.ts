export type Table<T> = Readonly<Array<T>>;

export function table<T>(length: number, fill: (index: number) => T) {
  return Array.from({ length }).map((_, index) => fill(index));
}
