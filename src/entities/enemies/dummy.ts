import { initEnemy, newEnemy } from "enemy.js";
import { setBody, setConstraints, setSprites } from "entity.js";
import { Scene } from "scene.js";

export function newDummy(scene: Scene, x: number, y: number) {
  const e = newEnemy(scene, "dummy", x, y);

  setSprites(e, "player", 16, 31, 0, -4, true, 0, 2);
  setConstraints(e, 10, 12);
  setBody(e, scene, 10, 3);

  initEnemy(e, {
    health: Infinity,
    stun: Infinity,
    strength: 0,
    dexterity: 0,
    intelligence: 0,
    movementSpeed: 0,
    experience: 0,
    state: "",
  });

  return e;
}
