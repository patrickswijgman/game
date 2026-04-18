import { drawSprite, drawText, getHeight, getWidth, isInputPressed, pointerX, pointerY, resetTransform, scaleTransform, translateTransform } from "snuggy";
import { BUTTON_HEIGHT, BUTTON_WIDTH, CARD_HEIGHT, CARD_WIDTH, Color, Input, Texture } from "@/consts.ts";
import type { Sheet } from "@/data.ts";
import { getCard } from "@/lib/cards.ts";
import { withinBounds } from "@/lib/utils.ts";

export function drawTextWithShadow(text: string, x: number, y: number, color: string, align: CanvasTextAlign, baseline: CanvasTextBaseline) {
  // Pixelmix font correction
  x += 0.5;
  y -= 0.5;
  drawText(text, x + 1, y, Color.SHADOW, align, baseline);
  drawText(text, x, y + 1, Color.SHADOW, align, baseline);
  drawText(text, x + 1, y + 1, Color.SHADOW, align, baseline);
  drawText(text, x, y, color, align, baseline);
}

export function drawCards(cards: Array<number>, anchorX: number, anchorY: number, onClick?: (i: number) => void) {
  let hoveredCardIndex = -1;

  // Hover
  for (let i = cards.length - 1; i >= 0; i--) {
    const x = getCardX(anchorX, i, cards.length);
    const y = getCardY(anchorY);
    const isHover = withinBounds(pointerX, pointerY, x, y, CARD_WIDTH, CARD_HEIGHT);
    if (isHover) {
      hoveredCardIndex = i;
      break;
    }
  }

  // Card
  for (let i = 0; i < cards.length; i++) {
    const cardId = cards[i];
    const card = getCard(cardId);
    const x = getCardX(anchorX, i, cards.length);
    const y = getCardY(anchorY);
    const isHover = hoveredCardIndex === i;

    resetTransform();
    translateTransform(x, y);
    translateTransform(-1, 1);
    drawSprite(Texture.ATLAS, -4, -2, 64, 80, 32, 32);
    translateTransform(1, -1);
    drawSprite(Texture.ATLAS, -4, -2, 0, 80, 32, 32);

    if (isHover && onClick) {
      drawSprite(Texture.ATLAS, -4, -2, 32, 80, 32, 32);

      if (isInputPressed(Input.LMB)) {
        onClick(i);
      }
    }

    const nameScaling = (1 / (Math.max(card.name.length, 6) / 6)) * 0.375;
    resetTransform();
    translateTransform(x, y);
    translateTransform(CARD_WIDTH / 2, 5);
    scaleTransform(nameScaling, nameScaling);
    drawTextWithShadow(card.name, 0, 0, "white", "center", "middle");

    resetTransform();
    translateTransform(x, y);
    translateTransform(CARD_WIDTH / 2, CARD_HEIGHT - 5);
    scaleTransform(0.5, 0.5);
    drawTextWithShadow(card.value.toString(), 0, 0, "white", "center", "middle");
  }

  // Tooltip
  if (hoveredCardIndex !== -1) {
    const cardId = cards[hoveredCardIndex];
    const card = getCard(cardId);
    if (card) {
      const w = 96;
      const h = 96;
      const x = getWidth() / 2 - w / 2;
      const y = getHeight() / 2 - h / 2;
      resetTransform();
      translateTransform(x, y);
      drawSprite(Texture.ATLAS, 0, 0, 0, 128, w, h);
      translateTransform(w / 2, 8);
      scaleTransform(0.75, 0.75);
      drawTextWithShadow(card.name, 0, 0, "white", "center", "top");
    }
  }
}

export function drawHealth(sheet: Sheet, x: number, y: number, align: "left" | "right") {
  resetTransform();
  if (align === "right") {
    translateTransform(x - 16, y);
  } else {
    translateTransform(x, y);
  }
  for (let i = 0; i < sheet.healthMax; i++) {
    if (align === "right") {
      translateTransform(-11, 0);
    } else {
      translateTransform(11, 0);
    }
    if (i + 1 <= sheet.health) {
      drawSprite(Texture.ATLAS, 0, 0, 0, 112, 16, 16);
    } else {
      drawSprite(Texture.ATLAS, 0, 0, 16, 112, 16, 16);
    }
  }
}

export function drawButton(text: string, x: number, y: number, onClick?: () => void) {
  const isHover = withinBounds(pointerX, pointerY, x, y, BUTTON_WIDTH, BUTTON_HEIGHT);

  resetTransform();
  translateTransform(x, y);
  drawSprite(Texture.ATLAS, -2, -2, 96, 80, 48, 16);

  if (onClick && isHover) {
    drawSprite(Texture.ATLAS, -2, -2, 96, 96, 48, 16);

    if (isInputPressed(Input.LMB)) {
      onClick();
    }
  }

  translateTransform(BUTTON_WIDTH / 2, BUTTON_HEIGHT / 2);
  scaleTransform(0.5, 0.5);
  drawTextWithShadow(text, 0, 0, "white", "center", "middle");
}

function getCardX(x: number, i: number, l: number) {
  return x - ((CARD_WIDTH - 4) * l) / 2 + (CARD_WIDTH - 8) * i;
}

function getCardY(y: number) {
  return y;
}
