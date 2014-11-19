
// Returns a unique creature ID each time it is invoked.
var creatureID = (function() {
    var id = 0;
    return function() { return id++; };
})();

function arg_with_default(arg, def) {
    return (typeof arg == 'undefined' ? def : arg);
}

// Constructs a creature.
function Creature(props, lovesList, hatesList) {
    this.id = creatureID();
    this.bodyShape = props.bodyShape;
    this.bodyColour = props.bodyColour;
    this.eyeShape = props.eyeShape;
    this.lipShape = props.lipShape;
    this.lovesList = arg_with_default(lovesList, this.features());
    this.hatesList = arg_with_default(hatesList, this.notFeatures());
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

// Check compatibility with otherCreature. Returns one of ['hate', 'love', 'meh'].
Creature.prototype.compatibility = function(otherCreature) {
    // If otherCreature has any feature I hate, then I hate them.
    if(!_.isEmpty(_.intersection(this.hatesList, otherCreature.features()))) {
        return 'hate';
    }
    // If otherCreature has any feature I love, then I love them.
    if(!_.isEmtpy(_.intersection(this.lovesList, otherCreature.features()))) {
        return 'love';
    }
    // Otherwise... I'm meh.
    return 'meh';
};

