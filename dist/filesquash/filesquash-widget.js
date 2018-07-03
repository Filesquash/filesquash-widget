/*! Built with http://stenciljs.com */
const { h } = window.filesquash;

class FilesquashWidget {
    constructor() {
        this.multiple = true;
        this.buttonText = 'Browse files';
        this.labelText = 'Drop files here or click to select.';
        this.uploadButtonText = 'Upload';
        this.localFilesTitle = 'Local Files';
        this.selectedFilesText = 'Selected files';
        this.selectedPdfPlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M471.998 104c0-2.047-.781-4.094-2.342-5.656l-96-96c-1.5-1.499-3.534-2.342-5.654-2.342H368V0H64C50.745 0 40 10.745 40 24v464c0 13.255 10.745 24 24 24h384c13.255 0 24-10.745 24-24V104h-.002zM376 27.312L444.688 96H384c-4.418 0-8-3.582-8-8V27.312zM456 488c0 4.418-3.582 8-8 8H64c-4.418 0-8-3.582-8-8V24c0-4.418 3.582-8 8-8h296v72c0 13.255 10.745 24 24 24h72v376z'/%3E%3Cpath d='M184 40h-24c-4.418 0-8 3.582-8 8v40c0 4.418 3.582 8 8 8h24c.221.005.442.005.663 0 8.653-.183 15.52-7.347 15.337-16V56c.005-.221.005-.442 0-.663-.183-8.653-7.346-15.52-16-15.337zm0 40h-16V56h16v24zM120 40H96c-4.418 0-8 3.582-8 8v48h16V80h16c.221.005.442.005.663 0 8.653-.183 15.52-7.347 15.337-16v-8c.005-.221.005-.442 0-.663-.183-8.653-7.346-15.52-16-15.337zm0 24h-16v-8h16v8zM256 56V40h-32c-4.418 0-8 3.582-8 8v48h16V80h24V64h-24v-8h24zM416 160H96c-4.418 0-8 3.582-8 8v216h.002c0 2.047.781 4.094 2.342 5.656l72 72c1.5 1.5 3.534 2.344 5.656 2.344h248c4.418 0 8-3.582 8-8V168c0-4.418-3.582-8-8-8zM160 436.688L115.312 392H160v44.688zM408 448H176v-64c0-4.418-3.582-8-8-8h-64V176h304v272z'/%3E%3Cpath d='M280 200H136c-4.418 0-8 3.582-8 8v128c0 4.418 3.582 8 8 8h144c4.418 0 8-3.582 8-8V208c0-4.418-3.582-8-8-8zM155.312 328L200 283.312 244.688 328h-89.376zM272 328h-4.688l-31.768-31.768 12.688-12.688L272 307.312V328zm0-43.312l-18.112-18.112c-3.124-3.123-8.188-3.123-11.312 0l-18.344 18.344-18.576-18.576c-3.124-3.123-8.188-3.123-11.312 0L144 316.688V216h128v68.688zM376 200h-64c-4.418 0-8 3.582-8 8v16h16v-8h48v8h16v-16c0-4.418-3.582-8-8-8zM304 248h48v16h-48zM368 248h16v16h-16zM336 408h16v16h-16zM368 408h16v16h-16zM304 288h80v16h-80zM304 328h80v16h-80zM200 368h184v16H200z'/%3E%3C/svg%3E";
        this.selectedVideoPlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M471.998 104c0-2.047-.781-4.094-2.342-5.656l-96-96c-1.5-1.499-3.534-2.342-5.654-2.342H368V0H64C50.745 0 40 10.745 40 24v464c0 13.255 10.745 24 24 24h384c13.255 0 24-10.745 24-24V104h-.002zM376 27.312L444.688 96H384c-4.418 0-8-3.582-8-8V27.312zM456 488c0 4.418-3.582 8-8 8H64c-4.418 0-8-3.582-8-8V24c0-4.418 3.582-8 8-8h296v72c0 13.255 10.745 24 24 24h72v376z'/%3E%3Cpath d='M416 160H96c-4.418 0-8 3.582-8 8v288c0 4.418 3.582 8 8 8h320c4.418 0 8-3.582 8-8V168c0-4.418-3.582-8-8-8zm-8 288H104V176h304v272z'/%3E%3Cpath d='M291.576 272.84l-64-32c-1.112-.555-2.337-.844-3.58-.844-4.418.002-7.998 3.585-7.996 8.004v64c0 4.418 3.582 8 8 8 1.241.001 2.465-.286 3.576-.84l64-32c1.556-.775 2.816-2.036 3.591-3.591 1.971-3.954.363-8.758-3.591-10.729zM232 299.056v-38.112L270.112 280 232 299.056zM376 360H136c-4.418 0-8 3.582-8 8v48c0 4.418 3.582 8 8 8h240c4.418 0 8-3.582 8-8v-48c0-4.418-3.582-8-8-8zm-8 48H144v-32h224v32z'/%3E%3Cpath d='M160 384h16v16h-16zM336 384h16v16h-16zM192 384h16v16h-16zM224 384h96v16h-96zM144 40H96c-4.418 0-8 3.582-8 8v48c0 4.418 3.582 8 8 8h48c4.418 0 8-3.582 8-8V48c0-4.418-3.582-8-8-8zm-8 48h-32V56h32v32zM288 48H176c-4.418 0-8 3.582-8 8v16h16v-8h96v8h16V56c0-4.418-3.582-8-8-8zM168 88h96v16h-96zM280 88h16v16h-16z'/%3E%3C/svg%3E";
        this.selectedFilePlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M471.998 104c0-2.047-.781-4.094-2.342-5.656l-96-96c-1.5-1.499-3.534-2.342-5.654-2.342H368V0H64C50.745 0 40 10.745 40 24v464c0 13.255 10.745 24 24 24h384c13.255 0 24-10.745 24-24V104h-.002zM376 27.312L444.688 96H384c-4.418 0-8-3.582-8-8V27.312zM456 488c0 4.418-3.582 8-8 8H64c-4.418 0-8-3.582-8-8V24c0-4.418 3.582-8 8-8h296v72c0 13.255 10.745 24 24 24h72v376z'/%3E%3Cpath d='M416 160H96c-4.418 0-8 3.582-8 8v288c0 4.418 3.582 8 8 8h320c4.418 0 8-3.582 8-8V168c0-4.418-3.582-8-8-8zm-8 288H104V176h304v272zM144 40H96c-4.418 0-8 3.582-8 8v48c0 4.418 3.582 8 8 8h48c4.418 0 8-3.582 8-8V48c0-4.418-3.582-8-8-8zm-8 48h-32V56h32v32zM288 48H176c-4.418 0-8 3.582-8 8v16h16v-8h96v8h16V56c0-4.418-3.582-8-8-8zM168 88h96v16h-96zM280 88h16v16h-16z'/%3E%3Cpath d='M200 200h16v224h-16zM168 200h-32c-4.418 0-8 3.582-8 8v16h16v-8h16v8h16v-16c0-4.418-3.582-8-8-8zM168 392h-32c-4.418 0-8 3.582-8 8v24h16v-16h16v16h16v-24c0-4.418-3.582-8-8-8zM168 328h-32c-4.418 0-8 3.582-8 8v16h16v-8h16v8h16v-16c0-4.418-3.582-8-8-8zM168 264h-32c-4.418 0-8 3.582-8 8v24h16v-16h16v16h16v-24c0-4.418-3.582-8-8-8zM240 208h96v16h-96zM240 272h144v16H240zM272 336h80v16h-80zM240 400h144v16H240zM240 336h16v16h-16zM352 208h16v16h-16z'/%3E%3C/svg%3E";
        this.modalVisible = false;
        this.selectedFiles = [];
    }
    toggleModal(event) {
        if (event)
            event.stopPropagation();
        this.modalVisible = !this.modalVisible;
    }
    readFile(files) {
        if (files) {
            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (!this.selectedFiles.find(({ base64 }) => base64 === e.target.result)) {
                        this.selectedFiles = [...this.selectedFiles, { file, base64: e.target.result }];
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    }
    removeFile(index) {
        const selectedFilesCopy = [...this.selectedFiles];
        selectedFilesCopy.splice(index, 1);
        this.selectedFiles = selectedFilesCopy;
    }
    noop(event) {
        event.stopPropagation();
    }
    sendFile(file, token) {
        const body = new FormData();
        body.append('asset[file]', file);
        return fetch("https://filesquash.io/v1/assets", {
            method: "POST",
            body,
            headers: {
                Authorization: `Token token=${token}`
            }
        })
            .then(function (res) {
            return res.json();
        });
    }
    upload(files, token) {
        const promises = files.map(({ file }) => this.sendFile(file, token));
        Promise.all(promises).then(res => {
            this.selectedFiles = [];
            this.uploadCompleted.emit(res);
            this.toggleModal();
        });
    }
    renderImagePreview(base64, filename, index) {
        return h("div", { class: "item-preview" },
            h("img", { class: "image-preview", src: base64, alt: filename }),
            h("button", { type: "button", onClick: () => this.removeFile(index) }, "X"));
    }
    renderPlaceholder(type, filename, index) {
        return h("div", { class: "item-preview" },
            h("img", { class: "icon", src: this[`selected${type}Placeholder`], alt: filename }),
            h("p", null, filename),
            h("button", { type: "button", onClick: () => this.removeFile(index) }, "X"));
    }
    renderFilePreview(item, index) {
        if (/image\/*/.test(item.file.type))
            return this.renderImagePreview(item.base64, item.file.name, index);
        else if (/video\/*/.test(item.file.type))
            return this.renderPlaceholder('Video', item.file.name, index);
        else if (/application\/pdf/.test(item.file.type))
            return this.renderPlaceholder('Pdf', item.file.name, index);
        else
            return this.renderPlaceholder('File', item.file.name, index);
    }
    render() {
        return (h("div", { class: "filesquash-widget" },
            h("button", { type: "button", class: "btn", onClick: this.toggleModal.bind(this) }, this.buttonText),
            this.modalVisible && (h("div", { class: "modal", onClick: this.toggleModal.bind(this) },
                h("div", { class: "modal-content", onClick: this.noop.bind(this) },
                    h("h2", { class: "title" }, this.localFilesTitle),
                    h("button", { type: "button", class: "btn-icon", onClick: this.toggleModal.bind(this) },
                        h("svg", { viewBox: "0 0 32 32", id: "icon-close", width: "100%", height: "100%" },
                            h("path", { d: "M10.06 7.94a1.5 1.5 0 0 0-2.12 2.12L13.878 16l-5.94 5.94a1.5 1.5 0 0 0 2.122 2.12L16 18.122l5.94 5.94a1.5 1.5 0 0 0 2.12-2.122L18.122 16l5.94-5.94a1.5 1.5 0 0 0-2.122-2.12L16 13.878l-5.94-5.94z" }))),
                    h("div", { class: "filesquash-form" },
                        h("label", null,
                            this.labelText,
                            h("input", { type: "file", class: "file-upload", onChange: (e) => this.readFile(e.target.files), multiple: this.multiple }))),
                    this.selectedFiles.length > 0 && [
                        h("div", { class: "filesquash-preview" },
                            h("h2", { class: "title" }, this.selectedFilesText),
                            this.selectedFiles.map((file, index) => this.renderFilePreview(file, index))),
                        h("button", { type: "button", class: "btn", onClick: () => this.upload(this.selectedFiles, this.token) }, this.uploadButtonText)
                    ])))));
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
        "modalVisible": {
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
        "selectedFiles": {
            "state": true
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
    static get style() { return "filesquash-widget {\n  display: inline;\n  /* .preview {\n    display: inline-block;\n    position: relative;\n    margin: 5px;\n    padding: 5px;\n    border: 1px dashed #ccc;\n\n    > img {\n      max-width: 300px;\n      max-height 100px;\n    }\n\n    > span {\n      vertical-align: top;\n    }\n  } */ }\n  filesquash-widget *, filesquash-widget *::after, filesquash-widget *::before {\n    -webkit-font-smoothing: antialiased;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;\n    margin: 0;\n    padding: 0;\n    text-rendering: optimizeLegibility; }\n  filesquash-widget .widget {\n    position: relative; }\n  filesquash-widget .modal {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    position: absolute;\n    top: 0;\n    width: 100%;\n    min-height: 100%;\n    left: 0;\n    background: rgba(0, 0, 0, 0.6);\n    overflow: hidden;\n    overflow-y: auto;\n    white-space: nowrap;\n    -webkit-overflow-scrolling: touch;\n    z-index: 9; }\n  filesquash-widget .modal-content {\n    background: #fff;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    min-height: 60px;\n    padding: 16px;\n    position: relative;\n    width: 100%;\n    max-width: 640px; }\n  filesquash-widget .title {\n    font-size: 16px; }\n  filesquash-widget .btn {\n    background-color: #000;\n    border: 0;\n    border-radius: 5px;\n    color: #fff;\n    cursor: pointer;\n    display: inline-block;\n    font-size: 12px;\n    font-weight: bold;\n    padding: 17px 25px;\n    text-align: center;\n    text-decoration: none;\n    text-transform: uppercase; }\n  filesquash-widget .btn:disabled {\n    background-color: #777;\n    cursor: not-allowed; }\n  filesquash-widget .btn-icon {\n    position: absolute;\n    top: 0;\n    right: 0;\n    z-index: 49;\n    border-color: transparent;\n    color: #a4a2a1;\n    border-radius: 0;\n    padding: 10px;\n    min-width: 0;\n    width: 48px;\n    height: 48px;\n    background: transparent;\n    cursor: pointer; }\n  filesquash-widget .filesquash-form {\n    background: #ecf0f1;\n    margin: 16px 0 0;\n    min-width: 320px;\n    padding: 32px;\n    position: relative;\n    white-space: initial; }\n  filesquash-widget .filesquash-form form {\n    text-align: center; }\n  filesquash-widget .filesquash-form .file-upload {\n    position: absolute;\n    margin: 0;\n    padding: 0;\n    width: 100%;\n    height: 100%;\n    outline: none;\n    opacity: 0;\n    cursor: pointer;\n    top: 0;\n    left: 0; }\n  filesquash-widget .filesquash-preview {\n    margin: 16px 0;\n    white-space: initial; }\n    filesquash-widget .filesquash-preview > .title {\n      margin-bottom: 16px; }\n  filesquash-widget .filesquash-preview .item-preview {\n    float: left;\n    margin: 4px;\n    width: calc(50vw - 24px);\n    height: calc(50vw - 24px);\n    font-size: 12px;\n    text-align: center;\n    border: 1px solid #eee;\n    padding: 8px;\n    position: relative;\n    overflow: hidden;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n    word-break: break-word; }\n    \@media only screen and (min-width: 640px) {\n      filesquash-widget .filesquash-preview .item-preview {\n        max-width: 144px;\n        max-height: 144px; } }\n    filesquash-widget .filesquash-preview .item-preview > .icon {\n      margin: 4px;\n      width: 36px; }\n    filesquash-widget .filesquash-preview .item-preview > .image-preview {\n      max-height: 100%; }\n    filesquash-widget .filesquash-preview .item-preview > button {\n      position: absolute;\n      top: 0;\n      right: 0;\n      padding: 3px 6px;\n      background: rgba(0, 0, 0, 0.4);\n      color: white;\n      border: 0;\n      font-weight: bold;\n      outline: 0;\n      font-size: 14px;\n      cursor: pointer; }"; }
}

export { FilesquashWidget };
