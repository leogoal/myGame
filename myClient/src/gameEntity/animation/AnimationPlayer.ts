class AnimationPlayer extends egret.DisplayObjectContainer implements I_LimitedPoolItem, I_AnimationPlayer {
    private static pool: LimitedPool<AnimationPlayer> = new LimitedPool<AnimationPlayer>(AnimationPlayer, 100);
    public static create(): AnimationPlayer {
        const player: AnimationPlayer = this.pool.pop();
        player.disposed = false;
        return player;
    }

    public constructor(playMaxCount: number = -1) {
        super();
        let self = this;
        self.playMaxCount = playMaxCount;
        self.animations = {};
        self.animationsData = {};
        self.dataList = {};
        self.animationArgs = new AnimationArgs();
        self.timeControl = new AnimationTimeControl();
    }

    private disposed: boolean = false;
    private _prority: number = 0;
    private sortAble: boolean = false;
    private playMaxCount: number;
    private needSort: boolean = false;
    private playCount: number;
    private lastClipIndex: number = 0;

    private timeControl: AnimationTimeControl;
    private standSort: Array<Array<E_SkinType>>;
    private moveSort: Array<Array<E_SkinType>>;
    private animationArgs: AnimationArgs;
    private curActionType: E_ActionType;
    private curDir: number;
    private dataList: { [skinType: number]: AnimationPlayerDataSet };
    private animations: { [skinType: number]: CustomMovie };
    private animationsData: { [skinType: number]: AnimationPlayerData };

    public inView: boolean = false;
    public shadow: Shadow;

    private _completeHandler: CallBack0;
    public set completeHandler(cb: CallBack0) {
        this._completeHandler = cb;
    }

    private _pause: boolean = false;
    public set pause(value: boolean) {
        this._pause = value;
    }

    public setSortMethod(sortAble: boolean, standSort?: Array<Array<E_SkinType>>, moveSort?: Array<Array<E_SkinType>>): void {
        let self = this;
        self.sortAble = sortAble;
        self.standSort = standSort;
        self.moveSort = moveSort;
    }

    public setPrority(value: number): void {
        this._prority = value;
    }


    public hitTest(mx: number, my: number, hitBox: boolean): boolean {
        return true;
    }

    public checkShadowType(): void {
        let self = this;

    }

    public addType(skinType: E_SkinType, model: number, useCache: boolean = false): void {
        let self = this;
        const dataSet: AnimationPlayerDataSet = new AnimationPlayerDataSet(skinType, self, model);
        self.dataList[skinType] = dataSet;
        self.addSkinClip(skinType);
        useCache && self.useSkinCache(dataSet);
    }

    public removeType(skinType: E_SkinType): void {
        let self = this;
        self.removeSkinClip(skinType);
        const dataSet: AnimationPlayerDataSet = self.dataList[skinType];
        dataSet && dataSet.dispose();
        delete self.dataList[skinType];
    }

    private addSkinClip(skinType: E_SkinType): void {
        let self = this;
        const animations: { [key: number]: CustomMovie } = self.animations;
        if (!(skinType in animations)) {
            const customMovie: CustomMovie = CustomMovie.create();
            self.addChild(customMovie);
            animations[skinType] = customMovie;
            self.needSort = true;
            if (E_SkinType.Body === skinType || E_SkinType.Monster === skinType) {
                self.shadow = Shadow.create();
                if (1 === self._prority) {

                } else {

                }
            }
        }
    }

    private removeSkinClip(skinType: E_SkinType): void {
        let self = this;
        const curSkinCustomMovie: CustomMovie = self.animations[skinType];
        curSkinCustomMovie && curSkinCustomMovie.dispose();
        delete self.animations[skinType];
        delete self.animationsData[skinType];
        if (E_SkinType.Monster === skinType || E_SkinType.Body === skinType) {
            if (self.shadow) {
                self.shadow.dispose();
                self.shadow = null;
            }
        }
    }

    private useSkinCache(dataSet: AnimationPlayerDataSet): void {
        let self = this;
        const skinCache: CacheCollection = CacheManager.Instance.skinCache;
        if (skinCache) {
            const keys = skinCache.getGroupKeys(dataSet.model);
            let data: AnimationPlayerData;
            for (let key of keys) {
                data = CacheManager.Instance.skinCache.getItemData(key);
                data && dataSet.addData(data.action, data.realDir, data);
            }
        }
    }

    public setAction(action: number, dir: number = -1, compulsory: boolean = false): void {
        let self = this;
        if (self.curActionType !== action || self.curDir !== dir || compulsory) {
            self.curActionType = action;
            if (dir >= 0) {
                self.curDir = dir;
            }
            if (self.curDir < 0) {
                self.curDir = 0;
            }
            self.setSkinIndex();
            self.play(action, dir);
        }
    }

    private setSkinIndex(): void {
        let self = this;
        if (self.sortAble) {
            if (E_ActionType.Idle === self.curActionType) {
                const curDirStandSort = self.standSort && self.standSort[self.curDir];
                if (curDirStandSort) {
                    let index: number = 0;
                    if (self.shadow) {
                        index += 1;
                    }
                    for (let skinType of curDirStandSort) {
                        const animation = self.animations[skinType];
                        if (animation) {
                            self.addChildAt(animation, index);
                            index += 1;
                        }
                    }
                }
            } else if (E_ActionType.Run === self.curActionType || E_ActionType.Walk === self.curActionType) {
                const curDirMoveSort = self.moveSort && self.moveSort[self.curDir];
                if (curDirMoveSort) {
                    let index: number = 0;
                    if (self.shadow) {
                        index += 1;
                    }
                    for (let skinType of curDirMoveSort) {
                        const animation: CustomMovie = self.animations[skinType];
                        if (animation) {
                            self.addChildAt(animation, index);
                            index += 1;
                        }
                    }
                }
            }
        }
    }

    private play(action: number, dir: number, initIndex: boolean = true): void {
        let self = this;

        self.playCount = 0;
        initIndex && self.timeControl.reset();

        const args: AnimationArgs = self.animationArgs;
        const clipTotalFrameCount: number = args.clipTotalFrameCount;
        const lastClipIndex: number = self.lastClipIndex;

        if (args.clipAction === action && args.clipDir !== dir) {
            args.clipFrameIndex = lastClipIndex;
        } else {
            if (initIndex) {
                args.clipFrameIndex = 0;
            } else if (args.clipFrameIndex > clipTotalFrameCount) {
                args.clipFrameIndex = clipTotalFrameCount - 1;
            } else if (args.clipAction === action) {
                if (lastClipIndex !== 0 && lastClipIndex < clipTotalFrameCount) {
                    args.clipFrameIndex = lastClipIndex;
                }
            }
        }
        args.clipAction = action;
        args.clipDir = dir;

        let dataSet: AnimationPlayerDataSet;
        let clip: AnimationClip;
        let frameLen: number = 0;
        const dataList = self.dataList;
        for (let skinType in dataList) {
            dataSet = dataList[skinType];
            if (dataSet) {
                const realDir: number = dataSet.getRealDir(action, dir);
                let data: AnimationPlayerData = dataSet.getData(action, dir);
                if(!data || !data.clip) {
                    const sourceId: number = ResUrl.getSourceID(dataSet.model, action, dir);
                    data = CacheManager.Instance.skinCache.getItemData(sourceId);
                    if(data) {
                        dataSet.addData(action, realDir, data);
                    } else {
                        // dataSet.loadSkin();
                    }
                } else {
                    // clip = data.clip;
                    // if(clip) {
                    //     frameLen = clip.
                    // }
                }

            }
        }

    }

    public render(gameTime: GameTime): void {
        let self = this;

    }


    public disposePermanent(): void {

    }
    public returnToPool(): void {

    }

    public loadCompete(): void {

    }

    public dispose(): void {
        let self = this;
        if (!self.disposed) {
            self.disposed = true;
            AnimationPlayer.pool.push(self);
        }
    }
}