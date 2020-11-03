const enum E_DirectionType {
    DOWN,
    RIGHT_DOWN,
    RIGHT,
    RIGHT_UP,
    UP,
    LEFT_UP,
    LEFT,
    LEFT_DOWN
}

class DirectionUtil {

    public static getDIrectionByTowCoor(fx: number, fy: number, tx: number, ty: number): number {
        const hor: number = tx - fx;
        const ver: number = ty - fy;
        return this.getDir(hor, ver);
    }

    public static getDir(hor: number, ver: number): number {
        let dir: number = 0;
        if (hor > 0) {//右
            if (ver < 0)//上
                dir = E_DirectionType.RIGHT_UP;
            else if (ver > 0)
                dir = E_DirectionType.RIGHT_DOWN;
            else
                dir = E_DirectionType.RIGHT;
        } else if (hor < 0) {//左
            if (ver < 0)//上
                dir = E_DirectionType.LEFT_UP;
            else if (ver > 0)
                dir = E_DirectionType.LEFT_DOWN;
            else
                dir = E_DirectionType.LEFT;
        } else {
            if (ver < 0)
                dir = E_DirectionType.UP;
            else
                dir = E_DirectionType.DOWN;
        }
        return dir;
    }
}