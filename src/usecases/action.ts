import { Card } from "@/data/cards.js";
import { Entity } from "@/data/entity.js";
import { ActionId } from "@/enums/action.js";
import { clampStats, getStatsTotal } from "@/usecases/stats.js";

export function doActions(caster: Entity, target: Entity, card: Card) {
  for (const id of card.actions) {
    switch (id) {
      case ActionId.DEAL_DAMAGE:
        {
          let damage = 0;

          damage += getStatsTotal("damage", caster.sheet.stats, card.stats);
          damage = Math.max(1, damage * card.stats.damageScaling);

          console.log(caster, card, damage);

          target.sheet.stats.health -= damage;
          clampStats(target.sheet.stats);
        }
        break;
    }
  }
}
