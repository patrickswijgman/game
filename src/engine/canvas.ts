import { Color } from "@/consts.ts";
import { spriteH, spritePivotX, spritePivotY, spriteW, spriteX, spriteY } from "@/data/sprites.ts";
import { fontOffsetX, fontOffsetY, fonts } from "./fonts.js";
import { textures } from "./textures.js";
import { toRadians } from "./utils.js";

const CIRCLE_ANGLE = 2 * Math.PI;

export let canvas: HTMLCanvasElement;
export let canvasOffsetX = 0;
export let canvasOffsetY = 0;

export let width: number;
export let height: number;
export let scaleX = 1;
export let scaleY = 1;

let font: string;
let fontX = 0;
let fontY = 0;

let ctx: CanvasRenderingContext2D;

export function setupCanvas(w: number, h: number) {
  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d")!;
  width = w;
  height = h;
  resize();
  window.addEventListener("resize", resize);
  document.body.appendChild(canvas);
}

export function resetTransform() {
  ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);
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
  ctx.setTransform(scaleX, 0, 0, scaleY, 0, 0);
  ctx.clearRect(0, 0, width, height);
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
  const r = width / height;

  let w = window.innerWidth;
  let h = w / r;
  if (h > window.innerHeight) {
    h = window.innerHeight;
    w = h * r;
  }

  scaleX = w / width;
  scaleY = h / height;

  canvas.width = w;
  canvas.height = h;

  const bounds = canvas.getBoundingClientRect();
  canvasOffsetX = bounds.left;
  canvasOffsetY = bounds.top;

  ctx.imageSmoothingEnabled = false;
  ctx.textRendering = "optimizeSpeed";
}
