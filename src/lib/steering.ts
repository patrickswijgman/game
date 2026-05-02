import { getDistance } from "snuggy";
import { enemies, enemiesCount, posX, posY, radius, range, speed, velX, velY } from "@/data.ts";

export function seek(id: number, x: number, y: number) {
  const sx = x - posX[id];
  const sy = y - posY[id];
  const s = getDistance(0, 0, sx, sy);

  if (s) {
    velX[id] += (sx / s) * speed[id];
    velY[id] += (sy / s) * speed[id];
  }
}

export function halt(id: number, x: number, y: number) {
  const dx = x - posX[id];
  const dy = y - posY[id];
  const d = getDistance(0, 0, dx, dy);

  if (d < range[id]) {
    velX[id] = 0;
    velY[id] = 0;
  }
}

export function separate(id: number) {
  let sx = 0;
  let sy = 0;

  for (let i = 0; i < enemiesCount; i++) {
    const otherId = enemies[i];

    if (otherId === id) {
      continue;
    }

    const dx = posX[id] - posX[otherId];
    const dy = posY[id] - posY[otherId];
    const d = getDistance(0, 0, dx, dy);
    const r = radius[id];

    if (d > 0 && d < r) {
      const weight = 1 - d / r;
      sx += (dx / d) * weight;
      sy += (dy / d) * weight;
    }
  }

  const s = getDistance(0, 0, sx, sy);
  if (s > speed[id]) {
    sx /= s * speed[id];
    sy /= s * speed[id];
  }

  velX[id] += sx;
  velY[id] += sy;
}
