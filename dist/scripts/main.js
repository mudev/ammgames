function nextButton(){var e=new ui.SimpleButton("Next Game");e.addEventListener("click",function(e){location.assign("puzzle.html")}),e.setButton({upColor:"#FF0000",color:"#FFF",borderColor:"#FFF",overColor:"#9900",fontSize:"48"}),e.regX=e.width/2,e.x=cardmatch.width/2,e.y=cardmatch.height/2-e.height/2,stage.addChild(e)}function startGame(){createjs.Ticker.setFPS(60),createjs.Ticker.addEventListener("tick",function(e){stage.update()})}function buildCards(){var e,a,t,s,d,i;for(e=0;e<faces.length;e++)a=new createjs.Container,s=new createjs.Bitmap(queue.getResult("shell")),s.shadow=new createjs.Shadow("#666",3,3,5),a.addChild(s),a.regX=s.image.width/2,a.regY=s.image.height/2,i=faces[e],s=new createjs.Bitmap(queue.getResult(i)),s.regX=s.image.width/2,s.regY=s.image.height/2,s.x=a.regX,s.y=70,a.addChild(s),d=new createjs.Text(faces[e].toUpperCase(),"20px Arial","#FFFFFF"),d.textAlign="center",d.x=a.regX,d.y=144,a.addChild(d),s=new createjs.Bitmap(queue.getResult("back")),s.name="back",a.addChild(s),t=a.clone(!0),a.key=t.key=faces[e],cards.push(a,t)}function shuffleCards(){var e,a,t=cards.length,s=[];for(e=0;t>e;e++)a=Math.floor(Math.random()*cards.length),s.push(cards[a]),cards.splice(a,1);cards=cards.concat(s)}function evalGame(){matches===faces.length?(setTimeout(function(){createjs.Sound.play("6",createjs.Sound.INTERRUPT_EARLY,0,0,0,.75,0)},300),nextButton()):cardsFlipped=[]}function resetFlippedCards(){cardsFlipped[0].mouseEnabled=cardsFlipped[1].mouseEnabled=!0,cardsFlipped[0].getChildByName("back").visible=!0,cardsFlipped[1].getChildByName("back").visible=!0,cardsFlipped=[]}function evalCardsFlipped(){cardsFlipped[0].key===cardsFlipped[1].key?(createjs.Sound.play("3",createjs.Sound.INTERRUPT_NONE,0,0,0,.75,0),matches++,evalGame()):(setTimeout(resetFlippedCards,1e3),createjs.Sound.play("2",createjs.Sound.INTERRUPT_NONE,0,0,0,.75,0))}function flipCard(e){if(2!==cardsFlipped.length){var a=e.currentTarget;a.mouseEnabled=!1,a.getChildByName("back").visible=!1,cardsFlipped.push(a),2===cardsFlipped.length&&evalCardsFlipped()}}function dealCards(){var e,a,t=100,s=120,d=0;for(e=0;e<cards.length;e++)a=cards[e],a.x=-100,a.y=400,a.rotation=600*Math.random(),a.addEventListener("click",flipCard),stage.addChild(a),createjs.Tween.get(a).wait(100*e).to({x:t,y:s,rotation:0},300),t+=150,d++,6===d&&(d=0,t=100,s+=220)}function init(){var e=new createjs.Bitmap("images/baize.jpg");stage=new createjs.Stage("cardmatch"),stage.addChild(e),createjs.Sound.registerSounds(sounds,assetsPath),startGame(),buildCards(),shuffleCards(),dealCards()}function loader(){queue=new createjs.LoadQueue,queue.installPlugin(createjs.Sound),queue.addEventListener("complete",init),queue.loadManifest([{id:"shell",src:"images/card2.png"},{id:"back",src:"images/back2.png"},{id:"roly",src:"images/roly.png"},{id:"nori",src:"images/nori.png"},{id:"betty",src:"images/betty.png"},{id:"happy",src:"images/happy.png"},{id:"duggee",src:"images/duggee.png"},{id:"tag",src:"images/tag.png"}])}var stage,queue,faces=["roly","nori","betty","happy","tag","duggee"],cards=[],cardsFlipped=[],matches=0,assetsPath="audio/",sounds=[{src:"slipbell.mp3",id:1},{src:"donthinkso.mp3",id:2},{src:"woofhi.mp3",id:3},{src:"dugaww.mp3",id:4},{src:"happy_yea.mp3",id:5},{src:"wooftada.mp3",id:6}];