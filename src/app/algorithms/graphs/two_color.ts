import { Graph } from "../../datastructures/graph";
import { NothingProcessor } from "./processor";
import { bfs } from "./bfs";

enum Color {
    UNCOLORED,
    BLACK,
    WHITE,
}

export function isBipartite(g: Graph): boolean {
    const processor = new TwoColorProcessor(g);
    const state = {
        discovered: {}
    }
    for (let i = 0; i < g.nVertices; i++) {
        if (!state.discovered[i]) {
            processor.color[i] = Color.WHITE;
            bfs(g, i, processor, state);
            if (!processor.isBipartite) {
                return processor.isBipartite;
            }
        }
    }
    return processor.isBipartite;
}

class TwoColorProcessor extends NothingProcessor {
    color: Array<Color>;
    isBipartite = true;
    constructor(g: Graph) {
        super();
        this.color = new Array(g.nVertices);
        for (let i = 0; i < g.nVertices; i++) {
            this.color[i] = Color.UNCOLORED;
        }

    }

    complementColor(color: Color): Color {
        if (color === Color.WHITE) return Color.BLACK;
        if (color === Color.BLACK) return Color.WHITE;

        return Color.UNCOLORED;
    }

    processEdge(g: Graph, x: number, y:number) {
        if (this.color[x] == this.color[y]) {
            this.isBipartite = false;
        }
        this.color[y] = this.complementColor(this.color[x]);

    }
}