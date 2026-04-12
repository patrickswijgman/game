/*
 * Generated with game-data-gen on 4/12/2026, 8:01:25 PM. DO NOT MODIFY THIS FILE!
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
 * vec (struct)
 * --------------------------------------------------
 */

export type Vec = {
  x: number
  y: number
}

/** Create a new Vec object. */
export function createVec(): Vec {
  const obj = Object.create(null)
  obj.x = 0
  obj.y = 0
  return obj
}

/** Zero the given Vec object. */
export function zeroVec(obj: Vec) {
  obj.x = 0
  obj.y = 0
}

/*
 * --------------------------------------------------
 * rect (struct)
 * --------------------------------------------------
 */

export type Rect = {
  x: number
  y: number
  w: number
  h: number
}

/** Create a new Rect object. */
export function createRect(): Rect {
  const obj = Object.create(null)
  obj.x = 0
  obj.y = 0
  obj.w = 0
  obj.h = 0
  return obj
}

/** Zero the given Rect object. */
export function zeroRect(obj: Rect) {
  obj.x = 0
  obj.y = 0
  obj.w = 0
  obj.h = 0
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
  pos: Vec
  vel: Vec
  speed: number
  hitbox: Rect
  hitboxOffset: Vec
  hitboxIntersection: Vec
  sheet: Sheet
  isActive: boolean
  isFlipped: boolean
}

/** Create a new Entity object. */
export function createEntity(): Entity {
  const obj = Object.create(null)
  obj.idx = 0
  obj.type = 0
  obj.pos = createVec()
  obj.vel = createVec()
  obj.speed = 0
  obj.hitbox = createRect()
  obj.hitboxOffset = createVec()
  obj.hitboxIntersection = createVec()
  obj.sheet = createSheet()
  obj.isActive = false
  obj.isFlipped = false
  return obj
}

/** Zero the given Entity object. */
export function zeroEntity(obj: Entity) {
  obj.idx = 0
  obj.type = 0
  zeroVec(obj.pos)
  zeroVec(obj.vel)
  obj.speed = 0
  zeroRect(obj.hitbox)
  zeroVec(obj.hitboxOffset)
  zeroVec(obj.hitboxIntersection)
  zeroSheet(obj.sheet)
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