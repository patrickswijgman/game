# game

<!-- entity pool -->

- free uint32 2048
- add uint32 2048
- remove uint32 2048
- active uint32 2048
- activeIndex uint32 2048

<!-- references -->

- playerId

# entity 2048

<!-- physics -->

- posX float64
- posY float64
- velX float64
- velY float64

<!-- render -->

- spriteId uint8
- shadowId uint8
- hairId uint8
- shirtId uint8
- pantsId uint8
- weaponId uint8
- isFlipped uint8

<!-- animation -->

- animId uint8
- animX float64
- animY float64
- animScaleX float64
- animScaleY float64
- animAngle float64
- animTime float64

<!-- flags -->

- isPlayer uint8

<!-- flags (computed) -->

- isActive uint8
- isStaggered uint8
