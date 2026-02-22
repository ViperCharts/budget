export interface ScaleContext {
    /** First visible value in the series (used by percent) */
    first: number;
    /** Minimum visible value in the series (used by normalized) */
    min: number;
    /** Maximum visible value in the series (used by normalized) */
    max: number;
}
export interface BollingerResult {
    upper: number[];
    middle: number[];
    lower: number[];
}
export declare const calculations: {
    /** Visible range percent: ((value - first) / |first|) * 100 */
    readonly percent: (values: number[], ctx?: ScaleContext) => number[];
    /** Normalized to 0-100: ((value - min) / (max - min)) * 100 */
    readonly normalized: (values: number[], ctx?: ScaleContext) => number[];
    /** Simple Moving Average */
    readonly sma: (values: number[], period: number) => number[];
    /** Bollinger Bands: returns { upper, middle, lower } arrays */
    readonly bbands: (values: number[], period: number, multiplier: number) => BollingerResult;
    /** Bollinger Band %B: (price - lower) / (upper - lower) */
    readonly bbpb: (values: number[], period: number, multiplier: number) => number[];
    /** Bollinger Band Width: (upper - lower) / middle */
    readonly bbw: (values: number[], period: number, multiplier: number) => number[];
};
