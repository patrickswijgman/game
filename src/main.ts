import { drawRect, getHeight, getWidth, isInputPressed, run } from "snuggy";
import { Color, END_TURN_STATES, EnemyType, Input, State } from "@/consts.ts";
import { enemy, enemyCards, player, playerCards, setState, setStateNext, state, stateNext, stateTimer, zeroEnemyCards, zeroPlayerCards, zeroTimer } from "@/data.ts";
import { isSpecialCard, isValueCard, setupCards } from "@/lib/cards";
import { drawFramesPerSecond } from "@/lib/debug.ts";
import { drawEnemy, enemyChooseSpecialCard, enemyChooseValueCard, prepareEnemy } from "@/lib/enemy.ts";
import { setupItems } from "@/lib/items.ts";
import { drawPlayer, preparePlayer, setupPlayer } from "@/lib/player.ts";
import { loadResources } from "@/lib/resources.ts";
import { drawCardsIntoHand, getTotalValue, playCard, prepareDeck } from "@/lib/sheet.ts";
import { drawCards, drawDrawPile, drawEndTurnButton, drawHealth, drawTotalValues } from "@/lib/ui.ts";
import { tickTimer } from "@/lib/utils.ts";

async function setup() {
  await loadResources();

  setupCards();
  setupItems();
  setupPlayer();

  setStateNext(State.PREPARE_PLAYER);
}

function update() {
  while (state !== stateNext) {
    // Reset
    zeroTimer(stateTimer);

    // Exit
    switch (state) {
      case State.RESOLVE:
        zeroPlayerCards();
        zeroEnemyCards();
        break;
    }

    setState(stateNext);

    // Enter
    switch (state) {
      case State.PREPARE_PLAYER:
        preparePlayer();
        setStateNext(State.PREPARE_ENEMY);
        break;

      case State.PREPARE_ENEMY:
        prepareEnemy(EnemyType.RAT);
        setStateNext(State.PREPARE_DECKS);
        break;

      case State.PREPARE_DECKS:
        prepareDeck(player);
        prepareDeck(enemy);
        drawCardsIntoHand(player, player.drawAmount - 1);
        drawCardsIntoHand(enemy, enemy.drawAmount - 1);
        setStateNext(State.PREPARE_ROUND);
        break;

      case State.PREPARE_ROUND:
        drawCardsIntoHand(player, 1);
        drawCardsIntoHand(enemy, 1);
        setStateNext(State.ENEMY_CHOOSE_VALUE_CARD);
        break;

      case State.ENEMY_CHOOSE_VALUE_CARD:
        enemyChooseValueCard();
        setStateNext(State.PLAYER_CHOOSE_VALUE_CARD);
        break;

      case State.PLAYER_CHOOSE_VALUE_CARD:
        break;

      case State.ENEMY_CHOOSE_SPECIAL_CARD:
        enemyChooseSpecialCard();
        setStateNext(State.PLAYER_CHOOSE_SPECIAL_CARD);
        break;

      case State.PLAYER_CHOOSE_SPECIAL_CARD:
        break;

      case State.PLAYER_CONFIRMED_CARD:
        setStateNext(State.ENEMY_CHOOSE_SPECIAL_CARD);
        break;

      case State.RESOLVE:
        resolveRound();
        break;
    }
  }

  // Update
  switch (state) {
    case State.VICTORY:
      {
        if (tickTimer(stateTimer, 1000)) {
          setStateNext(State.PREPARE_PLAYER);
        }
      }
      break;
  }

  const canEndTurn = END_TURN_STATES.includes(state);

  if (isInputPressed(Input.END_TURN) && canEndTurn) {
    endTurn();
  }

  // World
  drawRoom();
  if (player.health) {
    drawPlayer();
  }
  if (enemy.health) {
    drawEnemy();
  }

  // UI
  const w = getWidth();
  const h = getHeight();
  drawDrawPile();
  drawTotalValues(w / 2, 18);
  if (canEndTurn) {
    drawEndTurnButton(w / 2, 12, endTurn);
  }
  drawHealth(player, 10, 10, "left");
  drawCards(playerCards, 50, 85, 80);
  drawHealth(enemy, w - 10, 10, "right");
  drawCards(enemyCards, w - 50, 85, 80);
  drawCards(player.hand, w / 2, h - 35, 120, confirmCard);
  drawFramesPerSecond();
}

function confirmCard(i: number) {
  const cardId = player.hand[i];

  switch (state) {
    case State.PLAYER_CHOOSE_VALUE_CARD:
      {
        if (isValueCard(cardId)) {
          playCard(player, i, playerCards);
          setStateNext(State.PLAYER_CONFIRMED_CARD);
        }
      }
      break;

    case State.PLAYER_CHOOSE_SPECIAL_CARD:
      {
        if (isSpecialCard(cardId)) {
          playCard(player, i, playerCards);
          setStateNext(State.PLAYER_CONFIRMED_CARD);
        }
      }
      break;
  }
}

function endTurn() {
  setStateNext(State.RESOLVE);
}

function resolveRound() {
  const playerTotal = getTotalValue(player, playerCards);
  const enemyTotal = getTotalValue(enemy, enemyCards);
  const isWinning = playerTotal > enemyTotal;

  if (isWinning) {
    enemy.health -= 1;
    if (enemy.health === 0) {
      setStateNext(State.VICTORY);
    } else {
      setStateNext(State.PREPARE_ROUND);
    }
  } else {
    player.health -= 1;
    if (player.health === 0) {
      setStateNext(State.DEFEAT);
    } else {
      setStateNext(State.PREPARE_ROUND);
    }
  }
}
function drawRoom() {
  drawRect(0, 0, getWidth(), getHeight(), Color.GRASS, true);
}

run(320, setup, update);
