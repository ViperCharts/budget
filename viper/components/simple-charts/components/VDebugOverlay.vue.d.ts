import { rgbaToCSS, SimpleChart } from '../SimpleChart';

declare const _default: import('vue').DefineComponent<{}, {
    chart: SimpleChart;
    metrics: import('vue').ComputedRef<import('../SimpleChart').PerformanceMetrics>;
    fpsColor: import('vue').ComputedRef<"#00ff88" | "#ffcc00" | "#ff4444">;
    formatNumber: (num: number) => string;
    devicePixelRatio: number;
    rgbaToCSS: typeof rgbaToCSS;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
