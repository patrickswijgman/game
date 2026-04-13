import type { Rect, Vec } from "@/data.ts";

export function setRect(r: Rect, x: number, y: number, w: number, h: number) {
  r.x = x;
  r.y = y;
  r.w = w;
  r.h = h;
}

export function writeRectIntersection(a: Rect, b: Rect, vel: Vec, out: Vec) {
  if (!isRectIntersection(a, b)) {
    return;
  }

  const l = a.x + a.w - b.x;
  const r = b.x + b.w - a.x;
  const u = a.y + a.h - b.y;
  const d = b.y + b.h - a.y;

  switch (true) {
    case vel.x > 0 && vel.y > 0:
      if (l > u) {
        out.y -= u;
      } else {
        out.x -= l;
      }
      break;

    case vel.x < 0 && vel.y > 0:
      if (r > u) {
        out.y -= u;
      } else {
        out.x += r;
      }
      break;

    case vel.x > 0 && vel.y < 0:
      if (l > d) {
        out.y += d;
      } else {
        out.x -= l;
      }
      break;

    case vel.x < 0 && vel.y < 0:
      if (r > d) {
        out.y += d;
      } else {
        out.x += r;
      }
      break;

    case vel.x > 0:
      out.x -= l;
      break;

    case vel.x < 0:
      out.x += r;
      break;

    case vel.y > 0:
      out.y -= u;
      break;

    case vel.y < 0:
      out.y += d;
      break;
  }

  return out;
}

export function isRectIntersection(a: Rect, b: Rect) {
  if (a === b || !isRectValid(a) || !isRectValid(b)) {
    return false;
  }

  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

export function isRectValid(r: Rect) {
  return r.w > 0 && r.h > 0;
}
