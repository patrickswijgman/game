import { getGridHeight, getGridValue, getGridWidth } from "engine/grid.js";
import { newMapRoom } from "entities/map/map-room.js";
import { getSession } from "game.js";
import { newScene } from "scene.js";

export function loadMapScene() {
  const scene = newScene("map");
  const session = getSession();

  for (let y = 0; y < getGridHeight(session.map.rooms); y++) {
    for (let x = 0; x < getGridWidth(session.map.rooms); x++) {
      const node = getGridValue(session.map.rooms, x, y);

      if (node.type) {
        newMapRoom(scene, 50 + x * 20, 50 + y * 20, node);
      }
    }
  }
}
