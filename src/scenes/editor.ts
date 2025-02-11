import { EnemyId } from "@/consts/enemy.js";
import { Type } from "@/consts/entity.js";
import { TILE_SIZE } from "@/consts/map.js";
import { FONT_HEIGHT } from "@/consts/render.js";
import { SceneId } from "@/consts/scene.js";
import { editor, entities, SaveEntity } from "@/data/editor.js";
import { Scene } from "@/data/scene.js";
import { addEnemy } from "@/entities/enemy.js";
import { addPlayer } from "@/entities/player.js";
import { addTree } from "@/entities/tree.js";
import { destroyEntity } from "@/usecases/entity.js";
import { getScene } from "@/usecases/game.js";
import { getEntity } from "@/usecases/scene.js";
import world from "@/world.json";
import { addVectorScaled, applyCameraTransform, clamp, drawLine, drawRect, drawText, getDelta, getGridHeight, getGridWidth, InputCode, isInputDown, isInputPressed, isInsideGridBounds, normalizeVector, resetTransform, resetVector, scaleTransform, scaleVector, setCameraPosition, setVector, translateTransform, updateCamera } from "ridder";

export function setupEditorScene() {
  const scene = getScene(SceneId.EDITOR);

  scene.isPaused = true;

  for (let i = 0; i < entities.length; i++) {
    console.log(`${i} - ${entities[i].name}`);
  }

  for (const e of world) {
    addEntityFromType(scene.id, e.type, e.x, e.y);
  }

  setVector(editor.position, scene.bounds.w / 2, scene.bounds.h / 2);
  setCameraPosition(scene.camera, editor.position.x, editor.position.y);

  return scene;
}

export function updateEditorScene(scene: Scene) {
  if (isInputDown(InputCode.KEY_CTRL_LEFT) && isInputPressed(InputCode.KEY_S, true)) {
    const data = scene.all.map<SaveEntity>((id) => {
      const e = getEntity(scene, id);
      return {
        type: e.type,
        x: e.position.x,
        y: e.position.y,
      };
    });

    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
  }

  resetVector(editor.velocity);

  if (isInputDown(InputCode.KEY_W)) {
    editor.velocity.y -= 1;
  }
  if (isInputDown(InputCode.KEY_S)) {
    editor.velocity.y += 1;
  }
  if (isInputDown(InputCode.KEY_A)) {
    editor.velocity.x -= 1;
  }
  if (isInputDown(InputCode.KEY_D)) {
    editor.velocity.x += 1;
  }

  normalizeVector(editor.velocity);
  scaleVector(editor.velocity, 5);
  addVectorScaled(editor.position, editor.velocity, getDelta());

  updateCamera(scene.camera, editor.position.x, editor.position.y);
  updateMouseGridPosition(scene);

  if (isInputPressed(InputCode.KEY_ENTER, true)) {
    const input = prompt("Entity Index");
    if (input) {
      editor.selectedEntityIdx = Number(input);
    }
  }

  if (isInputPressed(InputCode.KEY_Q)) {
    scrollEntityList(-1);
  }
  if (isInputPressed(InputCode.KEY_E)) {
    scrollEntityList(1);
  }

  if (isInputDown(InputCode.MOUSE_LEFT)) {
    const entity = getSelectedEntity();

    if (!entity) return;
    if (getCount(scene, entity.type) >= entity.limit) return;
    if (isOccupied(scene, editor.gridPosition.x, editor.gridPosition.y)) return;
    if (!isWithinBounds(scene, editor.gridPosition.x, editor.gridPosition.y)) return;

    const worldX = editor.gridPosition.x * TILE_SIZE;
    const worldY = editor.gridPosition.y * TILE_SIZE;
    const offsetX = entity.offset.x < 1 ? Math.ceil(entity.offset.x * TILE_SIZE) : entity.offset.x;
    const offsetY = entity.offset.y < 1 ? Math.ceil(entity.offset.y * TILE_SIZE) : entity.offset.y;
    const x = worldX + offsetX;
    const y = worldY + offsetY;
    addEntityFromType(scene.id, entity.type, x, y);
  }

  if (isInputDown(InputCode.MOUSE_RIGHT)) {
    const entity = getSelectedEntity();
    if (!entity) {
      return;
    }

    removeEntities(scene, editor.gridPosition.x, editor.gridPosition.y);
  }
}

function addEntityFromType(sceneId: SceneId, type: Type, x: number, y: number) {
  switch (type) {
    case Type.PLAYER:
      addPlayer(sceneId, x, y);
      break;
    case Type.ENEMY:
      addEnemy(sceneId, x, y, EnemyId.DUMMY);
      break;
    case Type.TREE:
      addTree(sceneId, x, y);
      break;
  }
}

function getSelectedEntity() {
  return entities[editor.selectedEntityIdx];
}

function getCount(scene: Scene, type: Type) {
  return scene.all.reduce((count, id) => {
    const e = getEntity(scene, id);
    return e.type === type ? count + 1 : count;
  }, 0);
}

function isOccupied(scene: Scene, gridX: number, gridY: number) {
  const x = gridX * TILE_SIZE;
  const y = gridY * TILE_SIZE;
  const w = x + TILE_SIZE;
  const h = y + TILE_SIZE;
  return scene.all.some((id) => {
    const e = getEntity(scene, id);
    return e.position.x > x && e.position.x < w && e.position.y > y && e.position.y < h;
  });
}

function isWithinBounds(scene: Scene, gridX: number, gridY: number) {
  return isInsideGridBounds(scene.grid, gridX, gridY);
}

function removeEntities(scene: Scene, gridX: number, gridY: number) {
  const x = gridX * TILE_SIZE;
  const y = gridY * TILE_SIZE;
  const w = x + TILE_SIZE;
  const h = y + TILE_SIZE;
  for (const id of scene.all) {
    const e = getEntity(scene, id);
    if (e.position.x > x && e.position.x < w && e.position.y > y && e.position.y < h) {
      destroyEntity(e);
    }
  }
}

function scrollEntityList(scroll: number) {
  editor.selectedEntityIdx = clamp(editor.selectedEntityIdx + scroll, 0, entities.length - 1);
}

function updateMouseGridPosition(scene: Scene) {
  editor.gridPosition.x = Math.floor(scene.camera.mousePosition.x / TILE_SIZE);
  editor.gridPosition.y = Math.floor(scene.camera.mousePosition.y / TILE_SIZE);
}

export function renderEditorScene(scene: Scene) {
  resetTransform();
  applyCameraTransform(scene.camera);
  renderGrid(scene);
  if (isWithinBounds(scene, editor.gridPosition.x, editor.gridPosition.y)) {
    drawRect(editor.gridPosition.x * TILE_SIZE, editor.gridPosition.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  resetTransform();
  translateTransform(5, 5);
  scaleTransform(0.5, 0.5);
  drawText(`${editor.gridPosition.x}, ${editor.gridPosition.y}`, 0, 0);

  const entity = getSelectedEntity();
  translateTransform(0, FONT_HEIGHT);
  drawText(entity ? `${editor.selectedEntityIdx} - ${entity.name}` : `${editor.selectedEntityIdx} - INVALID`, 0, 0, entity ? "white" : "red");
}

function renderGrid(scene: Scene) {
  resetTransform();
  applyCameraTransform(scene.camera);
  const w = getGridWidth(scene.grid);
  const h = getGridHeight(scene.grid);
  for (let x = 0; x <= w; x++) {
    drawLine(x * TILE_SIZE, 0, x * TILE_SIZE, h * TILE_SIZE, "rgba(255, 255, 255, 0.1)");
  }
  for (let y = 0; y <= h; y++) {
    drawLine(0, y * TILE_SIZE, w * TILE_SIZE, y * TILE_SIZE, "rgba(255, 255, 255, 0.1)");
  }
}
