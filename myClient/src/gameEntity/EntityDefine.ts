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

const enum E_SkinType {
    Monster,
    Body,
    Weapon,
    FWeapon, //盾
    Hat, //斗笠
    Wing,
    Effect,
    WEAPON_EFFECT,
}

/**************************************************************************************************************************************** */
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

class EntityDataCreator {
    public static playerDataPool: LimitedPool<PlayerData> = new LimitedPool<PlayerData>(PlayerData, 60);
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

    public static readonly EIGHT_FIVE_DIRS: number[] = [0, 1, 2, 3, 4, 3, 2, 1];
    public static readonly EIGHT_TWO_DIRS: number[] = [1, 1, 1, 3, 3, 3, 1, 1];
 }

class SkinSorts {
    public static readonly stand_dir_type_sort: Array<Array<E_SkinType>> = [
        [E_SkinType.Wing, E_SkinType.Body, E_SkinType.Hat, E_SkinType.Weapon, E_SkinType.FWeapon, E_SkinType.WEAPON_EFFECT],//0
        [E_SkinType.Wing, E_SkinType.Body, E_SkinType.Hat, E_SkinType.Weapon, E_SkinType.FWeapon, E_SkinType.WEAPON_EFFECT],//1
        [E_SkinType.Wing, E_SkinType.Body, E_SkinType.Hat, E_SkinType.Weapon, E_SkinType.FWeapon, E_SkinType.WEAPON_EFFECT],//2
        [E_SkinType.Body, E_SkinType.Hat, E_SkinType.Weapon, E_SkinType.Wing, E_SkinType.FWeapon, E_SkinType.WEAPON_EFFECT],//3
        [E_SkinType.FWeapon, E_SkinType.Body, E_SkinType.Hat, E_SkinType.Weapon, E_SkinType.Wing, E_SkinType.WEAPON_EFFECT],//4
        [E_SkinType.FWeapon, E_SkinType.Body, E_SkinType.Hat, E_SkinType.Weapon, E_SkinType.Wing, E_SkinType.WEAPON_EFFECT],//3
        [E_SkinType.FWeapon, E_SkinType.Wing, E_SkinType.Body, E_SkinType.Hat, E_SkinType.Weapon, E_SkinType.WEAPON_EFFECT],//2
        [E_SkinType.Wing, E_SkinType.FWeapon, E_SkinType.Body, E_SkinType.Hat, E_SkinType.Weapon, E_SkinType.WEAPON_EFFECT],//1
    ];

    public static readonly move_dir_type_sort: Array<Array<E_SkinType>> = [
        [E_SkinType.Wing, E_SkinType.Body, E_SkinType.Hat, E_SkinType.Weapon, E_SkinType.FWeapon, E_SkinType.WEAPON_EFFECT],//0
        [E_SkinType.Wing, E_SkinType.Body, E_SkinType.Hat, E_SkinType.Weapon, E_SkinType.FWeapon, E_SkinType.WEAPON_EFFECT],//1
        [E_SkinType.Body, E_SkinType.Hat, E_SkinType.Wing, E_SkinType.Weapon, E_SkinType.FWeapon, E_SkinType.WEAPON_EFFECT],//2
        [E_SkinType.Body, E_SkinType.Hat, E_SkinType.Weapon, E_SkinType.Wing, E_SkinType.FWeapon, E_SkinType.WEAPON_EFFECT],//3
        [E_SkinType.FWeapon, E_SkinType.Weapon, E_SkinType.Body, E_SkinType.Hat, E_SkinType.Wing, E_SkinType.WEAPON_EFFECT],//4
        [E_SkinType.FWeapon, E_SkinType.Body, E_SkinType.Hat, E_SkinType.Weapon, E_SkinType.Wing, E_SkinType.WEAPON_EFFECT],//3
        [E_SkinType.FWeapon, E_SkinType.Body, E_SkinType.Hat, E_SkinType.Wing, E_SkinType.Weapon, E_SkinType.WEAPON_EFFECT],//2
        [E_SkinType.Wing, E_SkinType.FWeapon, E_SkinType.Body, E_SkinType.Hat, E_SkinType.Weapon, E_SkinType.WEAPON_EFFECT],//1
    ];
}

