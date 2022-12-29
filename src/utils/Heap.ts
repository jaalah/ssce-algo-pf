export class Node {
    constructor(public fCost: number, public data: any) {}
}

export class MinHeap {
    private heap: Node[];

    constructor() {
        this.heap = [];
    }

    push(node: Node) {
        this.heap.push(node);
        this.heapifyUp();
    }

    private heapifyUp() {
        let i = this.heap.length - 1;
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            if (this.heap[parent].fCost > this.heap[i].fCost) {
                [this.heap[parent], this.heap[i]] = [
                    this.heap[i],
                    this.heap[parent]
                ];
                i = parent;
            } else {
                break;
            }
        }
    }

    extractMin(): Node | null {
        if (this.heap.length === 0) {
            return null;
        }

        const minNode = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown();
        return minNode;
    }

    private heapifyDown() {
        let i = 0;
        while (i < this.heap.length) {
            const left = 2 * i + 1;
            const right = 2 * i + 2;
            let minIndex = i;
            if (
                left < this.heap.length &&
                this.heap[left].fCost < this.heap[minIndex].fCost
            ) {
                minIndex = left;
            }
            if (
                right < this.heap.length &&
                this.heap[right].fCost < this.heap[minIndex].fCost
            ) {
                minIndex = right;
            }
            if (minIndex !== i) {
                [this.heap[i], this.heap[minIndex]] = [
                    this.heap[minIndex],
                    this.heap[i]
                ];
                i = minIndex;
            } else {
                break;
            }
        }
    }
}
