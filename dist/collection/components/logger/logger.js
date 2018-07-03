export class MyFlash {
    constructor() {
        this.active = false;
        this.activeClass = 'primary';
    }
    show(message, activeClass, duration) {
        this.message = message;
        this.activeClass = activeClass;
        this.active = true;
        this.timeout = setTimeout(() => {
            this.active = false;
        }, duration);
    }
    dismiss() {
        this.active = false;
        clearTimeout(this.timeout);
    }
    render() {
        return (h("div", { onClick: () => this.dismiss(), class: 'flash-container ' + (this.active ? 'show ' : 'hide ') + this.activeClass },
            h("div", { class: "message" }, this.message),
            h("p", { class: "dismiss" }, "tap to dismiss")));
    }
    static get is() { return "my-flash"; }
    static get properties() { return {
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
    }; }
    static get style() { return "/**style-placeholder:my-flash:**/"; }
}
