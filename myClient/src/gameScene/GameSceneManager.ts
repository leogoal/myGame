class GameSceneManager implements IUpdateable, IUpdateLogicable {
    public static readonly Instance: GameSceneManager = new GameSceneManager();
    public enabled: boolean = false;

    public root: egret.Sprite;
    private layers: { [type: number]: SceneLayer };

    private imgMosaic: egret.Bitmap;
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
            self.initMosaic();
            self.mapTiles = new MapTileManager();
            
            self.init = true;
        }
    }

    private initLayers(): void {
        let self = this;
        const root: egret.Sprite = self.root;
        const layers = {};
        let layer: SceneLayer;
        for (let type: number = E_SceneLayerType.BackGround; type < E_SceneLayerType.End; type++) {
            if (type === E_SceneLayerType.Role) {
                layer = new RoleLayer();
            } else if (type == E_SceneLayerType.Info) {
                layer = new InfoLayer();
            } else if (type == E_SceneLayerType.TxtInfo) {
                layer = new InfoLayer();
            } else {
                layer = new SceneLayer();
            }

            if (type === E_SceneLayerType.BackGround) {
                layer.name = "map";
            }
            layer.enabled = false;

            layers[type] = layer;
            root.addChild(layer);
        }

        self.layers = layers;
    }

    private initMosaic(): void {
        let self = this;
        self.imgMosaic = new egret.Bitmap();
        self.imgMosaic.texture = RES.getRes("mosaic_jpg")
    }

    private addMosaic(): void {
        this.root.addChildAt(this.imgMosaic, 0);
    }

    public updateMosaic(): void {
        let self = this;
        const imgMosaic: egret.Bitmap = self.imgMosaic;
        if (MapLoader.Instance.isAllOk) {
            imgMosaic.removeSelf();
        } else {
            if (imgMosaic.texture) {
                if (!imgMosaic.parent) {
                    self.addMosaic();
                }
                imgMosaic.width = mStage.width;
                imgMosaic.height = mStage.height;
            }
        }
    }

    private initScene(mapId: number): void {
        let self = this;
        const mapConfig: MapConfig = cm.map[mapId];
        if (mapConfig) {
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

        self.addMosaic();
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

    private checkStageWAndMapW(): void {
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
        if (firstPlayer) {
            const stageW: number = mStage.stageWidth;
            const stageH: number = mStage.stageHeight;
            const mapW: number = self.mapConfig.width;
            const mapH: number = self.mapConfig.height;
            let _screenX: number;
            let _screenY: number;
            if (self.stageWIsGreaterMapW) {
                _screenX = (stageW - mapW) * 0.5;
            } else {
                _screenX = stageW * 0.5 - firstPlayer.x;
                if (_screenX > 0) {
                    _screenX = 0;
                } else if (_screenX < stageW - mapW) {
                    _screenX = stageW - mapW;
                }
            }

            if (self.stageHIsGreaterMapH) {
                _screenY = (stageH - mapH) * 0.5;
            } else {
                _screenY = stageH * 0.5 - firstPlayer.y;
                if (_screenY > 0) {
                    _screenY = 0;
                } else if (_screenY < stageH - mapH) {
                    _screenY = stageH - mapH;
                }
            }

            self.screenX = Math.floor(_screenX);
            self.screenY = Math.floor(_screenY);

            self.root.x = _screenX;
            self.root.y = _screenY;
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