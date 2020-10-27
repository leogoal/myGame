class LimitedPool<T extends I_LimitedPoolItem> {
    private pool: T[];
    private max: number = 0;
    private creater: { new (): T };

    public constructor(c: {new (): T}, maxNum: number) {
        this.pool = [];
        this.creater = c;
        this.max = maxNum;
    }

    public pop(): T {
        const o: T = this.pool.length > 0 ? this.pool.pop() : new this.creater();
        return o;
    }

    public push(o: T): void {
        if(this.max === 0 || this.pool.length < this.max) {
            o.returnToPool();
            this.pool.push(o);
        } else {
            o.disposePermanent();
        }
    }

    public has(obj: T): boolean {
        const pool = this.pool;
        for(let o of pool) {
            if(obj === o) {
                return true;
            }
        }

        return false;
    }
}