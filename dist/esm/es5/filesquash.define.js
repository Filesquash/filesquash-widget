// filesquash: Custom Elements Define Library, ES Module/ES5 Target
import { defineCustomElement } from './filesquash.core.js';
import {
  FilesquashModal,
  FilesquashWidget,
  MyComponent
} from './filesquash.components.js';

export function defineCustomElements(window, opts) {
  defineCustomElement(window, [
    FilesquashModal,
    FilesquashWidget,
    MyComponent
  ], opts);
}