import fontUrl from "@assets/fonts/pixelmix.ttf";
import textureUrl from "@assets/textures/atlas.png";
import { Animation, Color, Font, Input, TextSize, Texture } from "@/consts.ts";
import { active, activeCount, animAngle, animId, animScaleX, animScaleY, animX, animY, hairId, isFlipped, isPlayer, isStaggered, pantsId, posX, posY, shadowId, shirtId, spriteId, velX, velY, weaponId } from "@/data/data.ts";
import { floorHeight, floorWidth, tileDstX, tileDstY, tileHeight, tileSrcX, tileSrcY, tileWidth } from "@/data/floor.ts";
import { objectType, objectX, objectY, TilemapObject } from "@/data/objects.ts";
import { addCameraTransform, setCameraBoundary, setCameraPosition, setCameraSmoothing, setCameraTarget, updateCamera } from "@/engine/camera.ts";
import { drawSprite, drawText, drawTexture, resetTransform, rotateTransform, scaleTransform, setFont, translateTransform } from "@/engine/canvas.ts";
import { flushEntities, setupEntityPool, sortEntities } from "@/engine/entities.ts";
import { loadFont } from "@/engine/fonts.ts";
import { run } from "@/engine/index.ts";
import { isInputDown, setInput } from "@/engine/input.ts";
import { delta, fps } from "@/engine/loop.ts";
import { loadRenderTexture, loadTexture, textures } from "@/engine/textures.ts";
import { setupPlayer, updatePlayer } from "@/entities/player.ts";
import { updateBreatheAnimation, updateStaggerAnimation, updateWalkAnimation } from "@/lib/anims.ts";

let isDebugging = localStorage.getItem("debug") === "true";

async function setupTextures() {
  await loadTexture(Texture.DEFAULT, textureUrl);
  const texture = textures[Texture.DEFAULT];
  const w = texture.width;
  const h = texture.height;

  await loadRenderTexture(Texture.FLASH, w, h, (ctx) => {
    ctx.drawImage(texture, 0, 0);
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
  });

  await loadRenderTexture(Texture.OUTLINE, w, h, (ctx) => {
    ctx.drawImage(texture, -1, 0);
    ctx.drawImage(texture, 1, 0);
    ctx.drawImage(texture, 0, -1);
    ctx.drawImage(texture, 0, 1);
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(texture, 0, 0);
  });

  await loadRenderTexture(Texture.DANGER, w, h, (ctx) => {
    ctx.drawImage(texture, -1, 0);
    ctx.drawImage(texture, 1, 0);
    ctx.drawImage(texture, 0, -1);
    ctx.drawImage(texture, 0, 1);
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = Color.DANGER;
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(texture, 0, 0);
  });

  await loadRenderTexture(Texture.FLOOR, 2048, 2048, (ctx) => {
    for (let i = 0; i < tileSrcX.length; i++) {
      ctx.drawImage(texture, tileSrcX[i], tileSrcY[i], tileWidth, tileHeight, tileDstX[i], tileDstY[i], tileWidth, tileHeight);
    }
  });
}

async function setupFonts() {
  await loadFont(Font.DEFAULT, fontUrl, "Pixelmix", 8, 0, 0);
  setFont(Font.DEFAULT);
}

function setupInputs() {
  setInput("ArrowUp", Input.UP);
  setInput("ArrowDown", Input.DOWN);
  setInput("ArrowLeft", Input.LEFT);
  setInput("ArrowRight", Input.RIGHT);

  setInput("KeyK", Input.UP);
  setInput("KeyJ", Input.DOWN);
  setInput("KeyH", Input.LEFT);
  setInput("KeyL", Input.RIGHT);

  setInput("F2", Input.DEBUG);
}

async function setup() {
  await setupTextures();
  await setupFonts();
  setupEntityPool();
  setupInputs();

  setCameraBoundary(0, 0, floorWidth, floorHeight);
  setCameraSmoothing(0.15);

  for (let i = 0; i < objectType.length; i++) {
    const t = objectType[i];
    const x = objectX[i];
    const y = objectY[i];

    switch (t) {
      case TilemapObject.PLAYER_SPAWN:
        setupPlayer(x, y);
        setCameraPosition(x, y);
        break;
      case TilemapObject.ENEMY_SPAWN:
        break;
    }
  }
}

function update() {
  resetTransform();
  addCameraTransform();
  drawTexture(Texture.FLOOR, 0, 0);

  flushEntities();
  sortEntities();

  for (let i = 0; i < activeCount; i++) {
    const id = active[i];

    if (isPlayer[id]) {
      updatePlayer(id);
      setCameraTarget(posX[id], posY[id]);
    }

    posX[id] += velX[id] * delta;
    posY[id] += velY[id] * delta;

    switch (animId[id]) {
      case Animation.BREATHE:
        updateBreatheAnimation(id);
        break;
      case Animation.WALK:
        updateWalkAnimation(id);
        break;
      case Animation.STAGGER:
        updateStaggerAnimation(id);
        break;
    }

    resetTransform();
    translateTransform(posX[id], posY[id]);
    addCameraTransform();

    if (isFlipped[id]) {
      scaleTransform(-1, 1);
    }

    const texture = getTexture(id);

    drawSprite(texture, shadowId[id]);

    if (animId[id]) {
      translateTransform(animX[id], animY[id]);
      scaleTransform(animScaleX[id], animScaleY[id]);
      rotateTransform(animAngle[id]);
    }

    drawSprite(texture, spriteId[id]);
    drawSprite(texture, pantsId[id]);
    drawSprite(texture, shirtId[id]);
    drawSprite(texture, hairId[id]);
    drawSprite(texture, weaponId[id]);
  }

  updateCamera();

  if (isInputDown(Input.DEBUG, true)) {
    isDebugging = !isDebugging;
    localStorage.setItem("debug", isDebugging.toString());
  }

  if (isDebugging) {
  }

  resetTransform();
  translateTransform(1, 1);
  scaleTransform(TextSize.XS);
  drawText(fps.toString(), 0, 0, "lime", "left", "top");
}

function getTexture(id: number) {
  if (isStaggered[id]) {
    return Texture.FLASH;
  }
  return Texture.DEFAULT;
}

run(320, 180, setup, update);
