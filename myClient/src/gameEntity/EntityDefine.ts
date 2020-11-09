class EntityDataCreator {
    public static playerDataPool: LimitedPool<PlayerData> = new LimitedPool<PlayerData>(PlayerData, 60);
}

class EntityData {
    public x: number;
    public y: number;
    public gridX: number;
    public gridY: number;
    public name: string;

    //1
    public group: E_GroupType;
}

class AnimalEntityData extends EntityData {
    public dir: number;
    public isDead: boolean;
}

class PlayerData extends AnimalEntityData implements I_LimitedPoolItem {
    disposePermanent(): void {

    }

    returnToPool(): void {

    }

    public dispose(): void {
        let self = this;
        EntityDataCreator.playerDataPool.push(self);
    }
}

class EntityMoveInfo {
    public speed: number;
    public x: number;
    public y: number;
    public gridX: number;
    public gridY: number;
}

class EntityDirectionType {
    public static readonly DEFAULT: number = 0;
    public static readonly DOWN: number = 0;
    public static readonly RIGHT_DOWN: number = 1;
    public static readonly RIGHT: number = 2;
    public static readonly RIGHT_UP: number = 3;
    public static readonly UP: number = 4;
    public static readonly LEFT_UP: number = 5;
    public static readonly LEFT: number = 6;
    public static readonly LEFT_DOWN: number = 7;
}

class SkinSorts {
    public static readonly stand_dir_type_sort: Array<Array<E_AnimationType>> = [
        [E_AnimationType.Wing, E_AnimationType.Body, E_AnimationType.Hat, E_AnimationType.Weapon, E_AnimationType.FWeapon, E_AnimationType.WEAPON_EFFECT],//0
        [E_AnimationType.Wing, E_AnimationType.Body, E_AnimationType.Hat, E_AnimationType.Weapon, E_AnimationType.FWeapon, E_AnimationType.WEAPON_EFFECT],//1
        [E_AnimationType.Wing, E_AnimationType.Body, E_AnimationType.Hat, E_AnimationType.Weapon, E_AnimationType.FWeapon, E_AnimationType.WEAPON_EFFECT],//2
        [E_AnimationType.Body, E_AnimationType.Hat, E_AnimationType.Weapon, E_AnimationType.Wing, E_AnimationType.FWeapon, E_AnimationType.WEAPON_EFFECT],//3
        [E_AnimationType.FWeapon, E_AnimationType.Body, E_AnimationType.Hat, E_AnimationType.Weapon, E_AnimationType.Wing, E_AnimationType.WEAPON_EFFECT],//4
        [E_AnimationType.FWeapon, E_AnimationType.Body, E_AnimationType.Hat, E_AnimationType.Weapon, E_AnimationType.Wing, E_AnimationType.WEAPON_EFFECT],//3
        [E_AnimationType.FWeapon, E_AnimationType.Wing, E_AnimationType.Body, E_AnimationType.Hat, E_AnimationType.Weapon, E_AnimationType.WEAPON_EFFECT],//2
        [E_AnimationType.Wing, E_AnimationType.FWeapon, E_AnimationType.Body, E_AnimationType.Hat, E_AnimationType.Weapon, E_AnimationType.WEAPON_EFFECT],//1
    ];

    public static readonly move_dir_type_sort: Array<Array<E_AnimationType>> = [
        [E_AnimationType.Wing, E_AnimationType.Body, E_AnimationType.Hat, E_AnimationType.Weapon, E_AnimationType.FWeapon, E_AnimationType.WEAPON_EFFECT],//0
        [E_AnimationType.Wing, E_AnimationType.Body, E_AnimationType.Hat, E_AnimationType.Weapon, E_AnimationType.FWeapon, E_AnimationType.WEAPON_EFFECT],//1
        [E_AnimationType.Body, E_AnimationType.Hat, E_AnimationType.Wing, E_AnimationType.Weapon, E_AnimationType.FWeapon, E_AnimationType.WEAPON_EFFECT],//2
        [E_AnimationType.Body, E_AnimationType.Hat, E_AnimationType.Weapon, E_AnimationType.Wing, E_AnimationType.FWeapon, E_AnimationType.WEAPON_EFFECT],//3
        [E_AnimationType.FWeapon, E_AnimationType.Weapon, E_AnimationType.Body, E_AnimationType.Hat, E_AnimationType.Wing, E_AnimationType.WEAPON_EFFECT],//4
        [E_AnimationType.FWeapon, E_AnimationType.Body, E_AnimationType.Hat, E_AnimationType.Weapon, E_AnimationType.Wing, E_AnimationType.WEAPON_EFFECT],//3
        [E_AnimationType.FWeapon, E_AnimationType.Body, E_AnimationType.Hat, E_AnimationType.Wing, E_AnimationType.Weapon, E_AnimationType.WEAPON_EFFECT],//2
        [E_AnimationType.Wing, E_AnimationType.FWeapon, E_AnimationType.Body, E_AnimationType.Hat, E_AnimationType.Weapon, E_AnimationType.WEAPON_EFFECT],//1
    ];
}

const enum E_GroupType {
    SELF = 1,
    GUAJI,
    FIGHT,
}

const enum E_FSMState {
    FSM_STATE_FREE,
    FSM_STATE_MOVE
}

const enum E_EntityType {
    PLAYER
}

const enum E_ActionType {
    Idle = 1,
    Walk,
    Run,

    Die = 10
}

const enum E_AnimationType {
    Monster,
    Body,
    Weapon,
    FWeapon, //盾
    Hat, //斗笠
    Wing,
    Effect,
    WEAPON_EFFECT,
}
