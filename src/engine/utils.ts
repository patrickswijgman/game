const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

export function ease(x: number) {
  const t = x < 0.5 ? x * 2 : 2 - x * 2;
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

export function toRadians(degrees: number) {
  return degrees * DEG_TO_RAD;
}

export function toDegrees(radians: number) {
  return radians * RAD_TO_DEG;
}

export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getDistance(x1: number, y1: number, x2: number, y2: number) {
  const x = x2 - x1;
  const y = y2 - y1;
  return Math.sqrt(x * x + y * y);
}

export function isWithinDistance(x1: number, y1: number, x2: number, y2: number, d: number) {
  const x = x2 - x1;
  const y = y2 - y1;
  return x * x + y * y < d * d;
}

export function getAngle(x1: number, y1: number, x2: number, y2: number) {
  return toDegrees(Math.atan2(y2 - y1, x2 - x1));
}

export function magnitude(x: number, y: number) {
  return Math.sqrt(x * x + y * y);
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function assert(condition: unknown, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}
