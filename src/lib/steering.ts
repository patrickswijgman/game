import { getDistance, isWithinDistance } from "snuggy";
import { enemies, enemiesCount, posX, posY, radius, velX, velY } from "@/data.ts";

export function seek(id: number, x: number, y: number, speed: number) {
  const sx = x - posX[id];
  const sy = y - posY[id];
  const s = getDistance(0, 0, sx, sy);

  if (s) {
    velX[id] += (sx / s) * speed;
    velY[id] += (sy / s) * speed;
  }
}

export function halt(id: number, x: number, y: number, range: number) {
  const dx = x - posX[id];
  const dy = y - posY[id];

  if (isWithinDistance(0, 0, dx, dy, range)) {
    velX[id] = 0;
    velY[id] = 0;
  }
}

export function separateEnemies() {
  for (let i = 0; i < enemiesCount; i++) {
    velX[enemies[i]] = 0;
    velY[enemies[i]] = 0;
  }

  for (let i = 0; i < enemiesCount; i++) {
    const a = enemies[i];
    const r = radius[a];

    for (let j = i + 1; j < enemiesCount; j++) {
      const b = enemies[j];
      const dx = posX[a] - posX[b];
      const dy = posY[a] - posY[b];
      const d = getDistance(0, 0, dx, dy);

      if (d > 0 && d < r) {
        const w = 1 - d / r;
        const fx = (dx / d) * w;
        const fy = (dy / d) * w;
        velX[a] += fx;
        velY[a] += fy;
        velX[b] -= fx;
        velY[b] -= fy;
      }
    }
  }
}
