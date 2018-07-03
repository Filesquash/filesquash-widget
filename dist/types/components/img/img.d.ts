export declare class MyComponent {
    el: HTMLElement;
    src: string;
    projectId: string;
    alt: string;
    size: string;
    filters: string;
    validateName(newSrc: string): void;
    validateProjectId(newProjectId: string): void;
    getFilters(filters: any, size: any): string;
    processExternalImage(src: any, projectId: any, size: any, filters: any): string;
    processHostedImage(src: any, projectId: any, size: any, filters: any, onlyUuid: any): string;
    getImage(src: any, projectId: any, size: any, filters: any): string;
    render(): JSX.Element;
}
