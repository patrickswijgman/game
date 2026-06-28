# game

<!-- entity pool -->

- free uint32 65536
- add uint32 65536
- remove uint32 65536
- active uint32 65536
- activeIndex uint32 65536

<!-- references -->

- playerId

# entity 65536

<!-- physics -->

- posX float64
- posY float64
- velX float64
- velY float64
- bodyX int16
- bodyY int16
- bodyW uint16
- bodyH uint16

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

<!-- combat -->

- hitboxX int16
- hitboxY int16
- hitboxW uint16
- hitboxH uint16

<!-- flags -->

- isPlayer uint8

<!-- flags (computed) -->

- isActive uint8
- isStaggered uint8
