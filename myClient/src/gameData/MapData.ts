const enum E_BLOCK_TYPE {
	TM_NORMAL = 0,
	TM_BLOCK,

}

class MapData {
    //1
    public curMapId: number;
	public config: MapConfig;
	private _colCount: number;
	private _rowCount: number;
	private _mapIndex: Array<Array<number>>;
	private _coverDic: { [key: number]: boolean };
	private _safeDic: { [key: number]: boolean };
	private stallageArea: Array<Array<number>>;
	public guajiArea: Array<Array<number>>;
	public safeArea: Array<Array<number>>;
	private _pathLayer: PathLayer;
	private _tempPoint: egret.Point = new egret.Point();


    public prepareMapId: number;


    public prepareEnterMap(mapId: number): void {
        this.prepareMapId = mapId;
    }

    public enterMap(mapId: number): void {
        this.curMapId = mapId;
        this.config = cm.map[mapId];
    }

    private clearData(): void {
		let self = this;
		self._coverDic = {};
		self._safeDic = {};
		if (self._pathLayer) {
			self._pathLayer.destroy();
			self._pathLayer = null;
		}

		self.safeArea = null;
		self.guajiArea = null;
		self.stallageArea = null;

	}

    public readData(data): void {
        let self = this;

        const bytes: egret.ByteArray = cm.mapDatas[data];
        bytes.position = 0;

        self.clearData();
        bytes.endian = egret.Endian.LITTLE_ENDIAN;
        bytes.position = 0;
        let len: number = bytes.readInt();
        var colcount: number = Math.ceil(self.config.width / GameDefine.MAP_GRID_WIDTH);
        var rowcount: number = Math.ceil(self.config.height / GameDefine.MAP_GRID_HEIGHT);
        self._colCount = colcount - 1;
        self._rowCount = rowcount - 1;
        let a: number = 0b1000;
        let b: number = 0b0100;
        let c: number = 0b0010;
        let d: number = 0b0001;
        let nextint: boolean = true;
        let gridCount: number = 0;
        let curValue: number = 0;
        let v: number = 0;
        let id: number;
        self._mapIndex = new Array<Array<number>>(rowcount);
        for (let i = 0; i < rowcount; i++) {
            let tmpArray: Array<number> = new Array<number>(colcount);
            for (let j: number = 0; j < colcount; j++) {
                if (nextint) {//偶数
                    curValue = bytes.readByte();
                    if (curValue < 0)
                        curValue += 256;
                    nextint = false;
                    v = curValue >> 4;
                } else {//奇数
                    v = curValue & 15;
                    nextint = true;
                }
                id = (j << 16) + i;
                if ((v & a) > 0) {
                    tmpArray[j] = E_BLOCK_TYPE.TM_BLOCK;
                } else {
                    tmpArray[j] = E_BLOCK_TYPE.TM_NORMAL;
                }
                if ((v & b) > 0) {
                    self._coverDic[id] = true;
                }
                if ((v & c) > 0) {
                    self._safeDic[id] = true;
                }
                // if((v&d) > 0){
                // 	self._digDic[id] = true;	
                // 	_digArr.push(id);
                // }
                gridCount++;
            }
            self._mapIndex[i] = tmpArray;
        }
        let stallageArealength = bytes.readShort();
        if (stallageArealength > 0) {
            self.stallageArea = [];
            for (let i2 = 0; i2 < stallageArealength; i2++) {
                self.stallageArea[i2] = [bytes.readShort(), bytes.readShort()];
            }
        }
        let guajiArealength = bytes.readShort();
        if (guajiArealength > 0) {
            self.guajiArea = [];
            for (let i3 = 0; i3 < guajiArealength; i3++) {
                self.guajiArea[i3] = [bytes.readShort(), bytes.readShort()];
            }
        }
        let safemclength = bytes.readShort();
        if (safemclength > 0) {
            self.safeArea = [];
            for (let i1 = 0; i1 < safemclength; i1++) {
                self.safeArea[i1] = [bytes.readShort(), bytes.readShort()];
            }

        }

        //bytes.clear();
        self._pathLayer = new PathLayer();
        self._pathLayer.initBlocks(self.config.width, self.config.height, GameDefine.MAP_GRID_WIDTH, GameDefine.MAP_GRID_HEIGHT, self._mapIndex);
    }
}