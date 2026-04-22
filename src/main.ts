import { drawRect, getHeight, getWidth, isInputPressed, run } from "snuggy";
import { Color, END_TURN_STATES, Input, State } from "@/consts.ts";
import { enemy, enemyCards, level, player, playerCards, round, setLevel, setRound, setState, setStateNext, state, stateNext, stateTimer, zeroEnemyCards, zeroPlayerCards, zeroRound, zeroTimer } from "@/data.ts";
import { isSpecialCard, isValueCard, setupCards } from "@/lib/cards";
import { drawFramesPerSecond } from "@/lib/debug.ts";
import { drawEnemy, enemyChooseSpecialCard, enemyChooseValueCard, prepareEnemy } from "@/lib/enemy.ts";
import { drawPlayer, setupPlayer } from "@/lib/player.ts";
import { loadResources } from "@/lib/resources.ts";
import { drawCardsIntoHand, getTotalValue, playCard, prepareDeck } from "@/lib/sheet.ts";
import { drawCards, drawDrawPile, drawEndTurnButton, drawHealth, drawTotalValues } from "@/lib/ui.ts";
import { tickTimer } from "@/lib/utils.ts";

async function setup() {
  await loadResources();

  setupCards();
  setupPlayer();

  setStateNext(State.PREPARE_LEVEL);
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
      case State.PREPARE_LEVEL:
        zeroRound();
        prepareEnemy();
        prepareDeck(player);
        prepareDeck(enemy);
        drawCardsIntoHand(player, 4);
        drawCardsIntoHand(enemy, 4);
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

      case State.VICTORY:
      case State.DEFEAT:
        setLevel(level + 1);
        break;
    }
  }

  // Update
  switch (state) {
    case State.VICTORY:
      {
        if (tickTimer(stateTimer, 1000)) {
          setStateNext(State.PREPARE_LEVEL);
        }
      }
      break;
  }

  const canEndTurn = END_TURN_STATES.includes(state);

  if (isInputPressed(Input.END_TURN) && canEndTurn) {
    endTurn();
  }

  // Render
  const w = getWidth();
  const h = getHeight();

  // World
  drawBackground();
  if (player.health) {
    drawPlayer(50, h / 2 - 10);
  }
  if (enemy.health) {
    drawEnemy(w - 50, h / 2 - 10);
  }

  // UI
  drawDrawPile();
  drawHealth(w / 2, 10);
  drawTotalValues(w / 2, 25);
  if (canEndTurn) {
    drawEndTurnButton(w / 2, 40, endTurn);
  }
  drawCards(playerCards, 50, 80, 80);
  drawCards(enemyCards, w - 50, 80, 80);
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
  const isTie = playerTotal === enemyTotal;
  const isWinning = playerTotal > enemyTotal;
  const damage = Math.min(3, Math.abs(playerTotal - enemyTotal));

  if (isTie) {
    enemy.health -= 1;
    player.health -= 1;
  } else {
    if (isWinning) {
      enemy.health -= Math.min(enemy.health, damage);
    } else {
      player.health -= Math.min(player.health, damage);
    }
  }

  if (player.health === 0) {
    setStateNext(State.DEFEAT);
  } else if (enemy.health === 0) {
    setStateNext(State.VICTORY);
  } else {
    setStateNext(State.PREPARE_ROUND);
  }

  setRound(round + 1);
}

function drawBackground() {
  drawRect(0, 0, getWidth(), getHeight(), Color.GRASS, true);
}

run(320, setup, update);
