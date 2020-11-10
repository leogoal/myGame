//1 对象池试下?
class AnimationPlayerDataSet {
    private skinType: number;
    private player: I_AnimationPlayer;
    private cfg: {[key: number]: ModelInfoConfig};
    private actions: {};

    public model: number;

    constructor(skinType: number, player: I_AnimationPlayer, model: number) {
        let self = this;
        self.skinType = skinType;
        self.player = player;
        self.model = model;
        self.actions = {};
    }

    public addData(): void {

    }


    private getActionCfg(action: number): ModelInfoConfig {
       const actionCfg: ModelInfoConfig = this.cfg && this.cfg[action];
       return actionCfg ? actionCfg : null; 
    }

    public getDir(action: number, dir: number): number {
        let self = this;
        const actionCfg: ModelInfoConfig = self.getActionCfg(action);
        if(actionCfg) {
            if(actionCfg.totaldir === 1) {
                dir = EntityDirectionType.DEFAULT;
            } else if(actionCfg.totaldir === 5 && dir >= 5) {
                dir = EntityDirectionType.EIGHT_FIVE_DIRS[dir];
            } else if(actionCfg.totaldir === 2) {
                dir = EntityDirectionType.EIGHT_TWO_DIRS[dir];
            }
        }
        return dir;
    }

    public getData(action: number, dir: number): AnimationPlayerData {
        const data = this.actions && this.actions[action] && this.actions[action][dir];
        return data ? data : null;
    }

    public dispose(): void {

    }
}

class AnimationClip {

}

class AnimationPlayerData {
    public clip: AnimationClip;
}

class AnimationArgs {
    public clipAction: number;
    public clipDir: number;
    public clipTotalFrameCount: number;
    public clipFrameIndex: number;

    public clear(): void {
        let self = this;
        self.clipAction = 0;
        self.clipDir = 0;
        self.clipTotalFrameCount = 0;
        self.clipFrameIndex = 0;
    }
}