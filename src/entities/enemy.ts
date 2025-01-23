import { SpriteId } from "@/enums/assets.js";
import { ItemId } from "@/enums/item.js";
import { SceneId } from "@/enums/scene.js";
import { Type } from "@/enums/type.js";
import { addEntity, setCenter, setShadow, setSprite } from "@/usecases/entity.js";

export function addEnemy(sceneId: SceneId, x: number, y: number) {
  const e = addEntity(Type.ENEMY, sceneId, x, y);
  setSprite(e, SpriteId.PLAYER, 8, 15);
  setShadow(e, SpriteId.PLAYER_SHADOW, 8, 13);
  setCenter(e, 0, -4);
  e.sheet.name = "Enemy";
  e.sheet.stats.health = 10;
  e.sheet.stats.healthMax = 10;
  e.sheet.weaponId = ItemId.LONGSWORD;
  e.isEnemy = true;
  e.isPhysicsEnabled = true;
  return e;
}
