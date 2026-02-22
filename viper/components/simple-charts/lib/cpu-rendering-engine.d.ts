import { SimpleChart } from '../SimpleChart';
import { default as EngineState } from '../state/engine';
import { default as Canvas } from './canvas';

export declare class CPURenderingEngine {
    chart: SimpleChart;
    engine: EngineState;
    canvas: Canvas;
    lastFrameTime: number;
    frameRequest: number;
    constructor(chart: SimpleChart, canvas: HTMLCanvasElement);
    recursiveDraw(): void;
    draw(): void;
    destroy(): void;
}
