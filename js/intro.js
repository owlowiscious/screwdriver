/**
 * An intro screen. Hardcoded since i didn't feel like doing otherwise.
 */

if(!window.main) main = {};
main.intro = {
    load: function(data) {
        var intro = '\
        <div id="intro" class="intro">\
            <h1 class="white">Screw Driver</h2>\
            <h2 class="white">A tale of a terrible pony</h2>\
            <h2 class="white">&lt;Buggy and incomplete at the moment&gt;</h2>\
            <button class="id-begin green-btn">Play</button>\
            <button class="id-options">Options</button>\
        </div>'

        main.game.html(intro);
        $.each(['.id-begin', '.id-options'], function(i, selector) {
            console.log(selector, data);
            
            var beginButton = main.game.find(selector);
            beginButton.click(function() {
                engine.setState(data.next[selector]);
            });
        })
    }
};
