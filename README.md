##The game idea: Party Island

#####on Party Island

There's a neighbourhood of creatures where they hate each other's features.  
And whenever there's a party, some are innie, some are outie.  
Walk around and meet the creatures! They might learn to like your features.  
Then the next time there's a party, maybe no one will be outie. 

##The sim: creatures

####done

* Set up a neighbourhood of 144 unique characters combining 4x4x3x3 features (14 different features in all)
* Model initial creature biases (features they hate, features they love)
* Calculate overall openness of community (see specs below)
* Add functions to change biases, inspect/evaluate new love levels
* Sim neighbourhood (a looping street of 144 houses where all the creatures live)

####openness of Community

  * A creature would approach another creature if they present with no hated features, or at least one loved feature
  * Each creature has possible individual 'love level' of 144, 
    which is their openness to other creatures (nb it is possible to hate yourself)
  * Global love level is the number of mutual open connections between creatures
  * Max global love level is (144x144)/2 (well, technically 144 of these 'mutual connections' 
    are redundant, but anyway. Maybe it's twice as useful to love yourself...)
    
####to change & inspect Biases

At present, change biases thru eval box. E.g.:

````
var bob = creatureList[1];
var sue = creatureList[24];
var kim = creatureList[56];

bob.makeLoving();
kim.makeLoving();
sue.makeHateful();
sue.compatibility(kim);
````

Inspect creatures by clicking on the table. Global love stats are displayed and auto update.

####to do

* Visits and meetings
* Set timeout for bias shifts (discrimination returns over time)
* Balloons
* Parties (location, intensity)
* Symbols to indicate love levels
* Animations! for visits, meetings, bias shifts, throwing a party, party island 
* Probably other stuff
