# CLAUDE.md

See `README.md` for game design decisions, the game loop, and equipment/enemy tables.

## Commands

```bash
npm start          # Dev server with hot reload
npm run build      # tsc + biome check + vite build
npm run gen        # Regenerate src/data.ts from the /data schema
```

There are no tests.

## Adding new content checklist

When adding a new **sprite**: add to `Sprite` enum in `consts.ts`, then add a `case` in the relevant switch block(s) in `drawEntity` (`src/lib/entity.ts`) — shadow, weapon, and/or sprite. Nothing errors if a case is missing; it just silently renders nothing.

When adding a new **enemy**: add to `Enemy` enum in `consts.ts`, add a `case` in `setupEnemy`, add a `case` in `updateEnemy`.

When adding a new **projectile variant**: add to `Projectile` enum in `consts.ts`, add a `case` in `setupProjectile`.

When adding a new **item**: add to `Item` enum in `consts.ts`, add a `case` in `setItem`.

When adding a new **entity field**: add to `data.md` and run `npm run gen`.

## Combat state machine

Stats (set once in setup) vs timers (running countdowns each frame):

| Stat       | Timer          | Meaning                                     |
| ---------- | -------------- | ------------------------------------------- |
| `windup`   | `windupTime`   | Duration of attack telegraph                |
| `cooldown` | `cooldownTime` | Lockout before next attack can start        |
| `recovery` | `recoveryTime` | Post-attack window where movement is slowed |

Attack sequence: in-range + `cooldownTime === 0` → set `targetX/Y`, start `windupTime`. When `windupTime` expires (`tickTimer` returns true) → fire projectile, start `cooldownTime` + `recoveryTime`. While `recoveryTime > 0` enemy halts, player moves at half speed.

## Code rules

- **Never edit `src/data.ts` directly.** It is auto-generated. Edit `data.md` and run `npm run gen`.
- Use the `@/*` path alias for all imports from `src/`.
- All timers are `Float32Array` fields in milliseconds. Use `tickTimer` — do not hand-roll countdown logic.
- Entity IDs are plain numbers indexing into SoA arrays. Never store entity state in objects or classes.
- Add new entity fields in `data.md`, not in ad-hoc variables or module-level maps.
- `destroyEntity` only marks and queues — never splice or mutate `active[]` mid-frame.
- Keep per-entity logic in `src/entities/`. Keep reusable mechanics in `src/lib/`.
- No comments unless the reason is non-obvious. Never describe what the code does.

## Architecture summary

TypeScript 2D game using Vite + **snuggy** graphics library. Data-Oriented Design with Structure of Arrays (SoA) for all entity state.

### Key files

| File                         | Role                                                           |
| ---------------------------- | -------------------------------------------------------------- |
| `src/data.ts`                | Auto-generated SoA arrays and game-level state                 |
| `src/main.ts`                | Setup and main loop                                            |
| `src/lib/entities.ts`        | Entity lifecycle (create, destroy, sort)                       |
| `src/lib/timer.ts`           | `tickTimer` — one-shot countdown helper                        |
| `src/lib/steering.ts`        | `seek`, `halt`, `separate`                                     |
| `src/lib/items.ts`           | `setItem` — binds combat stats + visuals to an entity          |
| `src/lib/entity.ts`          | `drawEntity` — rendering with transforms and texture selection |
| `src/entities/player.ts`     | Player setup and update                                        |
| `src/entities/enemy.ts`      | Enemy setup and update                                         |
| `src/entities/projectile.ts` | Projectile setup, update, and damage application               |

### Entity lifecycle

`nextEntity()` → pulled from free pool, queued in `toAdd`. `destroyEntity()` → marks `isDestroyed`, queued in `toRemove`. Each frame: remove destroyed (swap-to-back, O(1)) → add new → insertion-sort by Y + `depth[]`.

### Main loop order

Flush queues → sort → clear background → `separateEnemies()` → tick timers → dispatch per-type updates → animate → draw → follow camera.

### Rendering texture selection

- Default: `ATLAS`
- Staggered: `ATLAS_FLASH` (white tint)
- Attack windup: `ATLAS_OUTLINED_DANGER`
- Enemy projectile: `ATLAS_FLASH_DANGER` (red tint)

### Tooling

- **Biome** — formatting and linting (excludes `src/data.ts`)
- **snuggy** `^1.2.0` — graphics
- **game-data-gen** `^2.3.0` — code generation from `data.md`
