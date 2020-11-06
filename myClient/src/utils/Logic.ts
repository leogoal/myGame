class Logic {
    public static getEntityPixelByGrid(grid: number): number {
        return grid * GameDefine.MAP_GRID_WIDTH + GameDefine.MAP_GRID_WIDTH * 0.5;     
    }
}