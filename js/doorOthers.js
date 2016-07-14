// ===================== Пример кода первой двери =======================
/**
 * @class Door0
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */

var DoorBase = require('./doorBase.js');

function Door0(number, onUnlock) {
    DoorBase.apply(this, arguments);

    var buttons = [
        this.popup.querySelector('.door-riddle__button_0'),
        this.popup.querySelector('.door-riddle__button_1'),
        this.popup.querySelector('.door-riddle__button_2')
    ];

    buttons.forEach(function(b) {
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    }.bind(this));

    function _onButtonPointerDown(e) {
        e.target.classList.add('door-riddle__button_pressed');
        checkCondition.apply(this);
    }

    function _onButtonPointerUp(e) {
        e.target.classList.remove('door-riddle__button_pressed');
    }

    /**
     * Проверяем, можно ли теперь открыть дверь
     */
    function checkCondition() {
        var isOpened = true;
        buttons.forEach(function(b) {
            if (!b.classList.contains('door-riddle__button_pressed')) {
                isOpened = false;
            }
        });

        // Если все три кнопки зажаты одновременно, то откроем эту дверь
        if (isOpened) {
            this.unlock();
        }
    }
}

// Наследуемся от класса DoorBase
Door0.prototype = Object.create(DoorBase.prototype);
Door0.prototype.constructor = DoorBase;
// END ===================== Пример кода первой двери =======================

/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door1(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия второй двери здесь ====

    var boxes = [
        this.popup.querySelector('.play-field__box_top'),
        this.popup.querySelector('.play-field__box_bottom')
    ];

    boxes.forEach(function(box) {
        box.addEventListener('pointerdown', _onBoxPointerDown.bind(this));
        box.addEventListener('pointermove', _onBoxPointerMove.bind(this));
        box.addEventListener('pointerup', _onBoxPointerUp.bind(this));
        box.addEventListener('pointercancel', _onBoxPointerUp.bind(this));
        box.addEventListener('pointerleave', _onBoxPointerLeave.bind(this));
        box.dataset.finished = 'false';
        box.dataset.catched = 'false';
    }.bind(this));

    // количество коробок, стоящих на нужном месте
    var finishedCount = 0;

    function _onBoxPointerDown(e) {
        var el = e.target;
        if (el.dataset.catched === 'false') {
            el.dataset.startX = e.pageX;
            el.dataset.catched = 'true';
            el.dataset.pointerId = e.pointerId;
            el.setPointerCapture(e.pointerId);    
        }
    }

    function _onBoxPointerMove(e) {
        var el = e.target;
        if (el.dataset.catched === 'true' && el.dataset.pointerId == e.pointerId) {

	        var diff = e.pageX - el.dataset.startX,
                changedShift;

            if (el.classList.contains('play-field__box_top')) {
                changedShift = Math.min(200, Math.max(diff, 0));
            }
            else {
                changedShift = Math.max(-200, Math.min(diff, 0));
            }
            el.style.transform = `translateX(${changedShift}px)`;
            checkCondition.call(this, el, changedShift);
        }
    }

    function _onBoxPointerUp(e) {
        if (e.pointerId == e.target.dataset.pointerId) {
            e.target.style.transform = 'translate(0px)';
            e.target.dataset.catched = 'false';
            checkCondition.call(this, e.target, 0);
        }
    }

    function _onBoxPointerLeave(e) {
        if (e.pointerType !== 'mouse') {
            _onBoxPointerUp.call(this, e);
        }
    }

    function checkCondition(el, changedShift) {
        if (el.dataset.finished === 'true' && Math.abs(changedShift) !== 200) {
            el.dataset.finished = 'false';
            finishedCount--;
        }
        if (el.dataset.finished === 'false' && Math.abs(changedShift) === 200) {
            el.dataset.finished = 'true';
            finishedCount++;
        }
        updateScore.call(this);
    }

    function updateScore() {
        this.popup.querySelector('.play-field__score').textContent = finishedCount + '';
        if (finishedCount === 2) {
            this.unlock();
        }
    }

    // ==== END Напишите свой код для открытия второй двери здесь ====
}

Door1.prototype = Object.create(DoorBase.prototype);
Door1.prototype.constructor = DoorBase;

/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door2(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия третей двери здесь ====
    
    var parrot = this.popup.querySelector('.door-riddle__animal');
    parrot.addEventListener('pointerdown', _onParrotPointerDown.bind(this));
    parrot.addEventListener('pointerup', _onParrotPointerUp.bind(this));
    parrot.addEventListener('pointercancel', _onParrotPointerCancel.bind(this));
    parrot.addEventListener('transitionend', checkCondition.bind(this));
    parrot.addEventListener('webkitTransitionEnd', checkCondition.bind(this));

    var isParrotUsed = false,
        startX, startY, startTime, pointerId, speed;

    function _onParrotPointerDown(e) {
        e.preventDefault();
        if (!isParrotUsed) {
            isParrotUsed = true;
            startX = e.pageX;
            startY = e.pageY;
            pointerId = e.pointerId;
            startTime = new Date();
            parrot.setPointerCapture(pointerId);
        }
    }

    function _onParrotPointerUp(e) {
        e.preventDefault();
        if (e.pointerId === pointerId) {
            var curX = e.pageX,
                curY = e.pageY,
                curTime = new Date(),
                distance = Math.sqrt(Math.pow(startX - curX, 2) + Math.pow(startY - curY, 2));

            if (distance !== 0) {
                speed = (distance / screen.height) / (curTime - startTime) * 1000;
                parrot.style.transform = `translate(${curX - startX}px, ${Math.min(100, (speed * -20))}vh)`;
            }
        }
    }

    function checkCondition() {
        if (speed > 4) {
            this.unlock();
        }
        else if (isParrotUsed) {
            isParrotUsed = false;
            parrot.style.transform = 'translate(0px)';
        }
    }

    function _onParrotPointerCancel(e) {
        isParrotUsed = false;
    }

    // ==== END Напишите свой код для открытия третей двери здесь ====
}
Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;

/**
 * Сундук
 * @class Box
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Box(number, onUnlock) {
    DoorBase.apply(this, arguments);
    
    // ==== Напишите свой код для открытия сундука здесь ====

    var geometryModule = require('./geometry.js'),
        angleBetween = geometryModule.angleBetween,
    	Vector = geometryModule.Vector,
        Safe = require('./safeLogics'),
        pointersCount = 0,
        firstPointerId,
        secondPointerId,
        firstPointerPos,
        secondPointerPos,
        oldVector,
        curAngle = 0;
    
    // код от сейфа
    var safePassword = [0, 10, -60, 50],
        safe = new Safe(safePassword);

    var safeCenter = this.popup.querySelector('.safe-center');
    safeCenter.addEventListener('pointerdown', _onSafePointerDown.bind(this));
    safeCenter.addEventListener('pointermove', _onSafePointerMove.bind(this));
    safeCenter.addEventListener('pointerup', _onSafePointerUp.bind(this));
    safeCenter.addEventListener('pointercancel', _onSafePointerUp.bind(this));

    function _onSafePointerDown(e) {
        if (pointersCount > 1) {
            return;
        }
        var position = { x: e.pageX, y: e.pageY };
        if (pointersCount === 0) {
            firstPointerId = e.pointerId;
            firstPointerPos = position;
        }
        else if (pointersCount === 1) {
            secondPointerId = e.pointerId;
            secondPointerPos = position;

            // фиксируется вектор, относительно которого будет вычисляться поворот
            oldVector = new Vector(firstPointerPos, secondPointerPos);
        }
        pointersCount++;
        safeCenter.setPointerCapture(e.pointerId);
    }

    function _onSafePointerMove(e) {
        e.preventDefault();

        // если данный pointer один из 2х, учавствующих в повороте, то поворот обрабатывается
        if (pointersCount == 2 && (e.pointerId === firstPointerId || e.pointerId === secondPointerId)) {
            
            var changedPos = {
                x : e.pageX,
                y : e.pageY
            };

            if (e.pointerId === firstPointerId) {
                firstPointerPos = changedPos;
            }
            else {
                secondPointerPos = changedPos;
            }

            var changedVector = new Vector(firstPointerPos, secondPointerPos);
            refreshAngle.call(this, changedVector);

            if (safe.opened) {
                this.unlock();
                safe.lock();
            }
        }
    }

    function refreshAngle(changedVector) {
        var angleDiff = angleBetween(oldVector, changedVector);
        curAngle += angleDiff;
        safeCenter.style.transform = `rotate(${curAngle}rad)`;
        oldVector = changedVector;
        safe.handleRotation(angleDiff);
    }

    function _onSafePointerUp(e) {
        if (e.pointerId === firstPointerId || e.pointerId === secondPointerId) {
            pointersCount--;

            // если был отпущен первый pointer, который учавствовал в повороте, то второй становится первым
            if (pointersCount === 1 && e.pointerId === firstPointerId) {
                firstPointerId = secondPointerId;
                firstPointerPos = secondPointerPos;
            }
        }
    }

    // ==== END Напишите свой код для открытия сундука здесь ====

    this.showCongratulations = function() {
        alert('Поздравляю! Игра пройдена!');
    };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;

module.exports = {
    Doors: [Door0, Door1, Door2],
    Box: Box
}