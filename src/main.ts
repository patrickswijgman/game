import { drawSprite, getHeight, getWidth, resetTransform, run, translateTransform } from "snuggy";
import { Action, EnemyType, State, Texture } from "@/consts.ts";
import { action, enemy, enemyCards, player, playerCards, setAction, setState, setStateNext, state, stateNext, zeroEnemyCards, zeroPlayerCards } from "@/data.ts";
import { isCardValid, setupCards } from "@/lib/cards";
import { prepareDeck, pullCards } from "@/lib/deck.ts";
import { setupEnemy } from "@/lib/enemy.ts";
import { setupItems } from "@/lib/items.ts";
import { setupPlayer } from "@/lib/player.ts";
import { loadResources } from "@/lib/resources.ts";
import { drawCards } from "@/lib/ui.ts";
import { pick } from "@/lib/utils.ts";

async function setup() {
  await loadResources();

  setupCards();
  setupItems();
  setupPlayer();

  setStateNext(State.PREPARE_ENEMY);
}

function update() {
  if (state !== stateNext) {
    console.log("state", stateNext);

    // Reset
    setAction(Action.NONE);

    // Exit
    switch (state) {
    }

    setState(stateNext);

    // Enter
    switch (state) {
      case State.PREPARE_ENEMY:
        setupEnemy(EnemyType.RAT);
        setStateNext(State.PREPARE_DECKS);
        break;

      case State.PREPARE_DECKS:
        prepareDeck(player.deck);
        prepareDeck(enemy.deck);
        setStateNext(State.PREPARE_ROUND);
        break;

      case State.PREPARE_ROUND:
        zeroPlayerCards();
        zeroEnemyCards();
        pullCards(player.deck, 3);
        pullCards(enemy.deck, 3);
        setStateNext(State.ENEMY_CHOOSE_CARD);
        break;

      case State.ENEMY_CHOOSE_CARD:
        {
          const card = pick(enemy.deck.hand);
          if (isCardValid(card)) {
            enemyCards.push(card);
          }
          setStateNext(State.PLAYER_CHOOSE_CARD);
        }
        break;

      case State.PLAYER_CHOOSE_CARD:
        {
          if (player.deck.hand.length > 0) {
            setAction(Action.CONFIRM_CARD);
          } else {
            setStateNext(State.RESOLVE);
          }
        }
        break;

      case State.REVEAL:
        console.log(playerCards, enemyCards);
        setStateNext(State.ENEMY_CHOOSE_CARD);
        break;
    }
  }

  // Update
  switch (state) {
  }

  // Player
  resetTransform();
  translateTransform(50, 50);
  drawSprite(Texture.ATLAS, -16, -31, 0, 0, 32, 32);

  // Hand
  drawCards(player.deck.hand, getWidth() / 2, getHeight() - 35, handlePlayerHandCardAction);

  // Player cards
  drawCards(playerCards, 50, 55);

  // Enemy cards
  drawCards(enemyCards, getWidth() - 50, 55);
}

function handlePlayerHandCardAction(i: number) {
  switch (action) {
    case Action.CONFIRM_CARD:
      {
        const card = player.deck.hand[i];
        player.deck.hand.splice(i, 1);
        playerCards.push(card);
        setStateNext(State.REVEAL);
      }
      break;
  }
}

run(320, setup, update);
