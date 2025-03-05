import { random, Rectangle, setVector, Vector } from "ridder";

export function writeRandomPointInPerimeterBetweenRectangles(outer: Rectangle, inner: Rectangle, out: Vector) {
  let x = 0;
  let y = 0;

  const region = random(0, 3);
  switch (region) {
    case 0: // Top region
      x = random(outer.x, outer.x + outer.w);
      y = random(outer.y, inner.y - 1);
      break;

    case 1: // Bottom region
      x = random(outer.x, outer.x + outer.w);
      y = random(inner.y + inner.h + 1, outer.y + outer.h);
      break;

    case 2: // Left region
      x = random(outer.x, inner.x - 1);
      y = random(inner.y, inner.y + inner.h);
      break;

    case 3: // Right region
      x = random(inner.x + inner.w + 1, outer.x + outer.w);
      y = random(inner.y, inner.y + inner.h);
      break;
  }

  setVector(out, x, y);
}
