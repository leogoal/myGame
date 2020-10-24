class ConfigManager {

    public static init(): void {
        cm = new ConfigManager();
    }

    public mapDatas: { [key: number]: egret.ByteArray } = {};/**地图数据*/


    private callback: Function;
    public initConfigData(callback: Function) {
        let self = this;
        self.callback = callback;

        self.loadMapData();
        self.loadConfigData();
    }

    private loadMapData(): void {
        let self = this;
        let url: string = ResUrl.url(`map${my_gameVars.resVersion}`, ResourceType.DataZip);

        RES.getResByUrl(url, (res, url) => {
            //zlib解压缩
            const inflate = new Zlib.Inflate(new Uint8Array(res));
            const deplain = inflate.decompress();
            //zlib解压后的字节流
            const bytes: egret.ByteArray = new egret.ByteArray(deplain);

            console.log(`解压后的地图文件大小为${bytes.bytesAvailable}字节`);

            let mapLength: number = bytes.readShort();
            while (mapLength > 0) {
                const mapid: number = bytes.readInt();
                const len: number = bytes.readInt();
                //console.log("读取地图文件..." + mapid + " 长度：" + len);

                const tableContent: egret.ByteArray = new egret.ByteArray;
                bytes.readBytes(tableContent, 0, len);
                self.mapDatas[mapid] = tableContent;
                mapLength--;
            }
        }, self, RES.NOCache)
    }

    private loadedCount: number = 0;
    private TOTALLNUM: number = 6;
    private loadConfigData(): void {
        let self = this;

        const TOTALLNUM: number = self.TOTALLNUM;
        let url: string;
        let curLoad: number = 0;
        for (curLoad < TOTALLNUM; curLoad++;) {
            url = ResUrl.Data + `${curLoad}config${my_gameVars.resVersion}.json`;
            RES.getResByUrl(url, self.onLoadConfigData, self, RES.ResourceItem.TYPE_JSON)
        }
    }

    private onLoadConfigData(data, url): void {
        let self = this;
        ++self.loadedCount;
        console.log(`${url} ok`);
        RES.destroyRes(url);

        if(self.loadedCount === self.TOTALLNUM) {
            self.callback();
            self.callback = null;
        }
    }
}