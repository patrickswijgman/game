import { drawRect, getRandomNumber, isInputPressed, run, setCameraBoundary, setCameraPosition, setCameraSmoothing, setCameraTarget, setFont, setFontOffset, setInput, updateCamera } from "snuggy";
import { Anim, Enemy, Font, Input, MAX_ENEMY_COUNT, ROOM_HEIGHT, ROOM_WIDTH, Type } from "@/consts.ts";
import { active, activeCount, anim, cooldownTime, enemiesCount, healthDepleteTime, hitboxW, immuneTime, isDestroyed, lifeTime, posX, posY, recoveryTime, staggerTime, type } from "@/data.ts";
import { setupEnemy, updateEnemy } from "@/entities/enemy.ts";
import { setupPlayer, updatePlayer } from "@/entities/player.ts";
import { updateProjectile } from "@/entities/projectile.ts";
import { updateBreatheAnimation, updateWalkAnimation } from "@/lib/anims.ts";
import { drawFramesPerSecond, drawHitboxes } from "@/lib/debug.ts";
import { addNewEntities, destroyEntity, removeDestroyedEntities, setupEntities, sortEntities } from "@/lib/entities.ts";
import { drawEntity, drawHealthBar, updateHealthBar } from "@/lib/entity.ts";
import { loadResources } from "@/lib/resources.ts";
import { separateEnemies } from "@/lib/steering.ts";
import { tickTimer } from "@/lib/timer.ts";

let isDebugging = localStorage.getItem("debug") === "true";

async function setup() {
  await loadResources();

  const x = ROOM_WIDTH / 2;
  const y = ROOM_HEIGHT / 2;

  setCameraPosition(x, y);
  setCameraSmoothing(0.1);
  setCameraBoundary(0, 0, ROOM_WIDTH, ROOM_HEIGHT);

  setFont(Font.DEFAULT);
  setFontOffset(0.5, -0.5);

  setInput("KeyW", Input.UP);
  setInput("KeyS", Input.DOWN);
  setInput("KeyA", Input.LEFT);
  setInput("KeyD", Input.RIGHT);
  setInput("F2", Input.DEBUG);
  setInput("0", Input.ATTACK);

  setupEntities();

  setupPlayer(x, y);

  for (let i = 0; i < 3; i++) {
    if (enemiesCount < MAX_ENEMY_COUNT) {
      setupEnemy(getRandomNumber(0, ROOM_WIDTH), getRandomNumber(0, ROOM_HEIGHT), Enemy.MELEE);
    }
  }
}

function update() {
  removeDestroyedEntities();
  addNewEntities();
  sortEntities();

  drawRect(0, 0, ROOM_WIDTH, ROOM_HEIGHT, "slategrey", true);

  separateEnemies();

  for (let i = 0; i < activeCount; i++) {
    const id = active[i];

    if (tickTimer(lifeTime, id)) {
      destroyEntity(id);
    }

    if (isDestroyed[id]) {
      continue;
    }

    tickTimer(staggerTime, id);
    tickTimer(cooldownTime, id);
    tickTimer(recoveryTime, id);
    tickTimer(immuneTime, id);
    tickTimer(healthDepleteTime, id);

    if (staggerTime[id] === 0) {
      switch (type[id]) {
        case Type.PLAYER:
          updatePlayer(id);
          setCameraTarget(posX[id], posY[id]);
          break;
        case Type.ENEMY:
          updateEnemy(id);
          break;
        case Type.PROJECTILE:
          updateProjectile(id);
          break;
      }
    }

    switch (anim[id]) {
      case Anim.BREATHE:
        updateBreatheAnimation(id);
        break;
      case Anim.WALK:
        updateWalkAnimation(id);
        break;
    }

    drawEntity(id);

    if (type[id] === Type.ENEMY) {
      updateHealthBar(id);
      drawHealthBar(id, hitboxW[id], 2);
    }
  }

  updateCamera();

  if (isInputPressed(Input.DEBUG)) {
    isDebugging = !isDebugging;
    localStorage.setItem("debug", isDebugging.toString());
  }

  if (isDebugging) {
    drawHitboxes();
  }

  drawFramesPerSecond();
}

run(640, 360, setup, update);
