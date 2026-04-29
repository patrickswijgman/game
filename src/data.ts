/*
 * Generated with game-data-gen on 4/29/2026, 3:07:33 PM. DO NOT MODIFY THIS FILE!
 */

/*
 * --------------------------------------------------
 * game (Group)
 * --------------------------------------------------
 */

export let active = new Array<number>()
export let free = new Array<number>()
export let toAdd = new Array<number>()
export let toRemove = new Array<number>()
export let playerId = 0
export let state = 0
export let stateNext = 0

/** Set the value of the active field within the game group. */
export function setActive(v: Array<number>) {
  active = v
}

/** Set the value of the free field within the game group. */
export function setFree(v: Array<number>) {
  free = v
}

/** Set the value of the toAdd field within the game group. */
export function setToAdd(v: Array<number>) {
  toAdd = v
}

/** Set the value of the toRemove field within the game group. */
export function setToRemove(v: Array<number>) {
  toRemove = v
}

/** Set the value of the playerId field within the game group. */
export function setPlayerId(v: number) {
  playerId = v
}

/** Set the value of the state field within the game group. */
export function setState(v: number) {
  state = v
}

/** Set the value of the stateNext field within the game group. */
export function setStateNext(v: number) {
  stateNext = v
}

/** Zero the active field within the game group. */
export function zeroActive() {
  active.length = 0
}

/** Zero the free field within the game group. */
export function zeroFree() {
  free.length = 0
}

/** Zero the toAdd field within the game group. */
export function zeroToAdd() {
  toAdd.length = 0
}

/** Zero the toRemove field within the game group. */
export function zeroToRemove() {
  toRemove.length = 0
}

/** Zero the playerId field within the game group. */
export function zeroPlayerId() {
  playerId = 0
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
  free.length = 0
  toAdd.length = 0
  toRemove.length = 0
  playerId = 0
  state = 0
  stateNext = 0
}

/*
 * --------------------------------------------------
 * entity (Structure Of Arrays)
 * --------------------------------------------------
 */

export const MAX_ENTITY_COUNT = 10_000

export const index = new Array(10_000).fill(0)
export const type = new Array(10_000).fill(0)
export const variant = new Array(10_000).fill(0)
export const shadowId = new Array(10_000).fill(0)
export const spriteId = new Array(10_000).fill(0)
export const posX = new Array(10_000).fill(0)
export const posY = new Array(10_000).fill(0)
export const velX = new Array(10_000).fill(0)
export const velY = new Array(10_000).fill(0)
export const hitboxX = new Array(10_000).fill(0)
export const hitboxY = new Array(10_000).fill(0)
export const hitboxW = new Array(10_000).fill(0)
export const hitboxH = new Array(10_000).fill(0)
export const hitboxOffsetX = new Array(10_000).fill(0)
export const hitboxOffsetY = new Array(10_000).fill(0)
export const speed = new Array(10_000).fill(0)
export const radius = new Array(10_000).fill(0)
export const animX = new Array(10_000).fill(0)
export const animY = new Array(10_000).fill(0)
export const animScaleX = new Array(10_000).fill(0)
export const animScaleY = new Array(10_000).fill(0)
export const animAngle = new Array(10_000).fill(0)
export const health = new Array(10_000).fill(0)
export const healthMax = new Array(10_000).fill(0)
export const damage = new Array(10_000).fill(0)
export const weaponId = new Array(10_000).fill(0)
export const staggerTime = new Array(10_000).fill(0)
export const isDestroyed = new Array(10_000).fill(false)
export const isFlipped = new Array(10_000).fill(false)

/** Zero an index within the entity structure of arrays. */
export function zeroEntity(i: number) {
  index[i] = 0
  type[i] = 0
  variant[i] = 0
  shadowId[i] = 0
  spriteId[i] = 0
  posX[i] = 0
  posY[i] = 0
  velX[i] = 0
  velY[i] = 0
  hitboxX[i] = 0
  hitboxY[i] = 0
  hitboxW[i] = 0
  hitboxH[i] = 0
  hitboxOffsetX[i] = 0
  hitboxOffsetY[i] = 0
  speed[i] = 0
  radius[i] = 0
  animX[i] = 0
  animY[i] = 0
  animScaleX[i] = 0
  animScaleY[i] = 0
  animAngle[i] = 0
  health[i] = 0
  healthMax[i] = 0
  damage[i] = 0
  weaponId[i] = 0
  staggerTime[i] = 0
  isDestroyed[i] = false
  isFlipped[i] = false
}

/** Zero the index field within the entity structure of arrays. */
export function zeroIndex() {
  index.fill(0)
}

/** Zero the type field within the entity structure of arrays. */
export function zeroType() {
  type.fill(0)
}

/** Zero the variant field within the entity structure of arrays. */
export function zeroVariant() {
  variant.fill(0)
}

/** Zero the shadowId field within the entity structure of arrays. */
export function zeroShadowId() {
  shadowId.fill(0)
}

/** Zero the spriteId field within the entity structure of arrays. */
export function zeroSpriteId() {
  spriteId.fill(0)
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

/** Zero the speed field within the entity structure of arrays. */
export function zeroSpeed() {
  speed.fill(0)
}

/** Zero the radius field within the entity structure of arrays. */
export function zeroRadius() {
  radius.fill(0)
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

/** Zero the weaponId field within the entity structure of arrays. */
export function zeroWeaponId() {
  weaponId.fill(0)
}

/** Zero the staggerTime field within the entity structure of arrays. */
export function zeroStaggerTime() {
  staggerTime.fill(0)
}

/** Zero the isDestroyed field within the entity structure of arrays. */
export function zeroIsDestroyed() {
  isDestroyed.fill(false)
}

/** Zero the isFlipped field within the entity structure of arrays. */
export function zeroIsFlipped() {
  isFlipped.fill(false)
}

/** Zero all fields within the entity structure of arrays. */
export function zeroEntityData() {
  index.fill(0)
  type.fill(0)
  variant.fill(0)
  shadowId.fill(0)
  spriteId.fill(0)
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
  speed.fill(0)
  radius.fill(0)
  animX.fill(0)
  animY.fill(0)
  animScaleX.fill(0)
  animScaleY.fill(0)
  animAngle.fill(0)
  health.fill(0)
  healthMax.fill(0)
  damage.fill(0)
  weaponId.fill(0)
  staggerTime.fill(0)
  isDestroyed.fill(false)
  isFlipped.fill(false)
}