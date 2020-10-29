class MapTileManager {
    public constructor() {
        let self = this;
        self.container = GameSceneManager.Instance.getLayer(E_SceneLayerType.BackGround);
        self.leftUpPoint = new egret.Point();
        self.tileWidth = GameDefine.MAP_TILE_WIDTH;
        self.tileHeight = GameDefine.MAP_TILE_HEIGHT;
        self.border = 50;
        self.tilesInView = [];
    }

    private leftUpPoint: egret.Point;
    private container: SceneLayer;
    private tileWidth: number;
    private tileHeight: number;
    private tilesInView: Array<Array<MapTile>>;
    private mapWidth: number;
    private mapHeight: number;
    private totalCol: number;
    private totalRow: number;
    private border: number;
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
        self.totalCol = Math.ceil(mapWidth / self.tileWidth);
        self.totalRow = Math.ceil(mapHeight / self.tileHeight);
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

        const viewW: number = mStage.stageWidth;
        const viewH: number = MtwGame.Instance.getStageHeight();
        const leftUpPoint: egret.Point = self.getRowColByPos(screenX, screenY);
        self.lastX = leftUpPoint.x;
        self.lastY = leftUpPoint.y;
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

        const totalCol: number = self.totalCol;
        const totalRow: number = self.totalRow;
        const startX: number = leftUpPoint.x;
        const startY: number = leftUpPoint.y;

        for (rowIndex = 0; rowIndex < viewRow; rowIndex++) {
            for (colIndex = 0; colIndex < viewCol; colIndex++) {
                tile = tiles[rowIndex][colIndex];
                const tileX: number = colIndex + startX;
                const tileY: number = rowIndex + startY;
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
                    console.error('地图切片xy有异常');
                    console.log(`tileX: ${tileX} tileY: ${tileY} totalCol: ${totalCol} totalRow: ${totalRow}`);
                }
                tile.loadMapTile()
            }
        }
    }

    public update(screenX: number, screenY: number): void {
        let self = this;

        const border: number = self.border;
        const leftUpPoint: egret.Point = self.getRowColByPos(screenX, screenY);
        const movedX: number = leftUpPoint.x - self.lastX;
        const movedY: number = leftUpPoint.y - self.lastY;
        self.lastX = leftUpPoint.x;
        self.lastY = leftUpPoint.y;
        const mx: number = Math.abs(movedX);
        const my: number = Math.abs(movedY);

        if (mx > 2 || my > 2) {
            self.updateAll()
        } else if (mx > 0 || my > 0) {
            const tiles: Array<Array<MapTile>> = self.tilesInView;

            const viewRow: number = self.viewRow;
            const viewCol: number = self.viewCol;
            const totalCol: number = self.totalCol;
            const totalRow: number = self.totalRow;
            let rowIndex: number;
            let colIndex: number;
            let srow: number;
            let scol: number;
            let tile: MapTile;
            let tileX: number;
            let tileY: number;
            const tilesChanged: MapTile[] = [];

            if (movedX > 0) {
                //向右移动
                for (colIndex = 0; colIndex < mx; colIndex++) {
                    scol = (self.scrollX + colIndex) % viewCol;
                    if (scol < 0) {
                        scol += viewCol;
                    }
                    for (rowIndex = 0; rowIndex < viewRow; rowIndex++) {
                        srow = (self.scrollY + rowIndex) % viewRow;
                        if (srow < 0) {
                            srow += viewRow;
                        }
                        tile = tiles[srow][scol];
                        tileY = tile.y;
                        tileX = tile.x + viewCol;
                        tile.x = tileX;
                        if (tileX >= 0 && tileX < totalCol && tileY >= 0 && tileY < totalRow) {
                            tile.index = totalCol * tileY + tileX + 1;
                            tilesChanged.push(tile);
                        }
                    }
                }
            } else {
                //向左移动
                for (colIndex = 0; colIndex < mx; colIndex++) {
                    scol = (self.scrollX + (viewCol - 1 - colIndex)) % viewCol;
                    if (scol < 0) {
                        scol += viewCol;
                    }
                    for (rowIndex = 0; rowIndex < viewRow; rowIndex++) {
                        srow = (self.scrollY + rowIndex) % viewRow;
                        if (srow < 0) {
                            srow += viewRow;
                        }
                        tile = tiles[srow][scol];
                        if (tile) {
                            tileY = tile.y;
                            tileX = tile.x - viewCol;
                            tile.x = tileX;
                            if (tileX >= 0 && tile.x < totalCol && tileY >= 0 && tileY < totalRow) {
                                tile.index = totalCol * tileY + tileX + 1;
                                tilesChanged.push(tile);
                            }
                        }

                    }
                }
            }

            if (movedY > 0) {
                //向下移动
                for (rowIndex = 0; rowIndex < my; rowIndex++) {
                    srow = (self.scrollY + rowIndex) % viewRow;
                    if (srow < 0) {
                        srow += viewRow;
                    }
                    for (colIndex = 0; colIndex < viewCol; colIndex++) {
                        scol = (self.scrollX + colIndex) % viewCol;
                        if (scol < 0) {
                            scol += viewCol;
                        }
                        tile = tiles[srow][scol];
                        if (tile) {
                            tileX = tile.x;
                            tileY = tile.y + viewRow;
                            tile.y = tileY;
                            if (tileX >= 0 && tileX < totalCol && tileY >= 0 && tileY < totalRow) {
                                tile.index = totalCol * tileY + tileX + 1;
                                tilesChanged.push(tile);
                            }
                        }
                    }
                }
            } else {
                //向上移动
                for (rowIndex = 0; rowIndex < my; rowIndex++) {
                    srow = (self.scrollY + (viewRow - 1 - rowIndex)) % viewRow;
                    if (srow < 0) {
                        srow += viewRow;
                    }
                    for (colIndex = 0; colIndex < viewCol; colIndex++) {
                        scol = (self.scrollX + colIndex) % viewCol;
                        if (scol < 0) {
                            scol += viewCol;
                        }
                        tile = tiles[srow][scol];
                        if (tile) {
                            tileX = tile.x;
                            tileY = tile.y - viewRow;
                            tile.y = tileY;
                            if (tileX >= 0 && tileX < totalCol && tileY >= 0 && tileY < totalRow) {
                                tile.index = totalCol * tileY + tileX + 1;
                                tilesChanged.push(tile);
                            }
                        }
                    }
                }
            }

            for (tile of tilesChanged) {
                tile.loadMapTile();
            }

            self.scrollX += movedX % viewCol;
            self.scrollY += movedY % viewRow;
        }
    }

    private updateAll(): void {
        let self = this;

        self.scrollX = 0;
        self.scrollY = 0;
        const tiles: Array<Array<MapTile>> = self.tilesInView;
        const startX: number = self.leftUpPoint.x;
        const startY: number = self.leftUpPoint.y;
        const viewRow: number = self.viewRow;
        const viewCol: number = self.viewCol;
        const totalCol: number = self.totalCol;
        const totalRow: number = self.totalRow;
        let rowIndex: number;
        let colIndex: number;
        let tile: MapTile;
        let tileX: number;
        let tileY: number;

        for (rowIndex = 0; rowIndex < viewRow; rowIndex++) {
            for (colIndex = 0; colIndex < viewCol; colIndex++) {
                tile = tiles[rowIndex][colIndex];
                tileX = startX + colIndex;
                tileY = startY + rowIndex;

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
                    console.error('地图切片xy有异常');
                    console.log(`tileX: ${tileX} tileY: ${tileY} totalCol: ${totalCol} totalRow: ${totalRow}`);
                }
                tile.loadMapTile();
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