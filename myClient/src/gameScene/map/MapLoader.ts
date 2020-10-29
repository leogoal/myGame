class MapLoader {
    public static readonly Instance: MapLoader = new MapLoader();
    public static readonly MAX_COUNT: number = 5;

    private id: number;
    private resDir: string;
    private loadingCount: number = 0;
    public isAllOk: boolean = false;

    private loading: {[key: number]: MapLoaderInfo} = {};
    private waiting: {[key: number]: MapLoaderInfo} = {};
    private queue: MapLoaderInfo[] = [];
    
    public setMap(mapId: number): void {
        let self = this;

        const mapConfig: MapConfig = cm.map[mapId];
        self.id = mapId;
        self.resDir = `${mapConfig.img}`;

        self.clearLoadQueue();
        CacheManager.Instance.mapCache.clear();
    }

    public loadComplete(loaderInfo: MapLoaderInfo, data): void {

    }

    public load(name: number, mapTile: MapTile): void {
        let self = this;
        self.isAllOk = false;

        let loaderInfo: MapLoaderInfo = self.loading[name];
        if(loaderInfo) {
            loaderInfo.mapTile = mapTile;
            return;
        }

        loaderInfo = self.waiting[name];
        if(loaderInfo) {
            loaderInfo.inuse++;
            loaderInfo.mapTile = mapTile;
            self.queue.sort((a, b) => {
                return a.inuse > b.inuse ? 0 : -1;
            })
        } else {
            loaderInfo = MapLoaderInfo.Instance();
            loaderInfo.mapId = self.id;
            loaderInfo.index = name;
            loaderInfo.mapTile = mapTile;
            loaderInfo.inuse = 1;

            self.queue.push(loaderInfo);
            self.waiting[name] = loaderInfo;
        }
    }

    public getTextureFromCache(name: number): egret.Texture {
        return CacheManager.Instance.mapCache.getItemData(name)
    }

    public addTextureUse(name: number): void {
        CacheManager.Instance.skinCache.addReference(name);
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

    public doLoad(dir: string): void {
        let self = this;

        const url: string = ResUrl.url(`${self.index}.jpg`, ResourceType.Map, dir);
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