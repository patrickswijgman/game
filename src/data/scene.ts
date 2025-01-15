import { TextureId } from "@/assets.js";
import { Entity, newEntity } from "@/data/entity.js";
import { Camera, camera, rect, Rectangle, table, Table } from "ridder";

export type Scene = {
  // Memory allocation
  id: number;
  isAssigned: boolean;

  // Tables
  entities: Table<Entity>;

  // Table support lists
  update: Array<number>;
  render: Array<number>;
  destroyed: Array<number>;

  // World
  camera: Camera;
  bounds: Rectangle;
  backgroundId: TextureId;
};

export function newScene(): Scene {
  return {
    // Memory allocation
    id: 0,
    isAssigned: false,

    // Tables
    entities: table(1024, newEntity),

    // Table support lists
    update: [],
    render: [],
    destroyed: [],

    // World
    camera: camera(),
    bounds: rect(),
    backgroundId: TextureId.NONE,
  };
}
