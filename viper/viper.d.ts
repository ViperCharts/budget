
export * from './components/simple-charts/SimpleChart';
export { calculations } from './calculations';
export type { ScaleContext, BollingerResult } from './calculations';
export declare class Orderbook {
    el: HTMLElement;
    state: OrderbookState;
    settings: OrderbookSettings;
    onPostOrder: (price: number, qty: number) => void;
    onDestroyOrder: (price: number, qty: number) => void;
    private vueApp;
    private shadowHost;
    constructor({ el, state, settings, }: {
        /** Element viper should be mounted into */
        el: HTMLElement;
        state: OrderbookState;
        settings: OrderbookSettings;
    });
    /** Unmount and destroy component */
    unmount(): void;
}
export declare class TradesFeed {
    el: HTMLElement;
    state: TradesFeedState;
    settings: TradesFeedSettings;
    private vueApp;
    private shadowHost;
    constructor({ el, state, settings, }: {
        el: HTMLElement;
        state: Partial<TradesFeedState>;
        settings: Partial<TradesFeedSettings>;
    });
    /** Add trades to trades feed */
    addTrade(trades: Trade[]): void;
    unmount(): void;
}
export declare class DepthOfMarket {
    el: HTMLElement;
    state: DepthOfMarketState;
    settings: DepthOfMarketSettings;
    onPlaceOrders: (args: {
        type: "MARKET" | "LIMIT";
        side: "BUY" | "SELL";
        price: number;
    }[]) => void;
    onDecreaseSize: (args: {
        side: "BID" | "ASK";
        price: number;
        qty: number | undefined;
    }) => void;
    private vueApp;
    private instance;
    private shadowHost;
    constructor({ el, state, settings, }: {
        /** Element viper should be mounted into */
        el: HTMLElement;
        state: Partial<DepthOfMarketState>;
        settings: DepthOfMarketSettings;
    });
    recenter(): void;
    newTrade(trade: Trade): void;
    resetVolumeProfile(): void;
    /** Unmount and destroy component */
    unmount(): void;
}
export declare class DepthChart {
    el: HTMLElement;
    state: DepthChartState;
    settings: DepthChartSettings;
    onPostOrder: (price: number, qty: number) => void;
    onDestroyOrder: (price: number, qty: number) => void;
    private vueApp;
    private shadowHost;
    constructor({ el, state, settings, }: {
        /** Element viper should be mounted into */
        el: HTMLElement;
        state: DepthChartState;
        settings: DepthChartSettings;
    });
    setBid(price: number, qty: number): void;
    setAsk(price: number, qty: number): void;
    /** Unmount and destroy component */
    unmount(): void;
}
export declare class MiniSparkline {
    el: HTMLElement;
    state: MiniSparklineState;
    settings: MiniSparklineSettings;
    private vueApp;
    private shadowHost;
    constructor({ el, state, settings, }: {
        el: HTMLElement;
        state?: Partial<MiniSparklineState>;
        settings?: Partial<MiniSparklineSettings>;
    });
    unmount(): void;
}
export declare class TickerHeader {
    el: HTMLElement;
    state: TickerHeaderState;
    settings: TickerHeaderSettings;
    private vueApp;
    private shadowHost;
    constructor({ el, state, settings, }: {
        el: HTMLElement;
        state?: Partial<TickerHeaderState>;
        settings?: Partial<TickerHeaderSettings>;
    });
    unmount(): void;
}
export declare class SectorHeatmap {
    el: HTMLElement;
    state: SectorHeatmapState;
    settings: SectorHeatmapSettings;
    private vueApp;
    private shadowHost;
    constructor({ el, state, settings, }: {
        el: HTMLElement;
        state?: Partial<SectorHeatmapState>;
        settings?: Partial<SectorHeatmapSettings>;
    });
    unmount(): void;
}
export declare class PieChart {
    el: HTMLElement;
    state: PieChartState;
    settings: PieChartSettings;
    private vueApp;
    private shadowHost;
    constructor({ el, state, settings, }: {
        el: HTMLElement;
        state?: Partial<PieChartState>;
        settings?: Partial<PieChartSettings>;
    });
    unmount(): void;
}
export declare class CorrelationMatrix {
    el: HTMLElement;
    state: CorrelationMatrixState;
    settings: CorrelationMatrixSettings;
    private vueApp;
    private shadowHost;
    constructor({ el, state, settings, }: {
        el: HTMLElement;
        state?: Partial<CorrelationMatrixState>;
        settings?: Partial<CorrelationMatrixSettings>;
    });
    unmount(): void;
}
