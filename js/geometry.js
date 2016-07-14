function CrossProduct(v1, v2) {
    return v1.x * v2.y - v1.y * v2.x;
}

/**
 * @returns ориентированный угол между нормированными векторами v1 и v2
 * @param Vector
 * @param Vector
 */
function angleBetween(v1, v2) {
    return Math.asin(CrossProduct(v1, v2));
}

/**
 * Constructor
 * Создает нормированный вектор по 2 точкам
 */
class Vector {
    constructor(p1, p2) {
        this.x = p2.x - p1.x;
        this.y = p2.y - p1.y;
        this._normalize();
    }
    _length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    /**
     * Нормирует вектор
     */
    _normalize() {
        let len = this._length();
        if (len === 0) {
            return;
        }
        this.x = this.x / len;
        this.y = this.y / len;
    }
}

module.exports = {
    angleBetween: angleBetween,
    Vector: Vector
}