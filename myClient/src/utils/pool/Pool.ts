class Pool<T> {
    private pool: T[];
    private creater: { new (): T };

    public constructor(c: { new (): T }, num: number = 10) {
        let self = this;
        const pool = [];
        self.pool = pool;
        self.creater = c;
        while(num > 0) {
            pool.push(new c());
            num--;
        } 
    }

    public pop(): T {
        let self = this;
        const obj = self.pool.length > 0 ? self.pool.pop () : new self.creater();
        return obj;
    }

    public push(obj: T): void {
        this.pool.push(obj);
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

    public clear(): void {
        let self = this;
        let pool = self.pool;
        if(pool) {
            while(pool.length) {
                const o = pool.pop();
                o["dispose"] && o["dispose"]();
            }
        }
        pool = self.pool = null;
    }
}