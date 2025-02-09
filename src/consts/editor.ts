import { Type } from "@/consts/entity.js";
import { vec, Vector } from "ridder";

type Editor = {
  position: Vector;
  velocity: Vector;
  mouseGridPosition: Vector;
  selectedEntityIdx: number;
};

function newEditor(): Editor {
  return {
    position: vec(),
    velocity: vec(),
    mouseGridPosition: vec(),
    selectedEntityIdx: 0,
  };
}

export const editor = newEditor();

type EditorEntity = {
  name: string;
  type: Type;
  offset: Vector;
  limit: number;
};

export const entities: Array<EditorEntity> = [
  {
    name: "Player",
    type: Type.PLAYER,
    offset: vec(0.5, 0.5),
    limit: 1,
  },
  {
    name: "Pine tree",
    offset: vec(0.5, 0.8),
    type: Type.TREE,
    limit: Infinity,
  },
];
