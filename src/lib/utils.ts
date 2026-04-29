import { hitboxH, hitboxW, hitboxX, hitboxY } from "@/data.ts";

export function isIntersection(a: number, b: number) {
  return hitboxX[a] < hitboxX[b] + hitboxW[b] && hitboxX[a] + hitboxW[a] > hitboxX[b] && hitboxY[a] < hitboxY[b] + hitboxH[b] && hitboxY[a] + hitboxH[a] > hitboxY[b];
}
