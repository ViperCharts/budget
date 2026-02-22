import { SimpleChart } from './SimpleChart';
import { rgbaToCSS } from '../../common/themes';

declare const _default: import('vue').DefineComponent<{}, {
    chart: SimpleChart;
    rgbaToCSS: typeof rgbaToCSS;
}, {
    resizeObserver: ResizeObserver | null;
}, {}, {
    onResize(): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
    VCanvas: import('vue').DefineComponent<{}, {
        chart: SimpleChart;
        CPURenderingEngine: import('./lib/cpu-rendering-engine').CPURenderingEngine | null;
        GPURenderingEngine: import('./lib/rendering-engine').default | null;
        rgbaToCSS: typeof rgbaToCSS;
        selectedScreen: import('./SimpleChart').Screen | undefined;
    }, {
        change: {
            x: number;
            y: number;
        };
    }, {}, {
        onWheel(e: WheelEvent): void;
        onMouseMove(e: MouseEvent): void;
        onMouseDown(e: MouseEvent): void;
        onMouseUp(): void;
        onMouseLeave(): void;
        onDragToResize(e: MouseEvent): void;
        onRequestPlaceOrder(): void;
    }, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        Order: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            order: {
                type: import('vue').PropType<Order & {
                    label?: string;
                    backgroundColor?: number[];
                }>;
                required: true;
            };
        }>, {
            chart: SimpleChart;
            canvasContainer: HTMLDivElement;
        }, {
            nextPrice: number;
            isDragging: boolean;
            isAPIMoving: boolean;
        }, {
            top(): number;
            disabled(): boolean | undefined;
        }, {
            glRGBAToCSSRGBA: typeof import('../../utils').glRGBAToCSSRGBA;
            toSigZeroNotation: typeof import('../../utils').toSigZeroNotation;
            onMouseDown(): void;
            onMouseMove(e: MouseEvent): void;
            onMouseOut(e: MouseEvent): void;
            onMouseUp(): Promise<void>;
            reset(): void;
        }, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            order: {
                type: import('vue').PropType<Order & {
                    label?: string;
                    backgroundColor?: number[];
                }>;
                required: true;
            };
        }>> & Readonly<{}>, {}, {}, {
            XMarkIcon: import('vue').FunctionalComponent<import('vue').HTMLAttributes & import('vue').VNodeProps, {}, any, {}>;
        }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        VDebugOverlay: import('vue').DefineComponent<{}, {
            chart: SimpleChart;
            metrics: import('vue').ComputedRef<import('./SimpleChart').PerformanceMetrics>;
            fpsColor: import('vue').ComputedRef<"#00ff88" | "#ffcc00" | "#ff4444">;
            formatNumber: (num: number) => string;
            devicePixelRatio: number;
            rgbaToCSS: typeof rgbaToCSS;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        PlusCircleIcon: import('vue').FunctionalComponent<import('vue').HTMLAttributes & import('vue').VNodeProps, {}, any, {}>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    VValueScale: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        screen: {
            type: NumberConstructor;
            required: true;
        };
    }>, {
        chart: SimpleChart;
        rgbaToCSS: typeof rgbaToCSS;
    }, {
        previousTouch: Touch | null;
    }, {
        crosshairText(): string;
        pos(): {
            top: string;
            left: string;
            width: string;
            height: string;
        };
    }, {
        onDoubleClick(): void;
        onMouseDown(e: MouseEvent): void;
        onMouseUp(): void;
        onDragToResize(e: MouseEvent | TouchEvent): void;
    }, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        screen: {
            type: NumberConstructor;
            required: true;
        };
    }>> & Readonly<{}>, {}, {}, {
        PlusCircleIcon: import('vue').FunctionalComponent<import('vue').HTMLAttributes & import('vue').VNodeProps, {}, any, {}>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    VTimeScale: import('vue').DefineComponent<{}, {
        chart: SimpleChart;
        rgbaToCSS: typeof rgbaToCSS;
    }, {}, {
        x(): number;
        time(): number;
        crosshairLabel(): string;
    }, {
        onDoubleClick(): void;
    }, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    SunIcon: import('vue').FunctionalComponent<import('vue').HTMLAttributes & import('vue').VNodeProps, {}, any, {}>;
    MoonIcon: import('vue').FunctionalComponent<import('vue').HTMLAttributes & import('vue').VNodeProps, {}, any, {}>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
