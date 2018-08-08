// var Game = {};

Game.MainMenu = function(game) {

}

var titleScreen;

Game.MainMenu.prototype = {
    create(game) {

        this.createButtons(game, "Play",
            game.world.centerX,
            game.world.centerY + 32,
            300, 100,
            function() {
                this.state.start('Level1');
            }
        );

        // this.createButtons(game, "About",
        //     game.world.centerX,
        //     game.world.centerY + 32 + 100,
        //     300, 100,
        //     function() {
        //         console.log('About')
        //     }
        // );

        // this.createButtons(game, "Tutorial Game",
        //     game.world.centerX,
        //     game.world.centerY - 150,
        //     300, 400,
        //     function() {
        //         console.log('About')
        //     }
        // );

    },

    update() {

    },

    createButtons(game, text, x, y, w, h, callBack) {
        var button1 = game.add.button(x, y, 'button', callBack, this, 2, 1, 0);

        button1.anchor.setTo(0.5, 0.5);
        button1.width = w;
        button1.height = h;

        var txt = game.add.text(
            button1.x, button1.y, text, { font: "14px Arial", fill: "#fff", align: "center" });

        txt.anchor.setTo(0.5, 0.5);
    }

}