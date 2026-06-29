import fs from "node:fs";
import path from "node:path";

type Tileset = {
  columns: number;
  tilewidth: number;
  tileheight: number;
  margin: number;
  spacing: number;
};

type TilesetRef = {
  firstgid: number;
  source: string;
};

type Template = {
  object: {
    id: number;
    name: string;
  };
};

type Obj = {
  template: string;
  x: number;
  y: number;
};

type TileLayer = {
  type: "tilelayer";
  data: Array<number>;
};

type ObjectLayer = {
  type: "objectgroup";
  objects: Array<Obj>;
};

type Tilemap = {
  width: number;
  height: number;
  tilewidth: number;
  tileheight: number;
  layers: Array<TileLayer | ObjectLayer>;
  tilesets: Array<TilesetRef>;
};

const output: Array<string> = [];
const tilemap = JSON.parse(fs.readFileSync("assets/tilemaps/map1.json", "utf-8")) as Tilemap;

// Load tilesets

const tilesetFiles = fs.readdirSync("assets/tilesets");
const tilesetRegistry: Record<string, Tileset> = {};

for (const file of tilesetFiles) {
  const key = path.basename(file);
  const tileset = JSON.parse(fs.readFileSync(`assets/tilesets/${file}`, "utf-8"));
  tilesetRegistry[key] = tileset;
}

// Load templates

const templateFiles = fs.readdirSync("assets/templates");
const templateRegistry: Record<string, Template> = {};
const templateObjects: Array<string> = [];

for (const file of templateFiles) {
  const key = path.basename(file);
  const template = JSON.parse(fs.readFileSync(`assets/templates/${file}`, "utf-8"));
  templateRegistry[key] = template;
  templateObjects.push(template.object.name);
}

// Make floor data

const tileId: Array<number> = [];
const tileSrcX: Array<number> = [];
const tileSrcY: Array<number> = [];
const tileDstX: Array<number> = [];
const tileDstY: Array<number> = [];

for (const tilesetRef of tilemap.tilesets) {
  const key = path.basename(tilesetRef.source);
  const tileset = tilesetRegistry[key];

  for (const layer of tilemap.layers) {
    if (layer.type === "tilelayer") {
      for (let i = 0; i < layer.data.length; i++) {
        const gid = layer.data[i];
        if (gid === 0) {
          continue;
        }

        const id = gid - tilesetRef.firstgid;

        tileId.push(id);
        tileSrcX.push(tileset.margin + (id % tileset.columns) * (tileset.tilewidth + tileset.spacing));
        tileSrcY.push(tileset.margin + Math.floor(id / tileset.columns) * (tileset.tileheight + tileset.spacing));
        tileDstX.push((i % tilemap.width) * tilemap.tilewidth);
        tileDstY.push(Math.floor(i / tilemap.width) * tilemap.tileheight);
      }
    }
  }
}

// Make objects data

const objType: Array<number> = [];
const objX: Array<number> = [];
const objY: Array<number> = [];

for (const layer of tilemap.layers) {
  if (layer.type === "objectgroup") {
    for (const object of layer.objects) {
      if (object.template) {
        const key = path.basename(object.template);
        const template = templateRegistry[key];
        const type = templateObjects.indexOf(template.object.name);
        objType.push(type);
        objX.push(object.x);
        objY.push(object.y);
      }
    }
  }
}

// Make output file

output.push(`export const floorWidth = ${tilemap.width * tilemap.tilewidth}`);
output.push(`export const floorHeight = ${tilemap.height * tilemap.tileheight}`);
output.push(`export const tileWidth = ${tilemap.tilewidth}`);
output.push(`export const tileHeight = ${tilemap.tileheight}`);
output.push(`export const tileId = new Uint16Array([${tileId.join(", ")}])`);
output.push(`export const tileSrcX = new Uint16Array([${tileSrcX.join(", ")}])`);
output.push(`export const tileSrcY = new Uint16Array([${tileSrcY.join(", ")}])`);
output.push(`export const tileDstX = new Uint16Array([${tileDstX.join(", ")}])`);
output.push(`export const tileDstY = new Uint16Array([${tileDstY.join(", ")}])`);
output.push("");
output.push("export const enum TilemapObject {");
for (const template of templateObjects) {
  output.push(`  ${template.toUpperCase()},`);
}
output.push("}");
output.push("");
output.push(`export const objectType = new Uint8Array([${objType.join(", ")}])`);
output.push(`export const objectX = new Float64Array([${objX.join(", ")}])`);
output.push(`export const objectY = new Float64Array([${objY.join(", ")}])`);

fs.writeFileSync("src/data/world.ts", output.join("\n"));
