import { CardEffectId, CardId } from "@/enum/cards.js";

export type Card = {
  name: string;
  value: number;
  cost: number;
  effectId: CardEffectId;
  nextRankId: CardId;
};

export const cards: Readonly<Record<CardId, Card>> = {
  [CardId.SLASH_1]: {
    name: "Slash I",
    value: 3,
    cost: 1,
    effectId: CardEffectId.DEAL_DAMAGE,
    nextRankId: CardId.SLASH_1,
  },
};
