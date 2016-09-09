BasicGame.Preloader = function (game) {
    cargado = false;
    creditos = 0;

};
BasicGame.Preloader.prototype = {
    preload: function () {
        
        this.game.stage.backgroundColor = '#000000';
       
        this.background = this.add.tileSprite(0, 0,this.game.width,this.game.height, 'background');
       // this.background2 = this.add.sprite(this.background.width, 0, 'atlas','fondo.png');
        this.preloadBg = this.add.sprite(this.game.width / 2, this.game.height / 2 , 'atlas','preloader1.png');
        this.preloadBg.x -= this.preloadBg.width / 2;
        this.preloadBar = this.add.sprite(this.game.width / 2, this.game.height / 2 ,'atlas', 'preloader2.png');
        this.preloadBar.x -= this.preloadBar.width / 2;
        this.load.setPreloadSprite(this.preloadBar);
        this.load.atlasJSONHash('atlas2', 'assets/atlasI.png', 'assets/atlasI.json');
        this.load.bitmapFont('font', 'fonts/font_pink/font.png', 'fonts/font_pink/font.fnt');
        this.load.bitmapFont('font2', 'fonts/font_white/font.png', 'fonts/font_white/font.fnt');
               
    },
    create: function () {
        this.time.events.add(1000, this.irJuego,this)
        
    },
    irJuego : function(){
        this.game.state.start('MainMenu');
    },
    update: function () {
        /*  if(cargado)
         this.game.state.start('Game');*/
    }


};