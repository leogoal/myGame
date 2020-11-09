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
