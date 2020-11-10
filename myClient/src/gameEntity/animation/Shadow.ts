class Shadow extends CustomMovie implements I_LimitedPoolItem {
    private static spool: LimitedPool<Shadow> = new LimitedPool<Shadow>(Shadow, 50);
    public static create(): Shadow {
        return this.spool.pop();
    }


    public static init(): void {
        
    }

    public disposePermanent(): void {

    }
    public returnToPool(): void {
        
    }
}