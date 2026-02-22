import { Ref } from 'vue';

declare const _default: import('vue').DefineComponent<{}, {
    state: Ref<DepthChartState, DepthChartState>;
    settings: Ref<DepthChartSettings, DepthChartSettings>;
}, {
    lastRender: number;
    hovered: {
        type: "" | "BID" | "ASK";
        i: number;
    };
    grouping: number;
    maxDepth: number;
    totalBid: number;
    totalAsk: number;
    middlePrice: number;
    rangeMin: number;
    rangeMax: number;
    frameInterval: NodeJS.Timeout | null;
}, {
    pixelsPerPrice(): number;
    increment(): number;
    bidAskTotalDelta(): number;
    canvas(): HTMLCanvasElement;
    ctx(): CanvasRenderingContext2D;
}, {
    getPrice(price: number): number;
    generatePriceMap(bestBid: number, bestAsk: number): {
        bidMap: Record<number, number[]>;
        askMap: Record<number, number[]>;
    };
    render(): void;
    onScroll(e: WheelEvent): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
    PlusIcon: import('vue').FunctionalComponent<import('vue').HTMLAttributes & import('vue').VNodeProps, {}, any, {}>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
