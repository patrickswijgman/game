import fs from "node:fs";

type Spritesheet = {
  meta: {
    image: string;
    size: {
      w: number;
      h: number;
    };
    slices: Array<{
      name: string;
      keys: Array<{
        frame: number;
        bounds: {
          x: number;
          y: number;
          w: number;
          h: number;
        };
        pivot?: {
          x: number;
          y: number;
        };
      }>;
    }>;
  };
};

const output: Array<string> = [];
const spritesheet = JSON.parse(fs.readFileSync("assets/textures/atlas.json", "utf-8")) as Spritesheet;

const x: Array<number> = [0];
const y: Array<number> = [0];
const w: Array<number> = [0];
const h: Array<number> = [0];
const pivotX: Array<number> = [0];
const pivotY: Array<number> = [0];

for (const slice of spritesheet.meta.slices) {
  const key = slice.keys[0];
  x.push(key.bounds.x);
  y.push(key.bounds.y);
  w.push(key.bounds.w);
  h.push(key.bounds.h);
  pivotX.push(key.pivot?.x ?? 0);
  pivotY.push(key.pivot?.y ?? 0);
}

output.push("export const enum Sprite {");
output.push(`  NONE,`);
for (const slice of spritesheet.meta.slices) {
  output.push(`  ${slice.name.toUpperCase()},`);
}
output.push("}");
output.push("");
output.push(`export const spriteX = new Int32Array([${x.join(", ")}])`);
output.push(`export const spriteY = new Int32Array([${y.join(", ")}])`);
output.push(`export const spriteW = new Int32Array([${w.join(", ")}])`);
output.push(`export const spriteH = new Int32Array([${h.join(", ")}])`);
output.push(`export const spritePivotX = new Int32Array([${pivotX.join(", ")}])`);
output.push(`export const spritePivotY = new Int32Array([${pivotY.join(", ")}])`);

fs.writeFileSync("src/data/sprites.ts", output.join("\n"));
