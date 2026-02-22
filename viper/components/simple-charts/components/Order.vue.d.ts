import { PropType } from 'vue';
import { SimpleChart } from '../SimpleChart';
import { glRGBAToCSSRGBA, toSigZeroNotation } from '../../../utils';

declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    order: {
        type: PropType<Order & {
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
    glRGBAToCSSRGBA: typeof glRGBAToCSSRGBA;
    toSigZeroNotation: typeof toSigZeroNotation;
    onMouseDown(): void;
    onMouseMove(e: MouseEvent): void;
    onMouseOut(e: MouseEvent): void;
    onMouseUp(): Promise<void>;
    reset(): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    order: {
        type: PropType<Order & {
            label?: string;
            backgroundColor?: number[];
        }>;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {
    XMarkIcon: import('vue').FunctionalComponent<import('vue').HTMLAttributes & import('vue').VNodeProps, {}, any, {}>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
