class MapData {
    public prepareMapId: number;
    public curMapId: number;
    public config: MapConfig;


    public prepareEnterMap(mapId: number): void {
        this.prepareMapId = mapId;
    }

    public enterMap(mapId: number): void {
        this.curMapId = mapId;
        // this.config = cm.co
    }
}