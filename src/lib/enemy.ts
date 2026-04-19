import { CardId, EnemyType } from "@/consts.ts";
import { enemy, enemyCards, zeroSheet } from "@/data.ts";
import { addCards, playCard } from "@/lib/sheet.ts";
import { random } from "@/lib/utils.ts";

export function prepareEnemy(type: EnemyType) {
  zeroSheet(enemy);

  switch (type) {
    case EnemyType.RAT:
      {
        enemy.name = "Rat";
        enemy.health = 2;
        enemy.healthMax = 2;
        addCards(enemy, CardId.RAT_BITE, 2);
      }
      break;
  }
}

export function enemyChooseCard() {
  if (enemy.hand.length > 0) {
    const cardId = random(enemy.hand.length);
    playCard(enemy, cardId, enemyCards);
  }
}

export function drawEnemy() {
  if (enemy.health) {
  }
}
