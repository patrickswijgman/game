import { SceneId } from "@/consts/scene.js";
import { Entity, newEntity } from "@/data/entity.js";
import { Camera, camera, grid, Grid, rect, Rectangle, table, Table } from "ridder";

export type Scene = {
  id: SceneId;

  // Tables
  entities: Table<Entity>;

  // Table support lists
  update: Array<number>;
  render: Array<number>;
  destroyed: Array<number>;

  // World
  camera: Camera;
  bounds: Rectangle;
  grid: Grid<number>;
  playerId: number;
};

export function newScene(id: SceneId, maxEntityCount: number, gridWidth: number, gridHeight: number): Scene {
  return {
    id,

    // Tables
    entities: table(maxEntityCount, newEntity),

    // Table support lists
    update: [],
    render: [],
    destroyed: [],

    // World
    camera: camera(),
    bounds: rect(),
    grid: grid(gridWidth, gridHeight, () => 0),
    playerId: 0,
  };
}
