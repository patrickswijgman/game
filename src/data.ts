/*
 * Generated with game-data-gen on 5/6/2026, 9:55:25 AM. DO NOT MODIFY THIS FILE!
 */

/*
 * --------------------------------------------------
 * game (Group)
 * --------------------------------------------------
 */

export let playerId = 0
export const free = new Uint16Array(2000)
export let freeCount = 0
export const toAdd = new Uint16Array(2000)
export let toAddCount = 0
export const toRemove = new Uint16Array(2000)
export let toRemoveCount = 0
export const active = new Uint16Array(2000)
export let activeCount = 0
export const activeIndex = new Uint16Array(2000)
export let activeIndexCount = 0
export const enemies = new Uint16Array(2000)
export let enemiesCount = 0
export const enemiesIndex = new Uint16Array(2000)
export let enemiesIndexCount = 0
export let serialCount = 0
export let totalKills = 0
export let totalSouls = 0

/** Set the value of the playerId field within the game group. */
export function setPlayerId(v: number) {
  playerId = v
}

/** Set the value of the serialCount field within the game group. */
export function setSerialCount(v: number) {
  serialCount = v
}

/** Set the value of the totalKills field within the game group. */
export function setTotalKills(v: number) {
  totalKills = v
}

/** Set the value of the totalSouls field within the game group. */
export function setTotalSouls(v: number) {
  totalSouls = v
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

/** Zero the playerId field within the game group. */
export function zeroPlayerId() {
  playerId = 0
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

/** Zero the serialCount field within the game group. */
export function zeroSerialCount() {
  serialCount = 0
}

/** Zero the totalKills field within the game group. */
export function zeroTotalKills() {
  totalKills = 0
}

/** Zero the totalSouls field within the game group. */
export function zeroTotalSouls() {
  totalSouls = 0
}

/** Zero all fields within the game group. */
export function zeroGame() {
  playerId = 0
  freeCount = 0
  toAddCount = 0
  toRemoveCount = 0
  activeCount = 0
  activeIndexCount = 0
  enemiesCount = 0
  enemiesIndexCount = 0
  serialCount = 0
  totalKills = 0
  totalSouls = 0
}

/*
 * --------------------------------------------------
 * entity (Structure Of Arrays)
 * --------------------------------------------------
 */

export const MAX_ENTITY_COUNT = 2000

export const type = new Uint8Array(2000)
export const startX = new Float32Array(2000)
export const startY = new Float32Array(2000)
export const posX = new Float32Array(2000)
export const posY = new Float32Array(2000)
export const velX = new Float32Array(2000)
export const velY = new Float32Array(2000)
export const hitboxX = new Int16Array(2000)
export const hitboxY = new Int16Array(2000)
export const hitboxW = new Uint16Array(2000)
export const hitboxH = new Uint16Array(2000)
export const radius = new Float32Array(2000)
export const anim = new Uint8Array(2000)
export const animX = new Float32Array(2000)
export const animY = new Float32Array(2000)
export const animScaleX = new Float32Array(2000)
export const animScaleY = new Float32Array(2000)
export const animAngle = new Float32Array(2000)
export const angle = new Float32Array(2000)
export const depth = new Uint16Array(2000)
export const health = new Uint16Array(2000)
export const healthMax = new Uint16Array(2000)
export const movementSpeed = new Float32Array(2000)
export const projectileDamage = new Uint16Array(2000)
export const projectileSpeed = new Float32Array(2000)
export const projectileRange = new Uint16Array(2000)
export const windup = new Uint16Array(2000)
export const recovery = new Uint16Array(2000)
export const cooldown = new Uint16Array(2000)
export const souls = new Uint16Array(2000)
export const weapon = new Uint8Array(2000)
export const projectile = new Uint8Array(2000)
export const serial = new Uint32Array(2000)
export const targetX = new Float32Array(2000)
export const targetY = new Float32Array(2000)
export const lastHitBy = new Uint16Array(2000)
export const healthDeplete = new Float32Array(2000)
export const healthDepleteTime = new Float32Array(2000)
export const windupTime = new Float32Array(2000)
export const recoveryTime = new Float32Array(2000)
export const cooldownTime = new Float32Array(2000)
export const staggerTime = new Float32Array(2000)
export const immuneTime = new Float32Array(2000)
export const isDestroyed = new Uint8Array(2000)
export const isEnemy = new Uint8Array(2000)
export const isEnemyProjectile = new Uint8Array(2000)

/** Zero an index within the entity structure of arrays. */
export function zeroEntityAt(i: number) {
  type[i] = 0
  startX[i] = 0
  startY[i] = 0
  posX[i] = 0
  posY[i] = 0
  velX[i] = 0
  velY[i] = 0
  hitboxX[i] = 0
  hitboxY[i] = 0
  hitboxW[i] = 0
  hitboxH[i] = 0
  radius[i] = 0
  anim[i] = 0
  animX[i] = 0
  animY[i] = 0
  animScaleX[i] = 0
  animScaleY[i] = 0
  animAngle[i] = 0
  angle[i] = 0
  depth[i] = 0
  health[i] = 0
  healthMax[i] = 0
  movementSpeed[i] = 0
  projectileDamage[i] = 0
  projectileSpeed[i] = 0
  projectileRange[i] = 0
  windup[i] = 0
  recovery[i] = 0
  cooldown[i] = 0
  souls[i] = 0
  weapon[i] = 0
  projectile[i] = 0
  serial[i] = 0
  targetX[i] = 0
  targetY[i] = 0
  lastHitBy[i] = 0
  healthDeplete[i] = 0
  healthDepleteTime[i] = 0
  windupTime[i] = 0
  recoveryTime[i] = 0
  cooldownTime[i] = 0
  staggerTime[i] = 0
  immuneTime[i] = 0
  isDestroyed[i] = 0
  isEnemy[i] = 0
  isEnemyProjectile[i] = 0
}

/** Zero all fields within the entity structure of arrays. */
export function zeroEntity() {
  type.fill(0)
  startX.fill(0)
  startY.fill(0)
  posX.fill(0)
  posY.fill(0)
  velX.fill(0)
  velY.fill(0)
  hitboxX.fill(0)
  hitboxY.fill(0)
  hitboxW.fill(0)
  hitboxH.fill(0)
  radius.fill(0)
  anim.fill(0)
  animX.fill(0)
  animY.fill(0)
  animScaleX.fill(0)
  animScaleY.fill(0)
  animAngle.fill(0)
  angle.fill(0)
  depth.fill(0)
  health.fill(0)
  healthMax.fill(0)
  movementSpeed.fill(0)
  projectileDamage.fill(0)
  projectileSpeed.fill(0)
  projectileRange.fill(0)
  windup.fill(0)
  recovery.fill(0)
  cooldown.fill(0)
  souls.fill(0)
  weapon.fill(0)
  projectile.fill(0)
  serial.fill(0)
  targetX.fill(0)
  targetY.fill(0)
  lastHitBy.fill(0)
  healthDeplete.fill(0)
  healthDepleteTime.fill(0)
  windupTime.fill(0)
  recoveryTime.fill(0)
  cooldownTime.fill(0)
  staggerTime.fill(0)
  immuneTime.fill(0)
  isDestroyed.fill(0)
  isEnemy.fill(0)
  isEnemyProjectile.fill(0)
}

/** Print an index within the entity structure of arrays to the console. */
export function printEntityAt(i: number) {
  console.table({
    type: type[i],
    startX: startX[i],
    startY: startY[i],
    posX: posX[i],
    posY: posY[i],
    velX: velX[i],
    velY: velY[i],
    hitboxX: hitboxX[i],
    hitboxY: hitboxY[i],
    hitboxW: hitboxW[i],
    hitboxH: hitboxH[i],
    radius: radius[i],
    anim: anim[i],
    animX: animX[i],
    animY: animY[i],
    animScaleX: animScaleX[i],
    animScaleY: animScaleY[i],
    animAngle: animAngle[i],
    angle: angle[i],
    depth: depth[i],
    health: health[i],
    healthMax: healthMax[i],
    movementSpeed: movementSpeed[i],
    projectileDamage: projectileDamage[i],
    projectileSpeed: projectileSpeed[i],
    projectileRange: projectileRange[i],
    windup: windup[i],
    recovery: recovery[i],
    cooldown: cooldown[i],
    souls: souls[i],
    weapon: weapon[i],
    projectile: projectile[i],
    serial: serial[i],
    targetX: targetX[i],
    targetY: targetY[i],
    lastHitBy: lastHitBy[i],
    healthDeplete: healthDeplete[i],
    healthDepleteTime: healthDepleteTime[i],
    windupTime: windupTime[i],
    recoveryTime: recoveryTime[i],
    cooldownTime: cooldownTime[i],
    staggerTime: staggerTime[i],
    immuneTime: immuneTime[i],
    isDestroyed: isDestroyed[i],
    isEnemy: isEnemy[i],
    isEnemyProjectile: isEnemyProjectile[i],
  })
}