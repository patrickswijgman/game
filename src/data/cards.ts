import { CardEffectId, CardId } from "@/enums/card.js";

export type Card = {
  name: string;
  value: number;
  effectId: CardEffectId;
};

export const cards: Readonly<Record<CardId, Card>> = {
  [CardId.SLASH]: {
    name: "Slash",
    value: 3,
    effectId: CardEffectId.DEAL_DAMAGE,
  },
};
