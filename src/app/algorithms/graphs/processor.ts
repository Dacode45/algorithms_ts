import { Graph } from "../../datastructures/graph";

export interface ProcessVertex {
    processVertexEarly(g: Graph, v: number);
    processEdge(g: Graph, v: number, y: number);
    processVertexLate(g: Graph, v: number);
}

export class NothingProcessor implements ProcessVertex {
    processVertexEarly(g: Graph, v: number) {}
    processVertexLate(g: Graph, v: number) {}
    processEdge(g: Graph, v: number, y: number) {}
}

export class PrintProcessor extends NothingProcessor {
    processVertexEarly(g: Graph, v: number) {
        console.log(`processed vertex ${v}`);
    }
    processEdge(g: Graph, v: number, y: number) {
        console.log(`processed edge (${v}, ${y})`);
    }
}


export const printProcessor = new PrintProcessor();
export const nothingProcessor = new NothingProcessor();