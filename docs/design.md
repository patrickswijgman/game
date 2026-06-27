# Game Design

Living design doc from the brainstorm/grilling session. Raw inspiration is in `notes.md`.

## Pillar

> Simple stats, simple Zelda-like combat, where build diversity lives in distinct
> weapon movesets. Start weak, get stronger by exploring a small handcrafted world
> and committing to a build. No grind.

## Genre / structure

- **World-based**, not run-based. One small, cozy, **continuous handcrafted world** you
  come to know (a few connected Tiled maps, shortcuts, bonfire-style checkpoint).
- **Persistent character**, grows noob -> strong.
- **Fully deterministic** — no randomness anywhere. World, enemies, loot, and key items
  are all hand-placed.
- **Replay value comes from build commitment**, not RNG: beat it again as a different build.

## World topology

- **Hub-and-spoke.** Town in the center; a few hand-authored zones radiate *outward* as spokes.
  Venture out a spoke, come back to town to save/restock.
- **Difficulty scales with distance from home** (Gothic's "distance from the road") — this is the
  same principle as the save-distance tension. Far = dangerous = more to lose.
- **Soft-gated, not walled** (Gothic-style): you *can* wander into a too-hard area and get bodied.
  Two natural soft gates, both already in the design: enemy difficulty, and weapon stat
  requirements (the good weapon out there needs stats you don't have yet).
- Each spoke is its own Tiled map, authored/shipped independently, connecting back to town.
  Small + cozy => roughly **3-5 zones** total.
- Chosen over linear (weak world-feel, awkward save fit) and open/interconnected (strongest
  world-feel but hardest to author — the solo-dev weak spot). **Can evolve toward interconnected
  later** by stitching spokes together with shortcuts.

## Build system (3 layers, synergy is the satisfaction engine)

1. **Weapon = the verb / moveset.** Range, speed, stagger, hit count. Zelda-simple to play.
   - Longsword = the baseline. Every other weapon is a *unique variant* that changes feel.
     - Dagger: fast double-stab, short range, short stagger.
     - Greatsword: slow, big arc, long stagger, multi-hit (planned).
     - Spear: long reach, low stagger (planned).
   - **The trinity is all weapons** — melee, bow (ranged physical), and magic staff/wand
     (ranged elemental) are *the same abstraction* with different movesets. One combat system,
     not three. Only new tech required: **projectiles** (shared by bows + staves).
   - **Free to swap** what's in hand (experiment freely with feel).
   - **Weapons are NOT upgradeable.** You find a better weapon in the world and must meet
     its **stat requirements** to wield it (Gothic II model). Stat path = weapon path.
   - **2 active weapon slots, toggled live in combat** (Zelda-style quick swap) — combat flows
     (open with bow, swap to sword on close). Full collection lives in inventory; you carry 2.
     **3rd slot unlockable via learning points** (another point sink + power milestone).
2. **Stats = scaling + requirements.** `weapon damage + stat scaling` (Gothic II).
   **Four stats: STR (melee) / DEX (bow) / INT (magic) / VIT (health).** Each gates + scales its
   weapon family => Gothic knight/archer/mage pathways, expressed purely as stat investment.
   **Permanent, no respec.**
   - **Specialist vs hybrid axis (from 2 slots):** finite points mean a specialist (all STR)
     wields top-tier weapons of one family; a hybrid (e.g. STR+INT "spellsword") splits points
     and wields only mid-tier of each. Pure builds stay viable because hybrids can't meet the
     top stat-requirements. Keep weapon requirements meaningful and it self-balances.
3. **Rings/amulets/talismans = modifier slots** (Elden Ring / Gothic II). Grant stats or
   modifiers (bleed, fire, lifesteal). **Synergy is key**: dagger double-hit + bleed stacks
   faster. This is what makes builds satisfying.

## Progression (finite, anti-grind)

- **Enemies are finite and do NOT respawn.** Killing gives XP.
- XP -> **level up** -> grants **learning points** (Gothic II).
- Learning points are spent on: **stat upgrades** AND **passives** — *same finite pool*,
  so they compete. Can't max everything -> forced commitment -> replay.
- **Passives = a small FLAT list (~10-15), not a skill tree.** High-impact picks
  ("bleed lasts longer", "extra ring slot", "heal on stagger"). Keep system overhead near zero.
- World contains a **fixed total** of XP/points. Exploration *is* progression.

## Bosses

- **One handcrafted boss per spoke** (3-5 total). The boss = the skill-check that proves your
  build, and the **gate** of the spoke (beating it opens a shortcut back to town and/or a deeper
  spoke). Mechanically "an enemy with more HP + a bigger moveset + an arena" — reuses the existing
  entity/combat/stagger systems; spend craft budget here since players remember bosses.
- **Boss drops a soul/trophy**, redeemed at a **town vendor/altar** for **one of a few build items**
  (Dark Souls boss-soul style). E.g. swamp boss -> choose: bleed ring, OR poison staff, OR crafting
  materials. **Choice is permanent** (others gone this playthrough) -> another finite commitment
  feeding replay; one boss serves all trinity paths (melee takes ring, mage takes staff).
  Cheap: token id + a "redeem -> choose one of N" town menu.

## Healing, saving, death

- **Healing:** early game = **finite consumable health potions** (found/bought, they run out).
  Later you **unlock a refillable estus flask** via the learning-point upgrade list — a real
  power-curve milestone (renewable heal). Estus refills at home.
- **Saving = home only.** You save by **sleeping in your bed** at home/town. No save-anywhere
  (that would delete all tension). Town is the single safe hub.
- **Death = reload your last save** (= back at home). The further you've ventured, the more you
  stand to lose -> *distance from home is the tension*, Souls "distance from bonfire" with one
  bonfire: home. No separate checkpoint system — town IS the checkpoint.
- **Home is earned/owned** — buy or build your own home (post-MVP flavor; the save point is
  something you invest in).
- Tech: serialize the whole struct-of-arrays state to `localStorage` (JSON or base64 buffers).
  ~5MB cap is plenty for 2048 entities; swap to IndexedDB only if it ever overflows.

## Crafting

- **Finite materials**, hand-placed in the world.
- Role: the **synergy/modifier layer** (craft/forge rings & modifiers). Not a separate hobby
  system — it's a commitment mechanism. (Exact recipes TBD.)

## Combat (the heart)

Existing code already scaffolds: stagger (`isStaggered`, `STAGGER` anim), flash/danger/outline
textures, health colors, enemy template + `ENEMY_SPAWN`.

**Verbs = attack + dodge only** (baseline, given to everyone). No stamina, no block, no parry.
- Attack = weapon-defined moveset.
- Dodge = i-frame roll/dash. Turns combat from trading hits into read-and-react.
- Passives *modify* verbs ("dodge costs less", "longer i-frames") rather than add new ones —
  keeps the verb set tiny.

**Post-MVP idea — shields as a dodge tradeoff:** a shield grants a big pile of stats but
*disables dodge*. Creates a distinct tank archetype (commitment + replay). Cheap to add later
(one item + a flag that turns dodge off). NOT in MVP.

## Tech notes / constraints

- Solo dev. Weak spot self-identified: creativity + level/content design. "Small" world is the
  deliberate mitigation.
- No procgen (and the deterministic decision means none is needed).
- Engine: top-down 2D, 320x180 pixel art, data-oriented (struct-of-arrays, 2048 entity cap),
  Tiled maps, steering, layered paper-doll sprites.

## MVP — first vertical slice (build THIS before anything else)

Goal: prove the core loop is fun. *Move -> fight (attack/dodge) -> kill finite enemies -> gain
XP -> level -> spend a learning point -> meet a weapon's stat requirement -> swap to it -> beat
a boss -> redeem its soul -> sleep to save.* If that loop is fun, the game works.

**In the slice (melee-only):**
- Town: a bed (save) + a redemption altar. Ugly is fine.
- One spoke: a single Tiled map, a couple enemy types, finite / no respawn.
- Combat: attack + dodge (scaffolding largely exists).
- Progression: XP -> level -> learning points -> **STR + VIT only**.
- Weapons: **2-3 melee** spanning feel (longsword, dagger, greatsword), stat-gated.
- One boss + soul -> choose 1 of 2 items.
- Save/load to localStorage.

**Deferred (designed, not built yet):** bow + magic (skip projectile tech for slice 1),
crafting, ring/passive lists, buy/build home, 3rd weapon slot, zones 2-5.

## Decisions resolved

- Q7 combat verbs: **attack + dodge only** (shield as post-MVP dodge-tradeoff).
- Q8/9 heal/save/death: **consumable potions -> unlock estus; save at home only; death reloads.**
- Q11 stats: **trinity STR/DEX/INT/VIT**, spells are weapons.
- Q12 weapon slots: **2 active, toggle live, 3rd via learning points.**
- Q12 bosses: **one per spoke, drops soul redeemed at town for a choice of items.**
- Q13 MVP: **melee-only vertical slice** (above).

## Decisions still to resolve (lower priority — after the slice proves fun)

- [ ] How rings are obtained beyond boss-redemption: found vs crafted vs both.
- [ ] Crafting recipes (what materials -> what modifiers).
- [ ] Projectile mechanic details (for bow + magic, slice 2).
- [ ] World scale specifics: enemy roster, weapon count per family, exact zone themes.
- [ ] Passive list (~10-15 flat picks).
- [ ] **Spoke difficulty gating** (parked until the core loop is proven fun; irrelevant in the
      1-spoke MVP). Key insight: in a radial hub, all spoke *entrances* are equidistant from town,
      so difficulty isn't gated by distance-between-spokes — it comes from (1) *which* spoke
      (each spoke = a difficulty tier + theme) and (2) *depth within* a spoke (easy at town-end ->
      boss at far end). A hard spoke *can* be entered from town (Gothic "wander in and get bodied"
      thrill); the gate is soft (tough enemies + weapon stat-requirements), telegraphed with the
      DANGER texture. Open knob: (a) all spokes open + soft-gated [leaning], (b) progressively
      boss-unlocked, or (c) hybrid — outer spokes open, final content boss-gated.
