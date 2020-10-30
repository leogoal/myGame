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
    private screenX: number;
    private screenY: number;


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


    private initScene(mapId: number): void {
        let self = this;
        const mapConfig: MapConfig = cm.map[mapId];
        if(mapConfig) {
            self.mapConfig = mapConfig;
            self.mapTiles.initTiles(mapConfig.width, mapConfig.height);

            gd.map.readData(mapConfig.data);
            MapLoader.Instance.setMap(mapConfig.id);

            self.curInstance = new ARPGInstanceBase();
            self.curInstance.init();
        }
    }

    public changeScene(mapId: number): InstanceBase {
        let self = this;
        gd.map.enterMap(mapId);
        self.destory();
        self.initScene(mapId);

        return self.curInstance;
    }

    public enter(): void {
        let self = this;
        self.enabled = true;

        self.checkStageWAndMapW();
        self.renderMapByRole();
        self.mapTiles.initSize(self.screenX, self.screenY);
    }

    public resize(): void {
        let self = this;
        self.checkStageWAndMapW();
        if (self.enabled) {
            self.renderMapByRole();
            self.mapTiles.initSize(self.screenX, self.screenY);
        }
    }

    private checkStageWAndMapW():void {
        let self = this;
        const mapConfig: MapConfig = self.mapConfig;
        if (mapConfig) {
            self.stageWIsGreaterMapW = mStage.stageWidth > mapConfig.width;
            self.stageHIsGreaterMapH = MtwGame.Instance.getStageHeight() > mapConfig.height;
        }
    }

    private renderMapByRole(): void {
        let self = this;
        const firstPlayer: Player = emIns.firstPlayer;
        if(firstPlayer) {
            const stageW: number = mStage.stageWidth;
            const stageH: number = mStage.stageHeight;
            const mapW: number = self.mapConfig.width;
            const mapH: number = self.mapConfig.height;
            let screenX: number;
            let screenY: number;
            if(self.stageWIsGreaterMapW) {
                screenX = (stageW - mapW) * 0.5; 
            } else {
                screenX = stageW * 0.5 - firstPlayer.x;
                if(screenX > 0) {
                    screenX = 0;
                } else if(screenX < mapW - stageW) {
                    screenX = mapW - stageW;
                }
            }

            if(self.stageHIsGreaterMapH) {
                screenY = (stageH - mapH) * 0.5;
            } else {
                screenY = stageH * 0.5 - firstPlayer.y;
                if(screenY > 0) {
                    screenY = 0;
                } else if(screenY < mapH - stageH) {
                    screenY = mapH - stageH;
                }
            }

            self.screenX = Math.floor(screenX);
            self.screenY = Math.floor(screenY);

            self.root.x = screenX;
            self.root.y = screenY;
        }
    }

    public update(): void {
        let self = this;
        self.renderMapByRole();
    }

    public updateLogic(): void {
        let self = this;
        self.mapTiles.update(self.screenX, self.screenY);
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