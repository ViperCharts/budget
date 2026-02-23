import { Ref } from 'vue';

declare const _default: import('vue').DefineComponent<{}, {
    state: Ref<PieChartState, PieChartState>;
    settings: Ref<PieChartSettings, PieChartSettings>;
}, {
    hoveredSlice: number | null;
}, {
    theme(): Record<string, string>;
    viewSize(): number;
    cx(): number;
    cy(): number;
    computedSlices(): PieChartSlice[];
    total(): number;
    slicePaths(): {
        d: string;
    }[];
}, {
    getSliceColor(index: number): string;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
