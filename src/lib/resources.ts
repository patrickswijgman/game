import { getTexture, loadFont, loadRenderTexture, loadTexture } from "snuggy";
import { Font, Texture } from "@/consts.ts";

export async function loadResources() {
  await Promise.all([
    // Textures
    loadTexture(Texture.ATLAS, "textures/atlas.png"),

    // Fonts
    loadFont(Font.DEFAULT, "fonts/pixelmix.ttf", "Pixelmix", 8),

    // Sounds
  ]);

  loadRenderTexture(Texture.FLASH, 256, 256, (ctx) => {
    ctx.drawImage(getTexture(Texture.ATLAS), 0, 0);
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 256, 256);
  });
}
