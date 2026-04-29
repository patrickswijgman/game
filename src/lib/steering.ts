import { delta, getDistance } from "snuggy";
import { active, posX, posY, radius, speed } from "@/data.ts";

export function seek(id: number, x: number, y: number) {
  const sx = x - posX[id];
  const sy = y - posY[id];
  const s = getDistance(0, 0, sx, sy);

  if (s) {
    posX[id] += (sx / s) * speed[id] * delta;
    posY[id] += (sy / s) * speed[id] * delta;
  }

  return s > 0;
}

export function separate(id: number) {
  let sx = 0;
  let sy = 0;

  for (const other of active) {
    if (other === id) continue;

    const dx = posX[id] - posX[other];
    const dy = posY[id] - posY[other];
    const d = getDistance(0, 0, dx, dy);
    const r = radius[id];

    if (d > 0 && d < r) {
      const weight = 1 - d / r;
      sx += (dx / d) * weight;
      sy += (dy / d) * weight;
    }
  }

  const strength = speed[id] * 2;
  posX[id] += sx * strength * delta;
  posY[id] += sy * strength * delta;

  const s = getDistance(0, 0, sx, sy);

  return s > 0;
}
