import { run } from "snuggy";
import { loadResources } from "@/lib/resources.ts";

async function setup() {
  await loadResources();
}

function update() {}

run(640, setup, update);
