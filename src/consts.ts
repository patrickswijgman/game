export const enum Texture {
  ATLAS,
}

export const enum Font {
  DEFAULT,
}

export const enum Input {
  LMB = "0",
}

export const enum State {
  DEFAULT,
  PREPARE_PLAYER,
  PREPARE_ENEMY,
  PREPARE_DECKS,
  PREPARE_ROUND,
  ENEMY_CHOOSE_CARD,
  PLAYER_CHOOSE_CARD,
  REVEAL,
  RESOLVE,
  VICTORY,
  DEFEAT,
}

export const enum EnemyType {
  UNKNOWN,
  RAT,
}

export const enum CardId {
  PUNCH,
  STICK,
  RAT_BITE,
}

export const enum CardEffect {
  REPLACE,
}

export const enum ItemId {
  HEALTH_POTION,
}

export const enum ItemEffect {
  HEALTH_RESTORE,
  HEALTH_MAX_INCREASE,
}

export const enum Color {
  SHADOW = "#1e1e1e",
  GRASS = "#577647",
  ERROR = "#dd1c1a",
}

export const enum Action {
  NONE,
  CONFIRM_CARD,
}

export const CARD_WIDTH = 28;
export const CARD_HEIGHT = 32;

export const BUTTON_WIDTH = 44;
export const BUTTON_HEIGHT = 12;
