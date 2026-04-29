import { drawRect, isInputPressed, run, setFont, setFontOffset, setInputMap } from "snuggy";
import { EnemyVariant, Font, Input, Type } from "@/consts.ts";
import { active, isDestroyed, staggerTime, type } from "@/data.ts";
import { setupEnemy, updateEnemy } from "@/entities/enemy.ts";
import { setupPlayer, updatePlayer } from "@/entities/player.ts";
import { drawFramesPerSecond, drawHitboxes } from "@/lib/debug.ts";
import { addNewEntities, removeDestroyedEntities, setupEntities, sortEntities } from "@/lib/entities.ts";
import { isStaggered } from "@/lib/entity.ts";
import { loadResources } from "@/lib/resources.ts";
import { tickTimer } from "@/lib/timer.ts";

const WIDTH = 640;
const HEIGHT = 360;

let isDebugging = localStorage.getItem("debug") === "true";

async function setup() {
  await loadResources();

  const x = WIDTH / 2;
  const y = HEIGHT / 2;

  setFont(Font.DEFAULT);
  setFontOffset(0.5, -0.5);

  setInputMap({
    KeyW: Input.UP,
    KeyS: Input.DOWN,
    KeyA: Input.LEFT,
    KeyD: Input.RIGHT,
    F2: Input.DEBUG,
  });

  setupEntities();

  setupPlayer(x, y);
  setupEnemy(300, 100, EnemyVariant.MELEE);
  setupEnemy(350, 100, EnemyVariant.MELEE);
  setupEnemy(350, 150, EnemyVariant.MELEE);
}

function update() {
  removeDestroyedEntities();
  addNewEntities();
  sortEntities();

  drawRect(0, 0, 2000, 2000, "slategrey", true);

  for (let i = 0; i < active.length; i++) {
    const id = active[i];

    if (isDestroyed[id]) {
      continue;
    }

    tickTimer(staggerTime, id);

    if (isStaggered(id)) {
      continue;
    }

    switch (type[id]) {
      case Type.PLAYER:
        updatePlayer(id);
        break;
      case Type.ENEMY:
        updateEnemy(id);
        break;
    }
  }

  if (isInputPressed(Input.DEBUG)) {
    isDebugging = !isDebugging;
    localStorage.setItem("debug", isDebugging.toString());
  }

  if (isDebugging) {
    drawHitboxes();
    drawFramesPerSecond();
  }
}

run(WIDTH, HEIGHT, setup, update);
