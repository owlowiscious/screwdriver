if(!window.main) 
    main = {};

main.text = {
    load : function(data) {
        var rpg = $('<div id="rpg"><div id="rpg-text" class="text-box"></div></div>');
        var rpgText = rpg.find('#rpg-text');

        var curLine = 0;
        var nextButton = $('<button class="id-next-button"></button>');
        nextButton.text('>>>')
                  .click(function() { curLine++; showCurrentLine(); });
        rpg.append(nextButton);

        var showCurrentLine = function() {
            if(curLine + 1 >= data.lines.length) {
                nextButton.text('Next')
                          .off('click')
                          .click(_.bind(engine.setState, engine, data.next));
            }
            var chars = [];
            var line = new Line(data.lines[curLine]);
            rpg.find('.character').remove();
            _.each(line.chars, function(character) {
                rpg.append($("<div/>").addClass(character + " character"));
            });
            rpgText.text(line.text);
        };
        showCurrentLine();
        
        main.game.html('').append(rpg);
    }
};
