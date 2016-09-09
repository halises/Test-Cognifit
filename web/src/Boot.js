var BasicGame = {};
BasicGame.Boot = function (game) {
};
BasicGame.Boot.prototype = {
    preload: function () {
        // this.game.forceSingleUpdate = true;
        //this.game.time.desiredFps =60;
        //this.game.time.advancedTiming=true;
        this.load.atlasJSONHash('atlas', 'assets/atlasP.png', 'assets/atlasP.json');
        this.load.image('background', 'assets/background.png');
    },
    create: function () {
        //this.game.stage.smoothed = false;
        this.game.input.maxPointers = 8;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.stage.disableVisibilityChange = true;
        //this.game.scale.setScreenSize(true);


        this.game.state.start('Preloader');
    }
};