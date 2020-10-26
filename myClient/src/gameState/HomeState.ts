class HomeState implements I_GameState {
    public gameState(): E_GameStateType {
        return E_GameStateType.Home;
    }
    public enter(): void {
        console.log('--HomeState');
        if (my_gameVars.isIos) {
            RES.setMaxLoadingThread(1);
            egret.setTimeout(() => {
                RES.setMaxLoadingThread(2);
            }, this, 20000)
        }

        GameStateManager.Instance.changeGameState(E_GameStateType.Scene);
    }


    public exit(): void {

    }
}