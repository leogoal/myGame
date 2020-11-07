class AnimationPlayer extends egret.DisplayObjectContainer implements I_LimitedPoolItem, I_AnimationPlayer {
    public inView: boolean = false;


    public hitTest(mx: number, my: number, hitBox: boolean): boolean {
        return true;
    }

    public disposePermanent(): void {

    }
    public returnToPool(): void {
        
    }

    public loadCompete(): void {

    }

    public dispose():void {
        
    }
}