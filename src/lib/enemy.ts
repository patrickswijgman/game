import { CardId, ENEMY_PER_LEVEL, EnemyType } from "@/consts.ts";
import { enemy, level, player } from "@/data.ts";
import { isSpecialCard, isValueCard } from "@/lib/cards.ts";
import { addCards, playCard, setSheet } from "@/lib/sheet.ts";
import { pick, shuffle } from "@/lib/utils.ts";

export function prepareEnemy() {
  const type = pick(ENEMY_PER_LEVEL[level]);

  switch (type) {
    case EnemyType.RAT:
      setSheet(enemy, "Rat", 5);
      addCards(enemy, CardId.SCRATCH, 4);
      addCards(enemy, CardId.BITE, 4);
      break;
  }
}

export function enemyChooseValueCard() {
  shuffle(enemy.hand);
  const i = enemy.hand.findIndex(isValueCard);
  playCard(enemy, i, player);
}

export function enemyChooseSpecialCard() {
  shuffle(enemy.hand);
  const i = enemy.hand.findIndex(isSpecialCard);
  playCard(enemy, i, player);
}

export function drawEnemy(x: number, y: number) {}
