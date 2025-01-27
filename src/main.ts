import { game } from "@/data/game.js";
import { updateAttack } from "@/entities/attack.js";
import { updateEnemy } from "@/entities/enemy.js";
import { updatePlayer } from "@/entities/player.js";
import { updateTree } from "@/entities/tree.js";
import { SceneId } from "@/enums/scene.js";
import { Type } from "@/enums/type.js";
import { renderWorldScene, setupWorldScene } from "@/scenes/world.js";
import { loadAssets } from "@/usecases/assets.js";
import { debugFps, debugHitboxes } from "@/usecases/debug.js";
import { renderEnemyStatus } from "@/usecases/enemy.js";
import { destroyEntity, renderCombatLog, renderEntity, updateCombatLog, updatePhysics } from "@/usecases/entity.js";
import { getScene, switchScene, transitionToNextScene } from "@/usecases/game.js";
import { renderHud } from "@/usecases/hud.js";
import { cleanupDestroyedEntities, getEntity, sortEntitiesOnDepth } from "@/usecases/scene.js";
import { InputCode, isInputPressed, run, tickTimer, updateCamera } from "ridder";

let isDebugging = false;

run({
  width: 320,
  height: 180,

  setup: async () => {
    await loadAssets();

    setupWorldScene();

    switchScene(SceneId.WORLD);

    console.log(game);
  },

  update: () => {
    if (isInputPressed(InputCode.KEY_R)) {
      document.location.reload();
    }
    if (isInputPressed(InputCode.KEY_H)) {
      isDebugging = !isDebugging;
    }

    transitionToNextScene();

    const scene = getScene(game.sceneId);

    for (const id of scene.update) {
      const e = getEntity(scene, id);

      if (e.lifeTime && tickTimer(e.lifeTimer, e.lifeTime)) {
        destroyEntity(e);
        continue;
      }

      if (e.sheet.stats.healthMax && e.sheet.stats.health === 0) {
        destroyEntity(e);
        continue;
      }

      switch (e.type) {
        case Type.PLAYER:
          updatePlayer(e);
          break;
        case Type.ENEMY:
          updateEnemy(e);
          break;
        case Type.TREE:
          updateTree(e);
          break;
        case Type.ATTACK:
          updateAttack(e);
          break;
      }

      updatePhysics(e);
      updateCombatLog(e);

      if (e.isPlayer) {
        updateCamera(scene.camera, e.position.x, e.position.y);
      }
    }

    cleanupDestroyedEntities(scene);
    sortEntitiesOnDepth(scene);
  },

  render: () => {
    const scene = getScene(game.sceneId);

    switch (scene.id) {
      case SceneId.WORLD:
        renderWorldScene(scene);
        break;
    }

    for (const id of scene.render) {
      const e = getEntity(scene, id);
      renderEntity(e);
      renderEnemyStatus(e);
      renderCombatLog(e);
    }

    const player = getEntity(scene, scene.playerId);
    if (player) {
      renderHud(player);
    }

    if (isDebugging) {
      debugHitboxes(scene);
      debugFps();
    }
  },
});
