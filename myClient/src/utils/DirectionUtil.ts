class DirectionUtil {

    public static getDirectionByTwoPoints(fx: number, fy: number, tx: number, ty: number): number {
        const hor: number = tx - fx;
        const ver: number = ty - fy;
        return this.getDir(hor, ver);
    }

    public static getDir(hor: number, ver: number): number {
        let dir: number = 0;
        if (hor > 0) {//右
            if (ver < 0)//上
                dir = EntityDirectionType.RIGHT_UP;
            else if (ver > 0)
                dir = EntityDirectionType.RIGHT_DOWN;
            else
                dir = EntityDirectionType.RIGHT;
        } else if (hor < 0) {//左
            if (ver < 0)//上
                dir = EntityDirectionType.LEFT_UP;
            else if (ver > 0)
                dir = EntityDirectionType.LEFT_DOWN;
            else
                dir = EntityDirectionType.LEFT;
        } else {
            if (ver < 0)
                dir = EntityDirectionType.UP;
            else
                dir = EntityDirectionType.DOWN;
        }
        return dir;
    }
}