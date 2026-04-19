import { CardId, EnemyType } from "@/consts.ts";
import { enemy, enemyCards, zeroSheet } from "@/data.ts";
import { isValueCard } from "@/lib/cards.ts";
import { addCards, playCard } from "@/lib/sheet.ts";
import { shuffle } from "@/lib/utils.ts";

export function prepareEnemy(type: EnemyType) {
  zeroSheet(enemy);

  switch (type) {
    case EnemyType.RAT:
      {
        enemy.name = "Rat";
        enemy.health = 2;
        enemy.healthMax = 2;
        enemy.drawAmount = 3;
        addCards(enemy, CardId.RAT_BITE, 9);
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

export function drawEnemy() {}
