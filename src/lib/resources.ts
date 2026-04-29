import { getTexture, loadFont, loadRenderTexture, loadTexture, setFont, setFontOffset } from "snuggy";
import { Font, Sprite, Texture } from "@/consts.ts";
import { frameH, frameW, frameX, frameY, pivotX, pivotY } from "@/data.ts";

export async function loadResources() {
  await Promise.all([
    // Textures
    loadTexture(Texture.ATLAS, "textures/atlas.png"),

    // Fonts
    loadFont(Font.DEFAULT, "fonts/pixelmix.ttf", "Pixelmix", 8),

    // Sounds
  ]);

  loadRenderTexture(Texture.ATLAS_WHITE, 256, 256, (ctx) => {
    ctx.drawImage(getTexture(Texture.ATLAS), 0, 0);
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 256, 256);
  });

  setFont(Font.DEFAULT);
  setFontOffset(0.5, -0.5);

  setSprite(Sprite.PLAYER, 16, 31, 0, 0, 32, 32);
  setSprite(Sprite.PLAYER_SHADOW, 16, 3, 0, 0, 32, 16);
  setSprite(Sprite.PLAYER_LONGSWORD, 16, 31, 0, 80, 32, 32);

  setSprite(Sprite.ENEMY_MELEE, 16, 31, 32, 0, 32, 32);
}

function setSprite(id: Sprite, px: number, py: number, fx: number, fy: number, fw: number, fh: number) {
  pivotX[id] = -px;
  pivotY[id] = -py;
  frameX[id] = fx;
  frameY[id] = fy;
  frameW[id] = fw;
  frameH[id] = fh;
}
