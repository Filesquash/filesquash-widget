import { Component, Element, Event, EventEmitter, Method, Prop, State } from '@stencil/core';

const dispatchEvent = (element, eventName, detail = null) => {
  const event = new CustomEvent(eventName, { "bubbles": true, "cancelable": true, detail });
  element.dispatchEvent(event);
}

@Component({
  tag: 'filesquash-modal',
  styleUrl: 'modal.scss'
})
export class FilesquashModal {
  @Element() modalElement: HTMLElement;

  @Event() uploadCompleted: EventEmitter;

  @Prop() multiple: boolean = true;

  @Prop() labelText: string = 'Arraste/solte seu arquivo aqui.';
  @Prop() uploadButtonText: string = 'Enviar';
  @Prop() localFilesTitle: string = '';
  @Prop() selectedFilesText: string = 'Arquivos selecionados';
  @Prop() selectedPdfPlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M471.998 104c0-2.047-.781-4.094-2.342-5.656l-96-96c-1.5-1.499-3.534-2.342-5.654-2.342H368V0H64C50.745 0 40 10.745 40 24v464c0 13.255 10.745 24 24 24h384c13.255 0 24-10.745 24-24V104h-.002zM376 27.312L444.688 96H384c-4.418 0-8-3.582-8-8V27.312zM456 488c0 4.418-3.582 8-8 8H64c-4.418 0-8-3.582-8-8V24c0-4.418 3.582-8 8-8h296v72c0 13.255 10.745 24 24 24h72v376z'/%3E%3Cpath d='M184 40h-24c-4.418 0-8 3.582-8 8v40c0 4.418 3.582 8 8 8h24c.221.005.442.005.663 0 8.653-.183 15.52-7.347 15.337-16V56c.005-.221.005-.442 0-.663-.183-8.653-7.346-15.52-16-15.337zm0 40h-16V56h16v24zM120 40H96c-4.418 0-8 3.582-8 8v48h16V80h16c.221.005.442.005.663 0 8.653-.183 15.52-7.347 15.337-16v-8c.005-.221.005-.442 0-.663-.183-8.653-7.346-15.52-16-15.337zm0 24h-16v-8h16v8zM256 56V40h-32c-4.418 0-8 3.582-8 8v48h16V80h24V64h-24v-8h24zM416 160H96c-4.418 0-8 3.582-8 8v216h.002c0 2.047.781 4.094 2.342 5.656l72 72c1.5 1.5 3.534 2.344 5.656 2.344h248c4.418 0 8-3.582 8-8V168c0-4.418-3.582-8-8-8zM160 436.688L115.312 392H160v44.688zM408 448H176v-64c0-4.418-3.582-8-8-8h-64V176h304v272z'/%3E%3Cpath d='M280 200H136c-4.418 0-8 3.582-8 8v128c0 4.418 3.582 8 8 8h144c4.418 0 8-3.582 8-8V208c0-4.418-3.582-8-8-8zM155.312 328L200 283.312 244.688 328h-89.376zM272 328h-4.688l-31.768-31.768 12.688-12.688L272 307.312V328zm0-43.312l-18.112-18.112c-3.124-3.123-8.188-3.123-11.312 0l-18.344 18.344-18.576-18.576c-3.124-3.123-8.188-3.123-11.312 0L144 316.688V216h128v68.688zM376 200h-64c-4.418 0-8 3.582-8 8v16h16v-8h48v8h16v-16c0-4.418-3.582-8-8-8zM304 248h48v16h-48zM368 248h16v16h-16zM336 408h16v16h-16zM368 408h16v16h-16zM304 288h80v16h-80zM304 328h80v16h-80zM200 368h184v16H200z'/%3E%3C/svg%3E";
  @Prop() selectedVideoPlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M471.998 104c0-2.047-.781-4.094-2.342-5.656l-96-96c-1.5-1.499-3.534-2.342-5.654-2.342H368V0H64C50.745 0 40 10.745 40 24v464c0 13.255 10.745 24 24 24h384c13.255 0 24-10.745 24-24V104h-.002zM376 27.312L444.688 96H384c-4.418 0-8-3.582-8-8V27.312zM456 488c0 4.418-3.582 8-8 8H64c-4.418 0-8-3.582-8-8V24c0-4.418 3.582-8 8-8h296v72c0 13.255 10.745 24 24 24h72v376z'/%3E%3Cpath d='M416 160H96c-4.418 0-8 3.582-8 8v288c0 4.418 3.582 8 8 8h320c4.418 0 8-3.582 8-8V168c0-4.418-3.582-8-8-8zm-8 288H104V176h304v272z'/%3E%3Cpath d='M291.576 272.84l-64-32c-1.112-.555-2.337-.844-3.58-.844-4.418.002-7.998 3.585-7.996 8.004v64c0 4.418 3.582 8 8 8 1.241.001 2.465-.286 3.576-.84l64-32c1.556-.775 2.816-2.036 3.591-3.591 1.971-3.954.363-8.758-3.591-10.729zM232 299.056v-38.112L270.112 280 232 299.056zM376 360H136c-4.418 0-8 3.582-8 8v48c0 4.418 3.582 8 8 8h240c4.418 0 8-3.582 8-8v-48c0-4.418-3.582-8-8-8zm-8 48H144v-32h224v32z'/%3E%3Cpath d='M160 384h16v16h-16zM336 384h16v16h-16zM192 384h16v16h-16zM224 384h96v16h-96zM144 40H96c-4.418 0-8 3.582-8 8v48c0 4.418 3.582 8 8 8h48c4.418 0 8-3.582 8-8V48c0-4.418-3.582-8-8-8zm-8 48h-32V56h32v32zM288 48H176c-4.418 0-8 3.582-8 8v16h16v-8h96v8h16V56c0-4.418-3.582-8-8-8zM168 88h96v16h-96zM280 88h16v16h-16z'/%3E%3C/svg%3E";
  @Prop() selectedFilePlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M471.998 104c0-2.047-.781-4.094-2.342-5.656l-96-96c-1.5-1.499-3.534-2.342-5.654-2.342H368V0H64C50.745 0 40 10.745 40 24v464c0 13.255 10.745 24 24 24h384c13.255 0 24-10.745 24-24V104h-.002zM376 27.312L444.688 96H384c-4.418 0-8-3.582-8-8V27.312zM456 488c0 4.418-3.582 8-8 8H64c-4.418 0-8-3.582-8-8V24c0-4.418 3.582-8 8-8h296v72c0 13.255 10.745 24 24 24h72v376z'/%3E%3Cpath d='M416 160H96c-4.418 0-8 3.582-8 8v288c0 4.418 3.582 8 8 8h320c4.418 0 8-3.582 8-8V168c0-4.418-3.582-8-8-8zm-8 288H104V176h304v272zM144 40H96c-4.418 0-8 3.582-8 8v48c0 4.418 3.582 8 8 8h48c4.418 0 8-3.582 8-8V48c0-4.418-3.582-8-8-8zm-8 48h-32V56h32v32zM288 48H176c-4.418 0-8 3.582-8 8v16h16v-8h96v8h16V56c0-4.418-3.582-8-8-8zM168 88h96v16h-96zM280 88h16v16h-16z'/%3E%3Cpath d='M200 200h16v224h-16zM168 200h-32c-4.418 0-8 3.582-8 8v16h16v-8h16v8h16v-16c0-4.418-3.582-8-8-8zM168 392h-32c-4.418 0-8 3.582-8 8v24h16v-16h16v16h16v-24c0-4.418-3.582-8-8-8zM168 328h-32c-4.418 0-8 3.582-8 8v16h16v-8h16v8h16v-16c0-4.418-3.582-8-8-8zM168 264h-32c-4.418 0-8 3.582-8 8v24h16v-16h16v16h16v-24c0-4.418-3.582-8-8-8zM240 208h96v16h-96zM240 272h144v16H240zM272 336h80v16h-80zM240 400h144v16H240zM240 336h16v16h-16zM352 208h16v16h-16z'/%3E%3C/svg%3E";
  @Prop({ context: 'filesquashConfig' }) private filesquashConfig: any;


  @State() modalVisible = false;
  @State() selectedFiles: Array<{ file: File, base64: string }> = [];

  @Method()
  toggleModal(): void {
    this.modalVisible = !this.modalVisible;
  }

  readFile(files: FileList) {
    if (files) {
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (!this.selectedFiles.find(({ base64 }) => base64 === e.target.result)) {
            this.selectedFiles = [ ...this.selectedFiles, { file, base64: e.target.result} ];
          }
        };
        reader.readAsDataURL(file);
      })
    }
  }

  removeFile(index) {
    const selectedFilesCopy = [...this.selectedFiles];
    selectedFilesCopy.splice(index, 1);
    this.selectedFiles = selectedFilesCopy;
  }

  noop(event: UIEvent) {
    event.stopPropagation();
  }

  sendFile(file, token) {
    const body = new FormData();
    body.append('asset[file]', file);

    return fetch("https://filesquash.io/v1/assets",{
      method: "POST",
      body,
      headers: {
        Authorization: `Token token=${token}`
      }
    })
    .then((res) => res.json())
  }

  upload(files, token) {
    dispatchEvent(this.modalElement, "filesquash:uploadStarted");

    const promises = files.map(({ file }) => this.sendFile(file, token));

    Promise.all(promises).then(res => {
      this.selectedFiles = [];
      this.uploadCompleted.emit(res);

      dispatchEvent(this.modalElement, "filesquash:uploadCompleted", {
        files: res
      });

      this.toggleModal();
    });
  }

  renderImagePreview(base64, filename, index) {
    return <div class="item-preview">
      <img class="image-preview" src={base64} alt={filename}/>
      <button type="button" onClick={() => this.removeFile(index)}>X</button>
    </div>
  }

  renderPlaceholder(type, filename, index) {
    return <div class="item-preview">
      <img class="icon" src={this[`selected${type}Placeholder`]} alt={filename}/>
      <p>{filename}</p>
      <button type="button" onClick={() => this.removeFile(index)}>X</button>
    </div>
  }

  renderFilePreview(item, index) {
    if (/image\/*/.test(item.file.type)) return this.renderImagePreview(item.base64, item.file.name, index);
    else if (/video\/*/.test(item.file.type)) return this.renderPlaceholder('Video', item.file.name, index);
    else if (/application\/pdf/.test(item.file.type)) return this.renderPlaceholder('Pdf', item.file.name, index);
    else return this.renderPlaceholder('File', item.file.name, index);
  }

  render() {
    return this.modalVisible ? (
      <div class="modal" onClick={this.toggleModal.bind(this)}>
        <div class="modal-content" onClick={this.noop.bind(this)}>
          <h2 class="title">{this.localFilesTitle}&nbsp;</h2>
          <button type="button" class="btn-icon" onClick={this.toggleModal.bind(this)}>
            <svg viewBox="0 0 32 32" id="icon-close" width="100%" height="100%"><path d="M10.06 7.94a1.5 1.5 0 0 0-2.12 2.12L13.878 16l-5.94 5.94a1.5 1.5 0 0 0 2.122 2.12L16 18.122l5.94 5.94a1.5 1.5 0 0 0 2.12-2.122L18.122 16l5.94-5.94a1.5 1.5 0 0 0-2.122-2.12L16 13.878l-5.94-5.94z"></path></svg>
          </button>
          <div class="filesquash-form">
            <label>
              {this.labelText}
              <input type="file" class="file-upload" onChange={(e: any) => this.readFile(e.target.files)} multiple={this.multiple} />
            </label>
          </div>
          {
            this.selectedFiles.length > 0 && [
              <div class="filesquash-preview">
                <h2 class="title">{this.selectedFilesText}</h2>
                {
                  this.selectedFiles.map((file, index) => this.renderFilePreview(file, index))
                }
              </div>,
              <button type="button" class="btn" onClick={() => this.upload(this.selectedFiles, this.filesquashConfig.token)}>{this.uploadButtonText}</button>
            ]
          }
        </div>
      </div>
    ) : ''
  }
}
