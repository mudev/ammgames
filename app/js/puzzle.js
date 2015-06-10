const PUZZLE_COLUMNS = 5;
const PUZZLE_ROWS = 3;
const PUZZLE_SIZE = 189;
const PUZZLE_HI = 156;
//all constants set for galaxy tab4 7 screen (945x470 canvas)
var stage;
var pieces = [];
var selectedPieces = [];
var assetsPath = 'audio/';
var sounds = [
    {src: 'boing.mp3', id: 1},
    {src: 'donthinkso.mp3', id: 2},
    {src: 'woofhi.mp3', id: 3},
    {src: 'dugaww.mp3', id: 4},
    {src: 'squiryay.mp3', id: 5},
    {src: 'wooftada.mp3', id: 6}
];

function buildPuzzle() {
    var i, piece;
    var l = PUZZLE_COLUMNS * PUZZLE_ROWS;
    var col = 0;
    var row = 0;
    for (i = 0; i < l; i++) {
        piece = new createjs.Bitmap('images/treasure.jpg');
        piece.sourceRect = new createjs.Rectangle(col * PUZZLE_SIZE, row * PUZZLE_HI, PUZZLE_SIZE, PUZZLE_HI);
        piece.homePoint = {x:col * PUZZLE_SIZE, y:row * PUZZLE_HI};
        piece.x = piece.homePoint.x;
        piece.y = piece.homePoint.y;
        stage.addChild(piece);
        pieces[i] = piece;
        col++;
        if (col === PUZZLE_COLUMNS) {
            col = 0;
            row++;
        }
    }
}
function evalPuzzle() {
    var win = true;
    var i, piece;
    selectedPieces[0].uncache();
    selectedPieces[1].uncache();
    for (i = 0; i < pieces.length; i++) {
        piece = pieces[i];
        if (piece.x !== piece.homePoint.x || piece.y !== piece.homePoint.y) {
            win = false;
            break;
        }
    }
    if (win) {
        setTimeout(function () {
            //alert('YOU DID IT!');
            winner = new createjs.Bitmap('images/uwin.png');
            winner.x = 95;
            winner.y = 235;
            stage.addChild(winner);
            createjs.Sound.play('5',createjs.Sound.INTERRUPT_NONE,0,0,0,0.75,0);
            //circle.addEventListener("click", function(event) { alert("clicked"); })
            // or similar from button class when applied-to next page etc
        }, 200);
    }
    else {
        selectedPieces = [];
    }
}
function swapPieces() {
    var piece1 = selectedPieces[0];
    var piece2 = selectedPieces[1];
    createjs.Tween.get(piece1).wait(300).to({x:piece2.x, y:piece2.y},200);
    createjs.Tween.get(piece2).wait(300).to({x:piece1.x, y:piece1.y},200).call(function(){
        setTimeout(evalPuzzle,200);
    });
}
function onPieceClick(e) {
    if (selectedPieces === 2) {
        return;
    }
    createjs.Sound.play('1',createjs.Sound.INTERRUPT_NONE,0,0,0,0.75,0);
    var piece = e.target;
    //prepare adjustments for bright screens on tablet
    var matrix = new createjs.ColorMatrix().adjustColor(30, 10, -100, 0);//bw set
    piece.filters = [
        new createjs.ColorMatrixFilter(matrix)
    ];
    piece.cache(0, 0, PUZZLE_SIZE, PUZZLE_HI);
    selectedPieces.push(piece);
    if (selectedPieces.length === 2) {
        swapPieces();

    }
}
function shufflePuzzle() {
    var i, piece, randomIndex;
    var col = 0;
    var row = 0;
    var p = [];
    p = p.concat(pieces);
    var l = p.length;
    for (i = 0; i < l; i++) {
        randomIndex = Math.floor(Math.random() * p.length);
        piece = p[randomIndex];
        p.splice(randomIndex, 1);
        createjs.Tween.get(piece).to({x:col * PUZZLE_SIZE, y:row * PUZZLE_HI},200);
        piece.addEventListener('click', onPieceClick);
        col++;
        if (col === PUZZLE_COLUMNS) {
            col = 0;
            row++;
        }
    }
}
function startGame() {
    createjs.Ticker.addEventListener('tick', function(){
        stage.update();
    });
    createjs.Ticker.setFPS(60);
}
function initpuzzle() {
    stage = new createjs.Stage(document.getElementById('puzzlecv'));
    createjs.Sound.registerSounds(sounds, assetsPath);
    buildPuzzle();
    startGame();
    setTimeout(shufflePuzzle, 1500);
}