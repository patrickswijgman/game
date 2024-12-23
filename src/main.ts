import { HEIGHT, WIDTH } from "consts.js";
import { renderEntity, renderShadow, updatePhysics, updateState } from "data/entity.js";
import { addScene, getCurrentScene, switchScene } from "data/game.js";
import { addItem } from "data/items.js";
import { cleanupDestroyedEntities, getEntity, getPlayer, sortEntitiesOnDepth } from "data/scene.js";
import { addState } from "data/states.js";
import { renderDebugInfo } from "debug.js";
import { newLongswordItem } from "items/longsword.js";
import { InputCode, isInputPressed, loadFont, loadSprite, loadTexture, run, setAlpha, setBackgroundColor, setCameraBounds, setCameraSmoothing, setFont, updateCamera } from "ridder";
import { newMainScene } from "scenes/main.js";
import { newPlayerIdleState } from "states/player.js";
import { newStunnedState } from "states/stunned.js";

run({
  width: WIDTH,
  height: HEIGHT,

  setup: async () => {
    // ASSETS
    await loadTexture("atlas", "textures/atlas.png");
    loadSprite("player", "atlas", 0, 0, 16, 16);
    loadSprite("player_shadow", "atlas", 0, 16, 16, 16);
    await loadFont("default", "fonts/pixelmix.ttf", "pixelmix", 8);

    // STATES
    addState("stunned", newStunnedState());
    addState("player_idle", newPlayerIdleState());

    // ITEMS
    addItem("longsword", newLongswordItem());

    // SCENES
    addScene("main", newMainScene());

    // RENDER
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
      updateState(e, scene);
      updatePhysics(e);
    }

    const player = getPlayer(scene);

    if (player) {
      updateCamera(player.pos.x, player.pos.y);
    }
  },

  render: () => {
    const scene = getCurrentScene();

    sortEntitiesOnDepth(scene);

    setAlpha(0.4);
    for (const id of scene.visible) {
      const e = getEntity(scene, id);
      renderShadow(e);
    }
    setAlpha(1);

    for (const id of scene.visible) {
      const e = getEntity(scene, id);
      renderEntity(e);
    }

    renderDebugInfo(scene);
  },
});
