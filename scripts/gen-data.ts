import fs from "node:fs";

type Block = {
  header: string;
  fields: Array<string>;
};

function capitalize(str: string) {
  return `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`;
}

function getTypedArray(type: string) {
  switch (type) {
    case "int8":
      return "Int8Array";
    case "int16":
      return "Int16Array";
    case "int32":
      return "Int32Array";
    case "uint8":
      return "Uint8Array";
    case "uint16":
      return "Uint16Array";
    case "uint32":
      return "Uint32Array";
    case "float32":
      return "Float32Array";
    case "float64":
      return "Float64Array";
  }
}

const input = fs.readFileSync("assets/data.md", "utf-8");
const output: Array<string> = [];
const blocks: Array<Block> = [];

let block: Block = {
  header: "",
  fields: [],
};

for (const line of input.split("\n")) {
  const comment = line.match(/^\s*<!--.*-->\s*$/);
  const header = line.match(/^#\s+(.+)/);
  const field = line.match(/^-\s+(.+)/);

  if (comment) {
    continue;
  }

  if (header) {
    block = {
      header: header[1],
      fields: [],
    };
    blocks.push(block);
    continue;
  }

  if (field) {
    block.fields.push(field[1]);
  }
}

for (const { header, fields } of blocks) {
  const [name, length] = header.split(" ");

  if (length) {
    addStructureOfArrays(name, length, fields);
  } else {
    addGroup(name, fields);
  }
}

function addStructureOfArrays(name: string, length: string, fields: Array<string>) {
  output.push("");
  output.push(`export const MAX_${name.toUpperCase()}_COUNT = ${length}`);

  output.push("");
  for (const field of fields) {
    const [fieldName, fieldType] = field.split(" ");
    output.push(`export const ${fieldName} = new ${getTypedArray(fieldType)}(${length})`);
  }

  output.push("");
  output.push(`export function zero${capitalize(name)}(i: number) {`);
  for (const field of fields) {
    const [fieldName] = field.split(" ");
    output.push(`  ${fieldName}[i] = 0`);
  }
  output.push("}");

  output.push("");
  output.push(`export function zero${capitalize(name)}Data() {`);
  for (const field of fields) {
    const [fieldName] = field.split(" ");
    output.push(`  ${fieldName}.fill(0)`);
  }
  output.push("}");
}

function addGroup(name: string, fields: Array<string>) {
  output.push("");

  for (const field of fields) {
    const [fieldName, fieldType, fieldLength] = field.split(" ");
    if (fieldType) {
      output.push(`export const ${fieldName} = new ${getTypedArray(fieldType)}(${fieldLength})`);
      output.push(`export let ${fieldName}Count = 0`);
    } else {
      output.push(`export let ${fieldName} = 0`);
    }
  }

  for (const field of fields) {
    const [fieldName, fieldType] = field.split(" ");

    output.push("");
    if (fieldType) {
      output.push(`export function push${capitalize(fieldName)}(value: number) {`);
      output.push(`  ${fieldName}[${fieldName}Count++] = value`);
      output.push("}");
      output.push("");
      output.push(`export function pop${capitalize(fieldName)}() {`);
      output.push(`  return ${fieldName}[--${fieldName}Count]`);
      output.push("}");
    } else {
      output.push(`export function set${capitalize(fieldName)}(value: number) {`);
      output.push(`  ${fieldName} = value`);
      output.push("}");
    }

    output.push("");
    output.push(`export function zero${capitalize(fieldName)}() {`);
    if (fieldType) {
      output.push(`  ${fieldName}.fill(0)`);
      output.push(`  ${fieldName}Count = 0`);
    } else {
      output.push(`  ${fieldName} = 0`);
    }
    output.push("}");
  }

  output.push("");
  output.push(`export function zero${capitalize(name)}Data() {`);
  for (const field of fields) {
    const [fieldName, fieldType] = field.split(" ");
    if (fieldType) {
      output.push(`  ${fieldName}.fill(0)`);
      output.push(`  ${fieldName}Count = 0`);
    } else {
      output.push(`  ${fieldName} = 0`);
    }
  }
  output.push("}");
}

fs.writeFileSync("src/data/data.ts", output.join("\n"));
