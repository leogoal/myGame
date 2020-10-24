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
        cm.initConfigData(()=>{
            GameStateManager.Instance.changeGameState(E_GameStateType.Login)
        })
    }

    public exit(): void {

    }
}