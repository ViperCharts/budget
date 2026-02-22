/**
 * Creates a Shadow DOM on the given element, injects all necessary CSS
 * (Tailwind + Vue component styles), and returns a mount point for the Vue app.
 */
export declare function createShadowMount(el: HTMLElement, component: any): {
    shadowRoot: ShadowRoot;
    mountPoint: HTMLElement;
    shadowHost: HTMLElement;
};
