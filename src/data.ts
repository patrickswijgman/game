/*
 * Generated with game-data-gen on 3/11/2026, 9:24:01 AM. DO NOT MODIFY THIS FILE!
 */

/*
 * --------------------------------------------------
 * Game (group)
 * --------------------------------------------------
 */

export let state = 0
export let nextState = 0

/** Set the value of the state field within the Game group. */
export function setState(value: number) {
  state = value
}

/** Set the value of the nextState field within the Game group. */
export function setNextState(value: number) {
  nextState = value
}

/** Zero the state field within the Game group. */
export function zeroState() {
  state = 0
}

/** Zero the nextState field within the Game group. */
export function zeroNextState() {
  nextState = 0
}

/** Zero all fields within the Game group. */
export function zeroGameData() {
  state = 0
  nextState = 0
}

/*
 * --------------------------------------------------
 * Run (group)
 * --------------------------------------------------
 */

export const deck = new Array<number>()
export const hand = new Array<number>()

/** Zero the deck field within the Run group. */
export function zeroDeck() {
  deck.length = 0
}

/** Zero the hand field within the Run group. */
export function zeroHand() {
  hand.length = 0
}

/** Zero all fields within the Run group. */
export function zeroRunData() {
  deck.length = 0
  hand.length = 0
}

/*
 * --------------------------------------------------
 * Card (Structure of Arrays)
 * --------------------------------------------------
 */

export const MAX_CARD_COUNT = 64

export const cardName = new Array<string>(64).fill("")
export const cardDescription = new Array<string>(64).fill("")
export const cardManaCost = new Uint8Array(64)
export const cardDamage = new Uint8Array(64)
export const cardDamageScaling = new Uint8Array(64)

/** Zero an index within the Card Structure of Arrays. */
export function zeroCard(idx: number) {
  cardName[idx] = ""
  cardDescription[idx] = ""
  cardManaCost[idx] = 0
  cardDamage[idx] = 0
  cardDamageScaling[idx] = 0
}

/** Zero the cardName field within the Card Structure of Arrays. */
export function zeroCardName() {
  cardName.fill("")
}

/** Zero the cardDescription field within the Card Structure of Arrays. */
export function zeroCardDescription() {
  cardDescription.fill("")
}

/** Zero the cardManaCost field within the Card Structure of Arrays. */
export function zeroCardManaCost() {
  cardManaCost.fill(0)
}

/** Zero the cardDamage field within the Card Structure of Arrays. */
export function zeroCardDamage() {
  cardDamage.fill(0)
}

/** Zero the cardDamageScaling field within the Card Structure of Arrays. */
export function zeroCardDamageScaling() {
  cardDamageScaling.fill(0)
}

/** Zero all fields within the Card Structure of Arrays. */
export function zeroCardData() {
  cardName.fill("")
  cardDescription.fill("")
  cardManaCost.fill(0)
  cardDamage.fill(0)
  cardDamageScaling.fill(0)
}

/*
 * --------------------------------------------------
 * Item (Structure of Arrays)
 * --------------------------------------------------
 */

export const MAX_ITEM_COUNT = 64

export const itemName = new Array<string>(64).fill("")
export const itemDescription = new Array<string>(64).fill("")
export const itemDamage = new Uint8Array(64)

/** Zero an index within the Item Structure of Arrays. */
export function zeroItem(idx: number) {
  itemName[idx] = ""
  itemDescription[idx] = ""
  itemDamage[idx] = 0
}

/** Zero the itemName field within the Item Structure of Arrays. */
export function zeroItemName() {
  itemName.fill("")
}

/** Zero the itemDescription field within the Item Structure of Arrays. */
export function zeroItemDescription() {
  itemDescription.fill("")
}

/** Zero the itemDamage field within the Item Structure of Arrays. */
export function zeroItemDamage() {
  itemDamage.fill(0)
}

/** Zero all fields within the Item Structure of Arrays. */
export function zeroItemData() {
  itemName.fill("")
  itemDescription.fill("")
  itemDamage.fill(0)
}