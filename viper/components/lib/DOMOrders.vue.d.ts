import { PropType, Ref } from 'vue';

declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    ordersMap: {
        type: PropType<{
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
        type: PropType<"BID" | "ASK">;
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
        type: PropType<{
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
        type: PropType<"BID" | "ASK">;
        required: true;
    };
    onDecreaseSize: {
        type: FunctionConstructor;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {
    XMarkIcon: import('vue').FunctionalComponent<import('vue').HTMLAttributes & import('vue').VNodeProps, {}, any, {}>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
