import { Type } from "@/consts/entity.js";
import { FONT_HEIGHT } from "@/consts/render.js";
import { SceneId } from "@/consts/scene.js";
import { game } from "@/data/game.js";
import { updateAttack } from "@/entities/attack.js";
import { updateEnemy } from "@/entities/enemy.js";
import { updatePlayer } from "@/entities/player.js";
import { updateTree } from "@/entities/tree.js";
import { renderCharacterScene, setupCharacterScene, updateCharacterScene } from "@/scenes/character.js";
import { renderEditorScene, setupEditorScene, updateEditorScene } from "@/scenes/editor.js";
import { onInventorySceneEnter, renderInventoryScene, setupInventoryScene, updateInventoryScene } from "@/scenes/inventory.js";
import { renderWorldScene, setupWorldScene } from "@/scenes/world.js";
import { loadAssets } from "@/usecases/assets.js";
import { debugEntities, debugFps, debugGrid, debugHitboxes } from "@/usecases/debug.js";
import { renderEnemyStatus } from "@/usecases/enemy.js";
import { destroyIfDead, destroyIfExpired, renderCombatLog, renderEntity, updateCombatLog, updatePhysics } from "@/usecases/entity.js";
import { renderEquipment } from "@/usecases/equipment.js";
import { getScene, setupPlayer, switchScene, transitionToNextScene } from "@/usecases/game.js";
import { renderHud } from "@/usecases/hud.js";
import { cleanupDestroyedEntities, getEntity, revaluateActiveEntities, setActiveEntities, sortEntitiesOnDepth } from "@/usecases/scene.js";
import { InputCode, isInputPressed, resetTransform, run, scaleTransform, translateTransform, updateCamera } from "ridder";

let isDebugging = false;

run({
  width: 320,
  height: 180,

  setup: async () => {
    await loadAssets();

    setupPlayer();

    setupEditorScene();
    setupWorldScene();
    setupInventoryScene();
    setupCharacterScene();

    switchScene(SceneId.EDITOR);
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

      setActiveEntities(scene);

      switch (game.sceneId) {
        case SceneId.INVENTORY:
          onInventorySceneEnter(scene);
          break;
      }
    }

    const scene = getScene(game.sceneId);

    revaluateActiveEntities(scene);

    switch (scene.id) {
      case SceneId.EDITOR:
        updateEditorScene(scene);
        break;
      case SceneId.INVENTORY:
        updateInventoryScene(scene);
        break;
      case SceneId.CHARACTER:
        updateCharacterScene(scene);
        break;
    }

    if (!scene.isPaused) {
      for (const id of scene.active) {
        const e = getEntity(scene, id);

        destroyIfExpired(e);
        destroyIfDead(e);

        if (e.isDestroyed) {
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
    }

    cleanupDestroyedEntities(scene);
    sortEntitiesOnDepth(scene, scene.active);
  },

  render: () => {
    const scene = getScene(game.sceneId);

    switch (scene.id) {
      case SceneId.EDITOR:
        renderEditorScene(scene);
        break;
      case SceneId.WORLD:
        renderWorldScene(scene);
        break;
      case SceneId.INVENTORY:
        renderInventoryScene(scene);
        break;
      case SceneId.CHARACTER:
        renderCharacterScene(scene);
        break;
    }

    for (const id of scene.active) {
      const e = getEntity(scene, id);
      renderEntity(e);
      renderEnemyStatus(e);
      renderCombatLog(e);
    }

    switch (scene.id) {
      case SceneId.WORLD:
        renderHud();
        renderEquipment();
        break;
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
