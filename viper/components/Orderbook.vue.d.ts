import { Ref } from 'vue';

declare const _default: import('vue').DefineComponent<{}, {
    state: Ref<OrderbookState, OrderbookState>;
    settings: Ref<OrderbookSettings, OrderbookSettings>;
}, {
    lastRender: number;
    hovered: {
        type: "" | "BID" | "ASK";
        i: number;
    };
}, {}, {
    update(): Promise<void>;
    onFirstRender(): Promise<void>;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
    PlusIcon: import('vue').FunctionalComponent<import('vue').HTMLAttributes & import('vue').VNodeProps, {}, any, {}>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
