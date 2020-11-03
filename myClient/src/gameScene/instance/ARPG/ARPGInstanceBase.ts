class ARPGInstanceBase extends InstanceBase {
    
    public init(): void {
        super.init();
        let self = this;
        const root: egret.Sprite = GameSceneManager.Instance.root;
        root.touchEnabled = true;
        root.on(egret.TouchEvent.TOUCH_BEGIN, self.onTouchBegin, self);
        root.on(egret.TouchEvent.TOUCH_END, self.onTouchEnd, self);
    }


    private clickMoveTimer: number = 0;
    private onTouchBegin(e: egret.TouchEvent): void {
        let self = this;
        cursorPoint.x = e.stageX;
        cursorPoint.y = e.stageY;

        if(self.clickMoveTimer === 0) {
            self.clickMoveTimer = egret.setInterval(self.checkClickMove, self, 200);
        }
    }

    private checkClickMove(): void {
        let self = this;
        console.log("checkClickMove");
        const mx: number = cursorPoint.x - GameSceneManager.Instance.screenX;
        const my: number = cursorPoint.y - GameSceneManager.Instance.screenY;

        const firstPlay: Player = emIns.firstPlayer;
        const dir: number = DirectionUtil.getDIrectionByTowCoor(firstPlay.x, firstPlay.y, mx, my);
        const changeX: number = 50;
        const changeY: number = 50;
        
        switch (dir) {
            case E_DirectionType.DOWN:
                firstPlay.y += changeY
                break;
            case E_DirectionType.RIGHT_DOWN:
                firstPlay.x += changeX;
                firstPlay.y += changeY;
                break;
            case E_DirectionType.RIGHT:
                firstPlay.x += changeX;
                break;
            case E_DirectionType.RIGHT_UP:
                firstPlay.x += changeX,
                firstPlay.y -= changeY;
                break;
            case E_DirectionType.UP:
                firstPlay.y -= changeY;
                break;
            case E_DirectionType.LEFT_UP:
                firstPlay.x -= changeX;
                firstPlay.y -= changeY;
                break;
            case E_DirectionType.LEFT:
                firstPlay.x -= changeX;
                break;
            case E_DirectionType.LEFT_DOWN:
                firstPlay.x -= changeX;
                firstPlay.y += changeY;
                break;
        }
    }

    private onTouchEnd(e: egret.TouchEvent): void {
        let self = this;
        if(self.clickMoveTimer > 0) {
            egret.clearInterval(self.clickMoveTimer);
            self.clickMoveTimer = 0;
        }
    }

}
