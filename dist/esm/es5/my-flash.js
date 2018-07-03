/*! Built with http://stenciljs.com */
import { h } from './filesquash.core.js';
var MyFlash = /** @class */ (function () {
    function MyFlash() {
        this.active = false;
        this.activeClass = 'primary';
    }
    MyFlash.prototype.show = function (message, activeClass, duration) {
        var _this = this;
        this.message = message;
        this.activeClass = activeClass;
        this.active = true;
        this.timeout = setTimeout(function () {
            _this.active = false;
        }, duration);
    };
    MyFlash.prototype.dismiss = function () {
        this.active = false;
        clearTimeout(this.timeout);
    };
    MyFlash.prototype.render = function () {
        var _this = this;
        return (h("div", { onClick: function () { return _this.dismiss(); }, class: 'flash-container ' + (this.active ? 'show ' : 'hide ') + this.activeClass }, h("div", { class: "message" }, this.message), h("p", { class: "dismiss" }, "tap to dismiss")));
    };
    Object.defineProperty(MyFlash, "is", {
        get: function () { return "my-flash"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyFlash, "properties", {
        get: function () {
            return {
                "active": {
                    "state": true
                },
                "activeClass": {
                    "state": true
                },
                "message": {
                    "state": true
                },
                "show": {
                    "method": true
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyFlash, "style", {
        get: function () { return ""; },
        enumerable: true,
        configurable: true
    });
    return MyFlash;
}());
export { MyFlash };
