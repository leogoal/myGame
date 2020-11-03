class ARPGInstanceBase extends InstanceBase {
    
    public init(): void {
        super.init();
        let self = this;
        const root: egret.Sprite = GameSceneManager.Instance.root;
        root.touchEnabled = true;
        root.on(egret.TouchEvent.TOUCH_BEGIN, self.onTouchBegin, self);
        root.on(egret.TouchEvent.TOUCH_END, self.onTouchEnd, self);
    }


    private moveTimer: number = 0;
    private onTouchBegin(e: egret.Event): void {
        
    }

    private onTouchEnd(e: egret.Event): void {

    }

}
