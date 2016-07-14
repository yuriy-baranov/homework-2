/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";function App(o){function e(){for(var o,e=0;e<r.length;e++)if(r[e].isLocked){if(o&&r[e].isLocked){r[e].enable();break}}else o=!0}var r=[new Doors[0](0,e),new Doors[1](1,e),new Doors[2](2,e),new Box(3,e)];this.doors=r}var Doors=__webpack_require__(1).Doors,Box=__webpack_require__(1).Box,app=new App(document.querySelector(".app"));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";function Door0(t,e){function o(t){t.target.classList.add("door-riddle__button_pressed"),n.apply(this)}function r(t){t.target.classList.remove("door-riddle__button_pressed")}function n(){var t=!0;a.forEach(function(e){e.classList.contains("door-riddle__button_pressed")||(t=!1)}),t&&this.unlock()}DoorBase.apply(this,arguments);var a=[this.popup.querySelector(".door-riddle__button_0"),this.popup.querySelector(".door-riddle__button_1"),this.popup.querySelector(".door-riddle__button_2")];a.forEach(function(t){t.addEventListener("pointerdown",o.bind(this)),t.addEventListener("pointerup",r.bind(this)),t.addEventListener("pointercancel",r.bind(this)),t.addEventListener("pointerleave",r.bind(this))}.bind(this))}function Door1(t,e){function o(t){var e=t.target;"false"===e.dataset.catched&&(e.dataset.startX=t.pageX,e.dataset.catched="true",e.dataset.pointerId=t.pointerId,e.setPointerCapture(t.pointerId))}function r(t){var e=t.target;if("true"===e.dataset.catched&&e.dataset.pointerId==t.pointerId){var o,r=t.pageX-e.dataset.startX;o=e.classList.contains("play-field__box_top")?Math.min(200,Math.max(r,0)):Math.max(-200,Math.min(r,0)),e.style.transform="translateX("+o+"px)",i.call(this,e,o)}}function n(t){t.pointerId==t.target.dataset.pointerId&&(t.target.style.transform="translate(0px)",t.target.dataset.catched="false",i.call(this,t.target,0))}function a(t){"mouse"!==t.pointerType&&n.call(this,t)}function i(t,e){"true"===t.dataset.finished&&200!==Math.abs(e)&&(t.dataset.finished="false",p--),"false"===t.dataset.finished&&200===Math.abs(e)&&(t.dataset.finished="true",p++),s.call(this)}function s(){this.popup.querySelector(".play-field__score").textContent=p+"",2===p&&this.unlock()}DoorBase.apply(this,arguments);var d=[this.popup.querySelector(".play-field__box_top"),this.popup.querySelector(".play-field__box_bottom")];d.forEach(function(t){t.addEventListener("pointerdown",o.bind(this)),t.addEventListener("pointermove",r.bind(this)),t.addEventListener("pointerup",n.bind(this)),t.addEventListener("pointercancel",n.bind(this)),t.addEventListener("pointerleave",a.bind(this)),t.dataset.finished="false",t.dataset.catched="false"}.bind(this));var p=0}function Door2(t,e){function o(t){t.preventDefault(),u||(u=!0,s=t.pageX,d=t.pageY,c=t.pointerId,p=new Date,i.setPointerCapture(c))}function r(t){if(t.preventDefault(),t.pointerId===c){var e=t.pageX,o=t.pageY,r=new Date,n=Math.sqrt(Math.pow(s-e,2)+Math.pow(d-o,2));0!==n&&(l=n/screen.height/(r-p)*1e3,i.style.transform="translate("+(e-s)+"px, "+Math.min(100,-20*l)+"vh)")}}function n(){l>4?this.unlock():u&&(u=!1,i.style.transform="translate(0px)")}function a(t){u=!1}DoorBase.apply(this,arguments);var i=this.popup.querySelector(".door-riddle__animal");i.addEventListener("pointerdown",o.bind(this)),i.addEventListener("pointerup",r.bind(this)),i.addEventListener("pointercancel",a.bind(this)),i.addEventListener("transitionend",n.bind(this)),i.addEventListener("webkitTransitionEnd",n.bind(this));var s,d,p,c,l,u=!1}function Box(t,e){function o(t){if(!(v>1)){var e={x:t.pageX,y:t.pageY};0===v?(i=t.pointerId,d=e):1===v&&(s=t.pointerId,p=e,c=new h(d,p)),v++,_.setPointerCapture(t.pointerId)}}function r(t){if(t.preventDefault(),2==v&&(t.pointerId===i||t.pointerId===s)){var e={x:t.pageX,y:t.pageY};t.pointerId===i?d=e:p=e;var o=new h(d,p);n.call(this,o),D.opened&&(this.unlock(),D.lock())}}function n(t){var e=u(c,t);y+=e,_.style.transform="rotate("+y+"rad)",c=t,D.handleRotation(e)}function a(t){t.pointerId!==i&&t.pointerId!==s||(v--,1===v&&t.pointerId===i&&(i=s,d=p))}DoorBase.apply(this,arguments);var i,s,d,p,c,l=__webpack_require__(2),u=l.angleBetween,h=l.Vector,f=__webpack_require__(3),v=0,y=0,b=[0,10,-60,50],D=new f(b),_=this.popup.querySelector(".safe-center");_.addEventListener("pointerdown",o.bind(this)),_.addEventListener("pointermove",r.bind(this)),_.addEventListener("pointerup",a.bind(this)),_.addEventListener("pointercancel",a.bind(this)),this.showCongratulations=function(){alert("Поздравляю! Игра пройдена!")}}var DoorBase=__webpack_require__(4);Door0.prototype=Object.create(DoorBase.prototype),Door0.prototype.constructor=DoorBase,Door1.prototype=Object.create(DoorBase.prototype),Door1.prototype.constructor=DoorBase,Door2.prototype=Object.create(DoorBase.prototype),Door2.prototype.constructor=DoorBase,Box.prototype=Object.create(DoorBase.prototype),Box.prototype.constructor=DoorBase,module.exports={Doors:[Door0,Door1,Door2],Box:Box};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function CrossProduct(e,t){return e.x*t.y-e.y*t.x}function angleBetween(e,t){return Math.asin(CrossProduct(e,t))}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),Vector=function(){function e(t,n){_classCallCheck(this,e),this.x=n.x-t.x,this.y=n.y-t.y,this._normalize()}return _createClass(e,[{key:"_length",value:function(){return Math.sqrt(this.x*this.x+this.y*this.y)}},{key:"_normalize",value:function(){var e=this._length();0!==e&&(this.x=this.x/e,this.y=this.y/e)}}]),e}();module.exports={angleBetween:angleBetween,Vector:Vector};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var s=0;s<t.length;s++){var n=t[s];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,s,n){return s&&e(t.prototype,s),n&&e(t,n),t}}(),pi=Math.acos(-1),EPS=1,Safe=function(){function e(t){_classCallCheck(this,e),this.opened=!1,this._curStep=0,this._angle=0,this._realAngle=0,this._password=t,this._curKey=t[0],this.handleRotation(0)}return _createClass(e,[{key:"_reset",value:function(){this._angle=this._realAngle%100,this._curStep=0,this._curKey=this._password[0]}},{key:"_radsToUnits",value:function(e){return e/(2*pi)*100}},{key:"handleRotation",value:function(e){e=this._radsToUnits(-e),this._realAngle+=e,this._angle=(this._angle+e)%100,this._angle*this._curKey<0&&Math.abs(this._angle)>EPS?this._reset():Math.abs(this._angle-this._curKey)<EPS&&(this._angle-=this._curKey,this._curKey=this._password[++this._curStep],this._curStep===this._password.length&&(this.opened=!0))}},{key:"lock",value:function(){this._reset(),this.opened=!1}}]),e}();module.exports=Safe;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";function DoorBase(o,s){function e(){this.isDisabled||this.openPopup()}function i(){this.closePopup()}this.number=o,this.onUnclockCallback=s,this.level=document.querySelector(".level_"+o),this.door=document.querySelector(".door_level_"+o),this.popup=document.querySelector(".popup_level_"+o),this.close=this.popup.querySelector(".popup__close"),this.isLocked=!0,this.isDisabled=this.door.classList.contains("door_disabled"),this.door.addEventListener("click",e.bind(this)),this.close.addEventListener("click",i.bind(this))}DoorBase.prototype={openPopup:function(){this.popup.classList.remove("popup_hidden")},closePopup:function(){this.popup.classList.add("popup_hidden")},enable:function(){this.door.classList.remove("door_disabled"),this.isDisabled=!1},unlock:function(){this.door.classList.remove("door_locked"),this.isLocked=!1,this.closePopup(),this.onUnclockCallback(),this.showCongratulations()},showCongratulations:function(){}},module.exports=DoorBase;

/***/ }
/******/ ]);