/*
 * Generated with game-data-gen on 4/26/2026, 11:20:47 AM. DO NOT MODIFY THIS FILE!
 */

/*
 * --------------------------------------------------
 * Game (group)
 * --------------------------------------------------
 */

export let player = createSheet()
export let enemy = createSheet()
export let state = 0
export let stateNext = 0
export let stateTimer = createTimer()
export let round = 0
export let level = 0

/** Set the value of the player field within the Game group. */
export function setPlayer(value: Sheet) {
  player = value
}

/** Set the value of the enemy field within the Game group. */
export function setEnemy(value: Sheet) {
  enemy = value
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

/** Set the value of the round field within the Game group. */
export function setRound(value: number) {
  round = value
}

/** Set the value of the level field within the Game group. */
export function setLevel(value: number) {
  level = value
}

/** Zero the player field within the Game group. */
export function zeroPlayer() {
  zeroSheet(player)
}

/** Zero the enemy field within the Game group. */
export function zeroEnemy() {
  zeroSheet(enemy)
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

/** Zero the round field within the Game group. */
export function zeroRound() {
  round = 0
}

/** Zero the level field within the Game group. */
export function zeroLevel() {
  level = 0
}

/** Zero all fields within the Game group. */
export function zeroGameData() {
  zeroSheet(player)
  zeroSheet(enemy)
  state = 0
  stateNext = 0
  zeroTimer(stateTimer)
  round = 0
  level = 0
}

/*
 * --------------------------------------------------
 * Card (struct)
 * --------------------------------------------------
 */

export type Card = {
  name: string
  type: number
  value: number
  duration: number
  effect: number
  effectValue: number
}

/** Create a new Card object. */
export function createCard() {
  const obj = Object.create(null) as Card
  obj.name = ""
  obj.type = 0
  obj.value = 0
  obj.duration = 0
  obj.effect = 0
  obj.effectValue = 0
  return obj
}

/** Copy the values of Card object b into Card object a. */
export function copyCard(a: Card, b: Card) {
  a.name = b.name
  a.type = b.type
  a.value = b.value
  a.duration = b.duration
  a.effect = b.effect
  a.effectValue = b.effectValue
}

/** Zero the given Card object. */
export function zeroCard(obj: Card) {
  obj.name = ""
  obj.type = 0
  obj.value = 0
  obj.duration = 0
  obj.effect = 0
  obj.effectValue = 0
}

/*
 * --------------------------------------------------
 * Sheet (struct)
 * --------------------------------------------------
 */

export type Sheet = {
  type: number
  name: string
  health: number
  healthMax: number
  play: Array<Card>
  hand: Array<Card>
  draw: Array<Card>
  discard: Array<Card>
}

/** Create a new Sheet object. */
export function createSheet() {
  const obj = Object.create(null) as Sheet
  obj.type = 0
  obj.name = ""
  obj.health = 0
  obj.healthMax = 0
  obj.play = new Array<Card>()
  obj.hand = new Array<Card>()
  obj.draw = new Array<Card>()
  obj.discard = new Array<Card>()
  return obj
}

/** Copy the values of Sheet object b into Sheet object a. */
export function copySheet(a: Sheet, b: Sheet) {
  a.type = b.type
  a.name = b.name
  a.health = b.health
  a.healthMax = b.healthMax
  for (let i = 0; i < b.play.length; i++) {
    copyCard(a.play[i], b.play[i])
  }
  for (let i = 0; i < b.hand.length; i++) {
    copyCard(a.hand[i], b.hand[i])
  }
  for (let i = 0; i < b.draw.length; i++) {
    copyCard(a.draw[i], b.draw[i])
  }
  for (let i = 0; i < b.discard.length; i++) {
    copyCard(a.discard[i], b.discard[i])
  }
}

/** Zero the given Sheet object. */
export function zeroSheet(obj: Sheet) {
  obj.type = 0
  obj.name = ""
  obj.health = 0
  obj.healthMax = 0
  obj.play.length = 0
  obj.hand.length = 0
  obj.draw.length = 0
  obj.discard.length = 0
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
export function createTimer() {
  const obj = Object.create(null) as Timer
  obj.elapsed = 0
  return obj
}

/** Copy the values of Timer object b into Timer object a. */
export function copyTimer(a: Timer, b: Timer) {
  a.elapsed = b.elapsed
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

export const MAX_CARDS = 64

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
export function zeroCardsAt(index: number) {
  zeroCard(cards[index])
}