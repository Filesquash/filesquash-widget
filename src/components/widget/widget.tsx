import { Component, Element, Event, EventEmitter, Prop, State } from '@stencil/core';

const dispatchEvent = (element, eventName, detail = null) => {
  const event = new CustomEvent(eventName, { "bubbles": true, detail });
  element.dispatchEvent(event);
}

@Component({
  tag: 'filesquash-widget',
  styleUrl: 'widget.scss'
})
export class FilesquashWidget {
  @Element() widgetElement: HTMLElement;

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
          event => this.uploadCompleted.emit(event.detail)
        )

        this.modal.addEventListener(
          "filesquash:uploadCompleted",
          event =>  {
            event.stopPropagation()
            dispatchEvent(this.widgetElement, "filesquash:uploadCompleted", {
              files: event.detail.files
            })
          }
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
