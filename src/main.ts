import { drawRect, getRandomNumber, isInputPressed, run, setCameraBoundary, setCameraPosition, setCameraSmoothing, setCameraTarget, setFont, setFontOffset, setInputMap, updateCamera } from "snuggy";
import { Enemy, Font, Input, MAX_ENEMY_COUNT, Type } from "@/consts.ts";
import { active, activeCount, cooldownTime, enemiesCount, healthDepleteTime, isDestroyed, lifeTime, posX, posY, staggerTime, type } from "@/data.ts";
import { setupEnemy, updateEnemy } from "@/entities/enemy.ts";
import { setupPlayer, updatePlayer } from "@/entities/player.ts";
import { updateProjectile } from "@/entities/projectile.ts";
import { drawFramesPerSecond, drawHitboxes } from "@/lib/debug.ts";
import { addNewEntities, destroyEntity, removeDestroyedEntities, setupEntities, sortEntities } from "@/lib/entities.ts";
import { drawEntity, drawHealthBar, isStaggered, updateHealthBar } from "@/lib/entity.ts";
import { loadResources } from "@/lib/resources.ts";
import { separateEnemies } from "@/lib/steering.ts";
import { tickTimer } from "@/lib/timer.ts";

const width = 2000;
const height = 2000;

let isDebugging = localStorage.getItem("debug") === "true";

async function setup() {
  await loadResources();

  const x = width / 2;
  const y = height / 2;

  setCameraPosition(x, y);
  setCameraSmoothing(0.1);
  setCameraBoundary(0, 0, width, height);

  setFont(Font.DEFAULT);
  setFontOffset(0.5, -0.5);

  setInputMap({
    KeyW: Input.UP,
    KeyS: Input.DOWN,
    KeyA: Input.LEFT,
    KeyD: Input.RIGHT,
    F2: Input.DEBUG,
    0: Input.ATTACK,
  });

  setupEntities();

  setupPlayer(x, y);

  for (let i = 0; i < MAX_ENEMY_COUNT; i++) {
    setupEnemy(getRandomNumber(0, width), getRandomNumber(0, height), Enemy.MELEE);
  }
}

function update() {
  removeDestroyedEntities();
  addNewEntities();
  sortEntities();

  drawRect(0, 0, width, height, "slategrey", true);

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
    tickTimer(healthDepleteTime, id);

    if (!isStaggered(id)) {
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

    drawEntity(id);

    if (type[id] === Type.ENEMY) {
      updateHealthBar(id);
      drawHealthBar(id);
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
