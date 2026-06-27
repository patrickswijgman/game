import { posX, posY, velX, velY } from "@/data/data.ts";
import { magnitude } from "@/engine/utils.ts";

export function seek(id: number, targetX: number, targetY: number, speed: number) {
  const x = targetX - posX[id];
  const y = targetY - posY[id];
  const m = magnitude(x, y);
  if (m) {
    velX[id] += (x / m) * speed;
    velY[id] += (y / m) * speed;
  }
}
