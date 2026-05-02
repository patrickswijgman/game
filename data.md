# game

- active uint16 2000
- activeIndex uint16 2000
- enemies uint16 2000
- enemiesIndex uint16 2000
- free uint16 2000
- toAdd uint16 2000
- toRemove uint16 2000
- playerId
- serialCount

# entity 2000

- type uint8
- variant uint8
<!-- physics -->
- posX float32
- posY float32
- velX float32
- velY float32
- sepX float32
- sepY float32
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
<!-- render -->
- sprite uint8
- shadow uint8
- weapon uint8
- angle float32
- depth uint16
<!-- stats -->
- health uint16
- healthMax uint16
- damage uint16
- range uint16
- cooldown uint16
- recovery uint16
<!-- combat -->
- projectile uint8
- caster uint8
- serial uint32
- lastHitBy uint16
- staggerTime float32
- cooldownTime float32
- recoveryTime float32
<!-- health bar -->
- healthDeplete float32
- healthDepleteTime float32
<!-- timers -->
- lifeTime float32
<!-- flags -->
- isDestroyed uint8
- isFlipped uint8
