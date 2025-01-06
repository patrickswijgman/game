import { onActionEnter, onActionExit, onActionUpdate } from "actions.js";
import { COLOR_TEXT } from "consts.js";
import { renderBonfire } from "entities/bonfire.js";
import { renderPortal } from "entities/portal.js";
import { drawOutlinedText } from "render.js";
import { addVector, addVectorScaled, applyCameraTransform, copyVector, drawSprite, drawText, drawTexture, getDelta, isPolygonValid, isRectangleValid, polygon, Polygon, polygonFromRect, rect, Rectangle, resetTimer, resetTransform, resetVector, rotateTransform, scaleTransform, setAlpha, setPolygonAngle, setRectangle, setVector, TextAlign, TextBaseline, tickTimer, timer, Timer, translateTransform, uuid, vec, Vector, writeIntersectionBetweenRectangles } from "ridder";
import { addBody, addEntity, Scene } from "scene.js";
import { newSheet, Sheet } from "sheet.js";
import { avoid } from "steering.js";

export type Entity = {
  id: string;
  type: string;
  start: Vector;
  position: Vector;
  velocity: Vector;
  ahead: Vector;
  avoid: Vector;
  target: Vector;
  direction: Vector;
  stateId: string;
  stateNextId: string;
  stateStartId: string;
  stateTimer: Timer;
  hitbox: Polygon;
  body: Rectangle;
  bodyOffset: Vector;
  bodyIntersection: Vector;
  radius: number;
  textureId: string;
  spriteId: string;
  spriteFlashId: string;
  spriteOutlineId: string;
  spriteOutlineDangerId: string;
  pivot: Vector;
  scale: Vector;
  angle: number;
  shadowId: string;
  shadowOffset: Vector;
  center: Vector;
  centerOffset: Vector;
  text: string;
  textAlign: TextAlign;
  textBaseline: TextBaseline;
  textColor: string;
  textOutline: string;
  width: number;
  height: number;
  depth: number;
  lifetime: number;
  lifeTimer: Timer;
  flashDuration: number;
  flashTimer: Timer;
  tweenPosition: Vector;
  tweenScale: Vector;
  tweenAngle: number;
  tweenAlpha: number;
  tweenTimer: Timer;
  tweenDuration: number;
  timer: Timer;
  parentId: string;
  targetId: string;
  actionId: string;
  blacklist: Array<string>;
  sheet: Sheet;
  isPlayer: boolean;
  isEnemy: boolean;
  isFlipped: boolean;
  isMirrored: boolean;
  isFlashing: boolean;
  isVisible: boolean;
  isOutlineVisible: boolean;
  isOutlineDangerVisible: boolean;
  isDestroyed: boolean;
};

export function newEntity(scene: Scene, type: string, x: number, y: number): Entity {
  return addEntity(scene, {
    id: uuid(),
    type,
    start: vec(x, y),
    position: vec(x, y),
    velocity: vec(),
    ahead: vec(),
    avoid: vec(),
    target: vec(),
    direction: vec(),
    stateId: "",
    stateTimer: timer(),
    stateNextId: "",
    stateStartId: "",
    hitbox: polygon(),
    body: rect(),
    bodyOffset: vec(),
    bodyIntersection: vec(),
    radius: 0,
    textureId: "",
    spriteId: "",
    spriteFlashId: "",
    spriteOutlineId: "",
    spriteOutlineDangerId: "",
    pivot: vec(),
    scale: vec(1, 1),
    angle: 0,
    shadowId: "",
    shadowOffset: vec(),
    center: vec(),
    centerOffset: vec(),
    text: "",
    textAlign: "left",
    textBaseline: "top",
    textColor: COLOR_TEXT,
    textOutline: "",
    width: 0,
    height: 0,
    depth: 0,
    lifetime: 0,
    lifeTimer: timer(),
    flashDuration: 0,
    flashTimer: timer(),
    tweenPosition: vec(),
    tweenScale: vec(1, 1),
    tweenAngle: 0,
    tweenAlpha: 1,
    tweenTimer: timer(),
    tweenDuration: 0,
    timer: timer(),
    parentId: "",
    targetId: "",
    actionId: "",
    blacklist: [],
    sheet: newSheet(),
    isPlayer: false,
    isEnemy: false,
    isFlipped: false,
    isMirrored: false,
    isFlashing: false,
    isVisible: true,
    isOutlineVisible: false,
    isOutlineDangerVisible: false,
    isDestroyed: false,
  });
}

export function setSprites(e: Entity, id: string, pivotX: number, pivotY: number, centerOffsetX = 0, centerOffsetY = 0, shadow = false, shadowOffsetX = 0, shadowOffsetY = 0) {
  e.spriteId = id;
  e.spriteFlashId = `${id}_flash`;
  e.spriteOutlineId = `${id}_outline`;
  e.spriteOutlineDangerId = `${id}_outline_danger`;
  e.pivot.x = pivotX;
  e.pivot.y = pivotY;
  e.centerOffset.x = centerOffsetX;
  e.centerOffset.y = centerOffsetY;

  if (shadow) {
    e.shadowId = `${id}_shadow`;
    e.shadowOffset.x = shadowOffsetX;
    e.shadowOffset.y = shadowOffsetY;
  }
}

export function setConstraints(e: Entity, width: number, height: number) {
  e.hitbox = polygonFromRect(e.position.x, e.position.y, rect(-width / 2, -height, width, height));
  e.width = width;
  e.height = height;
  e.radius = (width + height) / 2;
}

export function setBody(e: Entity, scene: Scene, width: number, height: number) {
  setRectangle(e.body, 0, 0, width, height);
  setVector(e.bodyOffset, -width / 2, -height);
  addBody(scene, e.body);
}

type StateLifecycleHook = (e: Entity, scene: Scene, state: string) => string | void;

export function updateState(e: Entity, scene: Scene, onEnter: StateLifecycleHook, onUpdate: StateLifecycleHook, onExit: StateLifecycleHook) {
  if (e.stateId !== e.stateNextId) {
    onExit(e, scene, e.stateId);

    if (e.stateId === "action") {
      onActionExit(e, scene);
    }

    e.stateId = e.stateNextId;

    resetTimer(e.stateTimer);
    resetVector(e.velocity);
    resetTimer(e.tweenTimer);
    resetVector(e.tweenPosition);
    setVector(e.tweenScale, 1, 1);
    e.tweenAngle = 0;

    onEnter(e, scene, e.stateId);

    if (e.stateId === "action") {
      onActionEnter(e, scene);
    }
  }

  const nextStateId = onUpdate(e, scene, e.stateId);

  if (e.stateId === "action") {
    onActionUpdate(e, scene);
  }

  if (nextStateId) {
    e.stateNextId = nextStateId;
  }
}

export function updateConditions(e: Entity) {
  if (e.sheet.conditions.isStunned) {
    e.stateNextId = "stun";

    if (tickTimer(e.sheet.conditions.stunTimer, e.sheet.conditions.stunDuration)) {
      e.sheet.conditions.isStunned = false;
      resetTimer(e.sheet.conditions.stunTimer);
      resetState(e);
    }
  }

  if (e.sheet.conditions.isInvulnerable && tickTimer(e.sheet.conditions.invulnerableTimer, e.sheet.conditions.invulnerableDuration)) {
    e.sheet.conditions.isInvulnerable = false;
    resetTimer(e.sheet.conditions.invulnerableTimer);
  }
}

export function updateCenter(e: Entity) {
  copyVector(e.center, e.position);
  addVector(e.center, e.centerOffset);
}

export function updatePhysics(e: Entity) {
  addVectorScaled(e.position, e.velocity, getDelta());
}

export function updateHitbox(e: Entity) {
  if (isPolygonValid(e.hitbox)) {
    const angle = e.angle + e.tweenAngle;
    copyVector(e.hitbox, e.position);
    addVector(e.hitbox, e.tweenPosition);
    setPolygonAngle(e.hitbox, e.isFlipped ? -angle : angle);
  }
}

export function updateCollisions(e: Entity, scene: Scene) {
  if (isRectangleValid(e.body)) {
    copyVector(e.body, e.position);
    addVector(e.body, e.bodyOffset);

    for (const other of scene.bodies) {
      if (other === e.body) {
        continue;
      }

      resetVector(e.bodyIntersection);

      writeIntersectionBetweenRectangles(e.body, other, e.velocity, e.bodyIntersection);

      if (e.bodyIntersection.x) {
        e.position.x += e.bodyIntersection.x;
        e.body.x += e.bodyIntersection.x;
        e.velocity.x = 0;
      }

      if (e.bodyIntersection.y) {
        e.position.y += e.bodyIntersection.y;
        e.body.y += e.bodyIntersection.y;
        e.velocity.y = 0;
      }
    }
  }
}

export function updateAvoidance(e: Entity, scene: Scene) {
  if (e.radius) {
    avoid(e, scene);
  }
}

export function updateFlash(e: Entity) {
  if (e.isFlashing && tickTimer(e.flashTimer, e.flashDuration)) {
    e.isFlashing = false;
    resetTimer(e.flashTimer);
  }
}

export function lookAt(e: Entity, target: Vector) {
  e.isFlipped = target.x < e.position.x;
}

export function flash(e: Entity, duration: number) {
  e.isFlashing = true;
  e.flashDuration = duration;
  resetTimer(e.flashTimer);
}

export function renderEntity(e: Entity, scene: Scene) {
  if (!e.isVisible) {
    return;
  }

  resetTransform();
  applyCameraTransform(scene.camera);
  translateTransform(e.position.x, e.position.y);

  if (e.isFlipped) {
    scaleTransform(-1, 1);
  }

  scaleTransform(e.scale.x, e.scale.y);
  rotateTransform(e.angle);

  translateTransform(e.tweenPosition.x, e.tweenPosition.y);
  scaleTransform(e.tweenScale.x, e.tweenScale.y);
  rotateTransform(e.tweenAngle);

  if (e.isMirrored) {
    scaleTransform(1, -1);
  }

  setAlpha(e.tweenAlpha);

  if (e.textureId) {
    drawTexture(e.textureId, -e.pivot.x, -e.pivot.y);
  }

  if (e.spriteId) {
    if (e.isFlashing) {
      drawSprite(e.spriteFlashId, -e.pivot.x, -e.pivot.y);
    } else {
      drawSprite(e.spriteId, -e.pivot.x, -e.pivot.y);
    }

    if (e.isOutlineVisible) {
      drawSprite(e.spriteOutlineId, -e.pivot.x, -e.pivot.y);
    }

    if (e.isOutlineDangerVisible) {
      drawSprite(e.spriteOutlineDangerId, -e.pivot.x, -e.pivot.y);
    }
  }

  if (e.text) {
    if (e.textOutline) {
      drawOutlinedText(e.text, 0, 0, e.textColor, e.textOutline, e.textAlign, e.textBaseline);
    } else {
      drawText(e.text, 0, 0, e.textColor, e.textAlign, e.textBaseline);
    }
  }

  setAlpha(1);

  switch (e.type) {
    case "portal":
      renderPortal(e, scene);
      break;
    case "bonfire":
      renderBonfire(e, scene);
      break;
  }
}

export function renderShadow(e: Entity, scene: Scene) {
  if (e.shadowId) {
    if (!e.isVisible) {
      return;
    }

    resetTransform();
    translateTransform(e.position.x, e.position.y);
    applyCameraTransform(scene.camera);

    if (e.isFlipped) {
      scaleTransform(-1, 1);
    }

    translateTransform(e.shadowOffset.x, e.shadowOffset.y);
    drawSprite(e.shadowId, -e.pivot.x, -e.pivot.y);
  }
}

export function resetState(e: Entity) {
  if (e.stateStartId) {
    e.stateNextId = e.stateStartId;
  } else {
    e.stateNextId = "";
  }
}
