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

**Auto-generated — do not edit directly.** Regenerate with `npm run gen` after modifying the `/data` schema file. Contains flat typed arrays for up to 10,000 entities: position, velocity, hitbox, health/combat, animation, and metadata. Also holds game state (`active[]`, `free[]`, `toAdd[]`, `toRemove[]`, `player`, `state`).

### Entity lifecycle (`src/lib/entities.ts`)

Entities are numeric IDs indexing into the SoA arrays. `nextEntity()` pulls from the free pool and queues the ID in `toAdd`. `destroyEntity()` marks `isDestroyed` and queues in `toRemove`. Each frame, `removeDestroyedEntities()` removes via **swap-to-back** (O(1)), then `addNewEntities()` flushes the add queue. `sortEntities()` depth-sorts `active[]` by Y position using insertion sort.

### Per-entity updates (`src/entities/`)

Each entity type gets a `setup*(x, y)` that calls `setupEntity()` and `update*(id)` that runs each frame. The main loop in `src/main.ts` dispatches to these by reading `type[id]`. Currently only `PLAYER` is implemented.

### Main loop (`src/main.ts`)

`setup()` loads assets, initializes the entity pool, and spawns the player. `update()` runs each frame: flush entity queues → sort → clear background → iterate `active[]` dispatching to per-type update functions → follow camera → FPS overlay.

### Imports

Path alias `@/*` maps to `src/*` (configured in both `vite.config.ts` and `tsconfig.json`).

### Tooling

- **Biome** handles formatting and linting (excludes `src/data.ts`)
- **snuggy** (`^1.2.0`) and **game-data-gen** (`^2.3.0`) are published npm packages
