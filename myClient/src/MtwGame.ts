class MtwGame {
    private static _instance: MtwGame;
    public static get Instance(): MtwGame {
        if (this._instance == null || this._instance == undefined) {
            this._instance = new MtwGame();
        }
        return this._instance;
    }

    public offsetView: egret.Sprite;
    public uiLayer: UILayer;

    public init(): void {
        let self = this;
        const offsetView: egret.Sprite = new egret.Sprite();
        self.offsetView = offsetView;
        mStage.addChild(offsetView);

        self.uiLayer = new UILayer();
        self.uiLayer.initContainer(offsetView);

        DataManager.Instance.init();
        ConfigManager.init();
        UIManager.init();
        NoticeManager.init();
        GameStateManager.Instance.init();
        GameStateManager.Instance.changeGameState(E_GameStateType.PreLoading)
        SecondTimerUtil.Instance.init();

        /**init1 */
        mStage.on(egret.Event.RESIZE, self.onResizeHandler, self);
    }


    public init1(): void {
        let self = this;
    }

    private onResizeHandler(e: egret.Event): void {
        GameSceneManager.Instance.resize();
        
    }
}

interface IUpdateable {
    enabled: boolean;
	update(gameTime: GameTime): void;
}

interface IUpdateLogicable {
    enabled: boolean;
	updateLogic(gameTime: GameTime): void;
}