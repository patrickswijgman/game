import { FONT_HEIGHT } from "@/consts/render.js";
import { SceneId } from "@/consts/scene.js";
import { Type } from "@/consts/type.js";
import { game } from "@/data/game.js";
import { updateAttack } from "@/entities/attack.js";
import { updateEnemy } from "@/entities/enemy.js";
import { updatePlayer } from "@/entities/player.js";
import { updateTree } from "@/entities/tree.js";
import { onInventorySceneEnter, renderInventoryScene, setupInventoryScene, updateInventoryScene } from "@/scenes/inventory.js";
import { renderWorldScene, setupWorldScene } from "@/scenes/world.js";
import { loadAssets } from "@/usecases/assets.js";
import { debugEntities, debugFps, debugGrid, debugHitboxes } from "@/usecases/debug.js";
import { renderEnemyStatus } from "@/usecases/enemy.js";
import { destroyEntity, renderCombatLog, renderEntity, updateCombatLog, updatePhysics } from "@/usecases/entity.js";
import { renderEquipment } from "@/usecases/equipment.js";
import { getScene, setupPlayer, switchScene, transitionToNextScene } from "@/usecases/game.js";
import { renderHud } from "@/usecases/hud.js";
import { cleanupDestroyedEntities, getEntity, sortEntitiesOnDepth } from "@/usecases/scene.js";
import { InputCode, isInputPressed, resetTransform, run, scaleTransform, tickTimer, translateTransform, updateCamera } from "ridder";

let isDebugging = false;

run({
  width: 320,
  height: 180,

  setup: async () => {
    await loadAssets();

    setupPlayer();

    setupWorldScene();
    setupInventoryScene();

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

    if (transitionToNextScene()) {
      const scene = getScene(game.sceneId);

      switch (game.sceneId) {
        case SceneId.INVENTORY:
          onInventorySceneEnter(scene);
          break;
      }
    }

    const scene = getScene(game.sceneId);

    switch (scene.id) {
      case SceneId.INVENTORY:
        updateInventoryScene(scene);
        break;
    }

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
      case SceneId.INVENTORY:
        renderInventoryScene(scene);
        break;
    }

    for (const id of scene.render) {
      const e = getEntity(scene, id);
      renderEntity(e);
      renderEnemyStatus(e);
      renderCombatLog(e);
    }

    const player = getEntity(scene, scene.playerId);
    if (player.isPlayer) {
      renderHud();
      renderEquipment();
    }

    if (isDebugging) {
      debugGrid(scene);
      debugHitboxes(scene);

      resetTransform();
      scaleTransform(0.5, 0.5);
      debugFps();
      translateTransform(0, FONT_HEIGHT);
      debugEntities(scene);
    }
  },
});
