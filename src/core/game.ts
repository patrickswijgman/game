import { COLOR_OUTLINE, ENEMY_SPAWN_TIME_MAX, ENEMY_SPAWN_TIME_MIN, ENEMY_SPAWN_TIME_REDUCE, MAX_ENEMIES, MAX_ENTITIES, MAX_LEVEL } from "@/consts.js";
import { Entity, newEntity } from "@/core/entity.js";
import { addStats } from "@/core/stats.js";
import { getUpgrade, UpgradeId } from "@/core/upgrades.js";
import { addMeleeEnemy } from "@/entities/enemy-melee.js";
import { addBackdropWidget } from "@/widgets/backdrop.js";
import { addDefeatWidget } from "@/widgets/defeat.js";
import { addUpgradeWidget } from "@/widgets/upgrade.js";
import { clamp, doesRectangleContain, drawTextOutlined, getDeltaTime, getHeight, getWidth, InputCode, pick, rect, Rectangle, remove, resetInput, resetTimer, resetTransform, roll, scaleTransform, setRectangle, table, Table, tickTimer, timer, Timer, translateTransform, vec, Vector, writeRandomPointInPerimeterBetweenRectangles } from "ridder";

export const enum GameStateId {
  NONE,
  NORMAL,
  CHOOSE_UPGRADE,
  DEFEAT,
}

export type Game = {
  // Entities
  data: Table<Entity>;
  nextId: number;

  // State
  stateId: GameStateId;
  stateNextId: GameStateId;

  // Boundary
  bounds: Rectangle;
  boundsOutside: Rectangle;
  boundsInside: Rectangle;

  // Collisions
  bodies: Array<Rectangle>;

  // Groups
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

const game: Game = {
  // Entities
  data: table(MAX_ENTITIES, newEntity),
  nextId: 0,

  // State
  stateId: GameStateId.NONE,
  stateNextId: GameStateId.NONE,

  // Boundary
  bounds: rect(),
  boundsOutside: rect(),
  boundsInside: rect(),

  // Collisions
  bodies: [],

  // Groups
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

export function nextEntity() {
  let id = game.nextId;
  let e = game.data[id];

  if (e.isAllocated) {
    id = game.data.findIndex((e) => !e.isAllocated);
    if (id === -1) {
      throw new Error("Out of entities :(");
    }

    e = game.data[id];
    game.nextId = clamp(id + 1, 0, game.data.length - 1);
  }

  e.id = id;
  e.isAllocated = true;

  return e;
}

export function getEntity(id: number) {
  return game.data[id];
}

export function setBounds(w: number, h: number) {
  setRectangle(game.bounds, 0, 0, w, h);
  setRectangle(game.boundsOutside, -50, -50, w + 100, h + 100);
  setRectangle(game.boundsInside, 50, 50, w - 100, h - 100);
}

export function isInInnerBounds(x: number, y: number) {
  return doesRectangleContain(game.boundsInside, x, y);
}

export function transitionGameState() {
  game.stateId = game.stateNextId;
}

export function setGameState(id: GameStateId) {
  game.stateNextId = id;
}

export function isGameState(id: GameStateId) {
  return game.stateId === id;
}

export function updateEnemySpawner() {
  if (tickTimer(game.spawnTimer, game.spawnTime)) {
    if (game.enemies.length < MAX_ENEMIES) {
      writeRandomPointInPerimeterBetweenRectangles(game.boundsOutside, game.bounds, game.spawnPosition);
      addMeleeEnemy(game.spawnPosition.x, game.spawnPosition.y);
      game.spawnTime = clamp(game.spawnTime - ENEMY_SPAWN_TIME_REDUCE, ENEMY_SPAWN_TIME_MIN, ENEMY_SPAWN_TIME_MAX);
    }
    resetTimer(game.spawnTimer);
  }
}

export function updateTime() {
  game.time += getDeltaTime();
}

export function getEntities(): Readonly<Array<number>> {
  return game.active;
}

export function addToEntities(id: number) {
  game.active.push(id);
}

export function sortEntities(sort: (a: number, b: number) => number) {
  game.active.sort(sort);
}

export function getDestroyedEntities(): Readonly<Array<number>> {
  return game.destroyed;
}

export function clearDestroyedEntities() {
  game.destroyed.length = 0;
}

export function destroyEntity(id: number) {
  const e = getEntity(id);
  e.isDestroyed = true;
  game.destroyed.push(id);
}

export function removeEntity(id: number) {
  const e = getEntity(id);
  remove(game.active, id);
  remove(game.allies, id);
  remove(game.enemies, id);
  remove(game.widgets, id);
  remove(game.levelUpWidgets, id);
  remove(game.bodies, e.body);
}

export function getAlliesGroup(): Readonly<Array<number>> {
  return game.allies;
}

export function addToAlliesGroup(id: number) {
  game.allies.push(id);
}

export function getEnemiesGroup(): Readonly<Array<number>> {
  return game.enemies;
}

export function addToEnemiesGroup(id: number) {
  game.enemies.push(id);
}

export function getWidgets(): Readonly<Array<number>> {
  return game.widgets;
}

export function addToWidgets(id: number) {
  game.widgets.push(id);
}

export function getBodies(): Readonly<Array<Rectangle>> {
  return game.bodies;
}

export function addBody(body: Rectangle) {
  game.bodies.push(body);
}

export function setPlayer(id: number) {
  game.playerId = id;
}

export function getPlayer() {
  return getEntity(game.playerId);
}

export function isPlayerAlive() {
  const player = getPlayer();
  return player.isPlayer && player.stats.health;
}

export function addUpgradeToPool(id: UpgradeId, amount: number) {
  for (let i = 0; i < amount; i++) {
    game.upgrades.push(id);
  }
}

export function removeUpgradeFromPool(id: UpgradeId) {
  remove(game.upgrades, id);
}

export function chooseUpgrade() {
  game.upgradeChoices.length = 0;

  let amount = 2;
  if (roll(0.05)) {
    amount = 3;
  }

  for (let i = 0; i < amount; i++) {
    const id = pick(game.upgrades);

    if (id) {
      remove(game.upgrades, id);
      game.upgradeChoices.push(id);
    }
  }

  if (game.upgradeChoices.length) {
    const backdrop = addBackdropWidget();
    game.levelUpWidgets.push(backdrop.id);

    for (let i = 0; i < game.upgradeChoices.length; i++) {
      const id = game.upgradeChoices[i];
      const x = (getWidth() / (game.upgradeChoices.length + 1)) * (i + 1) - 50;
      const y = getHeight() / 2 - 50 + 10;
      const e = addUpgradeWidget(x, y, id);
      game.levelUpWidgets.push(e.id);
    }

    resetInput(InputCode.MOUSE_LEFT);
    setGameState(GameStateId.CHOOSE_UPGRADE);
  }
}

export function confirmUpgradeChoice(id: UpgradeId) {
  remove(game.upgradeChoices, id);
  game.upgrades.push(...game.upgradeChoices);

  const upgrade = getUpgrade(id);
  const player = getPlayer();
  addStats(player.stats, upgrade.stats);

  for (const id of game.levelUpWidgets) {
    destroyEntity(id);
  }

  game.levelUpWidgets.length = 0;

  setGameState(GameStateId.NORMAL);
}

export function defeat() {
  if (isGameState(GameStateId.NORMAL)) {
    addBackdropWidget();
    addDefeatWidget();
    setGameState(GameStateId.DEFEAT);
  }
}

// FIXME widgets

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
  const sec = Math.floor(game.time / 1000);
  const min = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const rem = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${min}:${rem}`;
}
