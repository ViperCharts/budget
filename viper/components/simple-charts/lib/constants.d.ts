declare function getTimeframeText(timeframe: number): string | undefined;
declare const _default: {
    MILLISECOND: number;
    MILLISECOND100: number;
    SECOND: number;
    MINUTE: number;
    MINUTE5: number;
    MINUTE15: number;
    HOUR: number;
    HOUR4: number;
    HOUR12: number;
    DAY: number;
    WEEK: number;
    MONTH: number;
    YEAR: number;
    TIMESCALES: number[];
    TIMEFRAMES: {
        ms: number;
        s: number;
        m: number;
        h: number;
        d: number;
        w: number;
        mo: number;
        y: number;
    };
    MONTHS: {
        short: string;
        long: string;
    }[];
    getTimeframeText: typeof getTimeframeText;
    HEX_THEMES: {
        LIGHT: {
            BACKGROUND: string;
        };
        DARK: {
            BACKGROUND: string;
        };
    };
    RGBA_THEMES: {
        LIGHT: {
            BACKGROUND: number[];
        };
        DARK: {
            BACKGROUND: number[];
        };
    };
};
export default _default;
