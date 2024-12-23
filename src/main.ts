import { HEIGHT, WIDTH } from "consts.js";
import { renderDebugInfo } from "debug.js";
import { newPlayerStateMachine } from "entities/player.js";
import { renderEntity, updateEntityPhysics, updateEntityStateMachine } from "entity.js";
import { addScene, getCurrentScene, switchScene } from "game.js";
import { addItem } from "items.js";
import { newLongswordItem } from "items/longsword.js";
import { InputCode, isInputPressed, loadFont, loadSprite, loadTexture, run, setBackgroundColor, setCameraBounds, setCameraSmoothing, setFont, updateCamera } from "ridder";
import { cleanupDestroyedEntities, getEntity, getPlayer, sortEntitiesOnDepth } from "scene.js";
import { newMainScene } from "scenes/main.js";
import { addStateMachine } from "states.js";

run({
  width: WIDTH,
  height: HEIGHT,

  setup: async () => {
    await loadTexture("atlas", "textures/atlas.png");
    loadSprite("player", "atlas", 0, 0, 16, 16);
    loadSprite("player_shadow", "atlas", 0, 16, 16, 16);

    await loadFont("default", "fonts/pixelmix.ttf", "pixelmix", 8);

    addStateMachine("player", newPlayerStateMachine());

    addItem("longsword", newLongswordItem());

    addScene("main", newMainScene());

    setFont("default");
    setBackgroundColor("steelblue");
    setCameraSmoothing(0.05);

    switchScene("main");
  },

  update: () => {
    if (isInputPressed(InputCode.KEY_R)) {
      document.location.reload();
      return;
    }

    const scene = getCurrentScene();

    setCameraBounds(scene.bounds);

    cleanupDestroyedEntities(scene);

    for (const id of scene.active) {
      const e = getEntity(scene, id);
      updateEntityStateMachine(e, scene);
      updateEntityPhysics(e);
    }

    const player = getPlayer(scene);

    if (player) {
      updateCamera(player.pos.x, player.pos.y);
    }
  },

  render: () => {
    const scene = getCurrentScene();

    sortEntitiesOnDepth(scene);

    for (const id of scene.visible) {
      const e = getEntity(scene, id);
      renderEntity(e);
    }

    renderDebugInfo(scene);
  },
});
