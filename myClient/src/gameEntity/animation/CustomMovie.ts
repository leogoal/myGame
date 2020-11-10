class CustomMovie extends egret.DisplayObject implements I_LimitedPoolItem {
    private static pool: LimitedPool<CustomMovie> = new LimitedPool<CustomMovie>(CustomMovie, 80);
    public static create(): CustomMovie {
        return this.pool.pop();
    }

    public returnToPool(): void {

    }

    public disposePermanent(): void {

    }

    public dispose(): void {
        
    }
}