/*
 * I guess I can think of the fight as something else
 *
 * You have options, and transitions based on what stats you have.
 *
 * TODO: make it possible to change text for different fights,
 * possibly conditional on health
 * TODO: implement logic for "fiction" option, currently just does damage
 * TODO: practice fight at academy, if you join the army(another todo)
 */
if(!window.main) main = {};

main.fight = {};
main.fight.defaults = {
    'fight-normal': {
        template: '<button class="fight-attack">Attack</button><button class="fight-fiction">Fiction</button><button class="fight-item">Item</button><button class="fight-taunt">Taunt</button>',
        chars: 'kuma'

    },
    'fight-attack': {
        HP: -1,
        template: 'Damaged your enemy',
        next: 'enemy',
        chars: 'kuma, enemy'
    },
    'fight-item': {
        template: 'NOT IMPLEMENTED',
        next: 'enemy',
        chars: 'kuma'
    },
    'fight-fiction': {
        HP: -2,
        template: 'Using all fiction',
        next: 'enemy',
        chars: 'kuma,screw,enemy'
    },
    'fight-taunt': {
        template: 'Why don\'t you just give up now?',
        next: 'enemy',
        chars: 'kuma,enemy'
    },
    'enemy': {
        template: 'Enemy does nothing',
        next: 'fight-normal',
        chars: 'enemy'
    }
};

main.fight.normalize = function(fightData, enemyName) {
    _.each(fightData, function(state, key) {
        state.chars = _.unique(state.chars.toLowerCase().match(/\w+/g));
        state.chars = _.map(state.chars, function(name) { 
            return name == 'enemy' ? enemyName : name;
        });
    });
};
main.fight.validate = function(fightData) {
    var validStates = _.keys(fightData);
    var errors = [];
    
    _.each(fightData, function(state, key) {
        if(state.next !== undefined && !_.contains(validStates, state.next)) {
            errors.push("Invalid next state " + state.next + " for " + key);
        }
        if(!state.template || state.template.length == 0) {
            errors.push(key + " does not have a template");
        }
        if(!$.isArray(state.chars)) {
            errors.push(key + " has invalid character names");
        }
    });
    if(errors.length > 0) {
        throw new Error(errors.join('\n'));
    }
};
main.fight.Fight = function (enemyData, rpg) {
    this.maxHP = this.HP = enemyData.HP;
    this.next = enemyData.next;
    this.data = enemyData
    this.name = enemyData.name;
    this.curState = 'fight-normal';
    this.states = $.extend(true, {}, main.fight.defaults);
    this.rpg = rpg;

    main.fight.normalize(this.states, enemyData.name);
    main.fight.validate(this.states);
    _.bindAll(this, 'render', 'setFightState');
}

main.fight.Fight.prototype = {
    render: function() {
        var rpg = this.rpg;
        rpg.html('');

        rpg.append($('<span class="id-my-name"></span>').text("kuma"));
        rpg.append($('<span class="id-my-health"></span>').text(main.charInfo.HP + "/" + main.charInfo.maxHP));
        rpg.append($('<span class="id-enemy-health"></span>').text(this.HP + "/" + this.maxHP));
        rpg.append($('<span class="id-enemy-name"></span>').text(this.name));


        // i really should use a button
        var types = {
            "attack": this.attack,
            "fiction": this.fiction,
            "item": this.item,
            "taunt":  this.taunt
        };

        var stateData = this.states[this.curState];
        var options = $('<div id="fight-options"></div>');
        options.html(stateData.template);
        var setFightState = this.setFightState;
        _.each(['fight-attack', 'fight-fiction', 'fight-item', 'fight-taunt'], function(state){
            options.on('click', '.' + state, function() {
                setFightState(state);
            });
        });

        if(stateData.next) {
            options.append($('<button class="id-fight-next-button">Next</button>').click(function() { setFightState(stateData.next)}));
        }

        console.log(stateData.chars);
        stateData.chars.forEach(function(character) {
            rpg.append($("<div/>").addClass('character ' + character));
        });

        rpg.append(options);
    },

    update: function() {
        var dH = this.states[this.curState].HP;
        if(dH) {
            this.HP += dH;
        }
        if(this.HP <= 0) {
            engine.setState(this.next);
        }
    },

    setFightState: function(newState) {
        this.curState = newState;
        this.update();
        this.render();
    }
};
main.fight.load = function(data) {
    var rpg = $('<div id="fight"><div id="fight-options"></div></div>');
    var fight = new main.fight.Fight(data, rpg);

    fight.render();
    main.game.html(rpg);
};
