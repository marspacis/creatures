(function() {

    test( "Creature Tests!", function( assert ) {

        var creature0 = new Creature({
            bodyShape: "squareBody",
            bodyColour: "blueBody",
            eyeShape: "circleEyes",
            lipShape: "thinLips"
        });
        assert.equal( creature0.id, 0, "First creature has id: 0");
        assert.equal( creature0.bodyShape, "squareBody", "Creature has right bodyShape");
        assert.equal( creature0.bodyColour, "blueBody", "Creature has right bodyColor");
        assert.equal( creature0.eyeShape, "circleEyes", "Creature has right eyeShape");
        assert.equal( creature0.lipShape, "thinLips", "Creature has right lipShape");

        var creature1 = new Creature({
            bodyShape: "circleBody",
            bodyColour: "blueBody",
            eyeShape: "moonEyes",
            lipShape: "noneLips"
        });
        assert.equal( creature1.id, 1, "Second creature has id: 1");


    });

})();