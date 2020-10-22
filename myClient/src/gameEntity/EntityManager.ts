class EntityManager implements IUpdateable, IUpdateLogicable {
    public enabled: boolean = false;

    public static init(): void {
        emIns = new EntityManager();
    }

    public update(): void {

    }

    public updateLogic(gameTime: GameTime): void {

    }
}