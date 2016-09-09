BasicGame.MainMenu = function (game) {

};
BasicGame.MainMenu.prototype = {
    create: function () {
        this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height,'background');
        this.btn_play = this.add.button(this.game.width / 2, this.game.height + 150, 'atlas', this.startGame, this, 'play_btn1.png', 'play_btn1.png', 'play_btn2.png');
        this.btn_play.anchor.setTo(0.5);
        this.howtoplay = this.add.sprite(this.game.width / 2, this.game.height / 2 - 50, 'atlas', 'screenHow.png');
        this.howtoplay.anchor.setTo(0.5);
        this.howtoplay.scale.setTo(0);
        this.game.time.events.add(200, this.showContent, this);
    },
    showHowTo: function () {

    },
    startGame: function () {
        this.game.state.start('Game');
    },
    showContent: function () {
        var tweenHow = this.game.add.tween(this.howtoplay.scale).to({x: 0.9, y: 0.9}, 600, Phaser.Easing.Quadratic.Out, true);
        tweenHow.onComplete.add(function () {
            var tweenPlay = this.game.add.tween(this.btn_play).to({y: this.game.height  - 80}, 100, Phaser.Easing.Quadratic.none, true);
        }, this);

    }
};