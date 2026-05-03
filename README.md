# Game

A simple survivor rogue-lite game inspired by games such as Dark Souls and 20 Minutes Till Dawn.

# Design decisions

- A single room that is constrained to the camera that prevents kiting mobs forever
- The room does not contain obstacles to make AI coding easier (steering behaviors instead of path finding)
- No mid-run upgrades, progression comes from short runs where you select equipment beforehand
- Each enemy type has one unique mechanic to make it interesting but simple to code

# Game loop

1. Spend souls to unlock new equipment
2. Choose equipment before run
3. Choose run modifiers
4. Start a new run
5. Defeat enemies
6. Pick up souls from killed enemies
7. Either:
   - Killed the end boss? You win! :tada:
   - Died? Go back to phase 1

# Equipment

## Weapon

A weapon boosts offensive stats such as damage.
Only one weapon can be equipped at a time.
See Weapons table below.

## Armor

Armor boosts defensive stats such as health.
Only one armor can be equipped at a time.
See Armor table below.

## Trinkets

Trinkets may boost stats and/or provide passive effects.
From the beginning 3 trinkets can be equipped, later on the player may unlock more trinket slots.
See trinkets table below.

# Stats

| Name      | Note                                                  |
| --------- | ----------------------------------------------------- |
| Damage    |                                                       |
| Cooldown  | AKA attack speed (milliseconds)                       |
| Range     | Projectile lifetime (milliseconds) x projectile speed |
| Health    | Entity dies when reduced zero                         |
| HealthMax | Health cannot exceed this                             |

# Weapons table

| Name      | Damage | Cooldown | Range   | Note                  |
| --------- | ------ | -------- | ------- | --------------------- |
| Longsword | 20     | 300      | 100 x 1 | Starter, Balanced     |
| Dagger    | 10     | 100      | 50 x 1  | Up close and personal |

# Armor table

| Name    | Health | Note    |
| ------- | ------ | ------- |
| Clothes | 50     | Starter |

# Enemies table

| Name     | Type     | Damage | Speed | Range | Health | Note                                                       |
| -------- | -------- | ------ | ----- | ----- | ------ | ---------------------------------------------------------- |
| Hollow   | Melee    |        |       |       |        |                                                            |
| Skeleton | Ranged   |        |       |       |        |                                                            |
| Cultist  | Summoner |        |       |       |        | Summoned creatures do not drop souls                       |
| Mage     | Trapper  |        |       |       |        | Places a trap under the player that explodes after a delay |
