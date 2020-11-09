class AnimalEntity extends Entity implements IUpdateable, IUpdateLogicable {
    protected _seat: boolean;
    protected isWalk: boolean = false;
    protected tween: Tween;

    public curFSM: I_EntityFSM;
    public action: E_ActionType;
    public dir: number = EntityDirectionType.DEFAULT;
    public astarStandOn: boolean;
    public isCoverByMonster: boolean;
    public animalEntityData: AnimalEntityData;
    public yeman: boolean = false;
    public moveInfo: EntityMoveInfo;
    public isMove: boolean = false;
    public pathArr: Array<Array<number>>;

    private _entityAI: ArpgAI;
    public set entityAI(ai: ArpgAI) {
        this._entityAI = ai;
    }
    public get entityAI(): ArpgAI {
        return this._entityAI;
    }

    public createComponents(entityData: EntityData): void {
        let self = this;
        super.createComponents(entityData);
        self.animalEntityData = entityData as AnimalEntityData;

        if (!self.tween) {
            self.tween = Tween.create();
            self.tween.init(self, self.onMoveComplete);
        }
        if(!self.moveInfo) {
            self.moveInfo = new EntityMoveInfo();
        }
        
        self.dir = self.animalEntityData.dir;
    }

    protected initDisplay(): void {
        let self = this;
        self.display = AnimationPlayer.create();
        self.display.completeHandler = new CallBack0(self.animationComplete, self);
        self.checkCoverd();
    }

    private animationComplete(): void {
        let self = this;
        self.display.checkShadowType();
    }

    public setPosition(gridX: number, gridY: number): void {
        let self = this;
        if (self._seat && self.animalEntityData.gridX && self.animalEntityData.gridY) {
            gd.map.removeUnWalk(self.animalEntityData.gridX, self.animalEntityData.gridY);
        }
        if (!self.animalEntityData.isDead) {
            gd.map.addUnWalk(gridX, gridY);
            self._seat = true;
        }
        super.setPosition(gridX, gridY);
    }

    protected initEquipments(): void {
        this.changeSkins();
    }

    protected changeSkins(): void {

    }

    protected getRealDir(dir: number) {
        return dir;
    }

    public setAction(action: E_ActionType, dir: number = -1, compolsury: boolean = false) {
        let self = this;
        self.action = action;
        if (dir !== -1) {
            self.dir = dir;
        }
        if (self.display) {
            self.display.pause = false;
            self.display.setAction(action, self.getRealDir(dir), compolsury);
        }
    }

    public update(gameTime: GameTime): void {
        let self = this;

        if (self.curFSM) {
            self.curFSM.execute(self, gameTime);
        }
        if (self.display) {
            self.display.render(gameTime);
        }
    }

    public updateLogic(gameTime: GameTime): void {
        let self = this;
        if (self.curFSM) {
            self.curFSM.executeLogic(self, gameTime);
        }
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

    public onEnterMove(): void {
        let self = this;
        self.isMove = true;
        if (self.tween) {
            self.tween.startMove(self.moveInfo.x, self.moveInfo.y, self.moveInfo.speed);
        }
        const dir: number = DirectionUtil.getDirectionByTwoPoints(self.animalEntityData.x, self.animalEntityData.y, self.moveInfo.x, self.moveInfo.y);
        if (self.isWalk) {
            self.setAction(E_ActionType.Walk, dir);
        } else {
            self.setAction(E_ActionType.Run, dir);
        }
    }

    public onEnterFree(): void {
        let self = this;
        self.isMove = false;
        self.setAction(E_ActionType.Idle, self.getRealDir(self.dir));
    }

    protected onMoveComplete(self: any, totalGameTime: number): void {
        self.isMove = false;
        if (self.entityAI) {
            self.entityAI.moveComplete(self, totalGameTime);
        }
    }

    public onExecuteMove(gameTime: GameTime): void {
        let self = this;
        if (self.tween && self.tween.enabled) {
            self.tween.update(gameTime);
            GameSceneManager.Instance.getLayer(self.layer).needSort();
        }
        //1 changeState => free ?
    }

    public resetPosition(): void {
        let self = this;
        super.resetPosition();
        if (self.tween) {
            self.stopTween();
        }
        if (self.curFSM && self.curFSM.getState() === E_FSMState.FSM_STATE_FREE) {
            self.changeFSMState(EntityMoveFSM.Instance);
        }
    }

    public stopTween(): void {
        this.tween && this.tween.stop();
    }

    public prepareToMove(gridX: number, gridY: number, speed: number, isFirstPlayer: boolean, step: number): void {
        let self = this;

        const moveInfo = self.moveInfo;
        moveInfo.gridX = gridX;
        moveInfo.gridY = gridY;
        moveInfo.x = Logic.getEntityPixelByGrid(gridX);
        moveInfo.y = Logic.getEntityPixelByGrid(gridY);
        if (self.animalEntityData.gridX !== gridX && self.animalEntityData.gridY !== gridY) {
            speed *= 1.2;
        } else if (self.animalEntityData.gridY !== gridY) {
            speed *= 0.66;
        }
        moveInfo.speed = speed;

        if (!isFirstPlayer) {
            self.setPosition(gridX, gridY);
        }
    }

    public addToView(): void {
        let self = this;
        super.addToView();
        if (self.display.shadow) {

        }
    }

    public die(): void {
        let self = this;
        self.setAction(E_ActionType.Die, E_DirectionType.DOWN);
        if (self._seat) {
            gd.map.removeUnWalk(self.animalEntityData.gridX, self.animalEntityData.gridY);
            self._seat = false;
        }
    }

    public relive(): void {
        let self = this;
        self.createComponents(self.animalEntityData);
    }

    public dispose(): void {
        let self = this;
        super.dispose();

        self.yeman = false;
        if (self.curFSM) {
            self.curFSM.exit(self);
            self.curFSM = null;
        }
        if (self.tween) {
            self.tween.dispose();
            self.tween = null;
        }
        if (self.entityAI) {
            self.entityAI = null;
        }
        if (self.moveInfo) {
            self.moveInfo = null;
        }
    }
}