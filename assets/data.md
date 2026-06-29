# scene

- free uint16 2048
- add uint16 2048
- remove uint16 2048
- active uint16 2048
- activeIndex uint16 2048
- playerId

# entity 2048

<!-- physics -->

- posX float32
- posY float32
- velX float32
- velY float32
- bodyX int16
- bodyY int16
- bodyW int16
- bodyH int16

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
- animX float32
- animY float32
- animScaleX float32
- animScaleY float32
- animAngle float32
- animTime float32

<!-- combat -->

- hitboxX int16
- hitboxY int16
- hitboxW int16
- hitboxH int16

<!-- flags -->

- isPlayer uint8

<!-- flags (computed) -->

- isActive uint8
- isStaggered uint8
