class Player {
    public static MAX_X: number;
    public static MIN_X: number;
    public static MAX_Y: number;
    public static MIN_Y: number;

    private model: egret.Bitmap;

    public addToView(): void {
        this.model = new egret.Bitmap;
        this.model.texture = RES.getRes("egret_icon_png");
        this.model.scaleX = this.model.scaleY = 0.5;
        this.model.x = this._x;
        this.model.y = this._y;
        GameSceneManager.Instance.getLayer(E_SceneLayerType.Role).addChild(this.model);
    }

    private _x: number = 2000;
    private _y: number = 2000;

    public set x(value: number) {
        if(value >= Player.MIN_X && value <= Player.MAX_X) {
            this._x = value;
        }
        this.model.x = this._x;
    }

    public get x(): number {
        return this._x;
    }

    public set y(value: number) {
        if(value >= Player.MIN_Y && value <= Player.MAX_Y) {
            this._y = value;
        }
        this.model.y = this._y;
    }

    public get y(): number {
        return this._y;
    }
}