class PreLoadingState implements IGameState {

    public gameState(): GameStateType {
        return GameStateType.PreLoading;
    }

    public enter(): void {
        console.log("PreLoadingState");
        let self = this;

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        self.startAsyncLoad().catch(e => {
            console.warn(e)
        })
    }

    private async startAsyncLoad() {
        await this.preLoadResource();
    }

    private async preLoadResource() {
        try {
            const loadingView = new LoadingUI();
            mStage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView).then(() => {
                console.log("resolveing")
                MtwGame.Instance.init1();
                GameStateManager.Instance.changeGameState(GameStateType.Loading);
            }, () => {
                console.log("rejecting")
            });
            mStage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", mStage);
            theme.once(eui.UIEvent.COMPLETE, () => {
                console.log("doresolve")
                resolve();
            }, this);

        })
    }

    public exit(): void {

    }
}