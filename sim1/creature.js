
// Returns a unique creature ID each time it is invoked.
var creatureID = (function() {
    var id = 0;
    return function() { return id++; };
})();

function arg_with_default(arg, def) {
    return (typeof arg == 'undefined' ? def : arg);
}

// Constructs a creature.
function Creature(props, lovesFeatures, hatesFeatures) {
    this.id = creatureID();
    this.bodyShape = props.bodyShape;
    this.bodyColour = props.bodyColour;
    this.eyeShape = props.eyeShape;
    this.lipShape = props.lipShape;
    this.lovesFeatures = arg_with_default(lovesFeatures, this.features());
    this.hatesFeatures = arg_with_default(hatesFeatures, this.notFeatures());
}

// Set constructor
Creature.prototype.constructor = Creature;

Creature.EYE_SHAPES = ['circleEyes', 'moonEyes', 'triangleEyes'];
Creature.LIP_SHAPES = ['thickLips', 'thinLips', 'noneLips'];
Creature.BODY_COLOURS = ['greenBody', 'purpleBody', 'blueBody', 'orangeBody'];
Creature.BODY_SHAPES = ['squareBody', 'circleBody', 'triangleBody', 'septagonBody'];
Creature.ALL_FEATURES = _.union(Creature.EYE_SHAPES, Creature.LIP_SHAPES,
                                Creature.BODY_SHAPES, Creature.BODY_COLOURS);

// Render a creature as HTML text,
Creature.prototype.toHtmlText = function() {
    var nl = '<br/>';
    return  '#' + this.id   + nl +
            this.bodyShape  + nl +
            this.bodyColour + nl +
            this.eyeShape   + nl +
            this.lipShape   + nl;
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

// Force this creature to love everyone!
Creature.prototype.makeLoving = function() {
    this.addLoves(Creature.ALL_FEATURES);
};

// Make this a really spiteful creature (they even hate themselves...).
Creature.prototype.makeHateful = function() {
    this.addHates(Creature.ALL_FEATURES);
};

// Check compatibility with otherCreature. Returns one of ['hate', 'love', 'meh'].
Creature.prototype.compatibility = function(otherCreature) {
    // If otherCreature has any feature I hate, then I hate them.
    numberOfLovedFeatures = _.intersection(this.lovesFeatures, otherCreature.features()).length;
    numberOfHatedFeatures = _.intersection(this.hatesFeatures, otherCreature.features()).length;

    if(numberOfLovedFeatures == 0 && numberOfHatedFeatures > 0) {
        return "hate";
    } else {
        return "love";
    }
};

