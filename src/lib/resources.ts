import { loadFont, loadTexture, setFont } from "snuggy";
import { Font, Texture } from "@/consts.ts";

export async function loadResources() {
  await Promise.all([
    // Textures
    loadTexture(Texture.ATLAS, "textures/atlas.png"),

    // Fonts
    loadFont(Font.DEFAULT, "fonts/pixelmix.ttf", "Pixelmix", 8),

    // Sounds
  ]);

  setFont(Font.DEFAULT);
}
