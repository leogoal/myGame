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
            GameStateManager.Instance.changeGameState(E_GameStateType.Login);
            
            if (loadingView) {
                if(loadingView.parent) {
                    loadingView.parent.removeChild(loadingView);
                }
                loadingView = null;
            }
        })
    }

    public exit(): void {

    }
}