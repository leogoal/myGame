class CacheManager implements IUpdateable {
    public static readonly Instance: CacheManager = new CacheManager();
    public enabled: boolean = true;
    public modelSkinSize: number = 0;

    public skinCache: CacheCollection;
    public mapCache: CacheCollection;

    private count: number = 0;
    private nextUpdateTime: number = 0;

    public init(): void {
        let self = this;

        self.skinCache = new CacheCollection();
        self.mapCache = new CacheCollection(Capability.MAX_MAP_CACHE);
    }

    public addSkinReference(sourceName: number, model: number): void {
        let self = this;

        if (self.isNodirectionAnimation(model)) {
            self.skinCache.addReference(sourceName);
        } else {
            self.skinCache.addReference(sourceName, model);
        }
    }

    public removeSkinReference(sourceName: number, model: number): void {
        let self = this;
        const totalGameTime: number = GameTime.Instance.totalGameTime;

        if (self.modelSkinSize > Capability.MB18XSD5) {
            self.skinCache.removeReferenceT(sourceName, totalGameTime + Capability.IMPERATIVE_TIME);
        } else {
            if (self.isNodirectionAnimation(model)) {
                self.skinCache.removeReferenceT(sourceName, totalGameTime + Capability.EFFECT_TIME_OUT);
            } else {
                self.skinCache.removeReferenceT(sourceName, totalGameTime + Capability.SKIN_TIME_OUT);
            }
        }
    }

    private isNodirectionAnimation(model): boolean {
        if (model >= 10000 && model < 20000) {
            return true;
        } else {
            return false;
        }
    }

    public update(gameTime: GameTime): void {
        let self = this;

        const totalGameTime: number = gameTime.totalGameTime;
        if (totalGameTime > self.nextUpdateTime) {
            self.count++;
            if(1 === self.count) {
                self.skinCache.clearSomeByTime(totalGameTime)
            } else if(2 === self.count) {
                self.mapCache.clearLimit();
            }

            self.nextUpdateTime = totalGameTime + 1500;
            if(self.count > 2) {
                self.count = 0;
            }
        }
    }
}