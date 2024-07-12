/// <reference types="node" />
declare const searchInput: HTMLInputElement;
declare const searchInputButton: Element;
declare let searchTimeoutId: NodeJS.Timeout | null;
declare function performSearch(): void;
declare function debounceSearch(): void;
declare const deleteButtons: NodeListOf<Element>;
