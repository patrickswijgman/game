import { SceneId } from "@/consts/scene.js";
import { Entity, newEntity } from "@/data/entity.js";
import { Camera, camera, grid, Grid, rect, Rectangle, table, Table, timer, Timer, vec, Vector } from "ridder";

export type Scene = {
  id: SceneId;

  // Memory management
  entityId: number;

  // Tables
  entities: Table<Entity>;

  // Entity support lists
  all: Array<number>;
  destroyed: Array<number>;

  // Entity groups
  allies: Array<number>;
  enemies: Array<number>;

  // Active entities
  active: Array<number>;
  activeTimer: Timer;

  // World
  camera: Camera;
  bounds: Rectangle;
  grid: Grid<number>;
  playerId: number;
  isPaused: boolean;

  // Inventory
  selected: Vector;
};

export function newScene(id: SceneId, maxEntityCount: number, gridWidth: number, gridHeight: number): Scene {
  return {
    id,

    // Memory management
    entityId: 0,

    // Tables
    entities: table(maxEntityCount, newEntity),

    // Entity support lists
    all: [],
    destroyed: [],

    // Entity groups
    allies: [],
    enemies: [],

    // Active entities
    active: [],
    activeTimer: timer(),

    // World
    camera: camera(),
    bounds: rect(),
    grid: grid(gridWidth, gridHeight, () => 0),
    playerId: 0,
    isPaused: false,

    // Inventory
    selected: vec(),
  };
}
