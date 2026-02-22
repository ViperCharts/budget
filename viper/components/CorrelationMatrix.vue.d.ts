import { Ref } from 'vue';

declare const _default: import('vue').DefineComponent<{}, {
    state: Ref<CorrelationMatrixState, CorrelationMatrixState>;
    settings: Ref<CorrelationMatrixSettings, CorrelationMatrixSettings>;
}, {
    tooltip: {
        visible: boolean;
        x: number;
        y: number;
        value: number;
        rowSymbol: string;
        colSymbol: string;
    };
}, {}, {
    correlationColor(value: number): string;
    onCellEnter(e: MouseEvent, ri: number, ci: number, value: number): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
