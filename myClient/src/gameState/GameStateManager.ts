class GameStateManager {
    public static readonly Instance: GameStateManager = new GameStateManager();
    private gameStates: { [stateType: number]: IGameState } = {};
    private currentState:IGameState;

    public init(): void {
        // let gState: IGameState = new 
    }

    public changeGameState(stateType: GameStateType): void {

    }
}

interface IGameState {
    gameState(): GameStateType;
    enter(): void;
    exit(): void;
}

const enum GameStateType {
    PreLoading,
    Loading,
    Scene
}

