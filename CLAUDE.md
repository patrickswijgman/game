# CLAUDE.md

See `README.md` for game design decisions, the game loop, and equipment/enemy tables.

## Commands

```bash
npm start          # Dev server with hot reload
npm run build      # tsc + biome check + vite build
npm run gen        # Regenerate src/data.ts from the /data schema
```

There are no tests.

## Code rules

- **Never edit `src/data.ts` directly.** It is auto-generated. Edit `data.md` and run `npm run gen`.
- Use the `@/*` path alias for all imports from `src/`.
- All timers are `Float32Array` fields in milliseconds. Use `tickTimer` — do not hand-roll countdown logic.
- Entity IDs are plain numbers indexing into SoA arrays. Never store entity state in objects or classes.
- Add new entity fields in `data.md`, not in ad-hoc variables or module-level maps.
- `destroyEntity` only marks and queues — never splice or mutate `active[]` mid-frame.
- Keep per-entity logic in `src/entities/`. Keep reusable mechanics in `src/lib/`.

## Architecture summary

TypeScript 2D game using Vite + **snuggy** graphics library. Data-Oriented Design with Structure of Arrays (SoA) for all entity state.

### Key files

| File                         | Role                                             |
| ---------------------------- | ------------------------------------------------ |
| `src/data.ts`                | Auto-generated SoA arrays and game-level state   |
| `src/main.ts`                | Setup and main loop                              |
| `src/lib/entities.ts`        | Entity lifecycle (create, destroy, sort)         |
| `src/lib/timer.ts`           | `tickTimer` — one-shot countdown helper          |
| `src/lib/steering.ts`        | `seek`, `halt`, `separate`                       |
| `src/lib/items.ts`           | `setItem` — binds combat stats                   |
| `src/lib/entity.ts`          | Entity helper functions                          |
| `src/entities/player.ts`     | Player setup and update                          |
| `src/entities/enemy.ts`      | Enemy setup and update                           |
| `src/entities/projectile.ts` | Projectile setup, update, and damage application |

### Entity lifecycle

`nextEntity()` → pulled from free pool, queued in `toAdd`. `destroyEntity()` → marks `isDestroyed`, queued in `toRemove`. Each frame: remove destroyed (swap-to-back, O(1)) → add new → insertion-sort by Y + `depth[]`.

### Main loop order

Flush queues → sort → clear background → `separateEnemies()` → tick timers → dispatch per-type updates → animate → draw → follow camera.

### Tooling

- **Biome** — formatting and linting (excludes `src/data.ts`)
- **snuggy** `^1.2.0` — graphics
- **game-data-gen** `^2.3.0` — code generation from `data.md`
