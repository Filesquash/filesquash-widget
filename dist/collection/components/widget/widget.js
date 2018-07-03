export class FilesquashWidget {
    constructor() {
        this.multiple = true;
        this.buttonText = 'Selecionar arquivos';
    }
    componentDidLoad() {
        this.modal = document.querySelector('filesquash-modal');
        this.modal.componentOnReady()
            .then(() => {
            this.modal.addEventListener('uploadCompleted', res => this.uploadCompleted.emit(res.detail));
        });
        document.body.appendChild(this.modal);
    }
    render() {
        return (h("div", { class: "filesquash-widget" },
            h("button", { type: "button", class: "btn", onClick: () => this.modal.toggleModal() }, this.buttonText),
            h("filesquash-modal", { token: this.token, multiple: this.multiple, "label-text": this.labelText, "upload-button-text": this.uploadButtonText, "local-files-title": this.localFilesTitle, "selected-files-text": this.uploadButtonText, "selected-pdf-placeholder": this.uploadButtonText, "selected-video-placeholder": this.uploadButtonText, "selected-file-placeholder": this.uploadButtonText })));
    }
    static get is() { return "filesquash-widget"; }
    static get properties() { return {
        "buttonText": {
            "type": String,
            "attr": "button-text"
        },
        "labelText": {
            "type": String,
            "attr": "label-text"
        },
        "localFilesTitle": {
            "type": String,
            "attr": "local-files-title"
        },
        "modal": {
            "state": true
        },
        "multiple": {
            "type": Boolean,
            "attr": "multiple"
        },
        "selectedFilePlaceholder": {
            "type": String,
            "attr": "selected-file-placeholder"
        },
        "selectedFilesText": {
            "type": String,
            "attr": "selected-files-text"
        },
        "selectedPdfPlaceholder": {
            "type": String,
            "attr": "selected-pdf-placeholder"
        },
        "selectedVideoPlaceholder": {
            "type": String,
            "attr": "selected-video-placeholder"
        },
        "token": {
            "type": String,
            "attr": "token"
        },
        "uploadButtonText": {
            "type": String,
            "attr": "upload-button-text"
        }
    }; }
    static get events() { return [{
            "name": "uploadCompleted",
            "method": "uploadCompleted",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:filesquash-widget:**/"; }
}
