
// Returns a unique creature ID each time it is invoked.
var creatureID = (function() {
    var id = 0;
    return function() { return id++; };
})();

function arg_with_default(arg, def) {
    return (typeof arg == 'undefined' ? def : arg);
}

// Constructs a creature.
function Creature(props) {
    this.id = creatureID();
    this.bodyShape = props.bodyShape;
    this.bodyColour = props.bodyColour;
    this.eyeShape = props.eyeShape;
    this.lipShape = props.lipShape;
    this.setDefaultLovesAndHates();
}

// Set constructor
Creature.prototype.constructor = Creature;

Creature.EYE_SHAPES = ['sunEyes', 'moonEyes', 'starEyes'];
Creature.LIP_SHAPES = ['thickLips', 'thinLips', 'noneLips'];
Creature.BODY_COLOURS = ['greenBody', 'purpleBody', 'blueBody', 'orangeBody'];
Creature.BODY_SHAPES = ['squareBody', 'circleBody', 'triangleBody', 'septagonBody'];
Creature.ALL_FEATURES = _.union(Creature.EYE_SHAPES, Creature.LIP_SHAPES,
                                Creature.BODY_SHAPES, Creature.BODY_COLOURS);

// Determine initial loves and hates
Creature.prototype.setDefaultLovesAndHates = function() {
    var lovedFeatures, hatedFeatures;

    // What I love depends on my eye shape...
    if(this.eyeShape == 'sunEyes') {
        lovedFeatures = [this.bodyColour];
    } else if(this.eyeShape == 'moonEyes') {
        lovedFeatures = [this.bodyShape];
    } else if(this.eyeShape == 'starEyes') {
        lovedFeatures = [this.eyeShape];
    }

    // And I hate everything I don't love...
    hatedFeatures = _.difference(Creature.ALL_FEATURES, lovedFeatures);

    this.addLoves(lovedFeatures);
    this.addHates(hatedFeatures);
};

// Return a flat list of this creature's features.
Creature.prototype.features = function() {
    return [this.bodyShape, this.bodyColour, this.eyeShape, this.lipShape];
};

// Return a flat list of features this creature doesn't have
Creature.prototype.notFeatures = function() {
    return _.difference(Creature.ALL_FEATURES, this.features());
};

// Set it so that this creature loves these features. If they hated them
// before, they don't anymore.
Creature.prototype.addLoves = function(featureList) {
    this.hatesFeatures = _.difference(this.hatesFeatures, featureList);
    this.lovesFeatures = _.union(this.lovesFeatures, featureList);
};

// Set it so that this creature hates the given list of features. If they loved
// them before, they don't anymore. Tough luck, Romeo.
Creature.prototype.addHates = function(featureList) {
    this.lovesFeatures = _.difference(this.lovesFeatures, featureList);
    this.hatesFeatures = _.union(this.hatesFeatures, featureList);
};

// Similar to addLoves, but instead simply removes from hate list
Creature.prototype.removeHates = function(featureList) {
	this.hatesFeatures = _.difference(this.hatesFeatures, featureList);
}

// Force this creature to love everyone!
Creature.prototype.makeLoving = function() {
    this.addLoves(Creature.ALL_FEATURES);
};

// Make this a really spiteful creature (they even hate themselves...).
Creature.prototype.makeHateful = function() {
    this.addHates(Creature.ALL_FEATURES);
};

// Given a list of creatures, count how many we would approach
Creature.prototype.countApproachable = function(creatureList) {
    var totalApproachable = 0,
        me = this;
    _.each(creatureList, function(them) {
        if(me.compatibility(them) == 'approach') {
            totalApproachable++;
        }
    });
    return totalApproachable;

};

// Check compatibility with otherCreature. Returns one of ['approach', 'avoid'].
Creature.prototype.compatibility = function(otherCreature) {
    // If otherCreature has any feature I hate, and none that I love, then I avoid them.
    numberOfLovedFeatures = _.intersection(this.lovesFeatures, otherCreature.features()).length;
    numberOfHatedFeatures = _.intersection(this.hatesFeatures, otherCreature.features()).length;

    if(numberOfLovedFeatures == 0 && numberOfHatedFeatures > 0) {
        return "avoid";
    } else {
        return "approach";
    }
};

// Render a creature as HTML text,
Creature.prototype.toHtmlText = function() {
    var nl = '<br/>';
    return  '#' + this.id   + nl +
        this.bodyShape  + nl +
        this.bodyColour + nl +
        this.eyeShape   + nl +
        this.lipShape   + nl;
};

Creature.prototype.toCanvas = function(width, height) {
    width = arg_with_default(width, 96);
    height = arg_with_default(height, 96);
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(this.getBodyImage(), 0, 0, width, height);
    ctx.drawImage(this.getEyesImage(), 0, 0, width, height);
    ctx.drawImage(this.getLipsImage(), 0, 0, width, height);
    return canvas;
};

function loadImage(src) {
    var i = new Image();
    i.src = src;
    return i;
}

// Preload image tiles for creature.
Creature.preloadImageTiles = function(callback) {
    var SQUARE_TILES = {
            greenBody:  loadImage('images/square_body_green.png'),
            purpleBody: loadImage('images/square_body_purple.png'),
            blueBody:   loadImage('images/square_body_blue.png'),
            orangeBody: loadImage('images/square_body_orange.png')
        },
        CIRCLE_TILES = {
            greenBody:  loadImage('images/circle_body_green.png'),
            purpleBody: loadImage('images/circle_body_purple.png'),
            blueBody:   loadImage('images/circle_body_blue.png'),
            orangeBody: loadImage('images/circle_body_orange.png')
        },
        TRIANGLE_TILES = {
            greenBody:  loadImage('images/triangle_body_green.png'),
            purpleBody: loadImage('images/triangle_body_purple.png'),
            blueBody:   loadImage('images/triangle_body_blue.png'),
            orangeBody: loadImage('images/triangle_body_orange.png')
        },
        SEPTAGON_TILES = {
            greenBody:  loadImage('images/septagon_body_green.png'),
            purpleBody: loadImage('images/septagon_body_purple.png'),
            blueBody:   loadImage('images/septagon_body_blue.png'),
            orangeBody: loadImage('images/septagon_body_orange.png')
        };

    Creature.BODY_TILES = {
        squareBody: SQUARE_TILES,
        circleBody: CIRCLE_TILES,
        triangleBody: TRIANGLE_TILES,
        septagonBody: SEPTAGON_TILES
    };

    Creature.EYE_TILES = {
        sunEyes:  loadImage('images/sun_eyes.png'),
        moonEyes: loadImage('images/moon_eyes.png'),
        starEyes: loadImage('images/star_eyes.png')
    };

    Creature.LIPS_TILES = {
        thickLips: loadImage('images/thick_lips.png'),
        thinLips:  loadImage('images/thin_lips.png'),
        noneLips:  loadImage('images/no_lips.png')
    };

    var allTiles = [];
    allTiles = allTiles.concat(_.values(SQUARE_TILES));
    allTiles = allTiles.concat(_.values(CIRCLE_TILES));
    allTiles = allTiles.concat(_.values(TRIANGLE_TILES));
    allTiles = allTiles.concat(_.values(SEPTAGON_TILES));
    allTiles = allTiles.concat(_.values(Creature.EYE_TILES));
    allTiles = allTiles.concat(_.values(Creature.LIPS_TILES));
    imagesLoaded(allTiles, callback);
};

// Get the body image for this creature.
Creature.prototype.getBodyImage = function() {
    return Creature.BODY_TILES[this.bodyShape][this.bodyColour];
};

// Get the eyes image for this creature.
Creature.prototype.getEyesImage = function() {
    return Creature.EYE_TILES[this.eyeShape];
};

// Get the lips image for this creature.
Creature.prototype.getLipsImage = function() {
    return Creature.LIPS_TILES[this.lipShape];
};

