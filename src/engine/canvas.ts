import { Color } from "@/consts.ts";
import { spriteH, spritePivotX, spritePivotY, spriteW, spriteX, spriteY } from "@/data/sprites.ts";
import { fontOffsetX, fontOffsetY, fonts } from "./fonts.js";
import { textures } from "./textures.js";
import { toRadians } from "./utils.js";

const CIRCLE_ANGLE = 2 * Math.PI;

export let canvas: HTMLCanvasElement;
export let canvasWidth: number;
export let canvasHeight: number;
export let canvasScaleX = 1;
export let canvasScaleY = 1;
export let canvasOffsetX = 0;
export let canvasOffsetY = 0;

let font: string;
let fontX = 0;
let fontY = 0;

let ctx: CanvasRenderingContext2D;

export function setupCanvas(w: number, h: number) {
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d")!;
  canvasWidth = w;
  canvasHeight = h;
  resize();
  window.addEventListener("resize", resize);
  document.body.appendChild(canvas);
}

export function resetTransform() {
  ctx.setTransform(canvasScaleX, 0, 0, canvasScaleY, 0, 0);
}

export function translateTransform(x: number, y: number) {
  ctx.translate(x, y);
}

export function scaleTransform(x: number, y = x) {
  ctx.scale(x, y);
}

export function rotateTransform(degrees: number) {
  ctx.rotate(toRadians(degrees));
}

export function clearBackground() {
  ctx.setTransform(canvasScaleX, 0, 0, canvasScaleY, 0, 0);
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

export function drawTexture(id: number, x: number, y: number) {
  ctx.drawImage(textures[id], x, y);
}

export function drawSprite(textureId: number, spriteId: number) {
  if (spriteId) {
    const x = spriteX[spriteId];
    const y = spriteY[spriteId];
    const w = spriteW[spriteId];
    const h = spriteH[spriteId];
    const pivotX = spritePivotX[spriteId];
    const pivotY = spritePivotY[spriteId];
    ctx.drawImage(textures[textureId], x, y, w, h, -pivotX, -pivotY, w, h);
  }
}

export function drawText(text: string, x: number, y: number, color: string, align: CanvasTextAlign, baseline: CanvasTextBaseline) {
  const textX = x + fontX;
  const textY = y + fontY;
  ctx.font = font;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  ctx.fillStyle = color;
  ctx.fillText(text, textX, textY);
}

export function drawTextS(text: string, x: number, y: number, color: string, align: CanvasTextAlign, baseline: CanvasTextBaseline) {
  const textX = x + fontX;
  const textY = y + fontY;
  ctx.font = font;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  ctx.fillStyle = Color.BORDER;
  ctx.fillText(text, textX + 1, textY);
  ctx.fillText(text, textX, textY + 1);
  ctx.fillText(text, textX + 1, textY + 1);
  ctx.fillStyle = color;
  ctx.fillText(text, textX, textY);
}

export function drawRect(x: number, y: number, w: number, h: number, color: string, fill: boolean) {
  if (fill) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  } else {
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, w, h);
  }
}

export function drawCircle(x: number, y: number, r: number, color: string, fill: boolean) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, CIRCLE_ANGLE);
  ctx.closePath();

  if (fill) {
    ctx.fillStyle = color;
    ctx.fill();
  } else {
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}

export function drawLine(x1: number, y1: number, x2: number, y2: number, color: string) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.closePath();
  ctx.strokeStyle = color;
  ctx.stroke();
}

export function setFont(id: number) {
  font = fonts[id];
  fontX = fontOffsetX[id];
  fontY = fontOffsetY[id];
}

export function setAlpha(value: number) {
  ctx.globalAlpha = value;
}

function resize() {
  const r = canvasWidth / canvasHeight;

  let w = window.innerWidth;
  let h = w / r;
  if (h > window.innerHeight) {
    h = window.innerHeight;
    w = h * r;
  }

  canvasScaleX = w / canvasWidth;
  canvasScaleY = h / canvasHeight;

  canvas.width = w;
  canvas.height = h;

  const bounds = canvas.getBoundingClientRect();
  canvasOffsetX = bounds.left;
  canvasOffsetY = bounds.top;

  ctx.imageSmoothingEnabled = false;
  ctx.textRendering = "optimizeSpeed";
}
