(function () {

    window.game = window.game || {};

    var AssetManager = function() {
        this.initialize();
        //this.Container_constructor();
    };
    var p = AssetManager.prototype = new createjs.EventDispatcher();
    //var p = createjs.extend(AssetManager, createjs.EventDispatcher);


    p.EventDispatcher_initialize = p.initialize;

    //sounds
    p.SUCCESS = 'success';
    p.FAIL = 'fail';
    p.FAIL2 = 'fail2';

    //graphics

    p.CARDTABLE = 'cardtable';
    p.TREASURE = 'treasure';

    //data


    //events
    p.ASSETS_PROGRESS = 'assets progress';
    p.ASSETS_COMPLETE = 'assets complete';

    // p.assetsPath = 'assets/';
    p.assetsPath_A = 'audio/';
    p.assetsPath_I = 'images/';

    p.loadManifest = null;
    p.queue = null;
    p.loadProgress = 0;

    p.initialize = function () {
        this.EventDispatcher_initialize();
        this.loadManifest = [
            {id: this.SUCCESS, src: this.assetsPath_a + 'wooftada.mp3'},
            {id: this.FAIL, src: this.assetsPath_A + 'donthinkso.mp3'},
            {id: this.FAIL2, src: this.assetsPath_A + 'dugaww.mp3'},
            {id: this.CARDTABLE, src: this.assetsPath_I + 'baize.jpg'},
            {id: this.TREASURE, src: this.assetsPath_I + 'treasure.jpg'}
        ];
    };
    p.preloadAssets = function () {
        var progressProxy = new createjs.proxy(this.assetsProgress, this);
        var completeProxy = new createjs.proxy(this.assetsLoaded, this);
        createjs.Sound.initializeDefaultPlugins();
        this.queue = new createjs.LoadQueue();
        this.queue.installPlugin(createjs.Sound);
        this.queue.addEventListener('complete', completeProxy);
        this.queue.addEventListener('progress', progressProxy);
        createjs.Sound.alternateExtensions = ['ogg'];
        this.queue.loadManifest(this.loadManifest);
    };
    p.assetsProgress = function (e) {
        this.loadProgress = e.progress;
        var event = new createjs.Event(this.ASSETS_PROGRESS);
        this.dispatchEvent(event);
    };
    p.assetsLoaded = function (e) {
        var event = new createjs.Event(this.ASSETS_COMPLETE);
        this.dispatchEvent(event);
    };
    p.getAsset = function(asset){
        return this.queue.getResult(asset);
    };
    window.game.AssetManager = AssetManager;
    //window.game.AssetManager = createjs.promote(AssetManager, 'EventDispatcher');
}());
