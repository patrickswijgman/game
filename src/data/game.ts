import { MAX_ENTITIES } from "@/consts/entity.js";
import { UpgradeId } from "@/consts/upgrade.js";
import { Entity, newEntity } from "@/data/entity.js";
import { camera, Camera, rect, Rectangle, table, Table, timer, Timer, vec, Vector } from "ridder";

export type Game = {
  // Entities
  nextId: number;
  entities: Table<Entity>;
  update: Array<number>;
  render: Array<number>;
  allies: Array<number>;
  enemies: Array<number>;
  destroyed: Array<number>;

  // World
  camera: Camera;
  bounds: Rectangle;
  boundsOutside: Rectangle;
  boundsInside: Rectangle;
  bodies: Array<Rectangle>;
  spawnTime: number;
  spawnTimer: Timer;
  spawnPosition: Vector;
  upgrades: Array<UpgradeId>;
  upgradeChoices: Array<UpgradeId>;
  playerId: number;
};

export const game: Game = {
  // Entities
  nextId: 0,
  entities: table(MAX_ENTITIES, newEntity),
  update: [],
  render: [],
  allies: [],
  enemies: [],
  destroyed: [],

  // World
  camera: camera(),
  bounds: rect(),
  boundsOutside: rect(),
  boundsInside: rect(),
  bodies: [],
  spawnTime: 0,
  spawnTimer: timer(),
  spawnPosition: vec(),
  upgrades: [],
  upgradeChoices: [],
  playerId: 0,
};
