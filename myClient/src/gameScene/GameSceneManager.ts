class GameSceneManager implements IUpdateable, IUpdateLogicable {
    public static readonly Instance: GameSceneManager = new GameSceneManager();
    public enabled: boolean = false;

    public root: egret.Sprite;
    private layers: {[type: number]: SceneLayer};
    

    public curInstance: ARPGInstanceBase;
    private mapTiles: MapTileManager;

    private init: boolean = false;
    private mapConfig: MapConfig;
    private stageWIsGreaterMapW: boolean;
    private stageHIsGreaterMapH: boolean;
    private _screenX: number;
    private _screenY: number;


    public getLayer(layer: E_SceneLayerType): SceneLayer {
        return this.layers[layer];
    }

    public initCompnents(): void {
        let self = this;
        if (!self.init) {
            const root: egret.Sprite = new egret.Sprite();
            root.name = "root";
            MtwGame.Instance.offsetView.addChildAt(root, 0);
            self.root = root;

            self.initLayers();
            self.mapTiles = new MapTileManager();

            self.init = true;
        }
    }

    private initLayers(): void {
        let self = this;

        const root: egret.Sprite = self.root;
        const layers = {};

        let layer: SceneLayer;
        for (let type: number = E_SceneLayerType.Start; type < E_SceneLayerType.End; type++) {
            if (type === E_SceneLayerType.Role) {
                layer = new RoleLayer();
            } else if (type == E_SceneLayerType.Info) {
                layer = new InfoLayer();
            } else if (type == E_SceneLayerType.TxtInfo) {
                layer = new InfoLayer();
            } else {
                layer = new SceneLayer();
            }
            layer.enabled = false;

            layers[type] = layer;
            root.addChild(layer);
        }

        self.layers = layers;
    }

    private initMapTiles(): void {

    }

    private initScene(mapId: number): void {
        let self = this;

        self.mapConfig = cm.map[mapId];
        self.initMapTiles();
    }

    public changeScene(mapId: number): void {
        let self = this;
        gd.map.enterMap(mapId);
        self.destory();
        self.initScene(mapId);
    }

    public resize(): void {
        let self = this;
        const mapConfig: MapConfig = self.mapConfig;
        if (mapConfig) {
            self.stageWIsGreaterMapW = mStage.stageWidth > mapConfig.width;
            self.stageHIsGreaterMapH = MtwGame.Instance.getStageHeight() > mapConfig.height;
        }

        if (self.enabled && self.mapTiles) {
            self.mapTiles.initSize(self._screenX, self._screenY);
        }
    }

    public update(): void {

    }

    public updateLogic(): void {

    }

    private destory(): void {
        let self = this;
        if (self.curInstance) {
            self.curInstance.dispose();
            self.curInstance = null;
        }

        if (self.mapTiles) {
            self.mapTiles.clear();
        }
        SceneEffectManager.Instance.destoryAllEffect();
        emIns.destoryAllEntiy();
    }
}