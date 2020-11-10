class CacheCollection {
    public constructor(cacheMax: number = -1) {
        this.items = {};
        this.keys = [];
        this.types = {};
        this.cacheMax = cacheMax;
    }

    private items: { [key: number]: CacheItem };
    private keys: number[];
    private cacheMax: number;
    private types: { [type: number]: number[] };

    //模型 地图
    public add(key: number, data: any, cacheSize: number = -1, reference: number = 0): void {
        let self = this;
        const items = self.items;

        if (items[key]) {
            console.error("重复添加缓存资源: " + key);
            if (DEBUG) {
                throw new Error("重复添加缓存资源: " + key);
            }
            return;
        }

        const item: CacheItem = new CacheItem();
        item.data = data;
        item.size = cacheSize;
        item.reference = reference;
        items[key] = item;
        self.keys.push(key);
    }

    public addReference(key: number, type: number = -1): boolean {
        const items = this.items;
        const item = items[key];

        if (item) {
            if (type !== item.type) {
                const types = this.types;
                let arr: number[];
                if (!types[type]) {
                    arr = types[type] = [];
                } else {
                    arr = types[type];
                }
                arr.push(key);
            }

            item.reference++;
            return true;
        }
        return false;
    }

    //地图
    public removeReference(key: number, clear: boolean = false): number {
        const item = this.items[key];
        if (item) {
            item.reference--;
            const curReference: number = item.reference;
            if (item.reference < 0) {
                console.error(`removeReference error key: ${key} reference: ${curReference}`);
                if (DEBUG) {
                    throw new Error(`removeReference error key: ${key} reference: ${curReference}`)
                }
                return;
            }

            if (curReference <= 0) {
                if (clear) {
                    this.remove(key);
                }
                return 1;
            }
            if (clear) {
                this.remove(key);
            }
            return 0;
        }

        return -1;
    }

    //模型
    public removeReferenceT(key: number, time: number): number {
        const item: CacheItem = this.items[key];
        if (item) {
            item.reference--;
            item.time = time;
            const curReference: number = item.reference;

            if (curReference < 0) {
                console.error(`removeReferenceT error key: ${key} reference: ${curReference}`);
                if (DEBUG) {
                    throw new Error(`removeReferenceT error key: ${key} reference: ${curReference}`);
                }
                return;
            }

            if (curReference === 0) {
                return 1;
            }

            return 0;
        }
        return -1;
    }

    private remove(key: number): boolean {
        let self = this;
        const items = self.items;
        const item: CacheItem = items[key];

        if (item) {
            if (self.checkNoReference(item)) {
                return self.removeItem(key);
            }
        }
        return false;
    }

    private removeByTime(key: number, time: number): boolean {
        let self = this;
        const items = self.items;
        const item: CacheItem = items[key];

        if (item) {
            if (this.checkNoReferenceAndOverdue(item, time)) {
                return self.removeItem(key);
            }
        }

        return false;
    }

    private removeItem(key: number): boolean {
        let self = this;
        const items = self.items;
        const item: CacheItem = items[key];

        if (item.data) {
            item.data.dispose && (item.data.dispose());
        }
        delete items[key];

        let index: number;
        const curItemType: number = item.type;
        if (curItemType !== -1) {
            const types = self.types;
            const typeKeyArr = types[curItemType];
            index = typeKeyArr.indexOf(key);
            if (index > -1) {
                typeKeyArr.splice(index, 1);
            }
            if (typeKeyArr.length === 0) {
                delete types[curItemType];
            }
        }

        const keys = self.keys;
        index = keys.indexOf(key);
        if (index > -1) {
            keys.splice(index, 1);
            return true;
        }

        return false;
    }

    //切换地图，需要清理之前缓存的地图
    public clear(): void {
        let len: number = this.keys.length;
        let i: number = 0;

        while (len > 0) {
            if (!this.remove(this.keys[i])) {
                i++;
            }
            len--;
        }
    }

    //模型间歇删除没有用到的缓存
    public clearSomeByTime(time: number, count: number = 30): void {
        let self = this;
        const keys = self.keys;
        let len: number = keys.length;
        let i: number = 0;

        while (len > 0 && count > 0) {
            if (!self.removeByTime(keys[i], time)) {
                i++;
            } else {
                count--;
            }
            len--;
        }
    }

    //地图切片缓存需要限制缓存个数
    public clearLimit(): void {
        let self = this;
        const keys = self.keys;
        const len: number = keys.length;
        const cacheMax = self.cacheMax;

        if (cacheMax > 0 && len > cacheMax) {
            let overflow: number = len - cacheMax;
            let i: number = 0;
            let j: number = 0;
            while (overflow > 0 && i < len) {
                if (self.remove(keys[j])) {
                    overflow--;
                } else {
                    j++;
                }
                i++;
            }
        }
    }

    private checkNoReference(item: CacheItem): boolean {
        return item.reference < 1;
    }

    private checkNoReferenceAndOverdue(item: CacheItem, time: number): boolean {
        return item.reference < 1 && (item.time === null || item.time === undefined || item.time < time);
    }

    public get length(): number {
        return this.keys.length;
    }

    public getItem(key: number): CacheItem {
        const item = this.items[key];
        return item ? item : null;
    }

    public getItemData(key: number): any {
        const item = this.getItem(key);
        return item ? item.data : null;
    }

    public getGroupKeys(type: number): number[] {
        return this.types[type];
    }
}

class CacheItem {
    data: any;
    size: number;
    time: number;
    reference: number;  //引用计数
    type: number = -1;
}