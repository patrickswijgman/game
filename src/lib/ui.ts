import { drawSprite, drawText, getHeight, getWidth, isInputPressed, pointerX, pointerY, resetTransform, scaleTransform, translateTransform } from "snuggy";
import { BUTTON_HEIGHT, BUTTON_WIDTH, CARD_HEIGHT, CARD_WIDTH, Color, Input, Texture } from "@/consts.ts";
import { type Card, enemy, player } from "@/data.ts";
import { isValueCard } from "@/lib/cards.ts";
import { getTotalValue } from "@/lib/sheet.ts";
import { withinBounds } from "@/lib/utils.ts";

export function drawTextWithShadow(text: string, x: number, y: number, color: string, align: CanvasTextAlign, baseline: CanvasTextBaseline) {
  drawText(text, x + 1, y, Color.SHADOW, align, baseline);
  drawText(text, x, y + 1, Color.SHADOW, align, baseline);
  drawText(text, x + 1, y + 1, Color.SHADOW, align, baseline);
  drawText(text, x, y, color, align, baseline);
}

export function drawCards(cards: Array<Card>, anchorX: number, anchorY: number, maxWidth: number, onClick?: (i: number) => void) {
  let hoveredCardIndex = -1;

  // Hover
  for (let i = cards.length - 1; i >= 0; i--) {
    const x = getCardX(anchorX, i, cards.length, maxWidth);
    const y = getCardY(anchorY);
    const isHover = withinBounds(pointerX, pointerY, x, y, CARD_WIDTH, CARD_HEIGHT);

    if (isHover) {
      hoveredCardIndex = i;
      break;
    }
  }

  // Card
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const x = getCardX(anchorX, i, cards.length, maxWidth);
    const y = getCardY(anchorY);
    const isHover = hoveredCardIndex === i;

    resetTransform();
    translateTransform(x, y);
    drawSprite(Texture.ATLAS, -2, -2, 0, 64, 48, 48);

    if (isHover) {
      drawSprite(Texture.ATLAS, -2, -2, 48, 64, 48, 48);

      if (onClick && isInputPressed(Input.LMB)) {
        onClick(i);
      }
    }

    const nameScaling = (1 / (Math.max(card.name.length, 8) / 8)) * 0.375;
    resetTransform();
    translateTransform(x, y);
    translateTransform(CARD_WIDTH / 2, CARD_HEIGHT - 12);
    scaleTransform(nameScaling);
    drawTextWithShadow(card.name, 0, 0, "white", "center", "middle");

    if (isValueCard(card)) {
      resetTransform();
      translateTransform(x, y);
      translateTransform(CARD_WIDTH / 2, CARD_HEIGHT - 5.5);
      scaleTransform(0.5);
      drawSprite(Texture.ATLAS, -14, -9, 32, 112, 16, 16);
      drawTextWithShadow(card.value.toString(), 1, 0, "white", "left", "middle");
    }
  }

  // Tooltip
  if (hoveredCardIndex !== -1) {
    const card = cards[hoveredCardIndex];

    if (card) {
      const w = 96;
      const h = 96;
      const x = getWidth() / 2 - w / 2;
      const y = 30;

      resetTransform();
      translateTransform(x, y);
      drawSprite(Texture.ATLAS, 0, 0, 0, 128, w, h);

      const nameScaling = (1 / (Math.max(card.name.length, 16) / 16)) * 0.75;
      translateTransform(w / 2, 15);
      scaleTransform(nameScaling);
      drawTextWithShadow(card.name, 0, 0, "white", "center", "bottom");
    }
  }
}

export function drawButton(text: string, x: number, y: number, onClick: () => void) {
  const isHover = withinBounds(pointerX, pointerY, x, y, BUTTON_WIDTH, BUTTON_HEIGHT);

  resetTransform();
  translateTransform(x, y);
  drawSprite(Texture.ATLAS, -2, -2, 96, 128, 48, 16);

  if (isHover) {
    drawSprite(Texture.ATLAS, -2, -2, 96, 144, 48, 16);

    if (isInputPressed(Input.LMB)) {
      onClick();
    }
  }

  translateTransform(BUTTON_WIDTH / 2, BUTTON_HEIGHT / 2);
  scaleTransform(0.5);
  drawTextWithShadow(text, 0, 0, "white", "center", "middle");
}

export function drawHealth(x: number, y: number) {
  resetTransform();
  translateTransform(x, y);
  scaleTransform(0.75);
  drawSprite(Texture.ATLAS, -7.5, -6, 112, 160, 16, 16);
  translateTransform(-20, 0);
  drawTextWithShadow(`${player.health} / ${player.healthMax}`, 0, 0, "white", "right", "middle");
  translateTransform(40, 0);
  drawTextWithShadow(`${enemy.health} / ${enemy.healthMax}`, 0, 0, "white", "left", "middle");
}

export function drawTotalValues(x: number, y: number) {
  const playerTotal = getTotalValue(player);
  const enemyTotal = getTotalValue(enemy);
  resetTransform();
  translateTransform(x, y);
  scaleTransform(0.75);
  drawSprite(Texture.ATLAS, -5.5, -11, 96, 160, 16, 32);
  translateTransform(-20, 0);
  drawTextWithShadow(playerTotal.toString(), 0, 0, "white", "right", "middle");
  translateTransform(40, 0);
  drawTextWithShadow(enemyTotal.toString(), 0, 0, "white", "left", "middle");
}

export function drawEndTurnButton(x: number, y: number, onClick: () => void) {
  drawButton("End turn", x - BUTTON_WIDTH / 2, y, onClick);
}

export function drawDrawPile() {
  resetTransform();
  translateTransform(10, getHeight() - 35);
  drawSprite(Texture.ATLAS, -2, -2, 96, 64, 48, 48);
  translateTransform(CARD_WIDTH / 2, CARD_HEIGHT / 2);
  drawTextWithShadow(player.draw.length.toString(), 0, 0, "white", "center", "middle");
}

function getCardX(x: number, i: number, l: number, maxWidth: number) {
  const maxStep = (maxWidth - CARD_WIDTH) / (l - 1);
  const idealStep = CARD_WIDTH - 10;
  const step = Math.min(idealStep, maxStep);
  const total = (l - 1) * step + CARD_WIDTH;
  return x - total / 2 + step * i;
}

function getCardY(y: number) {
  return y;
}
