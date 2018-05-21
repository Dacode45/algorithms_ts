import { Graph } from "../../datastructures/graph";
import { connectedComponents } from "./connected_components";
import { isBipartite } from "./two_color";
import { hasCycles } from "./find_cycle";
import { findArticulations } from "./articulation";

describe('graph test', () => {

    it('checks connected components', () => {
        const graph = new Graph(false);
        graph.nVertices = 6;
        graph.insertEdge(0, 1);
        graph.insertEdge(2, 3);
        graph.insertEdge(4, 5);
        expect(connectedComponents(graph)).toEqual(3); 
    });

    it('checks if graph is bipartite', () => {
        const bi = new Graph(false);
        bi.nVertices = 6;
        bi.insertEdge(0, 1);
        bi.insertEdge(2, 3);
        bi.insertEdge(4, 5);
        expect(isBipartite(bi)).toEqual(true);

        const nonBi = new Graph(false);
        nonBi.nVertices = 3;
        nonBi.insertEdge(0, 1);
        nonBi.insertEdge(1, 2);
        nonBi.insertEdge(2, 0);
        expect(isBipartite(nonBi)).toEqual(false);
    })

    it('checks if graph is a cycle', () => {
        const bi = new Graph(false);
        bi.nVertices = 6;
        bi.insertEdge(0, 1);
        bi.insertEdge(2, 3);
        bi.insertEdge(4, 5);
        expect(hasCycles(bi)).toEqual(false);

        const nonBi = new Graph(false);
        nonBi.nVertices = 3;
        nonBi.insertEdge(0, 1);
        nonBi.insertEdge(1, 2);
        nonBi.insertEdge(2, 0);
        expect(hasCycles(nonBi)).toEqual(true);
    })

    it('finds articulations', () => {
        const g = new Graph(false);
        g.nVertices = 11;

        g.insertEdge(0, 1);
        g.insertEdge(1, 2);
        g.insertEdge(2, 0);
        g.insertEdge(2, 3);
        g.insertEdge(3, 4);
        g.insertEdge(3, 5);
        g.insertEdge(4, 5);

        g.insertEdge(0, 6);
        g.insertEdge(6, 7);
        g.insertEdge(7, 0);
        g.insertEdge(7, 8);
        g.insertEdge(8, 9);
        g.insertEdge(9, 10);
        g.insertEdge(8, 10);
        g.insertEdge(9, 7);

        const result = findArticulations(g);
        expect(result.rootArticulations).toEqual([0])
        expect(result.bridgeArticulations).toContain(2)
        expect(result.bridgeArticulations).toContain(3)
        expect(result.bridgeArticulations).toContain(7)
    })
})