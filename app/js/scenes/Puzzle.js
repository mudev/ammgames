(function (window) {

    window.game = window.game || {};

    function Puzzle() {
        this.initialize();
    };

    //var p = Puzzle.prototype = new createjs.Container();
    var p = createjs.extend(Puzzle, createjs.Container);

    //p.Container_initialize = p.initialize;


    p.initialize = function () {
        this.Container_initialize();
        this.addBG();
        this.addMessages();
    }
    p.buildPuzzle= function() {
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
    p.evalPuzzle = function() {
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
        };
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
                this.dispatchEvent(game.GameStateEvents.GAME_OVER);
            }, 200);
        }
        else {
            selectedPieces = [];
        }
    }
    p.swapPieces = function() {
        var piece1 = selectedPieces[0];
        var piece2 = selectedPieces[1];
        createjs.Tween.get(piece1).wait(300).to({x:piece2.x, y:piece2.y},200);
        createjs.Tween.get(piece2).wait(300).to({x:piece1.x, y:piece1.y},200).call(function(){
            setTimeout(evalPuzzle,200);
        });
    }
    p.onPieceClick =  function(e) {
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
    p.shufflePuzzle = function() {
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
    p.startGame = function() {
        createjs.Ticker.addEventListener('tick', function(){
            stage.update();
        });
        createjs.Ticker.setFPS(60);
    }
    p.initpuzzle = function() {
        stage = new createjs.Stage(document.getElementById('puzzlecv'));
        createjs.Sound.registerSounds(sounds, assetsPath);
        buildPuzzle();
        startGame();
        setTimeout(shufflePuzzle, 2000);
    };

    //window.game.Puzzle = Puzzle;
    window.Puzzle = createjs.promote(Puzzle, 'Container');

}(window));