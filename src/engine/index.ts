import { clearBackground, setupCanvas } from "./canvas.js";
import { setupInputs, updateWorldPointerPosition } from "./input.js";
import { startLoop } from "./loop.js";
import { setupAudio } from "./sounds.js";

export async function run(width: number, height: number, setup: () => Promise<void>, update: () => void) {
  setupCanvas(width, height);
  setupAudio();
  setupInputs();
  await setup();
  startLoop(() => {
    clearBackground();
    updateWorldPointerPosition();
    update();
  });
}
