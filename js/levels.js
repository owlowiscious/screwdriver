/**
 * This contains information about the levels.
 * engine.js checks that the formatting of stateData is correct,
 * and that the next state will work.
 * TODO: connect some of these states, the army part is left out.
 */

if(!window.stateData)
    stateData = {};

// the opening statements
$.extend(stateData, {
    pony_intro : { // the beginning of the game
        type: 'intro',
        next: { 
            '.id-begin': 'pony_piano',
            '.id-options': 'pony_options'
        }
    },
    pony_options: {
        type: 'text',
        lines: ['nobody:<Yet to add options or an options screen>'],
        next: 'pony_intro'
    },
    pony_piano : {
        type: 'text',
        lines: [
            "Kuma,Piano: AAAGH!",
            "Derpy: are you all right?",
            "Kuma,Piano: What the hell!"
        ],
        next: "pony_fight_piano"
    },
    pony_fight_piano: {
        name: 'piano',
        HP: 10,
        type: 'fight',
        next: 'pony_piano_over'
    },
    pony_piano_over: {
        type: 'text',
        lines: [
            'Derpy: wow, that looked like it hurt.',
            'nobody: <This game is horribly incomplete. "<>" means i need to fill something in>'
        ],
        next: 'ponyville'
    },
});
$.extend(stateData, {
    ponyville: {
        type: 'choice',
        lines: "kuma:Where should I go?",
        next: {
            "The weird tree": "ponyville_library",
            "Get some food": "ponyville_cake",
            "Wander around": "ponyville_farm"
        }
    }, 
    ponyville_library: {
        type: 'text',
        lines: [
            'kuma:Where am I?',
            'twilight:Strange...',
        ],
        next: 'ponyville'
    },
    ponyville_cake: {
        type: 'text',
        lines: ['pinkie:Hi, what\'s your name? I\'m pinkie pie!',
                'kuma:...',
                'pinkie:Ooh, let me guess!',
                'kuma:Screw...',
                'pinkie:Of course! Screw Driver!'
                ],
        next: 'ponyville'
    },
    ponyville_farm: {
        type: 'text',
        lines: [
            'applejack: Well howdy, partner!',
            'kuma:I\'m going...',
            'kuma:[Well then, this was fun]',
            "applejack: Wait, you're not from around here, are you!",
            "nobody: (you watch her panic and rush off)"
        ],
        next: 'pony_exile'
    },
    // there has to be some sort of cooperation.
    pony_exile: { // bound to happen eventually, unless it doesn't.
        type: 'choice',
        lines: [
            "brit:How the hell did you get past us?",
            "kuma:[what are you talking about?]",
            "brit:You're not supposed to be here.",
            "brit:How don't you know this?"
        ],
        next: { // Are all of these going to be the same? Eww.
            "Surrender": 'pony_exile_negotiate',
            "Fight":     'pony_exile_negotiate',
            "Argue":     'pony_exile_negotiate'
        }
    },
    pony_exile_negotiate: {
        type: 'choice',
        lines: [
            "kuma:<aside: free will doesn't yet matter(lazy)>", // not the best thing to hear
            "kuma:[I give up]. Why can't I be here, though",
            "brit:You've got to be kidding me.",
            "kuma:[You're clearly strong enough to force me out of this awful town.]",
            "kuma:[And you always get what you want, right?]",
            "brit:I mean, you really don't know...",
            "brit:why this down is so important?",
            "kuma:What place",
            "brit:Where this place is?",
            "brit:Sorry, I'm Brittania of the Equestrian Guards",
            "brit:We've been getting too many ponies showing up and trying to move here.",
            "brit:...",
            "brit:.....",
            "brit:And that's what I call a sticky situation.<Too lazy to write this>",
            "brit:Wait, you're not listed anywhere..."
        ],
        next: {
            "[Thanks, I'm going]": 'rain', // TODO: dialog that works
            "[I belong here]": 'ponyville',
            "Sweet, how do I join?": 'guard_begin' // really, how 
        }
    }
});


$.extend(stateData, {
    doom: {
        type: 'text',
        lines: [
            "villain: The author was pretty lazy here.",
            "villain: It's possible HL3 will come out before this is updated.",
            "villain: You've met with a terrible fate, haven't you?"
        ],
        next: 'pony_intro' //TODO: clear inventory stats when you hit intro (or don't bother and call it New Game+). Have to HAVE stats first
    }
});

// the village of rain. 
$.extend(stateData, {
    rain: {
        type: 'choice', 
        lines: [
            "kuma:Uggh, this looks just like the other town!"
        ],
        next: {
            'Get something to eat': 'rain_cafe',
            "Go to the bakery": 'rain_bakery',
            "Depart": 'rain_exit',
        }
    },
    rain_cafe: {
        type: "choice",
        lines: [
            "rainbow:Hi!",
            "kuma:<I'm too lazy to write this scene>",
        ],
        next: {
            "Go back": "rain",
            "<Go back>": "rain"
        }
    },
    rain_bakery: {
        type: 'text',
        lines: [
            "pinkie: Hi, what can i get you",
            "kuma: YOU AGAIN... nothing.",
            "pinkie: Oh, he's being <lazy> again?",
            "kuma: Who are you talking about?"
        ],
        next: 'rain'
    },
    rain_exit: {
        type: 'text',
        lines: "kuma: I'm out of here",
        next: 'doom'
    }
});

// okay, how is that going to work? How do I pace this?
// A limit on the number of turns you can use?
// Experience making it pointless
$.extend(stateData, {
    guard_begin: {
        type: 'text', 
        delta: {gold: 100},
        lines: [
            "brit: You're staying here",
            "kuma: I'm tirrrrrrrrreeeeeeeeeeeeedddddddddd",
            "brit: ARE YOU KIDDING? You haven't even started yet.",
            "brit: /],o)",
            "brit: Anyway, here's your signing bonus. Deserters will have to pay it back several times."
        ],
        next: "guard_training"
    },
    guard_training: {
        type: 'choice',
        lines: "brit: are you ready?", // should be soldier
        next: {
            "Martial training": "guard_fight",
            "Get out of here.": "guard_exit"
        }
    },
    guard_fight: {
        name: 'dummy',
        HP: 10,
        // TODO: gain experience, add armour shop or something EXP: 4,
        type: 'fight',
        next: 'guard_fight_over'
    },
    guard_fight_over: {
        type: 'text',
        lines: "brit: Wow, you're terrible at this",
        next: 'guard_training'
    },
    guard_exit: {
        type: "text",
        lines: "brit: [The author was lazy and didn't add anything]",
        next: "doom"
    }
    
});
