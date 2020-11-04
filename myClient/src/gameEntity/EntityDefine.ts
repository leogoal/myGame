class EntityData {
    public x: number;
    public y: number;
    public gridX: number;
    public girdY: number;
    public name: string;
    
    //1
    public group: E_GroupType;
}

class EntityMoveInfo {
    public speed: number;
    public x: number;
    public y: number;
    public 
}

const enum E_GroupType {
    SELF = 1,
    GUAJI,
    FIGHT,
}

const enum E_FSMState {
    FSM_STATE_FREE
}
