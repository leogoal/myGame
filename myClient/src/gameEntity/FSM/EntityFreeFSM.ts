class EntityFreeFSM implements I_EntityFSM {
    public static readonly Instance: EntityFreeFSM = new EntityFreeFSM();

    public getState(): E_FSMState {
        return E_FSMState.FSM_STATE_FREE;
    }
    public canChangeState(): boolean {
        return true;
    }

    public enter(entity: Entity, stateLast: number): void {
        entity.onEnterFree();
    }

    public execute(entity: Entity, gameTime: GameTime): void {

    }
    public executeLogic(entity: Entity, gameTile: GameTime): void {

    }
    public exit(entity: Entity): void {

    }
}