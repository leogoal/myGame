//单机游戏
class SingleARPGGame {
    public static readonly Instance: SingleARPGGame = new SingleARPGGame();



    public startARPGGame(): void {
        let self = this;
    }

    private enterMap(): void {

        const mapId: number = 100;
        gd.map.prepareEnterMap(mapId);

        
    }
}