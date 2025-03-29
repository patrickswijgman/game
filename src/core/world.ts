import { COLOR_GRASS, ENEMY_SPAWN_TIME_MAX, ENEMY_SPAWN_TIME_MIN, ENEMY_SPAWN_TIME_REDUCE, MAX_ENEMIES, UPGRADES_CHOICE_AMOUNT } from "@/consts.js";
import { destroyEntity, getEntity } from "@/core/entities.js";
import { addStats } from "@/core/stats.js";
import { getUpgrade, UpgradeId } from "@/core/upgrades.js";
import { addMeleeEnemy } from "@/entities/enemy-melee.js";
import { addPlayer } from "@/entities/player.js";
import { addTree } from "@/entities/tree.js";
import { addUpgrade } from "@/entities/upgrade.js";
import { clamp, doesRectangleContain, getHeight, getWidth, InputCode, pick, random, rect, Rectangle, remove, resetInput, resetTimer, setBackgroundColor, setCameraBounds, setCameraPosition, setCameraSmoothing, setRectangle, tickTimer, timer, Timer, vec, Vector, writeRandomPointInPerimeterBetweenRectangles } from "ridder";

export const enum WorldStateId {
  NONE,
  NORMAL,
  CHOOSE_UPGRADE,
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

  // Groups
  allies: Array<number>;
  enemies: Array<number>;
  temp: Array<number>;

  // Enemy spawning
  spawnTime: number;
  spawnTimer: Timer;
  spawnPosition: Vector;

  // Level up
  upgrades: Array<UpgradeId>;
  upgradeChoices: Array<UpgradeId>;

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

  // Groups
  allies: [],
  enemies: [],
  temp: [],

  // Enemy spawning
  spawnTime: 0,
  spawnTimer: timer(),
  spawnPosition: vec(),

  // Level up
  upgrades: [],
  upgradeChoices: [],

  // Player
  playerId: 0,
};

export function setupWorld() {
  const w = 400;
  const h = 300;

  world.spawnTime = ENEMY_SPAWN_TIME_MAX;

  setBackgroundColor(COLOR_GRASS);

  // Boundary
  setRectangle(world.bounds, 0, 0, w, h);
  setRectangle(world.boundsOutside, -50, -50, w + 100, h + 100);
  setRectangle(world.boundsInside, 50, 50, w - 100, h - 100);
  addBody(rect(0, 0, w, 40));
  addBody(rect(0, 0, 40, h));
  addBody(rect(w - 40, 0, 40, h));
  addBody(rect(0, h - 40, w, 40));

  // Camera
  setCameraSmoothing(0.1);
  setCameraBounds(0, 0, w, h);
  setCameraPosition(w / 2, h / 2);

  // Upgrades
  addUpgradeToPool(UpgradeId.HEALTH, 2);
  addUpgradeToPool(UpgradeId.DAMAGE, 4);
  addUpgradeToPool(UpgradeId.RANGE, 2);
  addUpgradeToPool(UpgradeId.CRIT_CHANCE, 3);
  addUpgradeToPool(UpgradeId.PICKUP_RANGE, 2);
  addUpgradeToPool(UpgradeId.MOVEMENT_SPEED, 2);

  // Entities
  addPlayer(w / 2, h / 2);

  for (let i = -4; i <= w; i += 12) {
    for (let j = -4; j <= h; j += 12) {
      const x = i + random(4, 8);
      const y = j + random(4, 8);

      if (doesRectangleContain(world.boundsInside, x, y)) {
        continue;
      }

      addTree(x, y);
    }
  }

  world.stateId = WorldStateId.NORMAL;
}

export function getWorldState() {
  return world.stateId;
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

export function removeFromWorld(id: number) {
  const e = getEntity(id);
  remove(world.allies, id);
  remove(world.enemies, id);
  remove(world.temp, id);
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

export function isPlayerAlive() {
  const player = getPlayer();
  return player.isPlayer && !!player.stats.health;
}

export function spawnEnemies() {
  if (tickTimer(world.spawnTimer, world.spawnTime)) {
    if (isPlayerAlive() && world.enemies.length < MAX_ENEMIES) {
      writeRandomPointInPerimeterBetweenRectangles(world.boundsOutside, world.bounds, world.spawnPosition);
      addMeleeEnemy(world.spawnPosition.x, world.spawnPosition.y);
      world.spawnTime = clamp(world.spawnTime - ENEMY_SPAWN_TIME_REDUCE, ENEMY_SPAWN_TIME_MIN, ENEMY_SPAWN_TIME_MAX);
    }
    resetTimer(world.spawnTimer);
  }
}

export function chooseUpgrade() {
  world.upgradeChoices.length = 0;

  for (let i = 0; i < UPGRADES_CHOICE_AMOUNT; i++) {
    const id = pick(world.upgrades);

    if (id) {
      remove(world.upgrades, id);
      world.upgradeChoices.push(id);
    }
  }

  for (let i = 0; i < world.upgradeChoices.length; i++) {
    const id = world.upgradeChoices[i];
    const x = (getWidth() / (UPGRADES_CHOICE_AMOUNT + 1)) * (i + 1) - 50;
    const y = getHeight() / 2 - 50;
    const e = addUpgrade(x, y, id);
    world.temp.push(e.id);
  }

  if (world.upgradeChoices.length) {
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

  for (const id of world.temp) {
    destroyEntity(id);
  }

  world.stateId = WorldStateId.NORMAL;
}

export function addUpgradeToPool(id: UpgradeId, amount: number) {
  for (let i = 0; i < amount; i++) {
    world.upgrades.push(id);
  }
}

export function removeUpgradeFromPool(id: UpgradeId) {
  remove(world.upgrades, id);
}
