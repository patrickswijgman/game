import { Vector } from "ridder";

export function setVector(v: Vector, x: number, y: number) {
  v.x = x;
  v.y = y;
  return v;
}
