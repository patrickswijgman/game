export const enum Sprite {
  NONE,
  HAIR1,
  PANTS1,
  SHIRT1,
  SKIN1,
  SHADOW,
  LONGSWORD,
  PANTS2,
  SHIRT2,
  HAIR2,
}

export const spriteX = new Int32Array([0, 0, 0, 0, 0, 0, 0, 20, 20, 20])
export const spriteY = new Int32Array([0, 100, 140, 120, 40, 60, 80, 140, 120, 100])
export const spriteW = new Int32Array([0, 20, 20, 20, 20, 20, 20, 20, 20, 20])
export const spriteH = new Int32Array([0, 20, 20, 20, 20, 20, 20, 20, 20, 20])
export const spritePivotX = new Int32Array([0, 10, 10, 10, 10, 10, 10, 10, 10, 10])
export const spritePivotY = new Int32Array([0, 18, 18, 18, 18, 4, 18, 18, 18, 18])