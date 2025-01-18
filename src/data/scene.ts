import { Entity, newEntity } from "@/data/entity.js";
import { SceneId } from "@/enums/scene.js";
import { TileId } from "@/enums/tile.js";
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
  tiles: Grid<TileId>;
};

export function newScene(id: SceneId, maxEntityCount: number): Scene {
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
    tiles: grid(0, 0, () => TileId.NONE),
  };
}
