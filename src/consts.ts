export const MAX_ENEMY_COUNT = 1000;

export const ROOM_WIDTH = 640;
export const ROOM_HEIGHT = 360;

export const enum Texture {
  ATLAS,
  ATLAS_FLASH,
  ATLAS_FLASH_DANGER,
  ATLAS_OUTLINED,
  ATLAS_OUTLINED_DANGER,
}

export const enum Font {
  DEFAULT,
}

export const enum Input {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  ATTACK,
  DEBUG,
}

export const enum Type {
  NONE,
  PLAYER,
  ENEMY_MELEE,
  PROJECTILE_LONGSWORD,
  PROJECTILE_ENEMY_MELEE,
  SOUL,
}

export const enum Anim {
  NONE,
  BREATHE,
  WALK,
}

export const enum Item {
  NONE,
  LONGSWORD,
}

export const enum Color {
  BORDER = "#1e1e1e",
  HEALTH = "#e43c3c",
  HEALTH_DARK = "#ca1c39",
  DEPLETE = "#ffffff",
  GRASS = "#63735c",
  DANGER = "#ff0000",
}
