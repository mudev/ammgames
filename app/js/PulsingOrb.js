(function () {

    function PulsingOrb (color, size) {
        this.Container_constructor();
        this.color = color;
        this.size = size;
    }

    var p = createjs.extend(PulsingOrb, createjs.Container);

    p.count = 0;
    p.speed = 0;
    p.size = 0;

    p.initialize = function (color, size) {
        size = size !== undefined ? size : 20;
        color = color !== undefined ? color : '#F00';
        this.size = size;
        this.alpha = Math.random();
        this.graphics.beginFill(color).drawCircle(0, 0, size);
        this.on('tick', this.pulse);
    };
    p.pulse = function () {
        this.alpha = Math.cos(this.count++ * 0.1) * 0.4 + 0.6;
    };
    window.PulsingOrb = createjs.promote(PulsingOrb, 'Container');
}());