class Entity implements IUpdateable, IUpdateLogicable, I_TweenAble {
    constructor(id: Long, entityType: E_EntityType) {
        if (id) {
            this.realUid = id;
            this.uid = id.toString();
        }
        this.entityType = entityType;
    }
    protected tween: Tween;

    public enabled: boolean = true;
    public realUid: Long;
    public uid: string;
    public entityType: E_EntityType;
    public entityData: EntityData;
    public display: AnimationPlayer;
    public curFSM: I_EntityFSM;
    public strategyTick: number;
    public layer: E_SceneLayerType;
    public moveInfo: EntityMoveInfo;



    public yeman: boolean = false;
    public isMove: boolean = false;
    public pathArr: Array<Array<number>>;

    private _hideDisplay: boolean = false;
    public get isHideDisplay(): boolean {
        return this._hideDisplay;
    }
    public set hideDisplay(value: boolean) {
        if (this._hideDisplay !== value) {
            this._hideDisplay = value;
            this.checkDisplayInview();
        }
    }

    private _inView: boolean = false;
    public get isInView(): boolean {
        return this._inView;
    }
    public set inView(value: boolean) {
        this._inView = value;
    }

    private _coverd: boolean = false;
    public get isCoverd(): boolean {
        return this._coverd;
    }
    public set coverd(value: boolean) {
        this._coverd = value;
    }

    private _entityAI: ArpgAI;
    public set entityAI(ai: ArpgAI) {
        this._entityAI = ai;
    }
    public get entityAI(): ArpgAI {
        return this._entityAI;
    }

    private _busy: number = 0;
    public set busy(time: number) {

    }
    public get isBusy(): boolean {
        return false;
    }

    public update(gameTime: GameTime): void {
        let self = this;
        if (self.curFSM) {
            self.curFSM.execute(self, gameTime);
        }
    }

    public updateLogic(gameTime: GameTime): void {
        let self = this;
        if (self.curFSM) {
            self.curFSM.executeLogic(self, gameTime);
        }
    }

    public get moveNext(): boolean {
        return false;
    }

    public get endNow(): boolean {
        return false;
    }

    public createComponents(entityData: EntityData): void {
        let self = this;
        self.moveInfo = new EntityMoveInfo();
        self.entityData = entityData;

        self.tween = Tween.create();
        self.tween.init(self, self.onMoveComplete);

    }

    public stopTween(): void {
        this.tween && this.tween.stop();
    }

    public addToView(): void {
        let self = this;
        if(!self.display) {
            
        }
    }

    public removeFromView(): void {

    }

    public setPosition(gridX: number, gridY: number): void {
        let self = this;
        self.entityData.gridX = gridX;
        self.entityData.gridY = gridY;
        if (gd.map.hitTestCover(gridX, gridY)) {
            if (!self._coverd) {
                self._coverd = true;
                self.display && (self.display.alpha = 0.6);
            }
        } else {
            if (self.coverd) {
                self.coverd = false;
                self.display && (self.display.alpha = 1);
            }
        }
    }

    public setPixelPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    public get x(): number {
        return this.entityData.x;
    }
    public set x(value: number) {
        let self = this;
        self.entityData.x = value;
        if (self.display) {
            self.display.x = value;
        }
    }

    public get y(): number {
        return this.entityData.y;
    }

    public set y(value: number) {
        let self = this;
        self.entityData.y = value;
        if (self.display) {
            self.display.y = value;
        }
    }

    /**
     * 要隐藏直接隐藏
     * 要显示每次只显示一个
     */
    public updateRect(rect: egret.Rectangle, canAddView: boolean): boolean {
        let self = this;
        const nowInView: boolean = rect.contains(self.x, self.y);
        if (nowInView !== self._inView) {
            if (!canAddView && nowInView) {
                return canAddView;
            }
            self._inView = nowInView;
            self.checkDisplayInview();
            return (canAddView && !nowInView);
        }

        return canAddView;
    }

    public resetPosition(): void {
        let self = this;
        if (self.tween && self.entityData) {
            self.stopTween();
            self.x = Logic.getEntityPixelByGrid(self.entityData.gridX);
            self.y = Logic.getEntityPixelByGrid(self.entityData.gridY);
            if (self.curFSM && self.curFSM.getState() === E_FSMState.FSM_STATE_FREE) {
                self.changeFSMState(EntityMoveFSM.Instance);
            }

        }
    }

    public hitTest(mx: number, my: number, hitBox: boolean = false): boolean {
        let self = this;
        if (self._inView || !self.display) {
            return false;
        }
        if (mx > -GameDefine.MAP_GRID_WIDTH_DIVIDE2 && mx < GameDefine.MAP_GRID_WIDTH_DIVIDE2 &&
            my > -GameDefine.MAP_GRID_HEIGHT_DIVIDE2 && mx < GameDefine.MAP_GRID_HEIGHT_DIVIDE2
        ) {
            return true;
        }
        const hited: boolean = self.display.hitTest(mx, my, hitBox)
        return hited;
    }

    public changeFSMState(newFSM: I_EntityFSM, stateLastTime: number = 0): void {
        let self = this;
        if (self.curFSM) {
            if (!self.curFSM.canChangeState()) {
                return;
            }
            self.curFSM.exit(self);
        }

        self.curFSM = newFSM;
        self.curFSM.enter(self, stateLastTime);
    }

    protected checkCoverd(): void {
        if (this._coverd) {
            this.display && (this.display.alpha = 0.6);
        }
    }

    protected checkShow(): void {

    }

    protected initDisplay(): void {

    }

    public onEnterFree(): void {

    }

    public onEnterMove(): void {

    }

    public setBodyFilter(): void {

    }


    private checkDisplayInview(): void {
        let self = this;
        if (self._inView && !self._hideDisplay) {
            !self.display && self.addToView();
        } else {
            self.display && self.removeFromView();
        }
    }

    private onMoveComplete(gameTime: GameTime): void {

    }
}

const enum E_EntityType {
    PLAYER
}