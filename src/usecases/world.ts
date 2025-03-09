import { MAX_ENEMIES } from "@/consts/entity.js";
import { ENEMY_SPAWN_TIME_MAX, ENEMY_SPAWN_TIME_MIN, ENEMY_SPAWN_TIME_REDUCE } from "@/consts/world.js";
import { Entity } from "@/data/entity.js";
import { game } from "@/data/game.js";
import { writeRandomPointInPerimeterBetweenRectangles } from "@/engine/rectangle.js";
import { addMeleeEnemy } from "@/entities/enemy-melee.js";
import { getEntity } from "@/usecases/entity.js";
import { isPlayerAlive } from "@/usecases/player.js";
import { clamp, Rectangle, resetTimer, tickTimer } from "ridder";

export function spawnEnemies() {
  if (tickTimer(game.spawnTimer, game.spawnTime)) {
    if (isPlayerAlive() && game.enemies.length < MAX_ENEMIES) {
      writeRandomPointInPerimeterBetweenRectangles(game.boundsOutside, game.bounds, game.spawnPosition);
      addMeleeEnemy(game.spawnPosition.x, game.spawnPosition.y);
      game.spawnTime = clamp(game.spawnTime - ENEMY_SPAWN_TIME_REDUCE, ENEMY_SPAWN_TIME_MIN, ENEMY_SPAWN_TIME_MAX);
    }

    resetTimer(game.spawnTimer);
  }
}

export function setPlayer(e: Entity) {
  game.playerId = e.id;
}

export function getPlayer() {
  return getEntity(game.playerId);
}

export function addBody(body: Rectangle) {
  game.bodies.push(body);
}
