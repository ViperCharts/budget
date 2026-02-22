import { Ref } from 'vue';
import { Series, SeriesClass } from './lib/series';
import { useCrosshairStore } from './state/crosshair';
import { useDimensionsStore } from './state/dimensions';
import { default as EngineState } from './state/engine';
import { useScalesStore } from './state/scales';
import { ChartTheme, RGBA } from '../../common/themes';

export type { RGBA };
export declare enum ScaleType {
    Default = 0,
    Percent = 1,
    Normalized = 2
}
export interface SimpleChartSettings {
    /** Enable / disable chart autoscroll with current time. Set to false if static dataset */
    autoscroll: boolean;
    /** Enable / disable user price scale movement */
    lockedPriceScale: boolean;
    /** Enable / disable user time scale movement */
    lockedTimeScale: boolean;
}
/** Performance metrics tracked by the rendering engine */
export interface PerformanceMetrics {
    /** Current frames per second */
    fps: number;
    /** Frame time in milliseconds */
    frameTime: number;
    /** Average frame time over last 60 frames */
    avgFrameTime: number;
    /** Minimum frame time over last 60 frames */
    minFrameTime: number;
    /** Maximum frame time over last 60 frames */
    maxFrameTime: number;
    /** Total draw calls this frame */
    drawCalls: number;
    /** Number of visible series */
    visibleSeries: number;
    /** Total data points being rendered */
    dataPoints: number;
}
export interface SimpleChartOptions {
    el: HTMLElement;
    /** Optional theme configuration. Defaults to DarkTheme */
    theme?: ChartTheme;
}
export type OrderId = string | number;
export type onPlaceOrder = (price: number) => Promise<void>;
export type onMoveOrder = (id: OrderId, price: number) => Promise<void>;
export type onCancelOrder = (id: OrderId) => Promise<void>;
export interface Order {
    id: OrderId;
    price: number;
    qty: number;
    side: "BID" | "ASK";
    /** Whether the order is currently being cancelled */
    isCancelling?: boolean;
}
export interface Screen {
    id: number;
    minValue: number;
    maxValue: number;
    top: number;
    height: number;
    lockedYScale: boolean;
}
export * from './lib/series';
export * from '../../common/themes';
export declare class SimpleChart {
    el: HTMLElement;
    autoScroll: Ref<boolean>;
    scaleType: Ref<ScaleType>;
    timeframe: Ref<number>;
    valueScaleDecimalPrecision: Ref<number>;
    /** Enable debug overlay with performance metrics */
    debug: Ref<boolean>;
    /** Performance metrics (updated each frame when debug is enabled) */
    performanceMetrics: PerformanceMetrics;
    crosshair: Ref<{
        time: number;
        value: number;
    } | null>;
    orders: (Order & {
        label?: string;
        /** RGBA 0-1 color */
        backgroundColor?: number[];
    })[];
    startTime: Ref<number>;
    endTime: Ref<number>;
    pixelsPerElement: Ref<number>;
    screens: Screen[];
    series: Record<string, Series>;
    stores: {
        crosshair: ReturnType<typeof useCrosshairStore>;
        dimensions: ReturnType<typeof useDimensionsStore>;
        engine: EngineState;
        scales: ReturnType<typeof useScalesStore>;
    };
    onPlaceOrder: onPlaceOrder | null;
    onMoveOrder: onMoveOrder | null;
    onCancelOrder: onCancelOrder | null;
    settings: SimpleChartSettings;
    private _theme;
    get theme(): ChartTheme;
    set theme(newTheme: ChartTheme);
    private vueApp;
    private shadowHost;
    constructor({ el, theme }: SimpleChartOptions);
    addSeries<T extends SeriesClass>(seriesClass: T): InstanceType<T>;
    removeSeries(id: string): void;
    setInitialScreenRange(): void;
    setScreenRange(nextRange?: {
        startTime?: number;
        endTime?: number;
        minValue?: number;
        maxValue?: number;
        screen?: number;
    } | undefined): void;
    /** Get the Screen that cooresponds to a y px coordinate */
    getScreenByYCoord(y: number): Screen;
    getXCoordByTimestamp(timestamp: number): number;
    getYCoordByValue(screen: number, value: number): number;
    getTimestampByXCoord(x: number): number;
    getValueByYCoord(screen: number, y: number): number;
    unmount(): void;
}
