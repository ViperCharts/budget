import { Ref } from 'vue';
import { Screen, RGBA, SimpleChart } from '../SimpleChart';

export type TimeScale = {
    x: number;
    time: number;
    text: string;
};
export type ValueScale = {
    y: number;
    value: number;
    text: string;
};
export type ValueLabels = {
    y: number;
    value: string;
    label: string;
    textColor: RGBA;
    backgroundColor: RGBA;
};
export declare const useScalesStore: (chart: SimpleChart) => {
    time: Ref<TimeScale[]>;
    value: Record<string, ValueScale[]>;
    labels: Record<string, ValueLabels[]>;
    _widths: number[];
    generateXScales(): void;
    generateYScales(screen: Screen): void;
    /** Generate the maximum px width required for the value scale based on scales */
    generateValueScaleWidth(): void;
};
export declare function yScaleText(value: number, scaleType: number, valuePrecision: number): string;
export declare function getTimeLabel(time: number, timeframe: number): string;
