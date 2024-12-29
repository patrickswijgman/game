export type Grid<T> = Array<Array<T>>;

export function grid<T>(width: number, height: number, fill: (x: number, y: number) => T): Grid<T> {
  return Array.from({ length: height }, (_, y: number) => {
    return Array.from({ length: width }, (_, x: number) => {
      return fill(x, y);
    });
  });
}

export function isGridValid<T>(grid: Grid<T>) {
  return grid.length > 0 && grid[0].length > 0;
}

export function isInsideGridBounds<T>(grid: Grid<T>, x: number, y: number) {
  return x >= 0 && x < grid[0].length && y >= 0 && y < grid.length;
}

export function setGridValue<T>(grid: Grid<T>, x: number, y: number, value: T) {
  grid[y][x] = value;
}

export function getGridValue<T>(grid: Grid<T>, x: number, y: number) {
  return grid[y][x];
}

export function getGridWidth<T>(grid: Grid<T>) {
  return grid[0].length;
}

export function getGridHeight<T>(grid: Grid<T>) {
  return grid.length;
}
