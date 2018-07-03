import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class FilesquashModal {
    uploadCompleted: EventEmitter;
    token: string;
    multiple: boolean;
    labelText: string;
    uploadButtonText: string;
    localFilesTitle: string;
    selectedFilesText: string;
    selectedPdfPlaceholder: string;
    selectedVideoPlaceholder: string;
    selectedFilePlaceholder: string;
    modalVisible: boolean;
    selectedFiles: Array<{
        file: File;
        base64: string;
    }>;
    toggleModal(): void;
    readFile(files: FileList): void;
    removeFile(index: any): void;
    noop(event: UIEvent): void;
    sendFile(file: any, token: any): Promise<any>;
    upload(files: any, token: any): void;
    renderImagePreview(base64: any, filename: any, index: any): JSX.Element;
    renderPlaceholder(type: any, filename: any, index: any): JSX.Element;
    renderFilePreview(item: any, index: any): JSX.Element;
    render(): JSX.Element;
}
