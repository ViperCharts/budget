import { Ref } from 'vue';

declare const _default: import('vue').DefineComponent<{}, {
    state: Ref<TradesFeedState, TradesFeedState>;
    settings: Ref<TradesFeedSettings, TradesFeedSettings>;
}, {
    renderedTrades: Trade[];
    updateTradesInterval: null | NodeJS.Timeout;
    updateTimeInterval: null | NodeJS.Timeout;
}, {}, {
    updateTrades(): void;
    tradeTsToTime(ts: number): string;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
    TradeSlippage: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        trade: {
            type: () => Trade;
            required: true;
        };
        prevTrade: {
            type: () => Trade | null;
            default: null;
        };
    }>, {}, {}, {
        slippage(): number;
    }, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        trade: {
            type: () => Trade;
            required: true;
        };
        prevTrade: {
            type: () => Trade | null;
            default: null;
        };
    }>> & Readonly<{}>, {
        prevTrade: Trade | null;
    }, {}, {
        ChevronDownIcon: import('vue').FunctionalComponent<import('vue').HTMLAttributes & import('vue').VNodeProps, {}, any, {}>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
