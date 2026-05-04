# game

- playerId
<!-- pool -->
- free uint16 2000
- toAdd uint16 2000
- toRemove uint16 2000
<!-- groups -->
- active uint16 2000
- activeIndex uint16 2000
- enemies uint16 2000
- enemiesIndex uint16 2000
<!-- combat -->
- serialCount
<!-- run -->
- totalKills
- totalSouls

# entity 2000

- type uint8
- variant uint8
- isDestroyed uint8
<!-- physics -->
- startX float32
- startY float32
- posX float32
- posY float32
- velX float32
- velY float32
- hitboxX int16
- hitboxY int16
- hitboxW uint16
- hitboxH uint16
- radius float32
<!-- animation -->
- anim uint8
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
- isFlipped uint8
<!-- stats -->
- health uint16
- healthMax uint16
- movementSpeed float32
- projectileDamage uint16
- projectileSpeed float32
- projectileRange uint16
- windup uint16
- recovery uint16
- cooldown uint16
- souls uint16
<!-- attack -->
- targetX float32
- targetY float32
- projectile uint8
- serial uint32
- lastHitBy uint16
- windupTime float32
- recoveryTime float32
- cooldownTime float32
- staggerTime float32
- immuneTime float32
- isEnemyProjectile uint8
<!-- health bar -->
- healthDeplete float32
- healthDepleteTime float32
