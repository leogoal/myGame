class LoadingState implements I_GameState {

    public gameState(): E_GameStateType {
        return E_GameStateType.Loading;
    }

    public enter(): void {
        console.log("--LoadingState")
    }

    private loadConfigData(): void {
        
    }

    public exit(): void {

    }
}