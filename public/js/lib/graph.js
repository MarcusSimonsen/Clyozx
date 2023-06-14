class Graph {
    constructor(V) {
        this.V = V
        this.adj = Map()
        for(let i = 0; i < this.V; i++) {
            this.adj
        }
    }

    addEdge(u, v) {
        this.adj[u].append(v)
    }

    adj(v) {
        return this.adj(v)
    }

    copy() {
        let g = new Graph(this.V)
        for(let u = 0; u < this.V; v++) {
            for(v in this.adj(u)) {

            }
        }
    }
}