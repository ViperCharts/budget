import { Ref } from 'vue';

declare const _default: import('vue').DefineComponent<{}, {
    state: Ref<TickerHeaderState, TickerHeaderState>;
    settings: Ref<TickerHeaderSettings, TickerHeaderSettings>;
}, {
    scrollOffset: number;
    paused: boolean;
    animationId: number | null;
    lastTimestamp: number;
    singleSetWidth: number;
}, {
    doubledItems(): TickerHeaderItem[];
}, {
    measureWidth(): void;
    animate(timestamp: number): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
