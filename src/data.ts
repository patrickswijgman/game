/*
 * Generated with game-data-gen on 4/12/2026, 4:26:32 PM. DO NOT MODIFY THIS FILE!
 */

/*
 * --------------------------------------------------
 * game (group)
 * --------------------------------------------------
 */

export let activeEntities = new Array<number>()
export let destroyedEntities = new Array<number>()
export let playerIdx = 0

/** Set the value of the activeEntities field within the game group. */
export function setActiveEntities(value: Array<number>) {
  activeEntities = value
}

/** Set the value of the destroyedEntities field within the game group. */
export function setDestroyedEntities(value: Array<number>) {
  destroyedEntities = value
}

/** Set the value of the playerIdx field within the game group. */
export function setPlayerIdx(value: number) {
  playerIdx = value
}

/** Zero the activeEntities field within the game group. */
export function zeroActiveEntities() {
  activeEntities.length = 0
}

/** Zero the destroyedEntities field within the game group. */
export function zeroDestroyedEntities() {
  destroyedEntities.length = 0
}

/** Zero the playerIdx field within the game group. */
export function zeroPlayerIdx() {
  playerIdx = 0
}

/** Zero all fields within the game group. */
export function zeroGameData() {
  activeEntities.length = 0
  destroyedEntities.length = 0
  playerIdx = 0
}

/*
 * --------------------------------------------------
 * vector (struct)
 * --------------------------------------------------
 */

export type Vector = {
  x: number
  y: number
}

/** Create a new Vector object. */
export function createVector(): Vector {
  const obj = Object.create(null)
  obj.x = 0
  obj.y = 0
  return obj
}

/** Zero the given Vector object. */
export function zeroVector(obj: Vector) {
  obj.x = 0
  obj.y = 0
}

/*
 * --------------------------------------------------
 * sheet (struct)
 * --------------------------------------------------
 */

export type Sheet = {
  health: number
  healthMax: number
}

/** Create a new Sheet object. */
export function createSheet(): Sheet {
  const obj = Object.create(null)
  obj.health = 0
  obj.healthMax = 0
  return obj
}

/** Zero the given Sheet object. */
export function zeroSheet(obj: Sheet) {
  obj.health = 0
  obj.healthMax = 0
}

/*
 * --------------------------------------------------
 * entity (struct)
 * --------------------------------------------------
 */

export type Entity = {
  idx: number
  type: number
  pos: Vector
  vel: Vector
  sheet: Sheet
  speed: number
  isActive: boolean
  isFlipped: boolean
}

/** Create a new Entity object. */
export function createEntity(): Entity {
  const obj = Object.create(null)
  obj.idx = 0
  obj.type = 0
  obj.pos = createVector()
  obj.vel = createVector()
  obj.sheet = createSheet()
  obj.speed = 0
  obj.isActive = false
  obj.isFlipped = false
  return obj
}

/** Zero the given Entity object. */
export function zeroEntity(obj: Entity) {
  obj.idx = 0
  obj.type = 0
  zeroVector(obj.pos)
  zeroVector(obj.vel)
  zeroSheet(obj.sheet)
  obj.speed = 0
  obj.isActive = false
  obj.isFlipped = false
}

/*
 * --------------------------------------------------
 * entities (array of structures)
 * --------------------------------------------------
 */

export const MAX_ENTITIES_COUNT = 2048

/** An array of Entity objects (structures). */
export const entities = new Array<Entity>(2048)
for (let i=0; i<2048; i++) {
  entities[i] = createEntity()
}

/** Zero all objects within the entities array of structures. */
export function zeroEntities() {
  for (let i=0; i<2048; i++) {
    zeroEntity(entities[i])
  }
}

/** Zero an object at a specific index within the entities array of structures. */
export function zeroEntityAt(index: number) {
  zeroEntity(entities[index])
}