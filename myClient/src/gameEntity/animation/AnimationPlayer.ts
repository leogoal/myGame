class AnimationPlayer extends egret.DisplayObjectContainer implements I_LimitedPoolItem, I_AnimationPlayer {
    private static pool: LimitedPool<AnimationPlayer> = new LimitedPool<AnimationPlayer>(AnimationPlayer, 100);
    public static create(): AnimationPlayer {
        const player: AnimationPlayer = this.pool.pop();
        player.disposed = false;
        return player;
    }

    private disposed: boolean = false;
    private _completeHandler: CallBack0;
    public set completeHandler(cb: CallBack0) {
        this._completeHandler = cb;
    }

    private _pause: boolean = false;
    public set pause(value: boolean) {
        this._pause = value;
    }

    public inView: boolean = false;
    public shadow: Shadow;


    public hitTest(mx: number, my: number, hitBox: boolean): boolean {
        return true;
    }

    public checkShadowType(): void {
        let self = this;

    }

    public setAction(action: number, dir: number = -1, compulsory: boolean = false): void {
        let self = this;

    }

    public render(gameTime: GameTime): void {
        let self = this;
        
    }

    public disposePermanent(): void {

    }
    public returnToPool(): void {

    }

    public loadCompete(): void {

    }

    public dispose(): void {
        let self = this;
        if (!self.disposed) {
            self.disposed = true;
            AnimationPlayer.pool.push(self);
        }
    }
}