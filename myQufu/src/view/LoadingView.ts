class LoadingView extends eui.Component {
    public img_bg: eui.Image;
    public grp_0: eui.Group;
    public img_pro: eui.Image;
    public txt_show: eui.Label;

    private PROW: number = 724;
    public createOk = false;
    private _wordsUpdateTime: number = 0;
    private _movieClip: egret.MovieClip;
    private _movieData;
    private _movieImage: egret.Texture;
    private _disposed: boolean = false;

    private _words: string[] = [
        "完成每日元宝悬赏可获得海量主角经验，助你快速升级！",
        "战士是三职业中HP最后厚的职业，抗BOSS无压力！",
        "法师是三职业中杀怪效率最快的，群攻魔法刷刷刷！",
        "道士的神兽宠物可打可抗，挑战BOSS，打架骚扰必备！",
        "首领正在复活...请耐心等待！",
        "帮会BOSS开启无敌了，赶紧击杀它小弟消除无敌！",
        "良心游戏，绿色传奇，打BOSS掉落充值道具！",
        "超强力英雄伙伴，冰冻BOSS无伤挂机超给力！",
        "正在打磨武器，练级打怪事半功倍！",
        "正在确认首领存活数量，请耐心等待！",
        "提升转生等级可以解锁更高级的装备哦！",
        "首领复活了，赶紧召集帮会小伙伴前去挑战！",
        "兽王来袭里，赶紧组队前去讨伐兽王残影！",
        "正在开启精彩的旅程...",
        "超强VIP打怪就送，专属会员地图极品爆爆爆！"

    ];

    public createChildren(): void {
        let self = this;
        super.createChildren();
        self.skinName = "LoadingViewSkin";
        self.createOk = true;

        RES.getResByUrl("resource/assets/qufu_mc/loadXingMc.json", self.loadedJsonHandler, self, RES.ResourceItem.TYPE_JSON);
        RES.getResByUrl("resource/assets/qufu_mc/loadXingMc.json", self.loadedPngHandler, self, RES.ResourceItem.TYPE_IMAGE);
    }

    private loadedJsonHandler(data, url: string): void {
        let self = this;
        self._movieData = data;
        self.movieCreate();
    }

    private loadedPngHandler(img, url: string): void {
        let self = this;
        self._movieImage = img;
        self.movieCreate();
    }

    private movieCreate(): void {
        let self = this;
        if (self._movieData && self._movieImage) {
            if (self._disposed) {
                RES.destroyRes("img/loadXingMc.json");
                RES.destroyRes("img/loadXingMc.png");
                return;
            }

            const mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(self._movieData, self._movieImage);
            mcFactory.enableCache = false;
            self._movieClip = new egret.MovieClip(mcFactory.generateMovieClipData("loadXingMc"));
            self.grp_0.addChild(self._movieClip);
            self._movieClip.play(-1);
            self._movieClip.blendMode = egret.BlendMode.ADD;
            self.setMoviePos();
        }
    }

    public showPregress(cur: number, total: number): void {
        let self = this;
        if (self.createOk) {
            self.img_pro.width = Math.ceil(self.PROW * (cur / total));
            self.setMoviePos();

            let now: number = egret.getTimer();
            if (self._wordsUpdateTime < now) {
                let value: string = self._words[Math.floor(Math.random() * self._words.length)];
                self.txt_show.text = value;
                self._wordsUpdateTime = now + 1000;
            }
        }
    }

    private setMoviePos(): void {
        let self = this;

        if (self._movieClip) {
            self._movieClip.x = self.img_pro.x + self.img_pro.width;
            self._movieClip.y = self.img_pro.y - 30;
        }
    }


    public setText(value: string): void {
        let self = this;
        if (self.createOk) {
            self.txt_show.text = value;
        }
    }

    public onResize(nW: number, nH: number): void {
        let self = this;
        self.width = nW;
        self.height = nH;
    }

    public dispose(): void {
        let self = this;

        if (self._movieClip) {
            if (self._movieClip.parent) {
                self._movieClip.parent.removeChild(self._movieClip);
            }
            self._movieClip = null;
            RES.destroyRes("resource/assets/qufu_mc/loadXingMc.json");
            RES.destroyRes("resource/assets/qufu_mc/loadXingMc.json");
        }

        RES.destroyRes(self.img_bg.source as string);
        self._disposed = true;
    }
}