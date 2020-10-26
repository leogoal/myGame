class GameStateManager {
    public static readonly Instance: GameStateManager = new GameStateManager();
    private gameStates: { [stateType: number]: I_GameState } = {};
    private currentState: I_GameState;

    public init(): void {
        let self = this;

        let gState: I_GameState = new PreLoadingState();
        self.gameStates[E_GameStateType.PreLoading] = gState;

        gState = new LoadingState();
        self.gameStates[E_GameStateType.Loading] = gState;

        gState = new LoginState();
        self.gameStates[E_GameStateType.Login] = gState;

        // gState = new 
    }

    public changeGameState(stateType: E_GameStateType): void {
        let self = this;
        const nextState = self.gameStates[stateType];
        if (nextState) {
            if (self.currentState) {
                self.currentState.exit();
            }

            self.currentState = nextState;
            self.currentState.enter();
        }
    }
}

interface I_GameState {
    gameState(): E_GameStateType;
    enter(): void;
    exit(): void;
}

const enum E_GameStateType {
    PreLoading,
    Loading,
    Login,
    Scene,
}

