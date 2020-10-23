class MtwGame {
    private static _instance: MtwGame;
    public static get Instance(): MtwGame {
        if (this._instance == null || this._instance == undefined) {
            this._instance = new MtwGame();
        }
        return this._instance;
    }

    public offsetView: egret.Sprite;
    public uiLayer: UILayer;
    public lastFPS: number;

    public init(): void {
        let self = this;
        const offsetView: egret.Sprite = new egret.Sprite();
        self.offsetView = offsetView;
        self.offsetView.name = "offsetView";
        mStage.addChild(offsetView);

        self.uiLayer = new UILayer();
        self.uiLayer.initContainer(offsetView);

        DataManager.Instance.init();
        ConfigManager.init();
        UIManager.init();
        NoticeManager.init();
        GameStateManager.Instance.init();
        GameStateManager.Instance.changeGameState(E_GameStateType.PreLoading);
        SecondTimerUtil.Instance.init();

        /**init1 */
        EntityManager.init();
        Shadow.init();
        CacheManager.Instance.init();

        self.addUpdateRender(QsMovieClipManager.Instance);
        self.addUpdateLogicRender(DisposeManager.Instance);

        mStage.on(egret.Event.RESIZE, self.onResizeHandler, self);
        mStage.on(egret.Event.ACTIVATE, self.onActivateHandler, self);
        mStage.on(egret.Event.DEACTIVATE, self.onDEActivateHandler, self);
    }


    public updateTime(gameTime: GameTime): void {
        const renders = this.renders;
        for (let render of renders) {
            render.update(gameTime);
        }
    }

    private updateLogicCount: number = 0;
    public updateLogicTime(gameTime: GameTime): void {
        let self = this;
        emIns.updateLogic(gameTime);

        self.updateLogicCount++;
        if (self.updateLogicCount > 3) {
            const logicRenders = self.logicRenders;
            for (let logicRender of logicRenders) {
                logicRender.updateLogic(gameTime);
            }
            self.updateLogicCount = 0;
        }
    }

    private renders: IUpdateable[] = [];
    public addUpdateRender(render: IUpdateable): void {
        if (this.renders.indexOf(render) === -1) {
            this.renders.push(render);
        }
    }

    public removeUpdateRender(render: IUpdateable): void {
        const index: number = this.renders.indexOf(render);
        if (index > -1) {
            this.renders.splice(index, 1);
        }
    }

    private logicRenders: IUpdateLogicable[] = [];
    public addUpdateLogicRender(logicRender: IUpdateLogicable): void {
        if (this.logicRenders.indexOf(logicRender) === -1) {
            this.logicRenders.push(logicRender);
        }
    }

    public removeUpdateLogicRender(logicRender: IUpdateLogicable): void {
        const index: number = this.logicRenders.indexOf(logicRender);
        if (index > -1) {
            this.logicRenders.splice(index, 1);
        }
    }

    private onActivateHandler(e: egret.Event): void {

    }

    private onDEActivateHandler(e: egret.Event): void {

    }

    private onResizeHandler(e: egret.Event): void {
        let self = this;

        GameSceneManager.Instance.resize();
        GameEventCenter.Instance.dispatcher(E_GameEvent.Resize, { w: mStage.stageWidth, h: self.getStageHeight() });
        self.offsetView.y = (mStage.stageHeight - self.getStageHeight()) >> 1;
        self.checkOffsetbg();
    }


    public getStageHeight(): number {
        let self = this;
        const gh = my_gameVars.gameHeight;
        const sh = mStage.stageHeight;
        if (gh > 0) {
            return sh > gh ? gh : sh;
        }
        return sh;
    }

    private upret: eui.Rect;
    private downret: eui.Rect;

    private checkOffsetbg(): void {
        let self = this;
        if (self.offsetView.y > 0) {
            if (!self.upret) {
                self.upret = new eui.Rect();
                mStage.addChild(self.upret);
            }
            if (!self.downret) {
                self.downret = new eui.Rect();
                mStage.addChild(self.downret);
            }
            self.downret.fillColor = 0;
            self.upret.fillColor = 0;
            self.downret.width = self.upret.width = mStage.stageWidth;
            self.downret.height = self.upret.height = self.offsetView.y;
            self.downret.y = mStage.stageHeight - self.offsetView.y;
        }
        else {
            if (self.upret) {
                self.upret.removeSelf();
                self.upret = null;
            }
            if (self.downret) {
                self.downret.removeSelf();
                self.downret = null;
            }
        }
    }
}

interface IUpdateable {
    enabled: boolean;
    update(gameTime: GameTime): void;
}

interface IUpdateLogicable {
    enabled: boolean;
    updateLogic(gameTime: GameTime): void;
}