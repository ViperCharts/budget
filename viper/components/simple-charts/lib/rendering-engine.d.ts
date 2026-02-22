import { DrawCommand, DefaultContext, Cancellable, Buffer } from 'regl';
import { mat4 } from 'gl-matrix';
import { SimpleChart } from '../SimpleChart';
import { default as EngineState } from '../state/engine';
import { ValueScale } from '../state/scales';

type DrawProgram = DrawCommand<DefaultContext, {}>;
export default class GPURenderingEngine {
    chart: SimpleChart;
    engine: EngineState;
    canvas: HTMLCanvasElement;
    programs: {
        gridLine: DrawProgram;
        line: DrawProgram;
        candleBody: DrawProgram;
        candleStick: DrawProgram;
        footprint: DrawProgram;
        activeVolumeProfile: DrawProgram;
        absoluteVolume: DrawProgram;
        traditionalVolume: DrawProgram;
    };
    gridBuffers: {
        horizontal: Buffer;
        vertical: Buffer;
    };
    tick: Cancellable;
    lastFrameTime: number;
    private frameTimeHistory;
    private lastFpsUpdate;
    private frameCount;
    constructor(chart: SimpleChart, canvas: HTMLCanvasElement);
    draw(): void;
    drawGrid(projection: mat4, scales: ValueScale[], resolution: {
        width: number;
        height: number;
    }): void;
    destroy(): void;
}
export {};
