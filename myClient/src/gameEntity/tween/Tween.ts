class Tween implements IUpdateable, I_LimitedPoolItem {
    public static pool: LimitedPool<Tween> = new LimitedPool<Tween>(Tween, 100);
    public static create(): Tween {
        return this.pool.pop();
    }

    public enabled: boolean = true;
    private speed: number;
    private moveDistance: number;           //已移动的距离
    private betweenDistance: number;

    private tweenAble: I_TweenAble;
    private moveIncrement: number[];
    private movePoint: number[];
    private startPoint: number[];
    private endPoint: number[];

    private moveStep: Function;
    private moveComplete: Function;

    public init(tweenAble: I_TweenAble = null, moveComplete: Function = null): void {
        let self = this;
        self.tweenAble = tweenAble;
        self.moveComplete = moveComplete;
    }

    public bindMoveStepCB(moveStep: Function): void {
        this.moveStep = moveStep;
    }

    public startMove(toX: number, toY: number, speed: number): void {
        let self = this;
        self.resetTween();
        self.enabled = true;
        self.speed = speed;
        self.startPoint = [self.tweenAble.x, self.tweenAble.y];
        self.endPoint = [toX, toY];
        self.betweenDistance = VectorExtension.distanceOfTwoPoint(self.startPoint, self.endPoint);
        VectorExtension.moveIncrementByPoint(self.moveIncrement, self.startPoint, self.endPoint, self.speed);

    }

    public update(gameTime: GameTime): void {
        let self = this;
        const frame: number = gameTime.elapsedGameTime / 1000 * 60;
        self.moveDistance += (self.speed * frame);
        self.movePoint[0] += self.moveIncrement[0] * frame;
        self.movePoint[1] += self.moveIncrement[1] * frame;

        if (self.moveDistance >= self.betweenDistance) {
            //移动完成
            self.enabled = false;
            self.movePoint[0] = self.endPoint[0];
            self.movePoint[1] = self.endPoint[1];

            self.tweenAble.x = Math.round(self.movePoint[0]);
            self.tweenAble.y = Math.round(self.movePoint[1]);
            self.resetTween();

            if (self.moveComplete) {
                self.moveComplete(self.tweenAble, gameTime.totalGameTime);
            }
        } else {
            self.tweenAble.x = Math.round(self.movePoint[0]);
            self.tweenAble.y = Math.round(self.movePoint[1]);

            if(self.moveStep) {
                self.moveStep(self.tweenAble);
            }
        }
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

    public dispose(): void {
        let self = this;
        self.moveComplete = null;
        self.moveStep = null;
        self.tweenAble = null;

        self.moveIncrement = null;
        self.movePoint = null;
        self.startPoint = null;
        self.endPoint = null;
    }

    public returnToPool(): void {

    }

    public disposePermanent(): void {

    }
}