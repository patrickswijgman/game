import { COLOR_OUTLINE, ENEMY_SPAWN_TIME_MAX, ENEMY_SPAWN_TIME_MIN, ENEMY_SPAWN_TIME_REDUCE, MAX_ENEMIES, MAX_LEVEL } from "@/consts.js";
import { getEntity } from "@/core/entities.js";
import { addStats } from "@/core/stats.js";
import { getUpgrade, UpgradeId } from "@/core/upgrades.js";
import { addMeleeEnemy } from "@/entities/enemy-melee.js";
import { addBackdropWidget } from "@/widgets/backdrop.js";
import { addDefeatWidget } from "@/widgets/defeat.js";
import { addUpgradeWidget } from "@/widgets/upgrade.js";
import { clamp, doesRectangleContain, drawTextOutlined, getDeltaTime, getHeight, getWidth, InputCode, pick, rect, Rectangle, remove, resetInput, resetTimer, resetTransform, roll, scaleTransform, setRectangle, tickTimer, timer, Timer, translateTransform, vec, Vector, writeRandomPointInPerimeterBetweenRectangles } from "ridder";

export const enum WorldStateId {
  NONE,
  NORMAL,
  CHOOSE_UPGRADE,
  DEFEAT,
}

export type World = {
  // State
  stateId: WorldStateId;

  // Boundary
  bounds: Rectangle;
  boundsOutside: Rectangle;
  boundsInside: Rectangle;

  // Collisions
  bodies: Array<Rectangle>;

  // Entities
  active: Array<number>;
  allies: Array<number>;
  enemies: Array<number>;
  widgets: Array<number>;
  levelUpWidgets: Array<number>;

  // Cleanup
  destroyed: Array<number>;

  // Enemy spawning
  spawnTime: number;
  spawnTimer: Timer;
  spawnPosition: Vector;

  // Level up
  upgrades: Array<UpgradeId>;
  upgradeChoices: Array<UpgradeId>;

  // Winning
  time: number;

  // Player
  playerId: number;
};

const world: World = {
  // State
  stateId: WorldStateId.NONE,

  // Boundary
  bounds: rect(),
  boundsOutside: rect(),
  boundsInside: rect(),

  // Collisions
  bodies: [],

  // Entities
  active: [],
  allies: [],
  enemies: [],
  widgets: [],
  levelUpWidgets: [],

  // Cleanup
  destroyed: [],

  // Enemy spawning
  spawnTime: ENEMY_SPAWN_TIME_MAX,
  spawnTimer: timer(),
  spawnPosition: vec(),

  // Level up
  upgrades: [],
  upgradeChoices: [],

  // Winning
  time: 0,

  // Player
  playerId: 0,
};

export function setWorldBounds(w: number, h: number) {
  setRectangle(world.bounds, 0, 0, w, h);
  setRectangle(world.boundsOutside, -50, -50, w + 100, h + 100);
  setRectangle(world.boundsInside, 50, 50, w - 100, h - 100);
}

export function isInInnerBounds(x: number, y: number) {
  return doesRectangleContain(world.boundsInside, x, y);
}

export function setWorldState(id: WorldStateId) {
  world.stateId = id;
}

export function getWorldState() {
  return world.stateId;
}

export function getEntities(): Readonly<Array<number>> {
  return world.active;
}

export function addToEntities(id: number) {
  world.active.push(id);
}

export function sortEntities(sort: (a: number, b: number) => number) {
  world.active.sort(sort);
}

export function getDestroyedEntities(): Readonly<Array<number>> {
  return world.destroyed;
}

export function clearDestroyedEntities() {
  world.destroyed.length = 0;
}

export function destroyEntity(id: number) {
  const e = getEntity(id);
  e.isDestroyed = true;
  world.destroyed.push(id);
}

export function updateEnemySpawner() {
  if (tickTimer(world.spawnTimer, world.spawnTime)) {
    if (world.enemies.length < MAX_ENEMIES) {
      writeRandomPointInPerimeterBetweenRectangles(world.boundsOutside, world.bounds, world.spawnPosition);
      addMeleeEnemy(world.spawnPosition.x, world.spawnPosition.y);
      world.spawnTime = clamp(world.spawnTime - ENEMY_SPAWN_TIME_REDUCE, ENEMY_SPAWN_TIME_MIN, ENEMY_SPAWN_TIME_MAX);
    }
    resetTimer(world.spawnTimer);
  }
}

export function updateTime() {
  world.time += getDeltaTime();
}

export function getAlliesGroup(): Readonly<Array<number>> {
  return world.allies;
}

export function addToAlliesGroup(id: number) {
  world.allies.push(id);
}

export function getEnemiesGroup(): Readonly<Array<number>> {
  return world.enemies;
}

export function addToEnemiesGroup(id: number) {
  world.enemies.push(id);
}

export function getWidgets(): Readonly<Array<number>> {
  return world.widgets;
}

export function addToWidgets(id: number) {
  world.widgets.push(id);
}

export function removeEntity(id: number) {
  const e = getEntity(id);
  remove(world.active, id);
  remove(world.allies, id);
  remove(world.enemies, id);
  remove(world.widgets, id);
  remove(world.levelUpWidgets, id);
  remove(world.bodies, e.body);
}

export function getBodies(): Readonly<Array<Rectangle>> {
  return world.bodies;
}

export function addBody(body: Rectangle) {
  world.bodies.push(body);
}

export function setPlayer(id: number) {
  world.playerId = id;
}

export function getPlayer() {
  return getEntity(world.playerId);
}

export function addUpgradeToPool(id: UpgradeId, amount: number) {
  for (let i = 0; i < amount; i++) {
    world.upgrades.push(id);
  }
}

export function removeUpgradeFromPool(id: UpgradeId) {
  remove(world.upgrades, id);
}

export function chooseUpgrade() {
  world.upgradeChoices.length = 0;

  let amount = 2;
  if (roll(0.05)) {
    amount = 3;
  }

  for (let i = 0; i < amount; i++) {
    const id = pick(world.upgrades);

    if (id) {
      remove(world.upgrades, id);
      world.upgradeChoices.push(id);
    }
  }

  if (world.upgradeChoices.length) {
    const backdrop = addBackdropWidget();
    world.levelUpWidgets.push(backdrop.id);

    for (let i = 0; i < world.upgradeChoices.length; i++) {
      const id = world.upgradeChoices[i];
      const x = (getWidth() / (world.upgradeChoices.length + 1)) * (i + 1) - 50;
      const y = getHeight() / 2 - 50 + 10;
      const e = addUpgradeWidget(x, y, id);
      world.levelUpWidgets.push(e.id);
    }

    resetInput(InputCode.MOUSE_LEFT);
    world.stateId = WorldStateId.CHOOSE_UPGRADE;
  }
}

export function confirmUpgradeChoice(id: UpgradeId) {
  remove(world.upgradeChoices, id);
  world.upgrades.push(...world.upgradeChoices);

  const upgrade = getUpgrade(id);
  const player = getPlayer();
  addStats(player.stats, upgrade.stats);

  for (const id of world.levelUpWidgets) {
    destroyEntity(id);
  }

  world.stateId = WorldStateId.NORMAL;
}

export function defeat() {
  if (world.stateId !== WorldStateId.DEFEAT) {
    addBackdropWidget();
    addDefeatWidget();
    world.stateId = WorldStateId.DEFEAT;
  }
}

export function renderTimeSurvived() {
  resetTransform();
  translateTransform(getWidth() - 10, 10);
  scaleTransform(0.625, 0.625);
  drawTextOutlined(getTimeString(), 0, 0, "white", COLOR_OUTLINE, "circle", "right");
}

export function renderLevelUp() {
  const player = getPlayer();
  resetTransform();
  translateTransform(getWidth() / 2, 20);
  scaleTransform(1.25, 1.25);
  drawTextOutlined("Level up!", 0, 0, "white", COLOR_OUTLINE, "circle", "center", "middle");
  translateTransform(0, 10);
  scaleTransform(0.75, 0.75);
  drawTextOutlined(`(${player.stats.level} / ${MAX_LEVEL})`, 0, 0, "white", COLOR_OUTLINE, "circle", "center", "middle");
}

export function getTimeString() {
  const sec = Math.floor(world.time / 1000);
  const min = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const rem = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${min}:${rem}`;
}
