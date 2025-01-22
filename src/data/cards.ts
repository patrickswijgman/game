import { newStats, Stats } from "@/data/stats.js";
import { ActionId } from "@/enums/action.js";
import { SpriteId } from "@/enums/assets.js";
import { CardId } from "@/enums/card.js";
import { vec, Vector } from "ridder";

export type Card = {
  name: string;
  spriteId: SpriteId;
  spritePivot: Vector;
  actions: Array<ActionId>;
  stats: Stats;
};

export const cards: Readonly<Record<CardId, Card>> = {
  [CardId.NONE]: {} as Card,

  [CardId.SLASH]: {
    name: "Slash",
    spriteId: SpriteId.LONGSWORD,
    spritePivot: vec(16.5, 16),
    actions: [ActionId.DEAL_DAMAGE],
    stats: newStats({
      damageScaling: 1,
    }),
  },
};
