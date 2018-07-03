/*! Built with http://stenciljs.com */
import { h } from './filesquash.core.js';
var MyComponent = /** @class */ (function () {
    function MyComponent() {
    }
    MyComponent.prototype.validateName = function (newSrc) {
        var isBlank = typeof newSrc == null;
        if (isBlank) {
            throw new Error('src: required');
        }
    };
    MyComponent.prototype.validateProjectId = function (newProjectId) {
        var isBlank = typeof newProjectId == null;
        var has8chars = typeof newProjectId === 'string' && newProjectId.length === 8;
        if (isBlank) {
            throw new Error('projectId: required');
        }
        if (!has8chars) {
            throw new Error('projectId: invalid');
        }
    };
    MyComponent.prototype.getFilters = function (filters, size) {
        var blacklistedValues = ['grayscale'];
        var processedFilters = "filters:quality(100)";
        var crop = '';
        var mirror = '';
        filters.split(";").forEach(function (filter) {
            var _a = filter.split('='), property = _a[0], value = _a[1];
            if (property === 'mirror') {
                mirror = value ? '-' : '';
            }
            else if (property === 'crop') {
                crop = !!value ? value : '';
            }
            else {
                processedFilters += ":" + property + "(" + (blacklistedValues.indexOf(property) === -1 ? value : '') + ")";
            }
        });
        return "" + (size ? (crop + mirror + size) + '/' : '') + processedFilters;
    };
    MyComponent.prototype.processExternalImage = function (src, projectId, size, filters) {
        return "https://filesquash.io/v1/" + projectId + "/process/" + this.getFilters(filters, size) + "/" + encodeURIComponent(src);
    };
    MyComponent.prototype.processHostedImage = function (src, projectId, size, filters, onlyUuid) {
        return onlyUuid
            ? "https://filesquash.io/v1/" + projectId + "/assets/" + src + "/" + this.getFilters(filters, size)
            : src + "/" + this.getFilters(filters, size) + "/" + encodeURIComponent(src);
    };
    MyComponent.prototype.getImage = function (src, projectId, size, filters) {
        var uuidV4Checker = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i);
        var hostedAssetChecker = new RegExp(/^(http|https):\/\/filesquash\.io\//i);
        var onlyUuid = uuidV4Checker.test(src);
        var hostedAsset = hostedAssetChecker.test(src);
        return hostedAsset || onlyUuid
            ? this.processHostedImage(src, projectId, size, filters, onlyUuid)
            : this.processExternalImage(src, projectId, size, filters);
    };
    MyComponent.prototype.render = function () {
        return (h("img", { src: this.getImage(this.src, this.projectId, this.size, this.filters), alt: this.alt }));
    };
    Object.defineProperty(MyComponent, "is", {
        get: function () { return "filesquash-img"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyComponent, "properties", {
        get: function () {
            return {
                "alt": {
                    "type": String,
                    "attr": "alt"
                },
                "el": {
                    "elementRef": true
                },
                "filters": {
                    "type": String,
                    "attr": "filters"
                },
                "projectId": {
                    "type": String,
                    "attr": "project-id",
                    "watchCallbacks": ["validateProjectId"]
                },
                "size": {
                    "type": String,
                    "attr": "size"
                },
                "src": {
                    "type": String,
                    "attr": "src",
                    "watchCallbacks": ["validateName"]
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MyComponent, "style", {
        get: function () { return "filesquash-img {\n  display: inline-block; }"; },
        enumerable: true,
        configurable: true
    });
    return MyComponent;
}());
export { MyComponent as FilesquashImg };
