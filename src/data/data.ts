
export const free = new Uint16Array(2048)
export let freeCount = 0
export const add = new Uint16Array(2048)
export let addCount = 0
export const remove = new Uint16Array(2048)
export let removeCount = 0
export const active = new Uint16Array(2048)
export let activeCount = 0
export const activeIndex = new Uint16Array(2048)
export let activeIndexCount = 0
export let playerId = 0

export function pushFree(value: number) {
  free[freeCount++] = value
}

export function popFree() {
  return free[--freeCount]
}

export function zeroFree() {
  free.fill(0)
  freeCount = 0
}

export function pushAdd(value: number) {
  add[addCount++] = value
}

export function popAdd() {
  return add[--addCount]
}

export function zeroAdd() {
  add.fill(0)
  addCount = 0
}

export function pushRemove(value: number) {
  remove[removeCount++] = value
}

export function popRemove() {
  return remove[--removeCount]
}

export function zeroRemove() {
  remove.fill(0)
  removeCount = 0
}

export function pushActive(value: number) {
  active[activeCount++] = value
}

export function popActive() {
  return active[--activeCount]
}

export function zeroActive() {
  active.fill(0)
  activeCount = 0
}

export function pushActiveIndex(value: number) {
  activeIndex[activeIndexCount++] = value
}

export function popActiveIndex() {
  return activeIndex[--activeIndexCount]
}

export function zeroActiveIndex() {
  activeIndex.fill(0)
  activeIndexCount = 0
}

export function setPlayerId(value: number) {
  playerId = value
}

export function zeroPlayerId() {
  playerId = 0
}

export function zeroGameData() {
  free.fill(0)
  freeCount = 0
  add.fill(0)
  addCount = 0
  remove.fill(0)
  removeCount = 0
  active.fill(0)
  activeCount = 0
  activeIndex.fill(0)
  activeIndexCount = 0
  playerId = 0
}

export const MAX_ENTITY_COUNT = 2048

export const posX = new Float32Array(2048)
export const posY = new Float32Array(2048)
export const velX = new Float32Array(2048)
export const velY = new Float32Array(2048)
export const bodyX = new Int16Array(2048)
export const bodyY = new Int16Array(2048)
export const bodyW = new Int16Array(2048)
export const bodyH = new Int16Array(2048)
export const spriteId = new Uint8Array(2048)
export const shadowId = new Uint8Array(2048)
export const hairId = new Uint8Array(2048)
export const shirtId = new Uint8Array(2048)
export const pantsId = new Uint8Array(2048)
export const weaponId = new Uint8Array(2048)
export const isFlipped = new Uint8Array(2048)
export const animId = new Uint8Array(2048)
export const animX = new Float32Array(2048)
export const animY = new Float32Array(2048)
export const animScaleX = new Float32Array(2048)
export const animScaleY = new Float32Array(2048)
export const animAngle = new Float32Array(2048)
export const animTime = new Float32Array(2048)
export const hitboxX = new Int16Array(2048)
export const hitboxY = new Int16Array(2048)
export const hitboxW = new Int16Array(2048)
export const hitboxH = new Int16Array(2048)
export const isPlayer = new Uint8Array(2048)
export const isActive = new Uint8Array(2048)
export const isStaggered = new Uint8Array(2048)

export function zeroEntity(i: number) {
  posX[i] = 0
  posY[i] = 0
  velX[i] = 0
  velY[i] = 0
  bodyX[i] = 0
  bodyY[i] = 0
  bodyW[i] = 0
  bodyH[i] = 0
  spriteId[i] = 0
  shadowId[i] = 0
  hairId[i] = 0
  shirtId[i] = 0
  pantsId[i] = 0
  weaponId[i] = 0
  isFlipped[i] = 0
  animId[i] = 0
  animX[i] = 0
  animY[i] = 0
  animScaleX[i] = 0
  animScaleY[i] = 0
  animAngle[i] = 0
  animTime[i] = 0
  hitboxX[i] = 0
  hitboxY[i] = 0
  hitboxW[i] = 0
  hitboxH[i] = 0
  isPlayer[i] = 0
  isActive[i] = 0
  isStaggered[i] = 0
}

export function zeroEntityData() {
  posX.fill(0)
  posY.fill(0)
  velX.fill(0)
  velY.fill(0)
  bodyX.fill(0)
  bodyY.fill(0)
  bodyW.fill(0)
  bodyH.fill(0)
  spriteId.fill(0)
  shadowId.fill(0)
  hairId.fill(0)
  shirtId.fill(0)
  pantsId.fill(0)
  weaponId.fill(0)
  isFlipped.fill(0)
  animId.fill(0)
  animX.fill(0)
  animY.fill(0)
  animScaleX.fill(0)
  animScaleY.fill(0)
  animAngle.fill(0)
  animTime.fill(0)
  hitboxX.fill(0)
  hitboxY.fill(0)
  hitboxW.fill(0)
  hitboxH.fill(0)
  isPlayer.fill(0)
  isActive.fill(0)
  isStaggered.fill(0)
}