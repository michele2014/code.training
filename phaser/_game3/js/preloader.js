// var Game = {};

Game.Preloader = function(game) {
    this.preloaderBar = null;
}

Game.Preloader.prototype = {
    preload: function() {
        this.preloaderBar = this.add.sprite(this.world.centerX,
            this.world.centerY, 'preloaderBar');

        this.preloaderBar.anchor.setTo(0.5, 0.5);
        this.time.advancedTiming = true;
        this.load.setPreloadSprite(this.preloaderBar);

        //LOAD ALL ASSETS

        this.load.tilemap('map', 'assets/level1.csv');
        this.load.image('tileset', 'assets/tile_3.png');

        this.load.spritesheet('player', 'assets/player.png', 24, 26);
        this.load.spritesheet('buttons', 'assets/buttons.png', 193, 71);
        // this.load.image('drag', 'assets/drag.png');
        this.load.image('bird', 'assets/drag.png');
        this.load.image('nut', 'assets/nut.png');

        this.load.image('button', 'assets/button.png');


    },

    create: function() {
        this.state.start('MainMenu');
    }
}