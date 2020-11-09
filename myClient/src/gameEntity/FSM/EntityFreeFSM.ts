class EntityFreeFSM implements I_EntityFSM {
    public static readonly Instance: EntityFreeFSM = new EntityFreeFSM();

    public getState(): E_FSMState {
        return E_FSMState.FSM_STATE_FREE;
    }
    public canChangeState(): boolean {
        return true;
    }

    public enter(entity: AnimalEntity, stateLast: number): void {
        entity.onEnterFree();
    }

    public execute(entity: AnimalEntity, gameTime: GameTime): void {

    }
    public executeLogic(entity: AnimalEntity, gameTile: GameTime): void {

    }
    public exit(entity: AnimalEntity): void {

    }
}