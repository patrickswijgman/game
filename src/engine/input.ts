import { cameraX, cameraY } from "./camera.js";
import { canvas, canvasOffsetX, canvasOffsetY, canvasScaleX, canvasScaleY } from "./canvas.js";

const map: Record<string, number> = Object.create(null);

const state = new Int8Array(256);

export let pointerX = 0;
export let pointerY = 0;
export let pointerWorldX = 0;
export let pointerWorldY = 0;

export function setupInputs() {
  window.addEventListener("keydown", ({ code, repeat }) => {
    if (repeat) return;
    state[map[code]] = 1;
  });

  window.addEventListener("keyup", ({ code }) => {
    state[map[code]] = 0;
  });

  canvas.addEventListener("pointerdown", ({ clientX, clientY, button }) => {
    const x = clientX - canvasOffsetX;
    const y = clientY - canvasOffsetY;
    updatePointerPosition(x, y);
    state[map[getButtonName(button)]] = 1;
  });

  canvas.addEventListener("pointerup", ({ clientX, clientY, button }) => {
    const x = clientX - canvasOffsetX;
    const y = clientY - canvasOffsetY;
    updatePointerPosition(x, y);
    state[map[getButtonName(button)]] = 0;
  });

  canvas.addEventListener("pointermove", ({ clientX, clientY }) => {
    const x = clientX - canvasOffsetX;
    const y = clientY - canvasOffsetY;
    updatePointerPosition(x, y);
  });

  canvas.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
}

function updatePointerPosition(x: number, y: number) {
  pointerX = x / canvasScaleX;
  pointerY = y / canvasScaleY;
  updateWorldPointerPosition();
}

export function updateWorldPointerPosition() {
  pointerWorldX = pointerX + cameraX;
  pointerWorldY = pointerY + cameraY;
}

export function setInput(code: string, id: number) {
  map[code] = id;
}

export function isInputDown(id: number, reset = false) {
  const isDown = state[id];

  if (isDown && reset) {
    state[id] = 0;
  }

  return isDown;
}

function getButtonName(button: number) {
  switch (button) {
    case 0:
      return "MouseButtonLeft";
    case 1:
      return "MouseButtonMiddle";
    case 2:
      return "MouseButtonRight";
    default:
      return button.toString();
  }
}
