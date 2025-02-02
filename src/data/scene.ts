import { SceneId } from "@/consts/scene.js";
import { Entity, newEntity } from "@/data/entity.js";
import { Camera, camera, grid, Grid, rect, Rectangle, table, Table, timer, Timer, vec, Vector } from "ridder";

export type Scene = {
  id: SceneId;

  // Tables
  entities: Table<Entity>;

  // Table support lists
  all: Array<number>;
  destroyed: Array<number>;

  // Active entities
  active: Array<number>;
  activeTimer: Timer;

  // World
  camera: Camera;
  bounds: Rectangle;
  grid: Grid<number>;
  playerId: number;

  // Inventory
  selected: Vector;
};

export function newScene(id: SceneId, maxEntityCount: number, gridWidth: number, gridHeight: number): Scene {
  return {
    id,

    // Tables
    entities: table(maxEntityCount, newEntity),

    // Table support lists
    all: [],
    destroyed: [],

    // Active entities
    active: [],
    activeTimer: timer(),

    // World
    camera: camera(),
    bounds: rect(),
    grid: grid(gridWidth, gridHeight, () => 0),
    playerId: 0,

    // Inventory
    selected: vec(),
  };
}
