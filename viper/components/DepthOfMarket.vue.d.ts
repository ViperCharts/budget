import { Ref } from 'vue';

type PriceMap = {
    [price: string]: {
        bidQty: number;
        askQty: number;
    };
};
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    onPlaceOrders: {
        type: FunctionConstructor;
        required: true;
    };
    onDecreaseSize: {
        type: FunctionConstructor;
        required: true;
    };
}>, {
    state: Ref<DepthOfMarketState, DepthOfMarketState>;
    settings: Ref<DepthOfMarketSettings, DepthOfMarketSettings>;
    shadowRoot: ShadowRoot | undefined;
    id: string;
    styleTag: HTMLStyleElement;
}, {
    lastRender: number;
    selected: {
        type: "" | "BID" | "ASK";
        startPrice: number | null;
        endPrice: number | null;
        isDragging: boolean;
    };
    prices: string[];
    volumeProfile: PriceMap;
    allExecutedTrades: Trade[];
    lastTradedBids: {
        [price: string]: number;
    };
    lastTradedAsks: {
        [price: string]: number;
    };
    centerPrice: number | null;
    containerHeight: number;
    _scrollDelta: number;
    resizeObserver: ResizeObserver | null;
    _updateInterval: NodeJS.Timeout | null;
    _interval: NodeJS.Timeout | null;
}, {
    ordersMap(): {
        BID: {
            [key: string]: {
                qty: number;
                orders: Order[];
            };
        };
        ASK: {
            [key: string]: {
                qty: number;
                orders: Order[];
            };
        };
    };
    /**
     * Increment of the price level grouping
     */
    increment(): number;
    maxDepth(): number;
    pixelsPerRow(): number;
    pricePrecision(): number;
    selectedPrices(): number[];
    activePositionTop(): number;
    maxExecutedVolume(): number;
}, {
    onKeyDown(e: KeyboardEvent): void;
    onWheel(e: WheelEvent): void;
    getPrice(price: number): number;
    generatePriceMap(): PriceMap | null;
    update(): Promise<void>;
    onFirstRender(): Promise<void>;
    onResize(): void;
    recenter(): void;
    newTrade(trade: Trade): void;
    resyncVolumeProfile(): void;
    setSelectedPrice(type: "BID" | "ASK", price: number): void;
    clearSelectedRow(): void;
    onMouseDownRow(type: "BID" | "ASK", price: number): void;
    onMouseUpRow(): void;
    resetVolumeProfile(): void;
    toFixed(value: number, accuracy: number): string | number;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    onPlaceOrders: {
        type: FunctionConstructor;
        required: true;
    };
    onDecreaseSize: {
        type: FunctionConstructor;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {
    PlusIcon: import('vue').FunctionalComponent<import('vue').HTMLAttributes & import('vue').VNodeProps, {}, any, {}>;
    DOMOrders: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        ordersMap: {
            type: import('vue').PropType<{
                [price: string]: {
                    qty: number;
                    orders: Order[];
                };
            }>;
            required: true;
        };
        minPrice: {
            type: NumberConstructor;
            required: true;
        };
        maxPrice: {
            type: NumberConstructor;
            required: true;
        };
        increment: {
            type: NumberConstructor;
            required: true;
        };
        side: {
            type: import('vue').PropType<"BID" | "ASK">;
            required: true;
        };
        onDecreaseSize: {
            type: FunctionConstructor;
            required: true;
        };
    }>, {
        state: Ref<DepthOfMarketState>;
        settings: Ref<DepthOfMarketSettings>;
    }, {
        priceRange: number[];
    }, {}, {
        syncPriceRange(): Promise<void>;
    }, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        ordersMap: {
            type: import('vue').PropType<{
                [price: string]: {
                    qty: number;
                    orders: Order[];
                };
            }>;
            required: true;
        };
        minPrice: {
            type: NumberConstructor;
            required: true;
        };
        maxPrice: {
            type: NumberConstructor;
            required: true;
        };
        increment: {
            type: NumberConstructor;
            required: true;
        };
        side: {
            type: import('vue').PropType<"BID" | "ASK">;
            required: true;
        };
        onDecreaseSize: {
            type: FunctionConstructor;
            required: true;
        };
    }>> & Readonly<{}>, {}, {}, {
        XMarkIcon: import('vue').FunctionalComponent<import('vue').HTMLAttributes & import('vue').VNodeProps, {}, any, {}>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
