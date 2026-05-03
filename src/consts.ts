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

export const enum Sprite {
  NONE,
  PLAYER,
  PLAYER_SHADOW,
  PLAYER_LONGSWORD,
  ENEMY_MELEE,
  ENEMY_MELEE_SHADOW,
  PROJECTILE_LONGSWORD,
}

export const enum Type {
  NONE,
  PLAYER,
  ENEMY,
  PROJECTILE,
}

export const enum Enemy {
  NONE,
  MELEE,
}

export const enum Projectile {
  NONE,
  LONGSWORD,
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
  HEALTH = "red",
  DEPLETE = "white",
}
