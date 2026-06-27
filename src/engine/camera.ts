import { canvasHeight, canvasWidth, translateTransform } from "./canvas.js";
import { delta } from "./loop.js";
import { clamp } from "./utils.js";

export let cameraX = 0;
export let cameraY = 0;
export let cameraTargetX = 0;
export let cameraTargetY = 0;
export let cameraBoundaryX = 0;
export let cameraBoundaryY = 0;
export let cameraBoundaryW = 0;
export let cameraBoundaryH = 0;
export let cameraSmoothing = 1;

export function updateCamera() {
  const targetX = cameraTargetX - canvasWidth / 2;
  const targetY = cameraTargetY - canvasHeight / 2;

  cameraX += (targetX - cameraX) * cameraSmoothing * delta;
  cameraY += (targetY - cameraY) * cameraSmoothing * delta;

  if (cameraBoundaryW && cameraBoundaryH) {
    cameraX = clamp(cameraX, cameraBoundaryX, cameraBoundaryW - canvasWidth);
    cameraY = clamp(cameraY, cameraBoundaryY, cameraBoundaryH - canvasHeight);
  }
}

export function addCameraTransform() {
  translateTransform(-cameraX, -cameraY);
}

export function setCameraPosition(x: number, y: number) {
  cameraX = x - canvasWidth / 2;
  cameraY = y - canvasHeight / 2;
}

export function setCameraTarget(x: number, y: number) {
  cameraTargetX = x;
  cameraTargetY = y;
}

export function setCameraSmoothing(value: number) {
  cameraSmoothing = value;
}

export function setCameraBoundary(x: number, y: number, w: number, h: number) {
  cameraBoundaryX = x;
  cameraBoundaryY = y;
  cameraBoundaryW = w;
  cameraBoundaryH = h;
}
