class MapLoader {
    public static readonly Instance: MapLoader = new MapLoader();
    public static readonly MAX_COUNT: number = 5;

    private id: number;
    private resDir: string;
    private loadingCount: number = 0;
    private loading: { [key: number]: MapLoaderInfo } = {};
    private waiting: { [key: number]: MapLoaderInfo } = {};
    private queue: MapLoaderInfo[] = [];

    public isAllOk: boolean = false;

    public setMap(mapId: number): void {
        let self = this;

        const mapConfig: MapConfig = cm.map[mapId];
        self.id = mapId;
        self.resDir = `${mapConfig.img}/`;

        self.clearLoadQueue();
        CacheManager.Instance.mapCache.clear();
    }

    public loadComplete(loaderInfo: MapLoaderInfo, data): void {
        let self = this;
        if (self.id === loaderInfo.mapId) {
            const index: number = loaderInfo.index;
            //正常流程
            const curLoadingInfo: MapLoaderInfo = self.loading[index];
            if (curLoadingInfo) {
                self.addTextureCache(index, data);
                const mapTile: MapTile = curLoadingInfo.mapTile;
                if(mapTile) {
                    mapTile.loadComplete(index, data);
                }
                delete self.loading[index];
            } else {
                //可能是切换了地图又回到同一个地图，如果缓存里没有就先存到缓存，但是引用计数不增加
                if(!self.getTextureFromCache(index)) {
                    self.addTextureCache(index, data);
                }
            }
            
        } else {
            data && data.dispose && (data.dispose());
        }

        loaderInfo.dispose();
        self.loadingCount--;
        self.loadNext();
    }

    public load(index: number, mapTile: MapTile): void {
        let self = this;
        self.isAllOk = false;

        let loaderInfo: MapLoaderInfo = self.loading[index];
        if (loaderInfo) {
            loaderInfo.mapTile = mapTile;
            return;
        }

        loaderInfo = self.waiting[index];
        if (loaderInfo) {
            loaderInfo.inuse++;
            loaderInfo.mapTile = mapTile;
            self.queue.sort((a, b) => {
                return a.inuse > b.inuse ? 0 : -1;
            })
        } else {
            loaderInfo = MapLoaderInfo.Instance();
            loaderInfo.mapId = self.id;
            loaderInfo.index = index;
            loaderInfo.mapTile = mapTile;
            loaderInfo.inuse = 1;

            self.queue.push(loaderInfo);
            self.waiting[index] = loaderInfo;
        }

        self.loadNext();
    }

    private loadNext(): void {
        let self = this;
        if (self.queue.length > 0) {
            if (self.loadingCount < MapLoader.MAX_COUNT) {
                const loaderInfo: MapLoaderInfo = self.queue.pop();
                delete self.waiting[loaderInfo.index];

                self.loading[loaderInfo.index] = loaderInfo;
                self.loadingCount++;
                loaderInfo.doLoad(self.resDir);
            }
        } else {
            self.isAllOk = true;
        }
    }

    private addTextureCache(index: number, texture: egret.Texture): void {
        if (texture) {
            const cacheSize: number = texture.$bitmapWidth * texture.$bitmapHeight * 4;
            CacheManager.Instance.mapCache.add(index, texture, cacheSize);
        }
    }

    public getTextureFromCache(index: number): egret.Texture {
        return CacheManager.Instance.mapCache.getItemData(index)
    }

    public addTextureUse(index: number): void {
        CacheManager.Instance.mapCache.addReference(index);
    }

    public removeTextureUse(index: number): void {
        CacheManager.Instance.mapCache.removeReference(index);
    }

    private clearLoadQueue(): void {
        let self = this;
        self.loading = {};
        self.waiting = {};
        self.queue.length = 0;
    }
}

class MapLoaderInfo {
    public mapId: number;
    public mapTile: MapTile;
    public index: number;
    public inuse: number = 0;

    public static pool: Pool<MapLoaderInfo> = new Pool<MapLoaderInfo>(MapLoaderInfo);
    public static Instance(): MapLoaderInfo {
        return MapLoaderInfo.pool.pop();
    }

    public doLoad(resDir: string): void {
        let self = this;

        const url: string = ResUrl.url(`${self.index}.jpg`, ResourceType.Map, resDir);
        RES.getResByUrl(url, self.loadImgCompFunc, self, RES.NCImg);
    }

    private loadImgCompFunc(data, url): void {
        MapLoader.Instance.loadComplete(this, data);
    }

    public dispose(): void {
        this.inuse = 0;
        MapLoaderInfo.pool.push(this);
    }
}