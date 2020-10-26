class SceneState implements I_GameState {
    public gameState(): E_GameStateType {
        return E_GameStateType.Scene;
    }
    public enter(): void {
        console.log('--HomeState');

        
    }


    public exit(): void {

    } 
}