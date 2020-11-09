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

interface I_TweenAble {
    moveNext: boolean;
    endNow: boolean;
    x: number;
    y: number;
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

interface I_AnimationPlayer {
    loadCompete();
}

interface I_EntityFSM {
    getState(): E_FSMState;
    enter(entity: AnimalEntity, stateLast: number): void;
    canChangeState(): boolean;
    execute(entity: AnimalEntity, gameTime: GameTime): void; 
    executeLogic(entity: AnimalEntity, gameTile: GameTime): void;
    exit(entity: AnimalEntity): void;
}