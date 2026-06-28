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

type Layer = {
  data?: Array<number>;
};

type Tilemap = {
  width: number;
  height: number;
  tilewidth: number;
  tileheight: number;
  layers: Array<Layer>;
  tilesets: Array<TilesetRef>;
};

const output: Array<string> = [];
const tilemap = JSON.parse(fs.readFileSync("assets/tilemaps/map1.json", "utf-8")) as Tilemap;

const tilesetFiles = fs.readdirSync("assets/tilesets");
const tilesetRegistry: Record<string, Tileset> = {};

for (const file of tilesetFiles) {
  const key = path.basename(file);
  const tileset = JSON.parse(fs.readFileSync(`assets/tilesets/${file}`, "utf-8"));
  tilesetRegistry[key] = tileset;
}

const srcX: Array<number> = [];
const srcY: Array<number> = [];
const dstX: Array<number> = [];
const dstY: Array<number> = [];

for (const tilesetRef of tilemap.tilesets) {
  const key = path.basename(tilesetRef.source);
  const tileset = tilesetRegistry[key];

  for (const layer of tilemap.layers) {
    if (!layer.data) {
      continue;
    }

    for (let i = 0; i < layer.data.length; i++) {
      const gid = layer.data[i];
      if (gid === 0) {
        continue;
      }

      const frame = gid - tilesetRef.firstgid;

      srcX.push(tileset.margin + (frame % tileset.columns) * (tileset.tilewidth + tileset.spacing));
      srcY.push(tileset.margin + Math.floor(frame / tileset.columns) * (tileset.tileheight + tileset.spacing));
      dstX.push((i % tilemap.width) * tilemap.tilewidth);
      dstY.push(Math.floor(i / tilemap.width) * tilemap.tileheight);
    }
  }
}

output.push(`export const floorWidth = ${tilemap.width * tilemap.tilewidth}`);
output.push(`export const floorHeight = ${tilemap.height * tilemap.tileheight}`);
output.push(`export const tileWidth = ${tilemap.tilewidth}`);
output.push(`export const tileHeight = ${tilemap.tileheight}`);
output.push(`export const tileSrcX = new Uint16Array([${srcX.join(", ")}])`);
output.push(`export const tileSrcY = new Uint16Array([${srcY.join(", ")}])`);
output.push(`export const tileDstX = new Uint16Array([${dstX.join(", ")}])`);
output.push(`export const tileDstY = new Uint16Array([${dstY.join(", ")}])`);

fs.writeFileSync("src/data/floor.ts", output.join("\n"));
