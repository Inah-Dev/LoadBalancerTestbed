
export default class RoundRobin {
    constructor(max) {
        this.next = -1
        this.max = max
    }

    getNext() {
        this.next = this.next + 1

        if (this.next >= this.max) {
            this.next = 0
        }
        return `S${this.next}`
    }
}