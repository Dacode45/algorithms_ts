export class SetUnion {
    parent: number[]; // parent element
    size: number[]; // size of each subtree
    n: number; // number of elements in set

    constructor(n: number) {
        this.parent = new Array(n);
        this.size = new Array(n);
        for (let i = 0; i < n; i++) {
            this.parent[i] = i;
            this.size[i] = 1;
        }
        this.n = n;
    }

    find(x: number) {
        if (this.parent[x] == x) {
            return x;
        } else {
            return this.find(this.parent[x]);
        }
    }

    union(s1: number, s2: number) {
        const r1 = this.find(s1);
        const r2 = this.find(s2);

        if (r1 == r2) return;

        if (this.size[r1] >= this.size[r2]) {
            this.size[r1] = this.size[r1] + this.size[r2];
            this.parent[r2] = r1;
        }
    }

    sameComponent(s1: number, s2: number) {
        return (this.find(s1) === this.find(s2));
    }
}

