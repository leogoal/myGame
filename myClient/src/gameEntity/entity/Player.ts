class Player extends AnimalEntity {
    private _playerData: PlayerData;
    public yeman: boolean = false;

    public get playerData(): PlayerData {
        return this._playerData;
    }

    private initEquipments(): void {
        let self = this;
    }


    public createComponents(entityData: EntityData): void {
        let self = this;
        super.createComponents(entityData);
        self._playerData = entityData as PlayerData;
        self.tween.bindMoveStepCB(self.onMoveStep);
    }

    private onMoveStep(entity: Player): void {
        let self = entity;
        if (self.yeman) {

        }
    }

    protected initDisplay(): void {
        super.initDisplay();
        let self = this;
        self.display.setPrority(E_GroupType.SELF === self.playerData.group ? 1 : 0);
        self.display.setSortMethod(true, SkinSorts.stand_dir_type_sort, SkinSorts.move_dir_type_sort);
        self.setAction(self.action, self.getRealDir(self.dir), true);
    }


    public setPosition(gridX: number, gridY: number): void {
        super.setPosition(gridX, gridY);
        let self = this;
        if (self === emIns.firstPlayer) {
            self.checkFront();
        }
    }

    public dispose(): void {
        let self = this;
        super.dispose();
        self.yeman = false;
        if (self.playerData) {
            self._playerData.dispose();
            self._playerData = null;
        }
    }
}