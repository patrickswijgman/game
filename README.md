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

| Name      | Note                                                                        |
| --------- | --------------------------------------------------------------------------- |
| Damage    |                                                                             |
| Windup    | Telegraph delay before attack fires (milliseconds)                          |
| Recovery  | Post-attack window with reduced movement (milliseconds)                     |
| Cooldown  | Time before attack becomes available again, AKA attack speed (milliseconds) |
| Range     | Max travel distance in pixels                                               |
| Health    | Entity dies when reduced zero                                               |
| HealthMax | Health cannot exceed this                                                   |

# Weapons table

| Name          | Damage | Windup | Recovery | Cooldown | Range | Note                             |
| ------------- | ------ | ------ | -------- | -------- | ----- | -------------------------------- |
| Longsword     | 20     | 100    | 300      | 300      | 30    | Starter, balanced                |
| Dagger        | 10     | 50     | 100      | 100      | 10    | High DPS, up close and personal  |
| Greatsword    | 60     | 400    | 700      | 900      | 120   | High burst, long commit          |
| Bow           | 25     | 200    | 300      | 600      | 300   | Safe, low DPS                    |
| Hand Crossbow | 8      | 50     | 150      | 150      | 150   | Fast, medium range               |
| Staff         | 30     | 150    | 200      | 400      | 400   | Highest DPS, demands positioning |

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
