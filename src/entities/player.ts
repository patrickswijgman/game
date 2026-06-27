import { Animation, Input } from "@/consts.ts";
import { hairId, isFlipped, isPlayer, pantsId, posX, posY, shadowId, shirtId, spriteId, velX, velY, weaponId } from "@/data/data.ts";
import { Sprite } from "@/data/sprites.ts";
import { setupEntity } from "@/engine/entities.ts";
import { isInputDown } from "@/engine/input.ts";
import { seek } from "@/engine/steering.ts";
import { setAnimation } from "@/lib/anims.ts";

export function setupPlayer(x: number, y: number) {
  const id = setupEntity(x, y);
  shadowId[id] = Sprite.SHADOW;
  spriteId[id] = Sprite.SKIN1;
  hairId[id] = Sprite.HAIR1;
  shirtId[id] = Sprite.SHIRT2;
  pantsId[id] = Sprite.PANTS2;
  weaponId[id] = Sprite.LONGSWORD;
  isPlayer[id] = 1;
  return id;
}

export function updatePlayer(id: number) {
  velX[id] = 0;
  velY[id] = 0;

  let x = 0;
  let y = 0;
  if (isInputDown(Input.UP)) {
    y -= 1;
  }
  if (isInputDown(Input.DOWN)) {
    y += 1;
  }
  if (isInputDown(Input.LEFT)) {
    x -= 1;
    isFlipped[id] = 1;
  }
  if (isInputDown(Input.RIGHT)) {
    x += 1;
    isFlipped[id] = 0;
  }

  if (x !== 0 || y !== 0) {
    setAnimation(id, Animation.WALK);
  } else {
    setAnimation(id, Animation.BREATHE);
  }

  seek(id, posX[id] + x, posY[id] + y, 1);
}
