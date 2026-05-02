import { getDistance, isWithinDistance } from "snuggy";
import { enemies, enemiesCount, playerId, posX, posY, radius, range, recoveryTime, sepX, sepY, speed, velX, velY } from "@/data.ts";

export function seek(id: number, x: number, y: number) {
  const sx = x - posX[id];
  const sy = y - posY[id];
  const s = getDistance(0, 0, sx, sy);

  if (s) {
    const mod = recoveryTime[id] > 0 ? 0.5 : 1;
    velX[id] += (sx / s) * speed[id] * mod;
    velY[id] += (sy / s) * speed[id] * mod;
  }
}

export function halt(id: number, x: number, y: number) {
  const dx = x - posX[id];
  const dy = y - posY[id];

  if (isWithinDistance(0, 0, dx, dy, range[id])) {
    velX[id] = 0;
    velY[id] = 0;
  }
}

export function separateEnemies() {
  for (let i = 0; i < enemiesCount; i++) {
    sepX[enemies[i]] = 0;
    sepY[enemies[i]] = 0;
  }

  for (let i = 0; i < enemiesCount; i++) {
    const a = enemies[i];
    const r = radius[a];

    for (let j = i + 1; j < enemiesCount; j++) {
      const b = enemies[j];
      separatePair(a, b, r);
    }

    separatePair(a, playerId, r);
  }
}

function separatePair(a: number, b: number, r: number) {
  const dx = posX[a] - posX[b];
  const dy = posY[a] - posY[b];

  if (isWithinDistance(0, 0, dx, dy, r)) {
    const d = getDistance(0, 0, dx, dy);
    const w = 1 - d / r;
    const fx = (dx / d) * w;
    const fy = (dy / d) * w;
    sepX[a] += fx;
    sepY[a] += fy;
    sepX[b] -= fx;
    sepY[b] -= fy;
  }
}

export function separate(id: number) {
  velX[id] += sepX[id];
  velY[id] += sepY[id];
}
