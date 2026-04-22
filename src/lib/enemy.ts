import { CardId, ENEMY_PER_LEVEL, EnemyType } from "@/consts.ts";
import { enemy, enemyCards, level, zeroSheet } from "@/data.ts";
import { isValueCard } from "@/lib/cards.ts";
import { addCards, playCard } from "@/lib/sheet.ts";
import { shuffle } from "@/lib/utils.ts";

export function prepareEnemy() {
  const type = ENEMY_PER_LEVEL[level];

  zeroSheet(enemy);

  switch (type) {
    case EnemyType.RAT:
      {
        enemy.name = "Rat";
        enemy.health = 5;
        enemy.healthMax = 5;
        addCards(enemy, CardId.SCRATCH, 4);
        addCards(enemy, CardId.BITE, 4);
      }
      break;
  }
}

export function enemyChooseValueCard() {
  if (enemy.hand.length > 0) {
    shuffle(enemy.hand);

    const i = enemy.hand.findIndex(isValueCard);

    if (i !== -1) {
      playCard(enemy, i, enemyCards);
    }
  }
}

export function enemyChooseSpecialCard() {}

export function drawEnemy(x: number, y: number) {}
