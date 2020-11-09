class Entity implements I_TweenAble {
    constructor(id: Long, entityType: E_EntityType) {
        if (id) {
            this.realUid = id;
            this.uid = id.toString();
        }
        this.entityType = entityType;
    }
    
    public realUid: Long;
    public uid: string;
    public entityType: E_EntityType;
    private entityData: EntityData;
    public display: AnimationPlayer;
    public strategyTick: number;
    public layer: E_SceneLayerType;
    
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

    private _busy: number = 0;
    public set busy(time: number) {

    }
    public get isBusy(): boolean {
        return false;
    }

    public get moveNext(): boolean {
        return false;
    }

    public get endNow(): boolean {
        return false;
    }

    private checkDisplayInview(): void {
        let self = this;
        if (self._inView && !self._hideDisplay) {
            !self.display && self.addToView();
        } else {
            self.display && self.removeFromView();
        }
    }

    protected checkCoverd(): void {
        if (this._coverd) {
            this.display && (this.display.alpha = 0.6);
        }
    }

    protected initDisplay(): void {

    }

    public createComponents(entityData: EntityData): void {
        let self = this;     
        self.entityData = entityData;
    }

    public addToView(): void {
        let self = this;
        if (!self.display) {
            self.initDisplay();
            self.display.x = self.x;
            self.display.y = self.y;
        }
        self.display.inView = true;

        const curSceneLayer: SceneLayer = GameSceneManager.Instance.getLayer(self.layer);
        curSceneLayer.addChild(self.display);
        curSceneLayer.needSort();
    }

    public removeFromView(): void {
        let self = this;
        self.display.removeSelf();
        self.display.dispose();
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
            if(self.display.shadow) {

            }
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
            if(self.display.shadow) {

            }
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
        if (self.entityData) {
            self.x = Logic.getEntityPixelByGrid(self.entityData.gridX);
            self.y = Logic.getEntityPixelByGrid(self.entityData.gridY);
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

    public dispose(): void {
        let self = this;
    
        self.uid = null;
        self.realUid = null;
        self._hideDisplay = false;

        if(self.entityData) {
            self.entityData = null;
        }
        if(self.display) {
            self.display.removeSelf();
            self.display.dispose();
            self.display = null;
        }
    }
}
