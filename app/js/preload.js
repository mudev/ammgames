
(function(){
	window.ui = window.ui || {};

	var Preload = function(fill, stroke) {
		this.fillColor = fill;
		this.strokeColor = stroke;
		this.initialize();
	};
	var p = Preload.prototype = new createjs.Container();

	p.width = 400;
	p.height = 40;
	p.fillColor;
	p.strokeColor;
	p.bar;
	p.Container_initialize = p.initialize;

	p.initialize = function() {
		this.Container_initialize();
		this.drawPreload();
	};

	p.drawPreload = function() {
		//background
		var loadscr = new createjs.Bitmap('images/loader1.jpg');

		//loader bar
		var outline = new createjs.Shape();
		outline.graphics.beginStroke(this.strokeColor);
		outline.graphics.drawRect(0,0, this.width, this.height);
		this.bar = new createjs.Shape();
		this.bar.graphics.beginFill(this.fillColor);
		this.bar.graphics.drawRect(0,0, this.width, this.height);
		this.bar.scaleX = 0;
		stage.addChild(loadscr, this.bar, outline);
	};

	p.update = function() {
		perc = perc > 1 ? 1 : perc;
		this.bar.scaleX = perc;
	};

	window.ui.Preload = Preload;
}());