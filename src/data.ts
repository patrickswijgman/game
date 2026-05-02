/*
 * Generated with game-data-gen on 5/2/2026, 11:11:54 AM. DO NOT MODIFY THIS FILE!
 */

/*
 * --------------------------------------------------
 * game (Group)
 * --------------------------------------------------
 */

export const active = new Uint16Array(10_000)
export let activeCount = 0
export const activeIndex = new Uint16Array(10_000)
export let activeIndexCount = 0
export const enemies = new Uint16Array(10_000)
export let enemiesCount = 0
export const enemiesIndex = new Uint16Array(10_000)
export let enemiesIndexCount = 0
export const free = new Uint16Array(10_000)
export let freeCount = 0
export const toAdd = new Uint16Array(10_000)
export let toAddCount = 0
export const toRemove = new Uint16Array(10_000)
export let toRemoveCount = 0
export let playerId = 0
export let serialCount = 0

/** Set the value of the playerId field within the game group. */
export function setPlayerId(v: number) {
  playerId = v
}

/** Set the value of the serialCount field within the game group. */
export function setSerialCount(v: number) {
  serialCount = v
}

/** Push a value onto the active field within the game group. */
export function pushActive(v: number) {
  active[activeCount++] = v
}

/** Push a value onto the activeIndex field within the game group. */
export function pushActiveIndex(v: number) {
  activeIndex[activeIndexCount++] = v
}

/** Push a value onto the enemies field within the game group. */
export function pushEnemies(v: number) {
  enemies[enemiesCount++] = v
}

/** Push a value onto the enemiesIndex field within the game group. */
export function pushEnemiesIndex(v: number) {
  enemiesIndex[enemiesIndexCount++] = v
}

/** Push a value onto the free field within the game group. */
export function pushFree(v: number) {
  free[freeCount++] = v
}

/** Push a value onto the toAdd field within the game group. */
export function pushToAdd(v: number) {
  toAdd[toAddCount++] = v
}

/** Push a value onto the toRemove field within the game group. */
export function pushToRemove(v: number) {
  toRemove[toRemoveCount++] = v
}

/** Pop a value from the active field within the game group. */
export function popActive() {
  return active[--activeCount]
}

/** Pop a value from the activeIndex field within the game group. */
export function popActiveIndex() {
  return activeIndex[--activeIndexCount]
}

/** Pop a value from the enemies field within the game group. */
export function popEnemies() {
  return enemies[--enemiesCount]
}

/** Pop a value from the enemiesIndex field within the game group. */
export function popEnemiesIndex() {
  return enemiesIndex[--enemiesIndexCount]
}

/** Pop a value from the free field within the game group. */
export function popFree() {
  return free[--freeCount]
}

/** Pop a value from the toAdd field within the game group. */
export function popToAdd() {
  return toAdd[--toAddCount]
}

/** Pop a value from the toRemove field within the game group. */
export function popToRemove() {
  return toRemove[--toRemoveCount]
}

/** Zero the active field within the game group. */
export function zeroActive() {
  activeCount = 0
}

/** Zero the activeIndex field within the game group. */
export function zeroActiveIndex() {
  activeIndexCount = 0
}

/** Zero the enemies field within the game group. */
export function zeroEnemies() {
  enemiesCount = 0
}

/** Zero the enemiesIndex field within the game group. */
export function zeroEnemiesIndex() {
  enemiesIndexCount = 0
}

/** Zero the free field within the game group. */
export function zeroFree() {
  freeCount = 0
}

/** Zero the toAdd field within the game group. */
export function zeroToAdd() {
  toAddCount = 0
}

/** Zero the toRemove field within the game group. */
export function zeroToRemove() {
  toRemoveCount = 0
}

/** Zero the playerId field within the game group. */
export function zeroPlayerId() {
  playerId = 0
}

/** Zero the serialCount field within the game group. */
export function zeroSerialCount() {
  serialCount = 0
}

/** Zero all fields within the game group. */
export function zeroGame() {
  activeCount = 0
  activeIndexCount = 0
  enemiesCount = 0
  enemiesIndexCount = 0
  freeCount = 0
  toAddCount = 0
  toRemoveCount = 0
  playerId = 0
  serialCount = 0
}

/*
 * --------------------------------------------------
 * entity (Structure Of Arrays)
 * --------------------------------------------------
 */

export const MAX_ENTITY_COUNT = 10_000

export const type = new Uint8Array(10_000)
export const variant = new Uint8Array(10_000)
export const posX = new Float32Array(10_000)
export const posY = new Float32Array(10_000)
export const velX = new Float32Array(10_000)
export const velY = new Float32Array(10_000)
export const hitboxX = new Float32Array(10_000)
export const hitboxY = new Float32Array(10_000)
export const hitboxW = new Uint16Array(10_000)
export const hitboxH = new Uint16Array(10_000)
export const hitboxOffsetX = new Int16Array(10_000)
export const hitboxOffsetY = new Int16Array(10_000)
export const speed = new Float32Array(10_000)
export const radius = new Float32Array(10_000)
export const animX = new Float32Array(10_000)
export const animY = new Float32Array(10_000)
export const animScaleX = new Float32Array(10_000)
export const animScaleY = new Float32Array(10_000)
export const animAngle = new Float32Array(10_000)
export const shadow = new Uint8Array(10_000)
export const sprite = new Uint8Array(10_000)
export const weapon = new Uint8Array(10_000)
export const angle = new Float32Array(10_000)
export const health = new Uint16Array(10_000)
export const healthMax = new Uint16Array(10_000)
export const damage = new Uint16Array(10_000)
export const range = new Uint16Array(10_000)
export const projectile = new Uint8Array(10_000)
export const caster = new Uint8Array(10_000)
export const serial = new Uint32Array(10_000)
export const lastHitBy = new Uint16Array(10_000)
export const staggerTime = new Float32Array(10_000)
export const cooldown = new Uint16Array(10_000)
export const cooldownTime = new Float32Array(10_000)
export const healthDeplete = new Float32Array(10_000)
export const healthDepleteTime = new Float32Array(10_000)
export const lifeTime = new Float32Array(10_000)
export const isDestroyed = new Uint8Array(10_000)
export const isFlipped = new Uint8Array(10_000)

/** Zero an index within the entity structure of arrays. */
export function zeroEntityAt(i: number) {
  type[i] = 0
  variant[i] = 0
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
  shadow[i] = 0
  sprite[i] = 0
  weapon[i] = 0
  angle[i] = 0
  health[i] = 0
  healthMax[i] = 0
  damage[i] = 0
  range[i] = 0
  projectile[i] = 0
  caster[i] = 0
  serial[i] = 0
  lastHitBy[i] = 0
  staggerTime[i] = 0
  cooldown[i] = 0
  cooldownTime[i] = 0
  healthDeplete[i] = 0
  healthDepleteTime[i] = 0
  lifeTime[i] = 0
  isDestroyed[i] = 0
  isFlipped[i] = 0
}

/** Zero the type field within the entity structure of arrays. */
export function zeroType() {
  type.fill(0)
}

/** Zero the variant field within the entity structure of arrays. */
export function zeroVariant() {
  variant.fill(0)
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

/** Zero the shadow field within the entity structure of arrays. */
export function zeroShadow() {
  shadow.fill(0)
}

/** Zero the sprite field within the entity structure of arrays. */
export function zeroSprite() {
  sprite.fill(0)
}

/** Zero the weapon field within the entity structure of arrays. */
export function zeroWeapon() {
  weapon.fill(0)
}

/** Zero the angle field within the entity structure of arrays. */
export function zeroAngle() {
  angle.fill(0)
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

/** Zero the range field within the entity structure of arrays. */
export function zeroRange() {
  range.fill(0)
}

/** Zero the projectile field within the entity structure of arrays. */
export function zeroProjectile() {
  projectile.fill(0)
}

/** Zero the caster field within the entity structure of arrays. */
export function zeroCaster() {
  caster.fill(0)
}

/** Zero the serial field within the entity structure of arrays. */
export function zeroSerial() {
  serial.fill(0)
}

/** Zero the lastHitBy field within the entity structure of arrays. */
export function zeroLastHitBy() {
  lastHitBy.fill(0)
}

/** Zero the staggerTime field within the entity structure of arrays. */
export function zeroStaggerTime() {
  staggerTime.fill(0)
}

/** Zero the cooldown field within the entity structure of arrays. */
export function zeroCooldown() {
  cooldown.fill(0)
}

/** Zero the cooldownTime field within the entity structure of arrays. */
export function zeroCooldownTime() {
  cooldownTime.fill(0)
}

/** Zero the healthDeplete field within the entity structure of arrays. */
export function zeroHealthDeplete() {
  healthDeplete.fill(0)
}

/** Zero the healthDepleteTime field within the entity structure of arrays. */
export function zeroHealthDepleteTime() {
  healthDepleteTime.fill(0)
}

/** Zero the lifeTime field within the entity structure of arrays. */
export function zeroLifeTime() {
  lifeTime.fill(0)
}

/** Zero the isDestroyed field within the entity structure of arrays. */
export function zeroIsDestroyed() {
  isDestroyed.fill(0)
}

/** Zero the isFlipped field within the entity structure of arrays. */
export function zeroIsFlipped() {
  isFlipped.fill(0)
}

/** Zero all fields within the entity structure of arrays. */
export function zeroEntity() {
  type.fill(0)
  variant.fill(0)
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
  shadow.fill(0)
  sprite.fill(0)
  weapon.fill(0)
  angle.fill(0)
  health.fill(0)
  healthMax.fill(0)
  damage.fill(0)
  range.fill(0)
  projectile.fill(0)
  caster.fill(0)
  serial.fill(0)
  lastHitBy.fill(0)
  staggerTime.fill(0)
  cooldown.fill(0)
  cooldownTime.fill(0)
  healthDeplete.fill(0)
  healthDepleteTime.fill(0)
  lifeTime.fill(0)
  isDestroyed.fill(0)
  isFlipped.fill(0)
}