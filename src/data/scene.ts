import { Entity, newEntity } from "@/data/entity.js";
import { TileId } from "@/enums/tile.js";
import { Camera, camera, grid, Grid, rect, Rectangle, table, Table } from "ridder";

export type Scene = {
  // Memory allocation
  isAllocated: boolean;
  id: number;

  // Tables
  entities: Table<Entity>;

  // Table support lists
  update: Array<number>;
  render: Array<number>;
  destroyed: Array<number>;

  // World
  camera: Camera;
  bounds: Rectangle;
  tiles: Grid<TileId>;
};

export function newScene(): Scene {
  return {
    // Memory allocation
    isAllocated: false,
    id: 0,

    // Tables
    entities: table(1024, newEntity),

    // Table support lists
    update: [],
    render: [],
    destroyed: [],

    // World
    camera: camera(),
    bounds: rect(),
    tiles: grid(0, 0, () => TileId.NONE),
  };
}
