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
        self._w = GameDefine.MAP_TILE_WIDTH;
        self._h = GameDefine.MAP_TILE_HEIGHT;
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
            self.changed = false;
        }
    }

    public loadComplete(index: number, texture: egret.Texture): void {
        let self = this;
        if(self._index === index) {
            if(texture && self.bitmap) {
                MapLoader.Instance.addTextureUse(index);
                self.bitmap.texture = texture;
            }
        }
    }

    private clearTexture(): void {
        let self = this;
        if(self.bitmap && self.bitmap.texture) {
            self.bitmap.texture = null;
            MapLoader.Instance.removeTextureUse(self._index);
        }
    }

    public dispose(): void {
        let self = this;
        if(self._index > 0) {
            self.clearTexture()
        }

        if(self.bitmap) {
            if(self.bitmap.parent) {
                self.bitmap.parent.removeChild(self.bitmap);
            }
            self.bitmap.texture = null;
            self.bitmap = null;
        }
    }
}