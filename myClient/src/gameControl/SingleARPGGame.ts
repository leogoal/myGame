//单机游戏
class SingleARPGGame {
    public static readonly Instance: SingleARPGGame = new SingleARPGGame();



    public startARPGGame(): void {
        let self = this;
        self.enterMap();
    }

    private enterMap(): void {

        const mapId: number = 154;
        gd.map.prepareEnterMap(mapId);

        GameSceneManager.Instance.changeScene(gd.map.prepareMapId);
        GameSceneManager.Instance.enter();

        emIns.firstPlayer.addToView();

        
        
    }
}