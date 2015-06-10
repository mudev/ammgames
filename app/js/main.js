var stage, queue;
var faces = ['roly', 'nori', 'betty', 'happy', 'tag', 'duggee'];
var cards = [];
var cardsFlipped = [];
var matches = 0;
var assetsPath = 'audio/';
var sounds = [
    {src: 'slipbell.mp3', id: 1},
    {src: 'donthinkso.mp3', id: 2},
    {src: 'woofhi.mp3', id: 3},
    {src: 'dugaww.mp3', id: 4},
    {src: 'happy_yea.mp3', id: 5},
    {src: 'wooftada.mp3', id: 6}
];

function nextButton(){
    var btn = new ui.SimpleButton('Next Game');
    btn.addEventListener('click', function (event){
        location.assign("puzzle.html");
    });
    btn.setButton({upColor:'#FF0000', color:'#FFF', borderColor:'#FFF', overColor:'#9900',fontSize:'48'});
    btn.regX = btn.width / 2;
    btn.x = cardmatch.width / 2;
    btn.y = (cardmatch.height / 2) - (btn.height/2);
    stage.addChild(btn);
}
function startGame() {
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', function(e){
        stage.update();
    });
}
function buildCards() {
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
}
function shuffleCards() {
    var i, randomIndex;
    var l = cards.length;
    var shuffledCards = [];
    for (i = 0; i < l; i++) {
        randomIndex = Math.floor(Math.random() * cards.length);
        shuffledCards.push(cards[randomIndex]);
        cards.splice(randomIndex, 1);
    }
    cards = cards.concat(shuffledCards);
}
function evalGame() {
    if (matches === faces.length) {
        setTimeout(function () {
            createjs.Sound.play('6',createjs.Sound.INTERRUPT_EARLY,0,0,0,0.75,0);
            //alert('YOU WIN!');
        }, 300);
        nextButton();

    }
    else {
        cardsFlipped = [];
    }
}
//reset flipped cards
function resetFlippedCards() {
    cardsFlipped[0].mouseEnabled = cardsFlipped[1].mouseEnabled = true;
    cardsFlipped[0].getChildByName('back').visible = true;
    cardsFlipped[1].getChildByName('back').visible = true;
    cardsFlipped = [];
}
//cards match
function evalCardsFlipped() {
    if (cardsFlipped[0].key === cardsFlipped[1].key) {
        createjs.Sound.play('3',createjs.Sound.INTERRUPT_NONE,0,0,0,0.75,0);
        matches++;
        evalGame();
    }
    else {
        setTimeout(resetFlippedCards, 1000);
        createjs.Sound.play('2',createjs.Sound.INTERRUPT_NONE,0,0,0,0.75,0);
    }
}

function flipCard(e) {
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
}
// rotation of cards on deal
function dealCards() {
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
}
function init() {
    var baize = new createjs.Bitmap('images/baize.jpg');
    stage = new createjs.Stage('cardmatch');
    stage.addChild(baize);
    //createjs.Sound.alternateExtensions = ["mp3"];// add other extensions to try loading if the src file extension is not supported
    createjs.Sound.registerSounds(sounds, assetsPath);
    startGame();
    buildCards();
    shuffleCards();
    dealCards();
}

function loader() {
  queue = new createjs.LoadQueue();
  queue.installPlugin(createjs.Sound);
  queue.addEventListener('complete', init);
  queue.loadManifest([
      {id:'shell', src:'images/card2.png'},
      {id:'back', src:'images/back2.png'},
      {id:'roly', src:'images/roly.png'},
      {id:'nori', src:'images/nori.png'},
      {id:'betty', src:'images/betty.png'},
      {id:'happy', src:'images/happy.png'},
      {id:'duggee', src:'images/duggee.png'},
      {id:'tag', src:'images/tag.png'}
  ]);
}