import { Component, Event, EventEmitter, Prop, State } from '@stencil/core';

interface FileReaderEventTarget extends EventTarget {
  result:string
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage():string;
}

@Component({
  tag: 'filesquash-widget',
  styleUrl: 'filesquash.css',
  shadow: true
})
export class FilesquashWidget {
  @Event() uploadCompleted: EventEmitter;

  @Prop() token: string;
  @Prop() buttonText: string = 'Browse files';
  @Prop() labelText: string = 'Drag & drop any files';
  @Prop() multiple: boolean = true;

  @State() modalVisible = false;
  @State() selectedFiles: Array<{ file: File, base64: string }> = [];

  toggleModal(event?: UIEvent) {
    if(event) event.stopPropagation();
    this.modalVisible = !this.modalVisible;
  }

  readFile(files: FileList) {
    if (files) {
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (e: FileReaderEvent) => {
          if (!this.selectedFiles.find(({ base64 }) => base64 === e.target.result)) {
            this.selectedFiles = [ ...this.selectedFiles, { file, base64: e.target.result} ];
          }
        };
        reader.readAsDataURL(file);
      })
    }
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
      .then(function(res){
        return res.json();
      })
  }

  upload(files, token) {
    const promises = files.map(({ file }) => this.sendFile(file, token));

    Promise.all(promises).then(res => {
      this.uploadCompleted.emit(res);
      this.toggleModal();
    });
  }

  render() {
    return (
      <div class="teste">
        <button class="btn" onClick={this.toggleModal.bind(this)}>{this.buttonText}</button>
        {
          this.modalVisible && (
            <div class="modal" onClick={this.toggleModal.bind(this)}>
              <div class="modal-content" onClick={this.noop.bind(this)}>
                <button class="btn-icon" onClick={this.toggleModal.bind(this)}>
                  <svg viewBox="0 0 32 32" id="icon-close" width="100%" height="100%"><path d="M10.06 7.94a1.5 1.5 0 0 0-2.12 2.12L13.878 16l-5.94 5.94a1.5 1.5 0 0 0 2.122 2.12L16 18.122l5.94 5.94a1.5 1.5 0 0 0 2.12-2.122L18.122 16l5.94-5.94a1.5 1.5 0 0 0-2.122-2.12L16 13.878l-5.94-5.94z"></path></svg>
                </button>
                <div class="filesquash-form">
                  <label>
                    {this.labelText}
                    <input type="file" class="file-upload" onChange={(e: any) => this.readFile(e.target.files)} multiple={this.multiple} />
                  </label>
                </div>
                <div class="filesquash-preview">
                  {
                    this.selectedFiles.map(item => <img class="image-preview" src={item.base64} />)
                  }
                </div>
                {
                  this.selectedFiles.length > 0 && (
                    <button class="btn" onClick={() => this.upload(this.selectedFiles, this.token)}>Upload</button>
                  )
                }
              </div>
            </div>
          )
        }
      </div>
    );
  }
}
