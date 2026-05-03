import { getTexture, loadFont, loadRenderTexture, loadTexture } from "snuggy";
import { Color, Font, Texture } from "@/consts.ts";

export async function loadResources() {
  await Promise.all([
    // Textures
    loadTexture(Texture.ATLAS, "textures/atlas.png"),

    // Fonts
    loadFont(Font.DEFAULT, "fonts/pixelmix.ttf", "Pixelmix", 8),

    // Sounds
  ]);

  loadRenderTexture(Texture.ATLAS_FLASH, 256, 256, (ctx) => {
    ctx.drawImage(getTexture(Texture.ATLAS), 0, 0);
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 256, 256);
  });

  loadRenderTexture(Texture.ATLAS_FLASH_DANGER, 256, 256, (ctx) => {
    ctx.drawImage(getTexture(Texture.ATLAS), 0, 0);
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = Color.DANGER;
    ctx.fillRect(0, 0, 256, 256);
  });

  loadRenderTexture(Texture.ATLAS_OUTLINED, 256, 256, (ctx) => {
    const atlas = getTexture(Texture.ATLAS);
    ctx.drawImage(atlas, -1, 0);
    ctx.drawImage(atlas, 1, 0);
    ctx.drawImage(atlas, 0, -1);
    ctx.drawImage(atlas, 0, 1);
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 256, 256);
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(atlas, 0, 0);
  });

  loadRenderTexture(Texture.ATLAS_OUTLINED_DANGER, 256, 256, (ctx) => {
    const atlas = getTexture(Texture.ATLAS);
    ctx.drawImage(atlas, -1, 0);
    ctx.drawImage(atlas, 1, 0);
    ctx.drawImage(atlas, 0, -1);
    ctx.drawImage(atlas, 0, 1);
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = Color.DANGER;
    ctx.fillRect(0, 0, 256, 256);
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(atlas, 0, 0);
  });
}
