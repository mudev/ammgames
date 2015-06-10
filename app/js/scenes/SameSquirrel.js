(function (window) {

    window.game = window.game || {};

    function SameSquirrel(){
        //this.Container_constructor();
        this.initialize();
        // this.setup();
    };
    assets = new game.AssetManager();
    var p = SameSquirrel.prototype = new createjs.Container();
    p.Container_initialize = p.initialize;
    //var p = createjs.extend (SameSquirrel, createjs.Container);
    // p.currentGameStateFunction;
    // p.currentGameState;
    // p.currentScene;

    p.initialize = function(){
        this.Container_initialize();
        this.addBG();
        // this.startGame();
        this.thisbuildCards();
        this.shuffleCards();
        this.dealCards();
    };
    p.addBG = function(){
        var baize = new createjs.Bitmap(assets.getAsset(assets.CARDTABLE));
        stage = new createjs.Stage('cardmatch');
        stage.addChild(baize);
    };
    // function startGame(){
    //     createjs.Ticker.setFPS(60);
    //     createjs.Ticker.addEventListener('tick', function(e){
    //         stage.update();
    //     });
    // }
    p.buildCards = function(){
        var i, card, card2, bmp, label, face;
        for (i = 0; i < faces.length; i++) {
            card = new createjs.Container();
            bmp = new createjs.Bitmap(queue.getResult('shell'));
            bmp.shadow = new createjs.Shadow('#666', 3, 3, 5);
            card.addChild(bmp);
            card.regX = (bmp.image.width)/2;
            card.regY = (bmp.image.height)/2;
            face = faces[i];
            bmp = new createjs.Bitmap(queue.getResult(face));
            bmp.regX = (bmp.image.width)/2;
            bmp.regY = (bmp.image.height)/2;
            bmp.x = card.regX;
            bmp.y = 70;
            card.addChild(bmp);
            label = new createjs.Text(faces[i].toUpperCase(), '20px Arial', '#FFFFFF');
            label.textAlign = 'center';
            label.x = card.regX;
            label.y = 144;
            card.addChild(label);
            bmp = new createjs.Bitmap(queue.getResult('back'));
            bmp.name = 'back';
            card.addChild(bmp);
            card2 = card.clone(true);
            card.key = card2.key = faces[i];
            cards.push(card, card2);
        }
    };
    p.shuffleCards = function(){
        var i, randomIndex;
        var l = cards.length;
        var shuffledCards = [];
        for (i = 0; i < l; i++) {
            randomIndex = Math.floor(Math.random() * cards.length);
            shuffledCards.push(cards[randomIndex]);
            cards.splice(randomIndex, 1);
        }
        cards = cards.concat(shuffledCards);
    };
    p.evalGame = function(){
        if (matches === faces.length) {
            setTimeout(function () {
                createjs.Sound.play(assets.SUCCESS);
                alert('YOU WIN!');
            }, 300);
        }
        else {
            cardsFlipped = [];
        }
    };
    //reset flipped cards
    p.resetFlippedCards = function(){
        cardsFlipped[0].mouseEnabled = cardsFlipped[1].mouseEnabled = true;
        cardsFlipped[0].getChildByName('back').visible = true;
        cardsFlipped[1].getChildByName('back').visible = true;
        cardsFlipped = [];
    };
    //cards match
    p.evalCardsFlipped = function(){
        if (cardsFlipped[0].key === cardsFlipped[1].key) {
            createjs.Sound.play(assets.SUCCESS);
            matches++;
            evalGame();
        }
        else {
            setTimeout(resetFlippedCards, 1000);
            createjs.Sound.play(assets.FAIL);
        }
    };
    p.flipCard = function(e){
        if (cardsFlipped.length === 2){
            return;
        }
        var card = e.currentTarget;
        card.mouseEnabled = false;
        card.getChildByName('back').visible = false;
        cardsFlipped.push(card);
        if (cardsFlipped.length === 2) {
            evalCardsFlipped();
        }
    };
    // rotation of cards on deal
    p.dealCards = function(){
        var i, card;
        var xPos = 100;
        var yPos = 120;
        var count = 0;
        for (i = 0; i < cards.length; i++) {
            card = cards[i];
            card.x = -100;
            card.y = 400;
            card.rotation = Math.random() * 600;
            card.addEventListener('click', flipCard);
            stage.addChild(card);
            createjs.Tween.get(card)
                .wait(i * 100)
                .to({x:xPos, y:yPos, rotation:0}, 300);
            xPos += 150;
            count++;
            if (count === 6) {
                count = 0;
                xPos = 100;
                yPos += 220;
            }
        }
    };
    window.game.SameSquirrel = SameSquirrel;
    //window.SameSquirrel = createjs.promote(SameSquirrel, 'Container');

}(window));