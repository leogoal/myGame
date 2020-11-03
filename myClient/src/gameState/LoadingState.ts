class LoadingState implements I_GameState {

    public gameState(): E_GameStateType {
        return E_GameStateType.Loading;
    }

    public enter(): void {
        let self = this;
        console.log("--LoadingState")
        self.loadConfigData();
    }

    private loadConfigData(): void {
        if (loadingView) {
            loadingView.setText("加载配置资源");
            loadingView.showPregress(0, 1);
        }
        cm.initConfigData(() => {
            this.clearLoadingView();
            GameStateManager.Instance.changeGameState(E_GameStateType.Login);
        })
    }

    private clearLoadingView(): void {
        loadingView.showPregress(1, 1);
        setTimeout(() => {
            if (loadingView) {
                loadingView.dispose();
                loadingView = null;
            }
        }, 2000)
    }

    public exit(): void {

    }
}