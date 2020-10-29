class MapTileManager {
    public constructor() {
        let self = this;
        self.container = GameSceneManager.Instance.getLayer(E_SceneLayerType.BackGround);
        self.leftUpPoint = new egret.Point();
        self.tileWidth = GameDefine.MAP_TILE_WIDTH;
        self.tileHeight = GameDefine.MAP_TILE_HEIGHT;
        self.border = 50;
        self.viewCol = 0;
        self.viewRow = 0;
        self.tilesInView;
    }

    private leftUpPoint: egret.Point;
    private container: SceneLayer;

    private tileWidth: number;
    private tileHeight: number;
    private tilesInView: Array<Array<MapTile>>;
    private mapWidth: number;
    private mapHeight: number;
    private col: number;
    private row: number;
    private border: number;
    private viewWidth: number;
    private viewHeight: number;
    private lastX: number;
    private lastY: number;
    private scrollX: number;
    private scrollY: number;
    private viewCol: number
    private viewRow: number;



    public initTiles(mapWidth: number, mapHeight: number, ): void {
        let self = this;

        self.mapWidth = mapWidth;
        self.mapHeight = mapHeight;
        self.col = Math.ceil(mapWidth / self.tileWidth);
        self.row = Math.ceil(mapHeight / self.tileHeight);
        self.tilesInView = [];
    }


    private getRowColByPos(x: number, y: number): egret.Point {
        let self = this;
        const leftUpPoint: egret.Point = self.leftUpPoint;
        const border: number = self.border;
        leftUpPoint.x = Math.floor((Math.abs(x) - border) / self.tileWidth);
        leftUpPoint.y = Math.floor((Math.abs(y) - border) / self.tileHeight);
        return leftUpPoint;
    }

    /**
     * 初始化地图显示对象
     * 根据屏幕，初始化固定块数的地图
     * 正常移动时，只需要移动周围一圈的地图切片到另一边
     */
    public initSize(screenX: number, screenY: number): void {
        let self = this;

        if (screenX == undefined || screenY == undefined) {
            return;
        }

        const viewW: number = self.viewWidth = mStage.stageWidth;
        const viewH: number = self.viewHeight = mStage.stageHeight;
        const leftUpPoint: egret.Point = self.getRowColByPos(screenX, screenY);
        self.lastX = self.leftUpPoint.x;
        self.lastY = self.leftUpPoint.y;
        self.scrollX = 0;
        self.scrollY = 0;

        const border: number = self.border;
        const w: number = viewW + border * 2;
        const h: number = viewH + border * 2;

        self.viewCol = Math.floor(w / self.tileWidth);
        if (w % self.tileWidth === 0) {
            self.viewCol += 1;
        } else {
            self.viewCol += 2;
        }
        const viewCol: number = self.viewCol;

        self.viewRow = Math.floor(h / self.tileHeight);
        if (h % self.tileHeight === 0) {
            self.viewRow += 1;
        } else {
            self.viewRow += 2;
        }
        const viewRow: number = self.viewRow;

        let rowIndex: number;
        let colIndex: number;
        let tilesRow: MapTile[];
        let tile: MapTile;
        const tiles: Array<Array<MapTile>> = self.tilesInView;
        //删除多余的行
        if (tiles.length > viewRow) {
            for (rowIndex = viewRow; rowIndex < tiles.length; rowIndex++) {
                tilesRow = tiles[rowIndex];
                for (tile of tilesRow) {
                    if (tile) {
                        tile.dispose();
                    }
                }
            }
        }
        tiles.length = viewRow;
        //删除多余的列
        for (rowIndex = 0; rowIndex < viewRow; rowIndex++) {
            tilesRow = tiles[rowIndex];
            if (!tilesRow) {
                tilesRow = [];
            }
            if (tilesRow.length > viewCol) {
                for (colIndex = viewCol; colIndex < tilesRow.length; colIndex++) {
                    tile = tilesRow[colIndex];
                    if (tile) {
                        tile.dispose();
                    }
                }
                tilesRow.length = viewCol;
            }
        }

        const totalCol: number = self.col;
        const totalRow: number = self.row;

        for (rowIndex = 0; rowIndex < viewRow; rowIndex++) {
            for (colIndex = 0; colIndex < viewCol; colIndex++) {
                tile = tiles[rowIndex][colIndex];
                const tileX: number = colIndex + leftUpPoint.x;
                const tileY: number = rowIndex + leftUpPoint.y;
                if (tile) {
                    tile.x = tileX;
                    tile.y = tileY;
                } else {
                    tile = self.addTile(tileX, tileY);
                    tiles[rowIndex][colIndex] = tile;
                }

                if (tileX >= 0 && tileX < totalCol && tileY >= 0 && tileY < totalRow) {
                    tile.index = totalCol * tileY + tileX + 1;
                } else {
                    tile.index = 0;
                    console.warn('地图切片xy有异常');
                    console.log(`tileX: ${tileX} tileY: ${tileY} totalCol: ${totalCol} totalRow: ${totalRow}`);
                }
                tile.l
            }
        }
    }

    private addTile(x: number, y: number): MapTile {
        const mapTile: MapTile = new MapTile(x, y);
        this.container.addChild(mapTile.bitmap);
        return mapTile;
    }

    public clear(): void {
        let self = this;
        const tilesInView = self.tilesInView;

        for (let arr of tilesInView) {
            if (arr && arr.length) {
                for (let tile of arr) {
                    tile.dispose();
                }
            }
        }
    }
}