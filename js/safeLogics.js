const pi = Math.acos(-1);
// допустимая погрешность
const EPS = 1;

/**
 * Constructor
 * Создает экземпляр сейфа
 */
class Safe {
    constructor(password) {
        this.opened = false;
        this._curStep = 0;
        this._angle = 0;
        this._realAngle = 0;
        this._password = password;
        this._curKey = password[0];
        this.handleRotation(0);
    }

    /**
     * Обнуляет состояние сейфа, вызывается в случае ошибки на каком-то шаге ввода
     */
    _reset() {
        this._angle = this._realAngle % 100;
        this._curStep = 0;
        this._curKey = this._password[0];
    }

    /**
     * @returns угол в единицах измерения циферблата сейфа
     * @param угол в радианах
     */
    _radsToUnits(angle) {
        return angle / (2 * pi) * 100;
    }

    handleRotation(angleDiff) {
        angleDiff = this._radsToUnits(-angleDiff);
        this._realAngle += angleDiff;
        this._angle = (this._angle + angleDiff) % 100;
        if (this._angle * this._curKey < 0 && Math.abs(this._angle) > EPS) {
            this._reset();
        }
        else if (Math.abs(this._angle - this._curKey) < EPS) {
            this._angle -= this._curKey;
            this._curKey = this._password[++this._curStep];
            if (this._curStep === this._password.length) {
                this.opened = true;
            }
        }
    }

    /**
     * Блокирует сейф
     */
    lock() {
        this._reset();
        this.opened = false;    
    }
}

module.exports = Safe;