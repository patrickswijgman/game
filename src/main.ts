import { run } from "snuggy";
import { cardDamageScaling, cardManaCost, cardName, itemDamage, itemName, setNextState, zeroGameData, zeroRunData } from "./data.ts";

const enum State {
  INIT,
  PLAYER_PREPARE,
}

const enum Card {
  SLASH,
}

const enum Item {
  LONGSWORD,
}

async function setup() {
  setupCards();
  setupItems();
  setupGame();
  setupRun();
}

function setupGame() {
  zeroGameData();
  setNextState(State.INIT);
}

function setupRun() {
  zeroRunData();
}

function setupCards() {
  let id: Card;

  id = Card.SLASH;
  cardName[id] = "Slash";
  cardManaCost[id] = 1;
  cardDamageScaling[id] = 0.5;
}

function setupItems() {
  let id: Item;

  id = Item.LONGSWORD;
  itemName[id] = "Longsword";
  itemDamage[id] = 2;
}

function update() {}

run(640, setup, update);
