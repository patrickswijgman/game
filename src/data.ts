/*
 * Generated with game-data-gen on 4/27/2026, 1:05:19 PM. DO NOT MODIFY THIS FILE!
 */

/*
 * --------------------------------------------------
 * game (Group)
 * --------------------------------------------------
 */

export let active = new Array<number>()
export let activeIndex = new Array<number>()
export let toAdd = new Array<number>()
export let toRemove = new Array<number>()
export let player = 0
export let state = 0
export let stateNext = 0

/** Set the value of the active field within the game group. */
export function setActive(value: Array<number>) {
  active = value
}

/** Set the value of the activeIndex field within the game group. */
export function setActiveIndex(value: Array<number>) {
  activeIndex = value
}

/** Set the value of the toAdd field within the game group. */
export function setToAdd(value: Array<number>) {
  toAdd = value
}

/** Set the value of the toRemove field within the game group. */
export function setToRemove(value: Array<number>) {
  toRemove = value
}

/** Set the value of the player field within the game group. */
export function setPlayer(value: number) {
  player = value
}

/** Set the value of the state field within the game group. */
export function setState(value: number) {
  state = value
}

/** Set the value of the stateNext field within the game group. */
export function setStateNext(value: number) {
  stateNext = value
}

/** Zero the active field within the game group. */
export function zeroActive() {
  active.length = 0
}

/** Zero the activeIndex field within the game group. */
export function zeroActiveIndex() {
  activeIndex.length = 0
}

/** Zero the toAdd field within the game group. */
export function zeroToAdd() {
  toAdd.length = 0
}

/** Zero the toRemove field within the game group. */
export function zeroToRemove() {
  toRemove.length = 0
}

/** Zero the player field within the game group. */
export function zeroPlayer() {
  player = 0
}

/** Zero the state field within the game group. */
export function zeroState() {
  state = 0
}

/** Zero the stateNext field within the game group. */
export function zeroStateNext() {
  stateNext = 0
}

/** Zero all fields within the game group. */
export function zeroGameData() {
  active.length = 0
  activeIndex.length = 0
  toAdd.length = 0
  toRemove.length = 0
  player = 0
  state = 0
  stateNext = 0
}

/*
 * --------------------------------------------------
 * entity (Structure Of Arrays)
 * --------------------------------------------------
 */

export const MAX_ENTITY_COUNT = 10_000

export const type = new Array<number>(10_000).fill(0)
export const posX = new Array<number>(10_000).fill(0)
export const posY = new Array<number>(10_000).fill(0)
export const velX = new Array<number>(10_000).fill(0)
export const velY = new Array<number>(10_000).fill(0)
export const hitboxX = new Array<number>(10_000).fill(0)
export const hitboxY = new Array<number>(10_000).fill(0)
export const hitboxW = new Array<number>(10_000).fill(0)
export const hitboxH = new Array<number>(10_000).fill(0)
export const hitboxOffsetX = new Array<number>(10_000).fill(0)
export const hitboxOffsetY = new Array<number>(10_000).fill(0)
export const animX = new Array<number>(10_000).fill(0)
export const animY = new Array<number>(10_000).fill(0)
export const animScaleX = new Array<number>(10_000).fill(0)
export const animScaleY = new Array<number>(10_000).fill(0)
export const animAngle = new Array<number>(10_000).fill(0)
export const health = new Array<number>(10_000).fill(0)
export const healthMax = new Array<number>(10_000).fill(0)
export const damage = new Array<number>(10_000).fill(0)
export const isAllocated = new Array<boolean>(10_000).fill(false)
export const isDestroyed = new Array<boolean>(10_000).fill(false)
export const isFlipped = new Array<boolean>(10_000).fill(false)
export const isStaggered = new Array<boolean>(10_000).fill(false)
export const staggerTime = new Array<number>(10_000).fill(0)
export const staggerDuration = new Array<number>(10_000).fill(0)

/** Zero an index within the entity structure of arrays. */
export function zeroEntity(idx: number) {
  type[idx] = 0
  posX[idx] = 0
  posY[idx] = 0
  velX[idx] = 0
  velY[idx] = 0
  hitboxX[idx] = 0
  hitboxY[idx] = 0
  hitboxW[idx] = 0
  hitboxH[idx] = 0
  hitboxOffsetX[idx] = 0
  hitboxOffsetY[idx] = 0
  animX[idx] = 0
  animY[idx] = 0
  animScaleX[idx] = 0
  animScaleY[idx] = 0
  animAngle[idx] = 0
  health[idx] = 0
  healthMax[idx] = 0
  damage[idx] = 0
  isAllocated[idx] = false
  isDestroyed[idx] = false
  isFlipped[idx] = false
  isStaggered[idx] = false
  staggerTime[idx] = 0
  staggerDuration[idx] = 0
}

/** Zero the type field within the entity structure of arrays. */
export function zeroType() {
  type.fill(0)
}

/** Zero the posX field within the entity structure of arrays. */
export function zeroPosX() {
  posX.fill(0)
}

/** Zero the posY field within the entity structure of arrays. */
export function zeroPosY() {
  posY.fill(0)
}

/** Zero the velX field within the entity structure of arrays. */
export function zeroVelX() {
  velX.fill(0)
}

/** Zero the velY field within the entity structure of arrays. */
export function zeroVelY() {
  velY.fill(0)
}

/** Zero the hitboxX field within the entity structure of arrays. */
export function zeroHitboxX() {
  hitboxX.fill(0)
}

/** Zero the hitboxY field within the entity structure of arrays. */
export function zeroHitboxY() {
  hitboxY.fill(0)
}

/** Zero the hitboxW field within the entity structure of arrays. */
export function zeroHitboxW() {
  hitboxW.fill(0)
}

/** Zero the hitboxH field within the entity structure of arrays. */
export function zeroHitboxH() {
  hitboxH.fill(0)
}

/** Zero the hitboxOffsetX field within the entity structure of arrays. */
export function zeroHitboxOffsetX() {
  hitboxOffsetX.fill(0)
}

/** Zero the hitboxOffsetY field within the entity structure of arrays. */
export function zeroHitboxOffsetY() {
  hitboxOffsetY.fill(0)
}

/** Zero the animX field within the entity structure of arrays. */
export function zeroAnimX() {
  animX.fill(0)
}

/** Zero the animY field within the entity structure of arrays. */
export function zeroAnimY() {
  animY.fill(0)
}

/** Zero the animScaleX field within the entity structure of arrays. */
export function zeroAnimScaleX() {
  animScaleX.fill(0)
}

/** Zero the animScaleY field within the entity structure of arrays. */
export function zeroAnimScaleY() {
  animScaleY.fill(0)
}

/** Zero the animAngle field within the entity structure of arrays. */
export function zeroAnimAngle() {
  animAngle.fill(0)
}

/** Zero the health field within the entity structure of arrays. */
export function zeroHealth() {
  health.fill(0)
}

/** Zero the healthMax field within the entity structure of arrays. */
export function zeroHealthMax() {
  healthMax.fill(0)
}

/** Zero the damage field within the entity structure of arrays. */
export function zeroDamage() {
  damage.fill(0)
}

/** Zero the isAllocated field within the entity structure of arrays. */
export function zeroIsAllocated() {
  isAllocated.fill(false)
}

/** Zero the isDestroyed field within the entity structure of arrays. */
export function zeroIsDestroyed() {
  isDestroyed.fill(false)
}

/** Zero the isFlipped field within the entity structure of arrays. */
export function zeroIsFlipped() {
  isFlipped.fill(false)
}

/** Zero the isStaggered field within the entity structure of arrays. */
export function zeroIsStaggered() {
  isStaggered.fill(false)
}

/** Zero the staggerTime field within the entity structure of arrays. */
export function zeroStaggerTime() {
  staggerTime.fill(0)
}

/** Zero the staggerDuration field within the entity structure of arrays. */
export function zeroStaggerDuration() {
  staggerDuration.fill(0)
}

/** Zero all fields within the entity structure of arrays. */
export function zeroEntityData() {
  type.fill(0)
  posX.fill(0)
  posY.fill(0)
  velX.fill(0)
  velY.fill(0)
  hitboxX.fill(0)
  hitboxY.fill(0)
  hitboxW.fill(0)
  hitboxH.fill(0)
  hitboxOffsetX.fill(0)
  hitboxOffsetY.fill(0)
  animX.fill(0)
  animY.fill(0)
  animScaleX.fill(0)
  animScaleY.fill(0)
  animAngle.fill(0)
  health.fill(0)
  healthMax.fill(0)
  damage.fill(0)
  isAllocated.fill(false)
  isDestroyed.fill(false)
  isFlipped.fill(false)
  isStaggered.fill(false)
  staggerTime.fill(0)
  staggerDuration.fill(0)
}