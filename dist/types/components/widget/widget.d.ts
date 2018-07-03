import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class FilesquashWidget {
    uploadCompleted: EventEmitter;
    token: string;
    multiple: boolean;
    buttonText: string;
    labelText: string;
    uploadButtonText: string;
    localFilesTitle: string;
    selectedFilesText: string;
    selectedPdfPlaceholder: string;
    selectedVideoPlaceholder: string;
    selectedFilePlaceholder: string;
    modal: any;
    componentDidLoad(): void;
    render(): JSX.Element;
}
