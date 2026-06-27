export const fonts: Array<string> = [];
export const fontOffsetX: Array<number> = [];
export const fontOffsetY: Array<number> = [];

export async function loadFont(id: number, url: string, name: string, size: number, offsetX = 0, offsetY = 0) {
  const font = new FontFace(name, `url(${url})`);
  await font.load();
  document.fonts.add(font);
  fonts[id] = `${size}px ${name}`;
  fontOffsetX[id] = offsetX;
  fontOffsetY[id] = offsetY;
}
