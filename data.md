# game group

- active array uint16 10_000
- free array uint16 10_000
- toAdd array uint16 10_000
- toRemove array uint16 10_000
- playerId number

# entity soa 10_000

- index uint16
- type uint8
- variant uint8
<!-- render -->
- shadowId uint8
- spriteId uint8
<!-- physics -->
- posX float32
- posY float32
- velX float32
- velY float32
- hitboxX float32
- hitboxY float32
- hitboxW uint16
- hitboxH uint16
- hitboxOffsetX int16
- hitboxOffsetY int16
- speed float32
- radius float32
<!-- animation -->
- animX float32
- animY float32
- animScaleX float32
- animScaleY float32
- animAngle float32
<!-- stats -->
- health uint16
- healthMax uint16
- damage uint16
<!-- equipment -->
- weaponId uint8
<!-- (state) timers -->
- staggerTime float32
<!-- flags -->
- isDestroyed uint8
- isFlipped uint8
