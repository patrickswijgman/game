export const enum Texture {
  ATLAS,
}

export const enum Font {
  DEFAULT,
}

export const enum Input {
  LMB = "0",
  END_TURN = "Space",
}

export const enum State {
  DEFAULT,
  PREPARE_LEVEL,
  PREPARE_ROUND,
  ENEMY_CHOOSE_VALUE_CARD,
  PLAYER_CHOOSE_VALUE_CARD,
  ENEMY_CHOOSE_SPECIAL_CARD,
  PLAYER_CHOOSE_SPECIAL_CARD,
  PLAYER_CONFIRMED_CARD,
  RESOLVE,
  VICTORY,
  DEFEAT,
}

export const enum EnemyType {
  UNKNOWN,
  RAT,
}

export const enum CardId {
  NONE,
  // Player
  DAGGER,
  SHORTSWORD,
  MACE,
  FIREBALL,
  SHARPEN,
  TAUNT,
  // Rat
  SCRATCH,
  BITE,
}

export const enum CardEffect {
  NONE,
  BUFF,
  DEBUFF,
}

export const enum CardType {
  NONE,
  SELF,
  ATTACK,
}

export const enum Color {
  SHADOW = "#1e1e1e",
  GRASS = "#577647",
  ERROR = "#dd1c1a",
}

export const CARD_WIDTH = 28;
export const CARD_HEIGHT = 32;

export const BUTTON_WIDTH = 44;
export const BUTTON_HEIGHT = 12;

export const END_TURN_STATES: Readonly<Array<State>> = [State.PLAYER_CHOOSE_VALUE_CARD, State.PLAYER_CHOOSE_SPECIAL_CARD];

export const ENEMY_PER_LEVEL: Readonly<Record<number, Array<EnemyType>>> = {
  0: [EnemyType.RAT],
  1: [EnemyType.RAT],
  2: [EnemyType.RAT],
  3: [EnemyType.RAT],
  4: [EnemyType.RAT],
  5: [EnemyType.RAT],
  6: [EnemyType.RAT],
  7: [EnemyType.RAT],
  8: [EnemyType.RAT],
  9: [EnemyType.RAT],
};
