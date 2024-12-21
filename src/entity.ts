import { addVectorScaled, drawSprite, drawTexture, getDelta, resetTransform, scaleTransform, translateTransform, uuid, vec, Vector } from "ridder";
import { addEntityToScene, Scene } from "scene.js";
import { Type } from "type.js";

export type Entity = {
  id: string;
  type: Type;
  pos: Vector;
  vel: Vector;
  textureId: string;
  spriteId: string;
  pivot: Vector;
  isFlipped: boolean;
};

export function newEntity(setup?: (e: Entity) => Scene): Entity {
  const e: Entity = {
    id: uuid(),
    type: Type.NONE,
    pos: vec(),
    vel: vec(),
    textureId: "",
    spriteId: "",
    pivot: vec(),
    isFlipped: false,
  };

  if (setup) {
    const scene = setup(e);
    addEntityToScene(scene, e);
  }

  return e;
}

export function updateEntity(e: Entity) {
  addVectorScaled(e.pos, e.vel, getDelta());
}

export function renderEntity(e: Entity) {
  resetTransform();
  translateTransform(e.pos.x, e.pos.y);

  if (e.isFlipped) {
    scaleTransform(-1, 1);
  }

  if (e.textureId) {
    drawTexture(e.textureId, -e.pivot.x, -e.pivot.y);
  }

  if (e.spriteId) {
    drawSprite(e.spriteId, -e.pivot.x, -e.pivot.y);
  }
}
