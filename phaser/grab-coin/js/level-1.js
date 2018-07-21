var player;
var controls = {};
var playerSpeed = 150;
var jumpTimer = 0;
var button;
var drag;

var shootTime = 0;
var nuts;

var respawn;

var playerXP = 0;
var gameXPSteps = 15;
var playerLevel = 0;

EnemyBird = function (index, game, x, y) {
    this.bird = game.add.sprite(x, y, 'bird');
    this.bird.anchor.setTo(0.5, 0.5);
    this.bird.name = index.toString();

    game.physics.enable(this.bird, Phaser.Physics.ARCADE);

    this.bird.body.immovable = true;
    this.bird.body.collideWorldBounds = true;
    this.bird.body.allowGravity = false;

    this.birdTween = game.add.tween(this.bird)
        .to({
            y: this.bird.y + 100
        }, 2000, 'Linear', true, 0, 100, true);
}

var enemy1;

Game.Level1 = function (game) {

}

Game.Level1.prototype = {

    create: function (game) {
        this.stage.backgroundColor = '#196bb3';
        this.physics.arcade.gravity.y = 1400;

        respawn = game.add.group();

        //CSV VERSION: 
        map = this.add.tilemap('map', 64, 64);
        //CSV VERSION: 
        map.addTilesetImage('tileset');

        // map = this.add.tilemap('map');
        // map.addTilesetImage('grab-coin', 'tileset');

        //CSV VERSION: 
        layer = map.createLayer(0);
        // layer = map.createLayer('Tile Layer 1');

        layer.resizeWorld();

        map.setCollisionBetween(0, 2);
        map.setTileIndexCallback(5, this.reserPlayer, this);
        // map.setTileIndexCallback(6, this.getCoin, this);
        map.setTileIndexCallback(6, this.getCoin, this);
        map.setTileIndexCallback(7, this.spawn, this);

        map.createFromObjects('Object Layer 1', 7, '', true, false, respawn);
        //CSV VERSION:
        player = this.add.sprite(100, 560, 'player');
        // player = this.add.sprite(0, 0, 'player');

        player.anchor.setTo(0.5, 0.5);

        this.spawn();

        player.animations.add('idle', [0, 1], 1, true);
        player.animations.add('jump', [2], 1, true);
        player.animations.add('run', [3, 4, 5, 6, 7, 8], 7, true);

        this.physics.arcade.enable(player);
        this.camera.follow(player);

        player.body.collideWorldBounds = true;

        controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            up: this.input.keyboard.addKey(Phaser.Keyboard.UP),
            shoot: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
        };

        button = this.add.button(this.world.centerX - 95,
            this.world.centerY + 200,
            'buttons',
            function () {
                console.log('pressed');
            }, this, 2, 1, 0);

        button.fixedToCamera = true;

        drag = this.add.sprite(player.x, player.y, 'drag');
        drag.anchor.setTo(0.5, 0.5);
        drag.inputEnabled = true;
        drag.input.enableDrag(true);

        enemy1 = new EnemyBird(0, game, player.x + 400, player.y - 200);

        nuts = game.add.group();
        nuts.enableBody = true;
        nuts.createMultiple(5, 'nut');

        nuts.setAll('anchor.x', 0.5);
        nuts.setAll('anchor.y', 0.5);

        nuts.setAll('scale.x', 0.5);
        nuts.setAll('scale.y', 0.5);

        nuts.setAll('outOfBoundsKill', true);
        nuts.setAll('checkworldBounds', true);


    },
    preload: function () {},

    update: function () {
        this.physics.arcade.collide(player, layer);
        this.physics.arcade.collide(player, enemy1.bird, this.reserPlayer);

        // player.body.velocity.y = 0;
        player.body.velocity.x = 0;

        playerLevel = Math.log(playerXP, gameXPSteps);
        // if (controls.up.isDown) {
        //     player.animations.play('jump');
        // }

        if (controls.right.isDown) {
            player.animations.play('run');
            player.scale.setTo(1, 1);
            player.body.velocity.x += playerSpeed;
        }

        if (controls.left.isDown) {
            player.animations.play('run');
            player.scale.setTo(-1, 1);
            player.body.velocity.x -= playerSpeed;
        }

        if (controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer) {
            player.body.velocity.y = -600;
            jumpTimer = this.time.now + 750;
            player.animations.play('jump');
        }

        if (player.body.velocity.x == 0 && player.body.velocity.y == 0) {
            player.animations.play('idle')
        }

        // if (this.checkOverlap(player, enemy1.bird)) {
        //     this.reserPlayer();
        // }

        if (controls.shoot.isDown) {
            this.shootNut();
        }

        if (this.checkOverlap(nuts, enemy1.bird)) {
            enemy1.bird.kill();
        }
    },

    reserPlayer() {
        player.reset(100, 560);
    },

    getCoin() {
        map.putTile(-1, layer.getTileX(player.x), layer.getTileY(player.y));
        this.levelUp();
    },

    spawn() {
        respawn.forEach(spawnPoint => {
            player.reset(spawnPoint.x, spawnPoint.y);
        });
    },

    checkOverlap(spriteA, spriteB) {
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);
    },

    shootNut() {
        if (this.time.now > shootTime) {
            nut = nuts.getFirstExists(false);
            if (nut) {
                nut.reset(player.x, player.y);
                nut.body.velocity.y = -600;
                shootTime = this.time.now + 900;

                this.levelUp();

            }
        }
    },
    levelUp() {
        playerXP += 15;
        console.log('Player Level: ' + Math.floor(playerLevel));

    }
}