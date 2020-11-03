class ConfigManager {

    public static init(): void {
        cm = new ConfigManager();
    }

    public mapDatas: { [key: number]: egret.ByteArray };/**地图数据*/

    public map: { [id: number]: MapConfig } = {};

    private callback: Function;
    public initConfigData(callback: Function) {
        let self = this;
        self.callback = callback;

        self.loadMapData();
        self.loadConfigData();
    }

    private loadMapData(): void {
        let self = this;
        if (loadingView) {
            loadingView.showPregress(1, 10);
        }

        let url: string = ResUrl.url(`map${my_gameVars.versionNumber}`, ResourceType.MapData);
        RES.getResByUrl(url, (res, url) => {
            //zlib解压缩
            const inflate = new Zlib.Inflate(new Uint8Array(res));
            const deplain = inflate.decompress();
            //zlib解压后的字节流
            const bytes: egret.ByteArray = new egret.ByteArray(deplain);

            console.log(`解压后的地图文件大小为${bytes.bytesAvailable}字节`);

            const mapDatas = {};
            let mapLength: number = bytes.readShort();
            while (mapLength > 0) {
                const mapid: number = bytes.readInt();
                const len: number = bytes.readInt();
                //console.log("读取地图文件..." + mapid + " 长度：" + len);

                const tableContent: egret.ByteArray = new egret.ByteArray;
                bytes.readBytes(tableContent, 0, len);
                mapDatas[mapid] = tableContent;
                mapLength--;
            }
            self.mapDatas = mapDatas;

            self.tryCallBack();

        }, self, RES.NOCache)
    }

    private loadedCount: number = 0;
    private TOTALLNUM: number = 6;
    private loadConfigData(): void {
        let self = this;

        const TOTALLNUM: number = self.TOTALLNUM;
        let url: string;

        for (let curLoad: number = 0; curLoad < TOTALLNUM; curLoad++) {
            url = ResUrl.url(`${curLoad}config${my_gameVars.versionNumber}`, ResourceType.Config);
            console.log('loading: ' + url);
            RES.getResByUrl(url, self.onLoadConfigData, self, RES.ResourceItem.TYPE_JSON);
        }
    }

    private onLoadConfigData(data, url): void {
        let self = this;
        ++self.loadedCount;
        console.log(`${url} ok`);
        loadingView && loadingView.showPregress(self.loadedCount, self.TOTALLNUM);

        RES.destroyRes(url);
        const jsonfile = data;
        for (let fieldName in jsonfile) {
            self[fieldName] = jsonfile[fieldName];
        }

        self.tryCallBack();
    }

    private tryCallBack(): void {
        let self = this;
        if (self.loadedCount === self.TOTALLNUM && self.mapDatas) {
            self.callback();
            self.callback = null;
        }
    }
}