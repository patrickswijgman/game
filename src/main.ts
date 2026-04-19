import { drawRect, getHeight, getWidth, run } from "snuggy";
import { Action, BUTTON_WIDTH, Color, EnemyType, State } from "@/consts.ts";
import { enemy, enemyCards, player, playerCards, playerHandAction, setPlayerHandAction, setState, setStateNext, state, stateNext, stateTimer, zeroEnemyCards, zeroPlayerCards, zeroPlayerHandAction, zeroTimer } from "@/data.ts";
import { setupCards } from "@/lib/cards";
import { drawEnemy, enemyChooseCard, prepareEnemy } from "@/lib/enemy.ts";
import { setupItems } from "@/lib/items.ts";
import { drawPlayer, preparePlayer, setupPlayer } from "@/lib/player.ts";
import { loadResources } from "@/lib/resources.ts";
import { discardHand, getTotalValue, playCard, prepareDeck, pullCards } from "@/lib/sheet.ts";
import { drawButton, drawCards, drawDrawPile, drawHealth, drawTotalValues } from "@/lib/ui.ts";
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
    zeroPlayerHandAction();

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
        setStateNext(State.PREPARE_ROUND);
        break;

      case State.PREPARE_ROUND:
        discardHand(player);
        discardHand(enemy);
        pullCards(player, 3);
        pullCards(enemy, 3);
        setStateNext(State.ENEMY_CHOOSE_CARD);
        break;

      case State.ENEMY_CHOOSE_CARD:
        enemyChooseCard();
        setStateNext(State.PLAYER_CHOOSE_CARD);
        break;

      case State.PLAYER_CHOOSE_CARD:
        setPlayerHandAction(Action.CONFIRM_CARD);
        break;

      case State.REVEAL:
        setStateNext(State.ENEMY_CHOOSE_CARD);
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

  drawRoom();
  drawPlayer();
  drawEnemy();
  drawDrawPile();
  drawTotalValues();

  // End turn
  if (state === State.PLAYER_CHOOSE_CARD) {
    const x = getWidth() / 2 - BUTTON_WIDTH / 2;
    const y = 28;
    drawButton("End turn", x, y, onEndTurnButtonClick);
  }

  drawHealth(player, 10, 10, "left");
  drawCards(playerCards, 50, 85);
  drawHealth(enemy, getWidth() - 10, 10, "right");
  drawCards(enemyCards, getWidth() - 50, 85);
  drawCards(player.hand, getWidth() / 2, getHeight() - 35, onPlayerHandCardClick);
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

function onPlayerHandCardClick(i: number) {
  switch (playerHandAction) {
    case Action.CONFIRM_CARD:
      playCard(player, i, playerCards);
      setStateNext(State.REVEAL);
      break;
  }
}

function onEndTurnButtonClick() {
  setStateNext(State.RESOLVE);
}

run(320, setup, update);
