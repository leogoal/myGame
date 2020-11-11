//1 对象池试下?
class AnimationPlayerDataSet {
    private skinType: E_SkinType;
    private player: I_AnimationPlayer;
    private modelsInfoCfg: { [action: number]: ModelInfoConfig };
    private actions: {};
    private loadingQueue: number[];
    public model: number;
    public turn: number = 1;

    constructor(skinType: E_SkinType, player: I_AnimationPlayer, model: number) {
        let self = this;
        self.skinType = skinType;
        self.player = player;
        self.model = model;
        self.actions = {};
        self.loadingQueue = [];
        self.modelsInfoCfg = SkinConfig.getModelsConfig(skinType, model);
    }

    private getActionCfg(action: number): ModelInfoConfig {
        const actionCfg: ModelInfoConfig = this.modelsInfoCfg && this.modelsInfoCfg[action];
        return actionCfg ? actionCfg : null;
    }

    public addData(action: number, realDir: number, data: AnimationPlayerData): void {
        let self = this;
        if (!self.actions[action]) {
            self.actions[action] = {};
        }
        if (self.actions[action][realDir]) {
            console.error("self.actions[action][realDir] has already" + action + "-" + realDir);
            if (DEBUG) {
                throw new Error("self.actions[action][realDir] has already" + action + "-" + realDir);
            }
            return;
        }

        self.actions[action][realDir] = data;
        CacheManager.Instance.addSkinReference(data.sourceId, data.model);
    }

    public getRealDir(action: number, dir: number): number {
        let self = this;
        const actionCfg: ModelInfoConfig = self.getActionCfg(action);
        if (actionCfg) {
            if (actionCfg.totaldir === 1) {
                dir = EntityDirectionType.DEFAULT;
            } else if (actionCfg.totaldir === 5 && dir >= 5) {
                dir = EntityDirectionType.EIGHT_FIVE_DIRS[dir];
            } else if (actionCfg.totaldir === 2) {
                dir = EntityDirectionType.EIGHT_TWO_DIRS[dir];
            }
        }
        return dir;
    }

    public getData(action: number, realDir: number): AnimationPlayerData {
        const data = this.actions && this.actions[action] && this.actions[action][realDir];
        return data ? data : null;
    }

    public getDataAndTurn(action: number, dir: number): AnimationPlayerData {
        let self = this;
        const allDirData = self.actions && self.actions[action];
        if (allDirData) {
            if (allDirData[dir]) {
                self.turn = 1;
            } else {
                const actionCfg: ModelInfoConfig = self.getActionCfg(action);
                if (actionCfg) {
                    if (actionCfg.totaldir === 1) {
                        self.turn = 1;
                        dir = EntityDirectionType.DEFAULT;
                    } else if (actionCfg.totaldir === 5 && dir >= 5) {
                        self.turn = -1;
                        dir = EntityDirectionType.EIGHT_FIVE_DIRS[dir];
                    } else if (actionCfg.totaldir === 2) {     
                        self.turn = dir >= 5 ? -1 : 1;
                        dir = EntityDirectionType.EIGHT_TWO_DIRS[dir];
                    }
                }
            }
            return allDirData[dir];
        }
        return null;
    }

    public loadSkin(skinType: E_SkinType, action: number, realDir: number, model: number, prior: number): void {
        let self = this;
        const sourceId: number = ResUrl.getSourceID(model, action, realDir);
        if(self.loadingQueue.indexOf(sourceId) !== -1) {
            return;
        }
        self.loadingQueue.push(sourceId);

    }


    public loadComplete(): void {
        let self = this;
    }

    public dispose(): void {
        let self = this;

    }
}

class AnimationPlayerData {
    public clip: AnimationClip;
    public action: number;
    public realDir: number;
    public model: number;
    public sourceId: number;
    public cacheSize: number = 0;
    public url: string;
    public jsonUrl: string;
    private spriteSheet: egret.SpriteSheet;

    constructor(spriteSheet: egret.SpriteSheet, json: any, action: number, realDir: number, model: number, url: string, jsonUrl: string) {
        let self = this;
        const modelInfo: ModelInfoConfig = SkinConfig.getModelsConfig(action, model)[action];
        if (modelInfo) {
            self.action = action;
            self.realDir = realDir;
            self.model = model;
            self.url = url;
            self.jsonUrl = jsonUrl;
            self.spriteSheet = spriteSheet;

            const $texture: egret.Texture = spriteSheet.$texture;
            if ($texture) {
                self.cacheSize = $texture.$bitmapWidth * $texture.$bitmapHeight * 4;
                CacheManager.Instance.modelSkinSize += self.cacheSize;
            }

            const clip: AnimationClip = new AnimationClip(json.count);
            clip.interval = modelInfo.intval;
            const framesData: any[] = json.frames;
            framesData.forEach((frameData, i) => {
                clip.frames.push(self.createFrame(frameData.offX, frameData.offY, modelInfo.standx, modelInfo.standy, spriteSheet.getTexture(`i`)))
            })
            self.clip = clip;
        } else {
            console.error("modelInfoCfg is null: " + action + "-" + model);
            if (DEBUG) {
                throw new Error("modelInfoCfg is null: " + action + "-" + model);
            }
            return;
        }
    }

    private createFrame(offX: number, offY: number, standX: number, standY: number, texture: egret.Texture): AnimationFrame {
        const frame: AnimationFrame = new AnimationFrame();
        frame.ox = offX;
        frame.oy = offY;
        frame.sx = standX;
        frame.sy = standY;
        frame.data = texture;
        return frame;
    }

    public dispose(): void {
        let self = this;
        if (self.clip) {
            self.clip.dispose();
            self.clip = null;
        }
        if (self.spriteSheet) {
            if (self.spriteSheet.$texture) {
                CacheManager.Instance.modelSkinSize -= self.cacheSize;
            }
            self.spriteSheet.dispose();
            self.spriteSheet = null;
        }
        if (self.url) {
            RES.destroyRes(self.url);
            self.url = null;
        }
        if (self.jsonUrl) {
            RES.destroyRes(self.jsonUrl);
            self.jsonUrl = null;
        }
    }
}

class AnimationClip {
    public interval: number;
    public frames: AnimationFrame[];
    public totalCount: number;

    constructor(len: number) {
        this.totalCount = len;
        this.frames = [];
    }

    public dispose(): void {
        let self = this;
        if (self.frames) {
            let frame: AnimationFrame;
            while (self.frames.length > 0) {
                frame = self.frames.shift();
                frame.dispose();
            }
            self.frames = null;
        }
    }
}

class AnimationFrame {
    public ox: number;
    public oy: number;
    public sx: number;
    public sy: number;
    public data: egret.Texture;

    public dispose(): void {
        if (this.data) {
            this.data.dispose();
        }
        this.data = null;
    }
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