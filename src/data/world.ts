import { ENEMY_SPAWN_TIME_MAX } from "@/consts/world.js";
import { camera, Camera, rect, Rectangle, timer, Timer } from "ridder";

export type World = {
  camera: Camera;
  bounds: Rectangle;
  bodies: Array<Rectangle>;
  spawnTime: number;
  spawnTimer: Timer;
  playerId: number;
};

export const world: World = {
  camera: camera(),
  bounds: rect(),
  bodies: [],
  spawnTime: ENEMY_SPAWN_TIME_MAX,
  spawnTimer: timer(),
  playerId: 0,
};
