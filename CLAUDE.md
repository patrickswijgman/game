# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server with hot reload
npm run build      # tsc + biome check + vite build
npm run gen        # Regenerate src/data.ts from the /data schema
```

There are no tests.

## Architecture

This is a TypeScript 2D game built with Vite and a local graphics library called **snuggy**. It uses Data-Oriented Design (DOD) with a Structure of Arrays (SoA) pattern for entity storage.

### Data layer (`src/data.ts`)

**Auto-generated — do not edit directly.** Regenerate with `npm run gen` after modifying `data.md` (the schema file in the root). Contains two sections:

- **`game` group** — pool/queue arrays (`active`, `free`, `toAdd`, `toRemove`, up to 2000 each) and secondary indexes (`enemies[]`, `enemiesCount`), plus scalar state (`playerId`, `serialCount`).
- **`entity` SoA** — flat typed arrays for up to 2000 entities covering physics, animation, render, stats, combat, health bar, timers, and flags.

### Entity lifecycle (`src/lib/entities.ts`)

Entities are numeric IDs indexing into the SoA arrays. `nextEntity()` pulls from the free pool and queues the ID in `toAdd`. `destroyEntity()` marks `isDestroyed` and queues in `toRemove`. Each frame, `removeDestroyedEntities()` removes via **swap-to-back** (O(1)), then `addNewEntities()` flushes the add queue. `sortEntities()` depth-sorts `active[]` by Y position (plus `depth[]` offset) using insertion sort.

### Per-entity updates (`src/entities/`)

Each entity type gets a `setup*(x, y)` that calls `setupEntity()` and `update*(id)` that runs each frame. The main loop in `src/main.ts` dispatches by `type[id]`. Three types are implemented: `PLAYER`, `ENEMY`, and `PROJECTILE`.

### Main loop (`src/main.ts`)

`setup()` loads assets, initializes the entity pool, and spawns entities. `update()` runs each frame: flush entity queues → sort → clear background → `separateEnemies()` → iterate `active[]` ticking timers, dispatching per-type updates, running animations, drawing entities → follow camera.

Entity movement is frozen while `staggerTime[id] > 0` (player is immune during `immuneTime`).

### Timer system (`src/lib/timer.ts`)

All cooldowns/durations are `Float32Array` fields (milliseconds). `tickTimer(timerArray, id)` decrements by `time` each frame and returns `true` exactly when the timer hits zero — used as a one-shot trigger. Common timers: `staggerTime`, `cooldownTime`, `recoveryTime`, `immuneTime`, `delayTime`, `lifeTime`, `healthDepleteTime`.

### Combat and projectiles (`src/entities/projectile.ts`)

`setupProjectile(variant, casterId)` spawns a projectile from the caster's position, aimed at `targetX/Y[casterId]`, orbited to the edge of the caster's hitbox. Each projectile carries a unique `serial` to prevent hitting the same target twice. `dealDamageToTarget` applies damage, sets `staggerTime`, and triggers health deplete animation.

### Steering (`src/lib/steering.ts`)

- `seek(id, x, y, scalar)` — adds normalized velocity toward a point, scaled by `speed[id]`
- `halt(id, x, y)` — zeroes velocity when within `range[id]`
- `separate(id)` — applies pre-computed separation force from `separateEnemies()`, which runs an O(n²) pairwise loop over `enemies[]` before the main entity loop

### Rendering (`src/lib/entity.ts`, `src/lib/resources.ts`)

`drawEntity` applies transforms (translate → camera → flip → rotate → anim offsets) then draws shadow, weapon, and sprite. The texture used is determined per-entity: `ATLAS_FLASH` when staggered, `ATLAS_OUTLINED_DANGER` when in attack delay, `ATLAS_FLASH_DANGER` for enemy-cast projectiles, `ATLAS` otherwise.

Render textures are created in `loadResources()` after `loadTexture` resolves. `ATLAS_FLASH` and `ATLAS_FLASH_DANGER` use `source-in` to tint the atlas white/red. `ATLAS_OUTLINED` and `ATLAS_OUTLINED_DANGER` draw the atlas offset ±1px in four directions, tint with `source-in`, then draw the original on top.

### Items (`src/lib/items.ts`)

`setItem(id, item)` sets combat stats (`damage`, `cooldown`, `recovery`) and links the visual (`weapon` sprite) and logic (`projectile` variant) for that item.

### Imports

Path alias `@/*` maps to `src/*` (configured in both `vite.config.ts` and `tsconfig.json`).

### Tooling

- **Biome** handles formatting and linting (excludes `src/data.ts`)
- **snuggy** (`^1.2.0`) and **game-data-gen** (`^2.3.0`) are published npm packages
