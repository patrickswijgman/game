import fs from "node:fs";
import path from "node:path";

type Template = {
  object: {
    id: number;
    name: string;
  };
};

type LayerObject = {
  template?: string;
  x: number;
  y: number;
};

type Chunk = {
  x: number;
  y: number;
};

type Layer = {
  objects?: Array<LayerObject>;
  chunks?: Array<Chunk>;
};

type Tilemap = {
  tilewidth: number;
  tileheight: number;
  layers: Array<Layer>;
};

const output: Array<string> = [];
const tilemap = JSON.parse(fs.readFileSync("assets/tilemaps/tilemap.json", "utf-8")) as Tilemap;

const templateFiles = fs.readdirSync("assets/templates");
const templateRegistry: Record<string, Template> = {};
const templateObjects: Array<string> = [];

for (const file of templateFiles) {
  const key = path.basename(file);
  const template = JSON.parse(fs.readFileSync(`assets/templates/${file}`, "utf-8"));
  templateRegistry[key] = template;
  templateObjects.push(template.object.name);
}

// Floor tiles are shifted so the most-negative chunk sits at (0,0); objects must
// use the same offset to stay aligned with the floor (see gen-floor.ts).
let minTileX = Infinity;
let minTileY = Infinity;

for (const layer of tilemap.layers) {
  for (const chunk of layer.chunks ?? []) {
    minTileX = Math.min(minTileX, chunk.x);
    minTileY = Math.min(minTileY, chunk.y);
  }
}

const offsetX = minTileX * tilemap.tilewidth;
const offsetY = minTileY * tilemap.tileheight;

const types: Array<number> = [];
const x: Array<number> = [];
const y: Array<number> = [];

for (const layer of tilemap.layers) {
  for (const object of layer.objects ?? []) {
    if (object.template) {
      const key = path.basename(object.template);
      const template = templateRegistry[key];
      const type = templateObjects.indexOf(template.object.name);
      types.push(type);
      x.push(object.x - offsetX);
      y.push(object.y - offsetY);
    }
  }
}

output.push("export const enum TilemapObject {");
for (const template of templateObjects) {
  output.push(`  ${template.toUpperCase()},`);
}
output.push("}");
output.push("");
output.push(`export const objectType = new Uint8Array([${types.join(", ")}])`);
output.push(`export const objectX = new Float64Array([${x.join(", ")}])`);
output.push(`export const objectY = new Float64Array([${y.join(", ")}])`);

fs.writeFileSync("src/data/objects.ts", output.join("\n"));
