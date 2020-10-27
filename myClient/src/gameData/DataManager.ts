class DataManager {
    public static readonly Instance: DataManager = new DataManager();

    public map: MapData;

    public init(): void {
        gd = DataManager.Instance;

        gd.map = new MapData;
    }


}