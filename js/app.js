
var Doors = require('./doorOthers.js').Doors;
var Box = require('./doorOthers.js').Box;
/**
 * @class App
 * @param {Element} el
 */
function App(el) {
    var appEl = el,
        doors = [
            new Doors[0](0, onUnlock),
            new Doors[1](1, onUnlock),
            new Doors[2](2, onUnlock),
            new Box(3, onUnlock)
        ];

    this.doors = doors;

    /**
     * Callback вызывается в коде двери
     * Тут даем возможность открыть следующие двери
     */
    function onUnlock() {
        var previousUnlocked;

        // Даем открыть следующую дверь
        for (var i = 0; i < doors.length; i++) {
            if (!doors[i].isLocked) {
                previousUnlocked = true;
            } else {
                if (previousUnlocked && doors[i].isLocked) {
                    doors[i].enable();
                    break;
                }
            }
        }
    };
}

// Start the app
var app = new App(document.querySelector('.app'));
