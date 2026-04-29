# Game

- A simple survivor rogue-lite game
- Choose equipment before run
  - weapon
  - armor
- Enemies are simple, with one unique mechanic
  - dumb enemy that simply chases until in range with a melee weapon
  - enemy that chases until in range with a ranged weapon
  - a smarter ranged version that retreats to its minimum range
  - a mage that places a trap under the player that explodes after a delay
- Enemies drop souls
  - Souls are used to buy new equipment before a run
    - this is the meta progression
    - idea is that you start weak and won't survive or it's really hard to and the equipment allows you to be stronger and survive longer
- The level is a fixed size room without any obstacles
  - makes AI easier to write (no path finding algorithm needed, only steering behaviors)
