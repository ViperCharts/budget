import { RGBA, SimpleChart } from '../SimpleChart';
import { Buffer } from 'regl';

/** Number of times per timeseries batch */
export declare const BATCH_LENGTH = 100;
/** Number of bytes per timeseries unique value (float32) */
export declare const BYTES_PER_VALUE = 4;
export declare function getBatchStartTime(time: number, timeframe: number): number;
export type LineSeriesDataBatch = {
    startTime: number;
    times: number[];
    values: number[];
    _times?: Buffer;
    _values?: Buffer;
};
export type CandlestickSeriesDataBatch = {
    startTime: number;
    times: number[];
    values: number[];
    _times?: Buffer;
    _values?: Buffer;
};
export type CandlestickSeriesData = Record<number, {
    open: number;
    high: number;
    low: number;
    close: number;
}>;
export type FootprintSeriesData = {
    [time: number]: {
        [price: number]: {
            buy: number;
            sell: number;
        };
    };
};
export type FootprintSeriesDataBatch = {
    startTime: number;
    /** Raw data: { [time]: { [price]: { buy, sell } } } for this batch */
    points: FootprintSeriesData;
    /** Flattened arrays for GPU - regenerated when points change */
    times: number[];
    values: number[];
    volumes: number[];
    maxVolumes: number[];
    _times?: Buffer;
    _values?: Buffer;
    _volumes?: Buffer;
    _maxVolumes?: Buffer;
};
/**
 * { price: qty }
 */
export type ActiveOrderbookSide = Record<number, number>;
declare class BaseSeries {
    id: string;
    chart: SimpleChart;
    visible: boolean;
    /** Show a label for this line */
    label?: string;
    mode: "ABSOLUTE" | "RELATIVE" | "SCREEN";
    absoluteVolume: number;
    /** Render latest value line */
    latestValueLine: boolean;
    _visibleMin: number;
    _visibleMax: number;
    _visibleFirst: number;
    _latestValue: number;
    _screen: number;
    constructor(chart: SimpleChart);
    /**
     * Set which screen this series should render on.
     * If the screen doesn't exist, it will be created.
     * @param screen - Screen index (0 is the main chart)
     * @param options - Optional configuration for the new screen
     */
    setScreen(screen: number, options?: {
        /** Height as percentage 0-100 (default: 20) */
        height?: number;
        /** Top position as percentage 0-100 (auto-calculated if not provided) */
        top?: number;
    }): void;
}
declare class LineSeries extends BaseSeries {
    type: "Line";
    batches: Record<number, LineSeriesDataBatch>;
    /** Used in Rendering Engine (Do Not Touch) */
    activeBatches: LineSeriesDataBatch[];
    /** Minimum number of points to render the series */
    MIN_RENDER_LENGTH: number;
    /** Number of value points per batch */
    VALUES_PER_TIME: number;
    /** Total number of values per batch */
    VALUES_PER_BATCH: number;
    /** Color as RGBA value */
    private _color;
    get color(): RGBA;
    set color(value: RGBA);
    lineWidth: number;
    _valueColor: RGBA;
    constructor(chart: SimpleChart);
    update(times: number[], values: number[]): void;
    _getOrCreateBatch(batchStartTime: number): LineSeriesDataBatch;
    _getAllBatchesInRange(startTime: number, endTime: number): {
        batches: LineSeriesDataBatch[];
        first: number;
        min: number;
        max: number;
    } | undefined;
    _cleanup(): void;
    remove(): void;
}
declare class CandlestickSeries extends BaseSeries {
    type: "Candlestick";
    batches: Record<number, CandlestickSeriesDataBatch>;
    /** Used in Rendering Engine (Do Not Touch) */
    activeBatches: CandlestickSeriesDataBatch[];
    /** Minimum number of points to render the series */
    MIN_RENDER_LENGTH: number;
    /** Number of value points per batch */
    VALUES_PER_TIME: number;
    /** Total number of values per batch */
    VALUES_PER_BATCH: number;
    /** Color as RGBA value - defaults to theme positive color */
    upColor: RGBA;
    /** Color as RGBA value - defaults to theme negative color */
    downColor: RGBA;
    visible: boolean;
    lineWidth: number;
    _valueColor: RGBA;
    constructor(chart: SimpleChart);
    /**
     * Update series data
     * @param times - Array of times
     * @param values - Array of { o: number; h: number; l: number; c: number } objects
     */
    update(times: number[], values: {
        o: number;
        h: number;
        l: number;
        c: number;
    }[]): void;
    _getOrCreateBatch(batchStartTime: number): CandlestickSeriesDataBatch;
    _updateBatch(batch: CandlestickSeriesDataBatch, time: number, values: number[]): number;
    _getAllBatchesInRange(startTime: number, endTime: number): {
        batches: CandlestickSeriesDataBatch[];
        first: number;
        min: number;
        max: number;
    } | undefined;
    _cleanup(): void;
    remove(): void;
}
declare class FootprintSeries extends BaseSeries {
    chart: SimpleChart;
    id: string;
    type: "Footprint";
    batches: Record<number, FootprintSeriesDataBatch>;
    /** Used in Rendering Engine (Do Not Touch) */
    activeBatches: FootprintSeriesDataBatch[];
    /** Minimum number of points to render the series */
    MIN_RENDER_LENGTH: number;
    /** Buy color - defaults to theme positive color */
    buyColor: RGBA;
    /** Sell color - defaults to theme negative color */
    sellColor: RGBA;
    _valueColor: RGBA;
    visible: boolean;
    tickSize: number;
    qtySize: number;
    _visibleMin: number;
    _visibleMax: number;
    _visibleFirst: number;
    _visibleMaxVolume: number;
    constructor(chart: SimpleChart);
    onTrade(time: number, price: number, side: "buy" | "sell", qty: number | string): void;
    _getOrCreateBatch(batchStartTime: number): FootprintSeriesDataBatch;
    _syncBatch(batch: FootprintSeriesDataBatch): void;
    _getAllBatchesInRange(startTime: number, endTime: number): {
        batches: FootprintSeriesDataBatch[];
        first: number;
        min: number;
        max: number;
    } | undefined;
    _cleanup(): void;
    remove(): void;
}
export type VolumeSeriesDataBatch = {
    startTime: number;
    times: number[];
    /** Values stored as [volume, open, close] per bar - 3 values per time */
    values: number[];
    _times?: Buffer;
    _values?: Buffer;
};
/** Height configuration for volume series */
export type VolumeHeightConfig = {
    type: "percent";
    value: number;
} | {
    type: "pixels";
    value: number;
};
declare class VolumeSeries extends BaseSeries {
    type: "Volume";
    batches: Record<number, VolumeSeriesDataBatch>;
    /** Used in Rendering Engine (Do Not Touch) */
    activeBatches: VolumeSeriesDataBatch[];
    /** Minimum number of points to render the series */
    MIN_RENDER_LENGTH: number;
    /** Number of value points per batch (volume, open, close) */
    VALUES_PER_TIME: number;
    /** Total number of values per batch */
    VALUES_PER_BATCH: number;
    /** Color for up volume bars (close > open) - defaults to theme positive color */
    upColor: RGBA;
    /** Color for down volume bars (close <= open) - defaults to theme negative color */
    downColor: RGBA;
    /** Height configuration - either percentage or pixels */
    height: VolumeHeightConfig;
    visible: boolean;
    /** Maximum volume in visible range (used for scaling bars) */
    _maxVolume: number;
    _valueColor: RGBA;
    constructor(chart: SimpleChart);
    /**
     * Update series data
     * @param times - Array of times
     * @param values - Array of { volume: number; open: number; close: number } objects
     */
    update(times: number[], values: {
        volume: number;
        open: number;
        close: number;
    }[]): void;
    _getOrCreateBatch(batchStartTime: number): VolumeSeriesDataBatch;
    _updateBatch(batch: VolumeSeriesDataBatch, time: number, values: number[]): number;
    _getAllBatchesInRange(startTime: number, endTime: number): {
        batches: VolumeSeriesDataBatch[];
        first: number;
        min: number;
        max: number;
    } | undefined;
    /** Get the height in pixels based on the current configuration */
    getHeightPixels(chartHeight: number): number;
    _cleanup(): void;
    remove(): void;
}
export { LineSeries, CandlestickSeries, VolumeSeries, FootprintSeries };
export type Series = LineSeries | CandlestickSeries | VolumeSeries | FootprintSeries;
export type SeriesClass = typeof LineSeries | typeof CandlestickSeries | typeof VolumeSeries | typeof FootprintSeries;
