class GameSceneManager implements IUpdateable, IUpdateLogicable {
    public static readonly Instance: GameSceneManager = new GameSceneManager();
    public enabled: boolean = false;
    
    private mapTiles: MapTileManager;

    public root: egret.Sprite;


    private init: boolean = false;
    private mapConfig: MapConfig;
    private stageWIsGreaterMapW: boolean;
    private stageHIsGreaterMapH: boolean;

    private _screenX: number;
    private _screenY: number;

    public initCompnents(): void {
        let self = this;
        if(!self.init) {

            const root: egret.Sprite = new egret.Sprite();
            root.name = "root";
            MtwGame.Instance.offsetView.addChildAt(root, 0);
            self.root = root;

            self.mapTiles = new MapTileManager();
            self.init = true;
        }
    }

    public resize(): void {
        let self = this;
        const mapConfig: MapConfig = self.mapConfig;
        if(mapConfig) {
            self.stageWIsGreaterMapW = mStage.stageWidth > mapConfig.width;
            self.stageHIsGreaterMapH = MtwGame.Instance.getStageHeight() > mapConfig.height;
        }

        if(self.enabled && self.mapTiles) {
            self.mapTiles.initSize(self._screenX, self._screenY);
        }
    }

    public update(): void {

    }

    public updateLogic(): void {

    }
}