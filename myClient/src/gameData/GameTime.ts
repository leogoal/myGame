class GameTime {
    public static readonly Instance: GameTime = new GameTime();
    public static readonly InstanceLogic: GameTime = new GameTime();

    public constructor() {
    }
    /** 上次Update被调用以后的时间 */
    public elapsedGameTime: number = 0;

    /** 自游戏开始时到现在的游戏总时间量 */
    public totalGameTime: number = 0;
}