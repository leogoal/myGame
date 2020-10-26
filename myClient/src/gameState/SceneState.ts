class SceneState implements I_GameState {
    public gameState(): E_GameStateType {
        return E_GameStateType.Scene;
    }
    public enter(): void {
        console.log('--SceneState');
        GameSceneManager.Instance.initCompnents();

        MtwGame.Instance.addUpdateRender(emIns);
        MtwGame.Instance.addUpdateRender(CacheManager.Instance);
        MtwGame.Instance.addUpdateRender(ActionLoader.Instance);

        MtwGame.Instance.addUpdateRender(GameSceneManager.Instance);
        MtwGame.Instance.addUpdateLogicRender(GameSceneManager.Instance);
        GameSceneManager.Instance.resize();
    }


    public exit(): void {

    } 
}