import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
export declare class MyFlash {
    active: boolean;
    message: string;
    activeClass: string;
    private timeout;
    show(message: string, activeClass: string, duration: number): void;
    dismiss(): void;
    render(): JSX.Element;
}
