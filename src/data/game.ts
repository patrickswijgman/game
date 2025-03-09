import { MAX_ENTITIES } from "@/consts/entity.js";
import { UpgradeId } from "@/consts/upgrade.js";
import { ENEMY_SPAWN_TIME_MAX } from "@/consts/world.js";
import { Entity, newEntity } from "@/data/entity.js";
import { camera, Camera, rect, Rectangle, table, Table, timer, Timer } from "ridder";

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
  bodies: Array<Rectangle>;
  spawnTime: number;
  spawnTimer: Timer;
  upgrades: Array<UpgradeId>;
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
  bodies: [],
  spawnTime: ENEMY_SPAWN_TIME_MAX,
  spawnTimer: timer(),
  upgrades: [],
  playerId: 0,
};
