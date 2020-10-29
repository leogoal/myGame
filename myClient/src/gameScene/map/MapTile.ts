class MapTile {
    public bitmap: egret.Bitmap;

    private _w: number;
    private _h: number;
    private _x: number;
    private _y: number;
    private _index: number;
    private changed: boolean = true;

    constructor(x: number, y: number) {
        let self = this;
        self.bitmap = new egret.Bitmap();
        self._w = GameDefine.MAP_GRID_WIDTH;
        self._h = GameDefine.MAP_GRID_HEIGHT;
        self.x = x;
        self.y = y;
    }

    public set x(value: number) {
        let self = this;
        self._x = value;
        self.bitmap.x = value * self._w;
    }

    public get x(): number {
        return this._x;
    }

    public set y(value: number) {
        let self = this;
        self._y = value;
        self.bitmap.y = value * self._h;
    }

    public get y(): number {
        return this._y;
    }

    public set index(value: number) {
        let self = this;
        if(value !== self._index) {
            if(self._index > 0) {
                self.clearTexture();
            }

            self._index = value;
            self.changed = true;
        }
    }

    public get index(): number {
        return this._index;
    }

    public loadMapTile(): void {
        let self = this;
        if(self.changed) {
            const index: number = self.index;
            if(index > 0) {
                const cacheTexture: egret.Texture = MapLoader.Instance.getTextureFromCache(index);
                if(cacheTexture) {
                    MapLoader.Instance.addTextureUse(index);
                    self.bitmap.texture = cacheTexture;
                } else {
                    MapLoader.Instance.load(index, self);
                }
            }
        }
    }

    private clearTexture(): void {

    }

    public dispose(): void {
        
    }
}