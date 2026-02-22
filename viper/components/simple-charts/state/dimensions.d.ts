import { SimpleChart } from '../SimpleChart';

export declare const useDimensionsStore: (chart: SimpleChart) => {
    width: import('vue').Ref<number, number>;
    height: import('vue').Ref<number, number>;
    main: {
        height: import('vue').Ref<number, number>;
        width: import('vue').Ref<number, number>;
        screens: Record<string, {
            top: number;
            width: number;
            height: number;
            resolution: {
                bottom: number;
                width: number;
                height: number;
            };
        }>;
    };
    valueScale: {
        height: import('vue').Ref<number, number>;
        width: import('vue').Ref<number, number>;
    };
    timeScale: {
        height: import('vue').Ref<number, number>;
        width: import('vue').Ref<number, number>;
    };
    canvasEl: import('vue').Ref<HTMLCanvasElement | null, HTMLCanvasElement | null>;
    canvasContainerEl: import('vue').Ref<HTMLDivElement | null, HTMLDivElement | null>;
    resolution: import('vue').ComputedRef<{
        height: number;
        width: number;
    }>;
    setDimensions(height: number, width: number): void;
    recompute(): void;
};
