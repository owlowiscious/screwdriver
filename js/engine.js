/**
 * The main game engine, which validates and parses the game files
 *
 * So ad hoc it's sickening.
 * TODO: refactor this and make it cleaner, remove debugging code.
 */

(function(){
var isValidKey = function(s) { return /^[\w]+$/.test(s); }
var isValidType = function(type) { return _.contains(['text', 'choice', 'fight', 'intro'], type); };

Engine = function(stateData) {
    this.stateData = $.extend(true, {}, stateData);
    this._normalize(this.stateData);
    this._validate(this.stateData);
};
Engine.prototype = {
    _validate: function(stateData) {
        var stateNames  = _.keys(stateData);
        var invalidKeys = _.reject(stateNames, isValidKey);
        var stateExists = _.bind(_.contains, _, stateNames);

        var errors = [];
        if(invalidKeys.length > 0) {
            errors.push(invalidKeys.join(", ") + " are not valid keys");
        }

        _.each(stateData, function(data, state) {
            if(!isValidType(data.type)) {
                errors.push(state + " has invalid type " + data.type );
            }
            var nextStates = _.contains(['choice', 'intro'], data.type) ? _.values(data.next) 
                                                                        : [data.next];
            var invalidNextStates = _.reject(nextStates, stateExists)
            _.each(invalidNextStates, function(nextState) {
                 errors.push(state + " has nonexistant next state " + nextState);
            });

            if(!_.contains(['intro', 'fight'], data.type)) {
                if(!data.lines || !data.lines.length) {
                    errors.push(state + " has empty lines " + JSON.stringify(data.lines));
                }
                _.each(data.lines, function(str) {
                    new Line(str);
                });
            }
            
        });

        if(errors.length > 0) {
            throw new Error(errors.join("\n"));
        }
    },

    _normalize: function(stateData) {
        // normalize
        _.each(stateData, function(data, state) {
            if(typeof data.lines == 'string') {
                data.lines = [data.lines];
            }
            console.log(data.lines, state);
        });
        console.log('finished normalizing');
    },

    // start or restart a game
    // TODO: reset player statistics
    setState: function(curState) {
        this.curState = curState;
        console.log('setting state to', this.curState);
        var data = this.stateData[this.curState];
        if (data.type in main) {
            main[data.type].load(data);
        } else {
            alert("O.O I'm so sorry");
        }
    }
};
})();
