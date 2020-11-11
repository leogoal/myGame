class ActionLoader implements IUpdateable {
    public static readonly Instance: ActionLoader = new ActionLoader();
    public enabled: boolean = true;

    public load(model: number, action: number, dir: number, prior: number, animationDataSet: AnimationPlayerDataSet): void {
        const sourceId: number = ResUrl.getSourceID(model, action, dir);
        const imgUrl: string = ResUrl.url(`${sourceId}`, ResourceType.Model_PNG, `${model}`);
        const jsonUrl: string = ResUrl.url(`${sourceId}`, ResourceType.Model_JSON, `${model}`);

        
    }

    public update(): void {

    }
}

class ActionLoadInfo {
    private static pool: Pool<ActionLoadInfo> = new Pool<ActionLoadInfo>(ActionLoadInfo);
    public imgUrl: string;
    public jsonUrl: string;
    public state: number;
    public prior: number;
    public 
}