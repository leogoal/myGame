class EntityMoveFSM implements I_EntityFSM {
    public static readonly Instance: EntityMoveFSM = new EntityMoveFSM();

    public getState(): E_FSMState {
        return E_FSMState.FSM_STATE_MOVE;
    }
    public canChangeState(): boolean {
        return true;
    }
    public enter(entity: Entity, stateLast: number): void {
        entity.onEnterMove();
    }
    
    public execute(entity: Entity, gameTime: GameTime): void {

    }
    public executeLogic(entity: Entity, gameTile: GameTime): void {

    }
    public exit(entity: Entity): void {

    }
}