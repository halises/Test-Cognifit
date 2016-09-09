BasicGame.Game = function (game) {
    amb = this;
    shakeWorld = 0;
};

Photo = function (game) {


};
Photo.prototype = {
    createPhoto: function (number, tags) {

        this.photo = amb.add.sprite(amb.game.width, amb.game.height/2, 'atlas2', 'photo' + number + '.png');
        this.photo.anchor.set(0, 0.5);
        this.photo.scale.setTo(0.8);
        this.velocity = 2;
        this.active = false;
        this.tags = tags;
        

    },
    destroyPhoto: function () {
        var phtoTween = amb.game.add.tween(this.photo).to({y: amb.game.height}, 100, Phaser.Easing.Quadratic.none, true);
        phtoTween.onComplete.add(function () {
            this.photo.x = amb.game.width;
            this.photo.y = amb.game.height/2;
        }, this)
    },
};

BasicGame.Game.prototype = {
    create: function () {
        this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
        this.ready = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2 - 100, 'font2', 'READY', 50)
        this.go = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2 - 100, 'font2', 'GO', 50);
        this.ready.anchor.setTo(0.5);
        this.go.anchor.setTo(0.5);
        this.go.scale.setTo(0);
        this.ready.scale.setTo(0);
        this.ready.tint = 0xFF00FF;
        this.go.tint = 0xFF00FF;
        this.photosVector = [];
        this.activePhotos = [];
        this.numPhotos = 15;
        this.timeDificult = 2000;
        this.gameFinish = false;
        this.photoActive = false;
        this.score = 0;
        this.actual = 0;
        this.scoreText = this.game.add.bitmapText(this.game.width / 2, 50, 'font2', '0', 35);
        this.scoreText.anchor.setTo(0.5);
        this.scoreText.alpha = 0;
        this.createPhotos();
        var letterTyped = "";
        this.game.input.keyboard.onDownCallback = function () {
            letterTyped = String.fromCharCode(this.game.input.keyboard.event.keyCode);
            amb.checkPhoto(letterTyped);
        };
        this.mostrarReady();
    },
    update: function () {
        if (!this.gameFinish && this.photoActive) {
            this.movePhotos();
            this.checkEnd();
        }
        if (shakeWorld > 0) {
            var rand1 = this.game.rnd.integerInRange(-4, 4);
            var rand2 = this.game.rnd.integerInRange(-4, 4);
            this.game.world.setBounds(rand1, rand2, this.game.width + rand1, this.game.height + rand2);
            shakeWorld--;
            if (shakeWorld === 0) {
                this.game.world.setBounds(0, 0, this.game.width, this.game.height);
            }
        }
    },
    createPhotos: function () {
        var tags = [["ANIMAL", "BEAR", "ALASKA"], ["CAR", "FERRARI", "ITALIA"], ["CHOCOLATE", "ICE", "CREAM"], ["SEA", "BEACH", "COAST"], ["TRAVEL", "OLD", "TRAIN"], ["SORT", "BASKET", "BALL"], ["NATURE", "LANDSCAPE", "SKY"], ["CITY", "CELEBRATION", "BUDAPEST"], ["PARK", "TREES", "RED"], ["FIELD", "HOUSE", "PURPLE"], ["WATER", "RIVER", "URBAN"], ["BIRD", "VOGEL", "MEISE"], ["BURGUER", "FRESH", "FOOD"], ["SEA", "SUMMER", "SUN"], ["ROCK", "GUITAR", "MUSIC"]];
        var j = 0;
        for (var i = 0; i < this.numPhotos; i++) {
            var photo = new Photo(this.game);
            photo.createPhoto(i + 1, tags[i]);
            this.photosVector.push(photo);
        }
        this.photosVector.sort(function () {
            return Math.random() - 0.5;
        });
    },
    checkPhoto: function (letter) {
        var find = false;
       
        for (var i = 0; i < this.currentPhoto.tags.length; i++) {
            if (String(this.currentPhoto.tags[i]).substr(0, 1) == letter) {
                find = true;
            }
        }
        if (find) {
            this.increaseScore();
            this.photoActive = false;
            this.currentPhoto.destroyPhoto();
            this.game.time.events.add(400, this.activePhoto, this);
        } else {
            this.decreasePoints();
        }
    },
    checkMobile : function(){
        this.increaseScore();
        this.photoActive = false;
        this.currentPhoto.destroyPhoto();
        this.game.time.events.add(200, this.activePhoto, this);
    },
    checkEnd: function () {
        for (var i = 0; i < this.photosVector.length; i++) {
            if (this.photosVector[i].photo.x < 0)
            {
                this.gameFinish = true;
                shakeWorld = 20;
                this.game.time.events.add(500, this.endScreen, this);
            }
        }
    },
    endScreen: function () {
        this.currentPhoto.photo.alpha=0;
        this.black = this.add.sprite(0, 0, 'atlas', 'black.png');
        this.black.alpha = 0.3;
        this.black.width = this.game.width;
        this.black.height = this.game.height;
        this.endGroup = this.add.group();
        this.endScr = this.add.sprite(this.game.width / 2, this.game.height / 2 - 50, 'atlas', 'screenRes.png');
        this.endScr.anchor.setTo(0.5);
        this.endScr.scale.setTo(0.9);
        this.actualScoreText = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2 - 210, 'font2', 'SCORE', 25);
        this.actualScoreText.anchor.setTo(0.5);
        this.ScoreResText = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2 - 150, 'font2', '0', 25);
        this.ScoreResText.anchor.setTo(0.5);
        this.ScoreResText.setText(this.score);
        this.BestScoreText = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2 - 90, 'font2', 'BEST', 25);
        this.BestScoreText.anchor.setTo(0.5);
        this.BestScoreResText = this.game.add.bitmapText(this.game.width / 2, this.game.height / 2 - 30, 'font2', '0', 25);
        this.BestScoreResText.anchor.setTo(0.5);
        
        if (localStorage.getItem('higscore') != null) {
            this.highrecuperado = localStorage.getItem('highscore');
            this.BestScoreResText.setText(this.highrecuperado);  
          
        } else {
            this.BestScoreResText.setText(this.ScoreResText.text); 
        }
        if(this.score> parseInt(this.BestScoreResText.text)){      
            localStorage.setItem('highscore', String(this.score));
            this.BestScoreResText.setText(this.ScoreResText.text);
        }
        this.actualScoreText.tint = 0xf15878;
        this.BestScoreText.tint = 0xf15878;
        this.facebookBtn = this.add.button(this.game.width / 2 - 60, this.game.height / 2 + 70, 'atlas', this.shareFacebook, this, 'fcbk_1.png', 'fcbk_1.png', 'fcbk_2.png');
        this.facebookBtn.anchor.setTo(0.5);
        this.twitterBtn = this.add.button(this.game.width / 2 + 60, this.game.height / 2 + 70, 'atlas', this.shareTwitter, this, 'twitter_1.png', 'twitter_1.png', 'twitter_2.png');
        this.twitterBtn.anchor.setTo(0.5);
        this.btnRetry = this.add.button(this.game.width / 2, this.game.height + 80, 'atlas', this.retry, this, 'retry_1.png', 'retry_1.png', 'retry_2.png');
        this.btnRetry.anchor.setTo(0.5);
        this.endGroup.add(this.endScr);
        this.endGroup.add(this.actualScoreText);
        this.endGroup.add(this.BestScoreText);
        this.endGroup.add(this.ScoreResText);
        this.endGroup.add(this.BestScoreResText);
        this.endGroup.add(this.facebookBtn);
        this.endGroup.add(this.twitterBtn);
        this.endGroup.y -= this.game.height;
        var tweenEnd = this.game.add.tween(this.endGroup).to({y: 0}, 300, Phaser.Easing.Quadratic.out, true, 0, 0);
        var tweenRetry = this.game.add.tween(this.btnRetry).to({y: this.game.height - 80}, 300, Phaser.Easing.Quadratic.out, true, 0, 0);

    },
    increaseScore: function () {
        this.score += this.currentPhoto.velocity + parseInt(this.currentPhoto.photo.x / (this.game.width / 10));
        this.scoreText.setText(this.score);

        var scoreTween = this.game.add.tween(this.scoreText.scale).to({x: 1.2, y: 1.2}, 100, Phaser.Easing.Quadratic.none, true);
        scoreTween.onComplete.add(function () {
            this.game.add.tween(this.scoreText.scale).to({x: 1, y: 1}, 100, Phaser.Easing.Quadratic.none, true);
        }, this)
    },
    decreasePoints: function () {
        if (this.score > 1) {
            this.score -= 2;
            this.scoreText.setText(this.score);
            this.scoreText.tint = 0xff0000;
            var scoreTween = this.game.add.tween(this.scoreText.scale).to({x: 0.8, y: 0.8}, 100, Phaser.Easing.Quadratic.none, true, 0, 0);
            scoreTween.onComplete.add(function () {
                var scoreTween2 = this.game.add.tween(this.scoreText.scale).to({x: 1, y: 1}, 100, Phaser.Easing.Quadratic.none, true);
                scoreTween2.onComplete.add(function () {
                    this.scoreText.tint = 0xFFFFFF;
                }, this);
            }, this)
        }
    },
    movePhotos: function () {

        this.currentPhoto.photo.x -= this.currentPhoto.velocity;

    },
    activePhoto: function () {
        
        if (this.actual >= this.photosVector.length - 1){
            this.actual = 0;
        }
        var randVel = this.rnd.between(2, 5);
        this.photosVector[this.actual].velocity = randVel;
        this.currentPhoto = this.photosVector[this.actual];
        this.photoActive = true;
        this.actual+=1;
        if(isMobile){
            this.currentPhoto.photo.inputEnabled = true;
            this.currentPhoto.photo.events.onInputDown.add(this.checkMobile, this);
        }

    },
    mostrarReady: function () {
        var tweenReady = this.game.add.tween(this.ready.scale).to({x: 1, y: 1}, 300, Phaser.Easing.Quadratic.none, true);
        tweenReady.onComplete.add(function () {
            tweenReady = this.game.add.tween(this.ready).to({alpha: 0}, 500, Phaser.Easing.Quadratic.none, true, 600);
            tweenReady.onComplete.add(function () {
                var tweengo = this.game.add.tween(this.go.scale).to({x: 1, y: 1}, 300, Phaser.Easing.Quadratic.none, true);
                tweengo.onComplete.add(function () {
                    var tweengo = this.game.add.tween(this.go).to({alpha: 0}, 500, Phaser.Easing.Quadratic.none, true, 600);
                    tweengo.onComplete.add(function () {
                        this.ready.scale.setTo(0);
                        this.go.scale.setTo(0);
                        this.ready.alpha = 1;
                        this.go.alpha = 1;
                        this.game.time.events.add(200, this.activePhoto, this);
                        this.scoreText.alpha = 1;
                    }, this);
                }, this);
            }, this);
        }, this);
    },
    shareFacebook: function () {

    },
    shareTwitter: function () {

    },
    retry: function () {
        this.game.state.start('Game');
    }
};



