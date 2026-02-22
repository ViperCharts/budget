import { Ref } from 'vue';

interface LayoutRect {
    x: number;
    y: number;
    w: number;
    h: number;
}
interface SectorLayout extends LayoutRect {
    headerH: number;
    children: LayoutRect[];
}
declare const _default: import('vue').DefineComponent<{}, {
    state: Ref<SectorHeatmapState, SectorHeatmapState>;
    settings: Ref<SectorHeatmapSettings, SectorHeatmapSettings>;
}, {
    containerWidth: number;
    containerHeight: number;
    tooltip: {
        visible: boolean;
        x: number;
        y: number;
        label: string;
        change: number;
    };
    resizeObserver: ResizeObserver | null;
}, {
    layoutSectors(): SectorLayout[];
}, {
    measure(): void;
    formatChange(change: number): string;
    changeToColor(change: number): string;
    squarify(values: number[], rect: {
        x: number;
        y: number;
        w: number;
        h: number;
    }): LayoutRect[];
    worstAspect(areas: number[], side: number): number;
    onCellEnter(e: MouseEvent, si: number, ci: number): void;
}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
