class MapTileManager {
    private container: SceneLayer;

    private tilesInView: Array<Array<MapTile>>;
    private mapWidth: number;
    private mapHeight: number;
    private col: number;
    private row: number;
    private border: number = 50


    public initTiles(mapWidth: number, mapHeight: number, ): void {
        let self = this;
        self.container = GameSceneManager.Instance.getLayer(E_SceneLayerType.BackGround);
        self.mapWidth = mapWidth;
        self.mapHeight = mapHeight;
        self.col = Math.ceil(mapWidth / GameDefine.MAP_TILE_WIDTH);
        self.row = Math.ceil(mapHeight/ GameDefine.MAP_TILE_HEIGHT);
    }


    /**
     * 初始化地图显示对象
     * 根据屏幕，初始化固定块数的地图
     * 正常移动时，只需要移动周围一圈的地图切片到另一边
     */
    public initSize(screenX: number, screenY: number): void {

    }

    public clear(): void {
        let self = this;
        const tilesInView = self.tilesInView;

        for(let arr of tilesInView) {
            if(arr && arr.length) {
                for(let tile of arr) {
                    tile.dispose();
                }
            }
        }
    }
}