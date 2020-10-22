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
    }

    public init1(): void {
        let self = this;
    }
}