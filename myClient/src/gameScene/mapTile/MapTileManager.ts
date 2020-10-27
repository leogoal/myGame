class MapTileManager {
    private tilesInView: Array<Array<MapTile>>;
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