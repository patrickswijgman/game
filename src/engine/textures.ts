export const textures: Array<ImageBitmap> = [];

export async function loadTexture(id: number, url: string) {
  const res = await fetch(url);
  const blob = await res.blob();
  const texture = await createImageBitmap(blob);
  textures[id] = texture;
}

export async function loadRenderTexture(id: number, w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void | Promise<void>) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = w;
  canvas.height = h;
  await draw(ctx);
  const texture = await createImageBitmap(canvas);
  textures[id] = texture;
}
