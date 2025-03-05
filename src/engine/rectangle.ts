import { random, Rectangle, setVector, Vector } from "ridder";

export function writeRandomPointInPerimeterBetweenRectangles(outer: Rectangle, inner: Rectangle, out: Vector) {
  let x = 0;
  let y = 0;

  const region = random(0, 3);
  switch (region) {
    case 0:
      x = random(outer.x, outer.x + outer.w);
      y = random(outer.y, inner.y);
      break;

    case 1:
      x = random(outer.x, outer.x + outer.w);
      y = random(inner.y + inner.h, outer.y + outer.h);
      break;

    case 2:
      x = random(outer.x, inner.x);
      y = random(inner.y, inner.y + inner.h);
      break;

    case 3:
      x = random(inner.x + inner.w, outer.x + outer.w);
      y = random(inner.y, inner.y + inner.h);
      break;
  }

  setVector(out, x, y);
}
