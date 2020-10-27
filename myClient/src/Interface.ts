interface I_GameState {
    gameState(): E_GameStateType;
    enter(): void;
    exit(): void;
}

interface IUpdateable {
    enabled: boolean;
    update(gameTime: GameTime): void;
}

interface IUpdateLogicable {
    enabled: boolean;
    updateLogic(gameTime: GameTime): void;
}

interface I_GameEventHandler {
    centerEventHandler(eid: number, data: any);
}

interface I_Observer {
    update(cmd: number, data: any);
}

interface I_Subject {
    addObserver(observer: I_Observer);
    removeObserver(observer: I_Observer);
    sendNotif(cmd: number, data?: number);
}

interface I_Instance {
    init(): void;
    dispose(): void;
}

interface I_LimitedPoolItem {
    disposePermanent(): void;
    returnToPool(): void;
}