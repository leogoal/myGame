class Entity implements IUpdateable, IUpdateLogicable, I_TweenAble {
    constructor(id: Long, entityType: E_EntityType) {
        if(id) {
            this.realUid = id;
            this.uid = id.toString();
        }
        this.entityType = entityType;
    }

    public enabled: boolean = true;
    public realUid: Long;
    public uid: string;
    public entityType: E_EntityType;
    public entityData: EntityData;
    public display: AnimationPlayer;
    public curFSM: I_EntityFSM;
    public strategyTick: number;
    public layer: E_SceneLayerType;
    public movePosition: 
    protected tween: Tween;


    public update(gameTime: GameTime): void {

    }

    public updateLogic(gameTime: GameTime): void {

    }

    public set x (value: number) {

    }

    public set y(value: number) {

    }

    public get moveNext(): boolean {
        return false;
    } 

    public get endNow(): boolean {
        return false;
    }
}

const enum E_EntityType {
    PLAYER
}