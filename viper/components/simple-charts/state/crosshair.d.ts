import { SimpleChart } from '../SimpleChart';

export declare const useCrosshairStore: (chart: SimpleChart) => {
    visible: import('vue').Ref<boolean, boolean>;
    time: {
        x: number;
        time: number;
    };
    value: {
        y: Record<string, number>;
        value: number;
    };
    mousepos: {
        x: number;
        y: number;
    };
    isMovingObject: boolean;
    setCrosshairFromValues(time: number, value: number): void;
    setCrosshairFromPixels(x: number, y: number): void;
    clearCrosshair(): void;
};
