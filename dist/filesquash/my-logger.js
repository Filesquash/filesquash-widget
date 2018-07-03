/*! Built with http://stenciljs.com */
const { h } = window.filesquash;

class FilesquashModal {
    constructor() {
        this.message = false;
    }
    log(message) {
        this.message = message;
        console.log(message);
    }
    ;
    render() {
        return (h("div", null, this.message));
    }
    static get is() { return "my-logger"; }
    static get properties() { return {
        "log": {
            "method": true
        },
        "message": {
            "state": true
        }
    }; }
    static get style() { return ""; }
}

export { FilesquashModal as MyLogger };
