export const enum Sprite {
  NONE,
  HAIR2,
  SHIRT2,
  PANTS2,
  LONGSWORD,
  SHADOW,
  SKIN1,
  SHIRT1,
  PANTS1,
  HAIR1,
}

export const spriteX = new Uint16Array([0, 20, 20, 20, 0, 0, 0, 0, 0, 0])
export const spriteY = new Uint16Array([0, 100, 120, 140, 80, 60, 40, 120, 140, 100])
export const spriteW = new Uint16Array([0, 20, 20, 20, 20, 20, 20, 20, 20, 20])
export const spriteH = new Uint16Array([0, 20, 20, 20, 20, 20, 20, 20, 20, 20])
export const spritePivotX = new Uint16Array([0, 10, 10, 10, 10, 10, 10, 10, 10, 10])
export const spritePivotY = new Uint16Array([0, 18, 18, 18, 18, 4, 18, 18, 18, 18])