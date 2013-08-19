/**
 * Globals (probably be misleading)
 *
 * main
 * curState
 * charInfo
 * 
 * So we have a huge state machine, which can't really do everything 
 * I have planned for the game which has to do with the game.
 *
 * TODO: should split utilities up further into something sane?
 *
 * TODO: clean up globals in a sane way and implement something that can reasonably be saved.
 * distinguish between constants and game data (I guess)
 */

if(!window.main) main = {};

// The character info.
// TODO: make this part of a game file and get a scheme(or something).
// I also need to translate character level into stats,
// and stats into damage calculations and chances?
var BEGINNING_INFO = {
    level: 0,
    gold: 0,
    maxHP: 10,
    HP: 1,
    inventory: ['note']
};


// globals

function Line(line) {
    var parts = line.split(":", 2);
    if(parts.length != 2) {
        throw new Error(line + " is invalid dialog");
    }
    this.chars = _.unique(parts[0].toLowerCase().match(/\w+/g));
    this.text = parts[1].trim();
}

engine = new Engine(stateData);

function restartGame() {
    main.game = $('#game');
    main.charInfo = $.extend(true, {}, BEGINNING_INFO);
    engine.setState('pony_intro');
}

$(document).on('keypress', function(e) {
    var code = e.keyCode || e.charCode;
    var c = String.fromCharCode(code).toLowerCase();
    switch(c) {
        case ' ':
            $(".id-next-button, .id-fight-next-button").first().click();
            break;
    }
});
$(restartGame);
