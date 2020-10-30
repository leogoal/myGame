const enum E_SceneLayerType {
	BackGround,
	StaticItem,
	Shadow,
	Effect_Below,
	Role,
	Effect_Above,
	Info,
	TxtInfo,

    End
}

class SceneLayer extends egret.Sprite implements IUpdateable {
    public enabled: boolean = false;
    protected _needSort: boolean = false;
    private children: egret.DisplayObject[] = [];

    public needSort(): void {
        this._needSort = true;
    }

    public update(gameTime: GameTime): void {
        this.checkSort(gameTime);
    }

    public addChild(child: egret.DisplayObject): egret.DisplayObject {
        this.children.push(child);
        return super.addChild(child);
    }

    public addChildAt(child: egret.DisplayObject, index: number): egret.DisplayObject {
        this.children.push(child);
        return super.addChildAt(child, index);
    }

    public removeChild(child: egret.DisplayObject): egret.DisplayObject {
        const index: number = this.children.indexOf(child);
        if(index >= 0) {
            this.children.splice(index, 1);
        }
        return super.removeChild(child);
    }

    protected checkSort(gameTime: GameTime): void {
        if(this._needSort) {
            this.depthSort();
            this._needSort = false;
        }
    }

    private depthSort(): void {
        this.children.sort(this.compare);

        const children = this.children;
        const childrenNum: number = children.length;
        for(let i: number = 0; i < childrenNum; i++) {
            this.setChildIndex(children[i], i);
        }
    }

    private compare(a: egret.DisplayObject, b: egret.DisplayObject): number {
        if(a.y < b.y) {
            return -1;
        } else if(a.y > b.y) {
            return 1;
        } else {
            if(a.x < b.x) {
                return -1;
            } else if(a.x > b.x) {
                return 1;
            }
            return 0;
        }
    }
}

class InfoLayer extends SceneLayer {
    private passTime: number = 0;
    constructor() {
        super();
        this.enabled = true;
    }

    protected checkSort(gameTime: GameTime): void {
        this.passTime += gameTime.elapsedGameTime;

        if(this.passTime > 500) {
            this.passTime = 0;
            super.checkSort(gameTime);
        }
    }
}

class RoleLayer extends SceneLayer {
    private passTime: number = 0;

    constructor() {
        super();
        this.enabled = true;
    }

    protected checkSort(gameTime: GameTime): void {
        this.passTime += gameTime.elapsedGameTime;
        if(this.passTime > 100) {
            this.passTime = 0;
            super.checkSort(gameTime);
        }
    }
}