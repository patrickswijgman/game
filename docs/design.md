# Game Design

Living design doc. Raw inspiration is in `notes.md`.

## Pillar

> Roguelike-structured action RPG. Each run you assemble a build from permanently-unlocked options, then
> descend a gauntlet of hand-crafted rooms on a single health bar — each room harder than the last —
> to a final boss. No random drops, no grind: variety comes from _your build_ and _which authored
> rooms you draw_. Progression is **mastery** — every unlock earned once, by a new achievement.

## Genre / structure

- **Run-based, start from scratch every time.** You don't carry power between runs. What persists is
  the **unlock list** (which options exist) and your **milestone record**.
- **No random drops, no farm currency.** Your build is 100% your choice. The only RNG is _which
  hand-crafted rooms you draw_ (challenge), never _what power you get_ (build).
- **Build is the verb.** The fun loop is: assemble a build in the menu → run the gauntlet → see how
  far you get → unlock something → tweak the build → run again.
- **No mid-run upgrades.** Your build is fixed at run start. A run tests a build; it doesn't grow one.
- **Fully deterministic content.** Every room, enemy, and boss is hand-placed. The room _draw_ is the
  only shuffle, and it shuffles over authored rooms — not procgen.

## The run (attrition gauntlet)

- **One health bar for the whole run.** HP carries room to room — this is the core tension ("Model A").
  You clear a room at full, arrive at the next already chipped. "How far you get" = how long you last.
- **Room flow:** enter room → kill all enemies → teleported to the next room. **Linear auto-advance**
  (no door-choice / branching for now — there's no mid-run reward to choose between).
- **Each room is a hand-crafted Tiled tilemap** loaded one at a time. The engine holds _one_ room live;
  loading a room clears the entity pool (already implemented — see `clear pool on scene load`).
- **Finite → final boss = you won.** A run is a bounded descent (target ~8–12 rooms) ending in a boss.
  Early on your build+skill can't reach the end; clearing it is the "you beat the game" moment.
- **Death or quit just ends the run → back to menu.** No reload-to-restore, no in-run save.

## Rooms & difficulty

- **Authored tier pools.** Hand-craft a pool of rooms, each tagged with a difficulty tier. Each run
  **draws** rooms from the pool — easy tiers early, harder tiers as you descend.
- **Difficulty is entirely authored, no numeric scaling.** A goblin in room 1 and room 10 are
  identical; room 10 is just a _worse situation_ (more enemies, meaner arena, nastier enemy mix). No
  HP/damage multipliers — keeps the dead-consistent, readable, hand-tuned feel and avoids damage-sponge.
- **Freshness without procgen** comes from two sources: _your build_ (the lens) and _the room draw_
  (the challenge). Re-entering an early room as a bleed-dagger build plays nothing like a fire-mage.
- **Content cost (the honest tradeoff):** rejecting procgen means authoring enough rooms per tier to
  avoid same-y draws — aim ~6–10 per tier eventually. Start tiny (3–4 per tier) for the slice and grow.

## Build system (gear slots + a small point budget)

Two independent layers; both re-chosen fresh each run from your unlocked pool.

1. **Gear = fixed slots.** Start with **1 weapon, 1 armor, 2 rings, 1 amulet**. More slots (2nd weapon,
   3rd/4th ring) are **milestone unlocks**. Slots — not a budget — so there's nothing to balance and
   milestones have an obvious thing to hand out.
   - **Weapon = the verb / moveset** (Zelda-simple to play). Longsword = baseline; every other weapon is
     a unique variant (dagger: fast double-stab; greatsword: slow big-arc multi-hit; spear: long reach).
   - **The trinity is all weapons** — melee, bow (ranged physical), magic staff/wand (ranged elemental)
     are the _same abstraction_, different movesets. One combat system. Only new tech: **projectiles**
     (shared by bows + staves), deferred past the melee slice.
   - **2 active weapon slots, toggle live in combat** (Zelda quick-swap); free to swap between runs.
   - **Weapons are NOT upgradeable.** A better weapon is a milestone unlock with a **stat requirement**.
   - **Rings/amulet = synergy modifiers** (bleed, fire, lifesteal). **Synergy is the satisfaction
     engine** — dagger double-hit + bleed stacks faster. Limited ring slots force theme-vs-spread choices.
2. **Character = 10 points across stats + perks** (re-allocated every run). Stats and perks draw from
   the **same 10**, so they compete → commitment.
   - **Four stats: STR / DEX / INT / VIT.** Each gates + scales its weapon family (Gothic II model).
   - **Weapon requirements drive specialist vs hybrid:** dump all 10 into STR → wield a top-tier
     greatsword (req 8); split 5 STR / 5 INT → only mid-tier sword _and_ mid-tier staff (a "spellsword").
     Self-balancing: hybrids can't reach the top requirements, so pure builds stay viable.
   - **Perks = a small flat list (~10–15)**, high-impact picks ("bleed lasts longer", "longer i-frames",
     "+1 potion charge"). Not a tree. Compete with stats for the 10.

## Progression / unlocks (mastery, milestone-gated)

- **Every unlock is earned once, by a new achievement** — never farmed. This is the anti-grind core:
  you never repeat the same thing for currency; each unlock is a fresh accomplishment.
- **Milestones come in three kinds:**
  1. **Depth** — first time reaching tier 3, tier 5, the boss.
  2. **Boss kills** — each boss, first time.
  3. **Challenge / build milestones — the replay engine.** "Clear the boss with a bow", "reach tier 5
     taking no healing", "no-hit a boss", "win as pure-INT". Each is a _build prompt in disguise_ — it
     sends you back in with a fresh build. This is the "beat it again as a different build" replay loop.
- **Milestones grant:** gear/perk unlocks, new slots, more stat points (10 → 12 → 14), and boss-choice
  unlocks (below). The list is deliberately **bigger than one clear can satisfy**, so unlocks don't dry
  up after you win once.
- **No NG+ / heat loops** — replay is driven by chasing challenge milestones, not by re-running harder.

## Healing (purely a build choice)

On a single health bar with no drops and no mid-run upgrades, "how do I sustain?" is half the build.
There is **no free/automatic heal**. Recovery is something you pack or equip:

- **Potions** — a finite stack you bring (a perk/slot grants N charges; more charges = more points).
- **Lifesteal** — a ring/amulet modifier (heal by dealing damage; synergizes with fast weapons).
- **VIT** — a bigger pool instead of recovery (tank it).
- **Estus** — a milestone unlock = **N refillable charges per run, topped up at run start**.

This spawns archetypes for free: **glass cannon** (no heal, kill fast, dodge perfect) / **sustain
bruiser** (lifesteal + VIT) / **potion-stacker**. (`ponytail`: if play tests prove too punishing, add a
small on-clear breather later — don't build it now.)

## Combat (the heart)

Existing code scaffolds: stagger (`isStaggered`, `STAGGER` anim), flash/danger/outline textures,
health colors, enemy template + `ENEMY_SPAWN`.

**Verbs = attack + dodge only** (given to everyone). No stamina, block, or parry.

- Attack = weapon-defined moveset.
- Dodge = i-frame roll/dash — turns combat from trading hits into read-and-react.
- Perks _modify_ verbs ("dodge costs less", "longer i-frames") rather than add new ones.

**Post-MVP — shields as a dodge tradeoff:** a shield grants a big pile of stats but _disables dodge_
(tank archetype). Cheap to add later (one item + a flag). NOT in MVP.

## Bosses

- **A handful of handcrafted bosses** (3–5), the skill-check that proves a build. Mechanically "an enemy
  with more HP + a bigger moveset + an arena" — reuses the existing entity/combat/stagger systems. Spend
  craft budget here; players remember bosses.
- **Beating a boss = a milestone that lets you choose 1 of N items to unlock** (Dark Souls boss-soul,
  now the unlock mechanism itself). E.g. boss → choose: bleed ring, OR poison staff, OR a perk. **Choice
  is permanent for that boss** → a finite commitment feeding replay; one boss serves all trinity paths.

## Hub & saving

- **v1 = a menu** (equip from unlocked pool: gear slots + 10-point allocation; view milestones). A
  walkable **town map** is post-MVP flavor — don't build it until the menu proves the loop is fun.
- **Persist only meta:** unlock list + milestone record. A small JSON blob in `localStorage` (kilobytes).
- **Nothing in-run is saved.** Death or quit abandons the run. No mid-run suspend/resume (runs are a
  single sitting; revisit only if runs grow long).

## Tech notes / constraints

- Solo dev. Weak spot: creativity + level/content design. Bounded room pools + small slice mitigate it.
- **Discrete room maps, one live at a time** — load a Tiled map, clear the pool on load, clear room,
  teleport, load next. No chunk streaming, no open world. Far simpler than the old megaworld plan.
- No procgen anywhere (the only RNG is the room _draw_ over authored rooms).
- Engine: top-down 2D, 320×180 pixel art, data-oriented (struct-of-arrays, 2048 entity cap), Tiled
  maps, steering, layered paper-doll sprites.

## MVP — first vertical slice (build THIS first)

Goal: prove the loop is fun. _Assemble a build in a menu → run a gauntlet of rooms → die/win → unlock
something → tweak the build → run again._ If that's fun, the game works.

**In the slice (melee-only):**

- **Menu hub:** equip screen (gear slots + 10-point allocation) + milestone list.
- **One gauntlet:** ~6–8 hand-crafted rooms drawn from a small tiered pool (3–4 per tier ok), linear,
  attrition (HP carries), clear-room → teleport.
- **Combat:** attack + dodge (scaffolding largely exists).
- **Build pool:** 2–3 melee weapons (longsword / dagger / greatsword) with stat requirements; 1 armor;
  a couple rings (incl. one bleed-synergy); healing via packed potions + a lifesteal ring.
- **Character:** 10 points across **STR + VIT only** (+ a perk or two).
- **One final boss** → choose 1 of 2 items to unlock.
- **~5 milestones:** reach tier X, kill boss, clear-with-dagger, no-heal clear, etc. — each grants an
  unlock or slot.
- **Save:** unlock + milestone JSON to localStorage.

**Deferred (designed, not built):** bow + magic (skip projectile tech for slice 1), door/branching,
town map, suspend/resume, 2nd weapon + 3rd/4th ring slots (unlockable, author later), shields, NG+.

## Decisions resolved

- **Unlock model:** milestone-gated, earned once (mastery = progression). No farm currency, no drops.
- **Build construction:** gear = fixed slots (1 weapon / 1 armor / 2 rings / 1 amulet, expandable);
  character = 10 points across STR/DEX/INT/VIT + perks, re-chosen per run; weapon stat-requirements.
- **Run:** attrition gauntlet (one HP bar), linear auto-advance, finite → final boss = win.
- **Rooms:** authored tier pools, random draw, no numeric scaling.
- **Healing:** purely a build choice (potions / lifesteal / VIT / estus); no free heal.
- **Long game:** challenge/build milestones drive replay. No NG+.
- **Hub/save:** menu hub; persist only unlock+milestone JSON; no in-run save.
- **Combat verbs:** attack + dodge only (shield post-MVP).
- **Bosses:** handcrafted; kill = milestone → choose 1 of N items to unlock.
- **Crafting:** cut entirely (synergy lives in unlocked rings; no economy to support it).

## Decisions still to resolve (after the slice proves fun)

- [ ] The specific unlock list, milestone list, perk list (~10–15), and weapon/ring rosters.
- [ ] Exact stat-requirement numbers per weapon tier (the only thing the 10-point budget needs balanced).
- [ ] Room-pool size per tier and the run length / tier count that feels right.
- [ ] Projectile mechanic details (bow + magic, slice 2).
- [ ] Whether to add door-choice branching (only if optional rooms / a reason to choose appears).
- [ ] Town map vs menu (post-MVP).
