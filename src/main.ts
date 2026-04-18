import { drawRect, drawSprite, getHeight, getWidth, resetTransform, run, scaleTransform, translateTransform } from "snuggy";
import { Action, BUTTON_WIDTH, CARD_HEIGHT, CARD_WIDTH, Color, EnemyType, State, Texture } from "@/consts.ts";
import { enemy, enemyCards, player, playerCards, playerHandAction, setPlayerHandAction, setState, setStateNext, state, stateNext, zeroEnemyCards, zeroPlayerCards, zeroPlayerHandAction } from "@/data.ts";
import { setupCards } from "@/lib/cards";
import { setupEnemy } from "@/lib/enemy.ts";
import { setupItems } from "@/lib/items.ts";
import { setupPlayer } from "@/lib/player.ts";
import { loadResources } from "@/lib/resources.ts";
import { discardHand, getTotalValue, playCard, prepareDeck, pullCards } from "@/lib/sheet.ts";
import { drawButton, drawCards, drawHealth, drawTextWithShadow } from "@/lib/ui.ts";
import { random } from "@/lib/utils.ts";

async function setup() {
  await loadResources();

  setupCards();
  setupItems();
  setupPlayer();

  setStateNext(State.PREPARE_ENEMY);
}

function update() {
  const playerTotal = getTotalValue(player, playerCards);
  const enemyTotal = getTotalValue(enemy, enemyCards);
  const isWinning = playerTotal > enemyTotal;

  if (state !== stateNext) {
    // Reset
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
      case State.PREPARE_ENEMY:
        setupEnemy(EnemyType.RAT);
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
        {
          if (enemy.deck.hand.length > 0) {
            const cardId = random(enemy.deck.hand.length);
            playCard(enemy, cardId, enemyCards);
          }
          setStateNext(State.PLAYER_CHOOSE_CARD);
        }
        break;

      case State.PLAYER_CHOOSE_CARD:
        setPlayerHandAction(Action.CONFIRM_CARD);
        break;

      case State.REVEAL:
        setStateNext(State.ENEMY_CHOOSE_CARD);
        break;

      case State.RESOLVE:
        {
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
        break;
    }
  }

  // Update
  switch (state) {
  }

  drawRect(0, 0, getWidth(), getHeight(), Color.GRASS, true);

  // Player
  if (player.health) {
    resetTransform();
    translateTransform(50, 80);
    drawSprite(Texture.ATLAS, -16, -31, 0, 0, 32, 32);
    drawSprite(Texture.ATLAS, -16, -3, 0, 32, 32, 16);
  }

  // Draw-pile
  resetTransform();
  translateTransform(10, getHeight() - 35);
  translateTransform(-1, 1);
  drawSprite(Texture.ATLAS, -4, -2, 64, 80, 32, 32);
  translateTransform(1, -1);
  drawSprite(Texture.ATLAS, -4, -2, 96, 80, 32, 32);
  translateTransform(CARD_WIDTH / 2, CARD_HEIGHT / 2);
  scaleTransform(1, 1);
  drawTextWithShadow(player.deck.draw.length.toString(), 0, 0, "white", "center", "middle");

  // Total values
  const color = isWinning ? "white" : Color.ERROR;
  resetTransform();
  translateTransform(getWidth() / 2, 15);
  drawSprite(Texture.ATLAS, -48, -12, 0, 224, 96, 32);
  scaleTransform(0.5, 0.5);
  drawTextWithShadow("vs", 0, 0, color, "center", "middle");
  scaleTransform(1.5, 1.5);
  translateTransform(-30, 0);
  drawTextWithShadow(playerTotal.toString(), 0, 0, color, "center", "middle");
  translateTransform(60, 0);
  drawTextWithShadow(enemyTotal.toString(), 0, 0, color, "center", "middle");

  if (state === State.PLAYER_CHOOSE_CARD) {
    const x = getWidth() / 2 - BUTTON_WIDTH / 2;
    const y = 28;
    drawButton("End turn", x, y, onEndTurnButtonClick);
  }

  // Player stuff
  drawHealth(player, 10, 10, "left");
  drawCards(playerCards, 50, 90);

  // Enemy stuff
  drawHealth(enemy, getWidth() - 10, 10, "right");
  drawCards(enemyCards, getWidth() - 50, 90);

  // Hand cards
  drawCards(player.deck.hand, getWidth() / 2, getHeight() - 35, onPlayerHandCardClick);
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
