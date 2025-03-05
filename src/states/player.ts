import { updateBreathAnimation } from "@/anims/breath.js";
import { updateWalkAnimation } from "@/anims/walk.js";
import { StateId } from "@/consts/state.js";
import { Entity } from "@/data/entity.js";
import { setState } from "@/usecases/entity.js";
import { aim, attack, move } from "@/usecases/player.js";

export function onPlayerStateEnter(e: Entity) {
  switch (e.stateId) {
    case StateId.NONE:
      setState(e, StateId.PLAYER_IDLE);
      break;
  }
}

export function onPlayerStateUpdate(e: Entity) {
  switch (e.stateId) {
    case StateId.PLAYER_IDLE:
      {
        updateBreathAnimation(e);
        aim(e);
        if (move(e)) {
          setState(e, StateId.PLAYER_WALK);
        }
        if (attack()) {
          setState(e, StateId.ATTACK);
        }
      }
      break;

    case StateId.PLAYER_WALK:
      {
        updateWalkAnimation(e);
        aim(e);
        if (!move(e)) {
          setState(e, StateId.PLAYER_IDLE);
        }
        if (attack()) {
          setState(e, StateId.ATTACK);
        }
      }
      break;

    case StateId.ATTACK:
      {
        move(e, 0.5);
      }
      break;
  }
}

export function onPlayerStateExit() {}
