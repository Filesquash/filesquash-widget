/*! Built with http://stenciljs.com */
import { h } from './filesquash.core.js';
var FilesquashModal = /** @class */ (function () {
    function FilesquashModal() {
        this.message = false;
    }
    FilesquashModal.prototype.log = function (message) {
        this.message = message;
        console.log(message);
    };
    ;
    FilesquashModal.prototype.render = function () {
        return (h("div", null, this.message));
    };
    Object.defineProperty(FilesquashModal, "is", {
        get: function () { return "logger"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilesquashModal, "properties", {
        get: function () {
            return {
                "log": {
                    "method": true
                },
                "message": {
                    "state": true
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilesquashModal, "style", {
        get: function () { return ""; },
        enumerable: true,
        configurable: true
    });
    return FilesquashModal;
}());
export { FilesquashModal as Logger };
