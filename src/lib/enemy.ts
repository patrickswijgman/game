import { CardId, EnemyType } from "@/consts.ts";
import { enemy, zeroSheet } from "@/data.ts";
import { addCards } from "@/lib/sheet.ts";

export function setupEnemy(type: EnemyType) {
  zeroSheet(enemy);

  switch (type) {
    case EnemyType.RAT:
      {
        enemy.name = "Rat";
        enemy.health = 1;
        enemy.healthMax = 1;
        addCards(enemy, CardId.BITE, 3);
      }
      break;
  }
}
