class Tween implements IUpdateable, I_LimitedPoolItem {
    public enabled: boolean = true;

    public static pool: LimitedPool<Tween> = new LimitedPool<Tween>(Tween, 100);
    public static create(): Tween {
        return this.pool.pop();
    }

    private tweenAble: I_TweenAble;
    private speed: number;
    private moveDistance: number;           //已移动的距离
    private betweenDistance: number;

    private moveIncrement: number[];
    private moveComplete: Function;

    public init(tweenAble: I_TweenAble = null, moveComplete: Function = null, speed: number = 5): void {
        let self = this;
        self.tweenAble = tweenAble;
        self.moveComplete = moveComplete;
        self.speed = speed;

        if (!self.moveIncrement) {
            self.moveIncrement = [];
        }
    }

    public update(gameTime: GameTime): void {

    }

    private resetTween(): void {
       let self = this;
       self.enabled = false;
       self.moveDistance = 0;
       self.betweenDistance = 0;
       self.moveIncrement = [0, 0];
    }

    public stop(): void {
        this.resetTween();
    }

    public returnToPool(): void {

    }

    public disposePermanent(): void {

    }
}