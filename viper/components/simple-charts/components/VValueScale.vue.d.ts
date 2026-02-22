import { rgbaToCSS, SimpleChart } from '../SimpleChart';

declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
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
export default _default;
