/*
 * Generated with game-data-gen on 4/19/2026, 9:52:11 AM. DO NOT MODIFY THIS FILE!
 */

/*
 * --------------------------------------------------
 * Game (group)
 * --------------------------------------------------
 */

export let player = createSheet()
export let playerCards = new Array<number>()
export let playerHandAction = 0
export let enemy = createSheet()
export let enemyCards = new Array<number>()
export let state = 0
export let stateNext = 0
export let stateTimer = createTimer()

/** Set the value of the player field within the Game group. */
export function setPlayer(value: Sheet) {
  player = value
}

/** Set the value of the playerCards field within the Game group. */
export function setPlayerCards(value: Array<number>) {
  playerCards = value
}

/** Set the value of the playerHandAction field within the Game group. */
export function setPlayerHandAction(value: number) {
  playerHandAction = value
}

/** Set the value of the enemy field within the Game group. */
export function setEnemy(value: Sheet) {
  enemy = value
}

/** Set the value of the enemyCards field within the Game group. */
export function setEnemyCards(value: Array<number>) {
  enemyCards = value
}

/** Set the value of the state field within the Game group. */
export function setState(value: number) {
  state = value
}

/** Set the value of the stateNext field within the Game group. */
export function setStateNext(value: number) {
  stateNext = value
}

/** Set the value of the stateTimer field within the Game group. */
export function setStateTimer(value: Timer) {
  stateTimer = value
}

/** Zero the player field within the Game group. */
export function zeroPlayer() {
  zeroSheet(player)
}

/** Zero the playerCards field within the Game group. */
export function zeroPlayerCards() {
  playerCards.length = 0
}

/** Zero the playerHandAction field within the Game group. */
export function zeroPlayerHandAction() {
  playerHandAction = 0
}

/** Zero the enemy field within the Game group. */
export function zeroEnemy() {
  zeroSheet(enemy)
}

/** Zero the enemyCards field within the Game group. */
export function zeroEnemyCards() {
  enemyCards.length = 0
}

/** Zero the state field within the Game group. */
export function zeroState() {
  state = 0
}

/** Zero the stateNext field within the Game group. */
export function zeroStateNext() {
  stateNext = 0
}

/** Zero the stateTimer field within the Game group. */
export function zeroStateTimer() {
  zeroTimer(stateTimer)
}

/** Zero all fields within the Game group. */
export function zeroGameData() {
  zeroSheet(player)
  playerCards.length = 0
  playerHandAction = 0
  zeroSheet(enemy)
  enemyCards.length = 0
  state = 0
  stateNext = 0
  zeroTimer(stateTimer)
}

/*
 * --------------------------------------------------
 * Card (struct)
 * --------------------------------------------------
 */

export type Card = {
  name: string
  description: string
  value: number
  effects: Array<number>
}

/** Create a new Card object. */
export function createCard(): Card {
  const obj = Object.create(null)
  obj.name = ""
  obj.description = ""
  obj.value = 0
  obj.effects = new Array<number>()
  return obj
}

/** Zero the given Card object. */
export function zeroCard(obj: Card) {
  obj.name = ""
  obj.description = ""
  obj.value = 0
  obj.effects.length = 0
}

/*
 * --------------------------------------------------
 * Sheet (struct)
 * --------------------------------------------------
 */

export type Sheet = {
  name: string
  type: number
  health: number
  healthMax: number
  hand: Array<number>
  draw: Array<number>
  discard: Array<number>
  items: Array<number>
}

/** Create a new Sheet object. */
export function createSheet(): Sheet {
  const obj = Object.create(null)
  obj.name = ""
  obj.type = 0
  obj.health = 0
  obj.healthMax = 0
  obj.hand = new Array<number>()
  obj.draw = new Array<number>()
  obj.discard = new Array<number>()
  obj.items = new Array<number>()
  return obj
}

/** Zero the given Sheet object. */
export function zeroSheet(obj: Sheet) {
  obj.name = ""
  obj.type = 0
  obj.health = 0
  obj.healthMax = 0
  obj.hand.length = 0
  obj.draw.length = 0
  obj.discard.length = 0
  obj.items.length = 0
}

/*
 * --------------------------------------------------
 * Item (struct)
 * --------------------------------------------------
 */

export type Item = {
  name: string
  effects: Array<number>
}

/** Create a new Item object. */
export function createItem(): Item {
  const obj = Object.create(null)
  obj.name = ""
  obj.effects = new Array<number>()
  return obj
}

/** Zero the given Item object. */
export function zeroItem(obj: Item) {
  obj.name = ""
  obj.effects.length = 0
}

/*
 * --------------------------------------------------
 * Timer (struct)
 * --------------------------------------------------
 */

export type Timer = {
  elapsed: number
}

/** Create a new Timer object. */
export function createTimer(): Timer {
  const obj = Object.create(null)
  obj.elapsed = 0
  return obj
}

/** Zero the given Timer object. */
export function zeroTimer(obj: Timer) {
  obj.elapsed = 0
}

/*
 * --------------------------------------------------
 * cards (array of structures)
 * --------------------------------------------------
 */

export const MAX_CARDS_COUNT = 64

/** An array of Card objects (structures). */
export const cards = new Array<Card>(64)
for (let i=0; i<64; i++) {
  cards[i] = createCard()
}

/** Zero all objects within the cards array of structures. */
export function zeroCards() {
  for (let i=0; i<64; i++) {
    zeroCard(cards[i])
  }
}

/** Zero an object at a specific index within the cards array of structures. */
export function zeroCardAt(index: number) {
  zeroCard(cards[index])
}

/*
 * --------------------------------------------------
 * items (array of structures)
 * --------------------------------------------------
 */

export const MAX_ITEMS_COUNT = 64

/** An array of Item objects (structures). */
export const items = new Array<Item>(64)
for (let i=0; i<64; i++) {
  items[i] = createItem()
}

/** Zero all objects within the items array of structures. */
export function zeroItems() {
  for (let i=0; i<64; i++) {
    zeroItem(items[i])
  }
}

/** Zero an object at a specific index within the items array of structures. */
export function zeroItemAt(index: number) {
  zeroItem(items[index])
}