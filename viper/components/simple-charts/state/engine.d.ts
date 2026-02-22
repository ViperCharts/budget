import { Regl, Buffer } from 'regl';
import { SimpleChart } from '../SimpleChart';

export type LineSeriesBufferConfig = {
    times: Buffer;
    values: Buffer;
};
export type CandlestickBufferConfig = {
    times: Buffer;
    values: Buffer;
};
export type FootprintSeriesBufferConfig = {
    times: Buffer;
    values: Buffer;
    volumes: Buffer;
    maxVolumes: Buffer;
};
export type ActiveOrderbookSeriesBufferConfig = {
    values: Buffer;
    volumes: Buffer;
};
export default class EngineState {
    chart: SimpleChart;
    regl: Regl | null;
    minTime: number;
    constructor(chart: SimpleChart);
    setRegl(regl: Regl): void;
    updateMinTime(times: number[]): void;
    getAdjustedTime(time: number, timeframe: number): number;
    fromAdjustedTime(time: number, timeframe: number): number;
    destroy(): void;
}
