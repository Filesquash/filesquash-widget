import { Component, Event, EventEmitter, Prop, State } from '@stencil/core';

@Component({
  tag: 'filesquash-widget',
  styleUrl: 'widget.scss'
})
export class FilesquashWidget {
  @Event() uploadCompleted: EventEmitter;

  @Prop() token: string;
  @Prop() multiple: boolean = true;

  @Prop() buttonText: string = 'Selecionar arquivos';
  @Prop() labelText: string;
  @Prop() uploadButtonText: string;
  @Prop() localFilesTitle: string;
  @Prop() selectedFilesText: string;
  @Prop() selectedPdfPlaceholder: string;
  @Prop() selectedVideoPlaceholder: string;
  @Prop() selectedFilePlaceholder: string;

  @State() modal;

  componentDidLoad() {
    this.modal = document.querySelector('filesquash-modal');
    this.modal.componentOnReady()
      .then(() => {
        this.modal.addEventListener(
          'uploadCompleted',
          res => this.uploadCompleted.emit(res.detail)
        )
      });
    document.body.appendChild(this.modal)
  }

  render() {
    return (
      <div class="filesquash-widget">
        <button type="button" class="btn" onClick={() => this.modal.toggleModal()}>{this.buttonText}</button>
        <filesquash-modal
          token={this.token}
          multiple={this.multiple}
          label-text={this.labelText}
          upload-button-text={this.uploadButtonText}
          local-files-title={this.localFilesTitle}
          selected-files-text={this.uploadButtonText}
          selected-pdf-placeholder={this.uploadButtonText}
          selected-video-placeholder={this.uploadButtonText}
          selected-file-placeholder={this.uploadButtonText}
        ></filesquash-modal>
      </div>
    );
  }
}
