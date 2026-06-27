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

type Layer = {
  objects?: Array<LayerObject>;
};

type Tilemap = {
  layers: Array<Layer>;
};

const output: Array<string> = [];
const tilemap = JSON.parse(fs.readFileSync("assets/tilemaps/map1.json", "utf-8")) as Tilemap;

const templateFiles = fs.readdirSync("assets/templates");
const templateRegistry: Record<string, Template> = {};
const templates: Array<string> = [];

for (const file of templateFiles) {
  const key = path.basename(file);
  const template = JSON.parse(fs.readFileSync(`assets/templates/${file}`, "utf-8"));
  templateRegistry[key] = template;
  templates.push(template.object.name);
}

const types: Array<number> = [];
const x: Array<number> = [];
const y: Array<number> = [];

for (const layer of tilemap.layers) {
  if (!layer.objects) {
    continue;
  }

  for (const object of layer.objects) {
    if (object.template) {
      const key = path.basename(object.template);
      const template = templateRegistry[key];
      const type = templates.indexOf(template.object.name);
      types.push(type);
      x.push(object.x);
      y.push(object.y);
    }
  }
}

output.push("export const enum TilemapObject {");
for (const template of templates) {
  output.push(`  ${template.toUpperCase()},`);
}
output.push("}");
output.push("");
output.push(`export const objectType = new Int32Array([${types.join(", ")}])`);
output.push(`export const objectX = new Float64Array([${x.join(", ")}])`);
output.push(`export const objectY = new Float64Array([${y.join(", ")}])`);

fs.writeFileSync("src/data/objects.ts", output.join("\n"));
