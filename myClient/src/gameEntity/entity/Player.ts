class Player {
    private model: eui.Rect;

    public addToView(): void {
        this.model = new eui.Rect();
        this.model.fillColor = 0xffffff;
        this.model.width = 50;
        this.model.height = 50;
        this.model.anchorOffsetX = 25;
        this.model.anchorOffsetY = 25;
        this.model.x = this._x;
        this.model.y = this._y;
        GameSceneManager.Instance.getLayer(E_SceneLayerType.Role).addChild(this.model);
    }

    private _x: number = 2000;
    private _y: number = 2000;

    public set x(value: number) {
        if(value >= 0 && value <= gd.map.config.width) {
            this._x = value;
        }
        this.model.x = this._x;
    }

    public get x(): number {
        return this._x;
    }

    public set y(value: number) {
        if(value >= 0 && value <= gd.map.config.height) {
            this._y = value;
        }
        this.model.y = this._y;
    }

    public get y(): number {
        return this._y;
    }
}