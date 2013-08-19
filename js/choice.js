/**
 * Create and respond to choices in the game
 */
if(!window.main) main = {};

main.choice = {
    load: function(data) {
        var rpg = $('<div id="choice"><div id="choice-options"></div>' +
                 '<div id="choice-text" class="text-box"><p id="choice-question"></p><p id="choice-info"></p></div></div>');

        var options = rpg.find('#choice-options');
        _.each(data.next, function(state, text) {
            var option = $('<button/>').text(text)
                                       .addClass("next-option")
                                       .click(function(){engine.setState(state);});
            options.append(option);
        });
        rpg.find('#choice-question').text(data.lines[0]);
        _.each(data.lines.slice(1), function(line) {
            rpg.find('#choice-info').append($("<p/>").text(line));
        });
        main.game.html(rpg);
    }
};
