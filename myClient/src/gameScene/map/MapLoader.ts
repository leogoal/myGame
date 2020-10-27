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

        self.clearLoadQueue();
        self.id = mapId;

        const mapConfig: MapConfig = cm.map[mapId];
        self.resDir = `${mapConfig.img}`;

        

    }

    public loadComplete(loaderInfo: MapLoaderInfo, data): void {

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
    public inuse: number;

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
        MapLoaderInfo.pool.push(this);
    }
}