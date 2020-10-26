namespace qufu {
    export class LoadingView extends eui.Component {
        private img_bg: eui.Image;
        private grp_0: eui.Group;
        private grp_1: eui.Group;
        private img_pro: eui.Image;
        private txt_show: eui.Label;
        private img_fakePro: eui.Image;

        private PROW: number = 724;
        private createOk = false;
        private _wordsUpdateTime: number = 0;
        private _mc0: egret.MovieClip;
        private _mc1: egret.MovieClip;
        private _movieData;
        private _movieImage: egret.Texture;
        private _disposed: boolean = false;
        private mcJSON: string = `${resourceDir}/assets/qufu_mc/loadXingMc.json`;
        private mcPNG: string = `${resourceDir}/assets/qufu_mc/loadXingMc.png`;

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

            RES.getResByUrl(self.mcJSON, self.loadedJsonHandler, self, RES.ResourceItem.TYPE_JSON);
            RES.getResByUrl(self.mcPNG, self.loadedPngHandler, self, RES.ResourceItem.TYPE_IMAGE);
            self.doFakeProcess();
        }

        private timer: number = 0;
        private doFakeProcess(): void {
            let self = this;
            self.clearTimer();

            if (!self._disposed) {
                const num: number = Math.floor(Math.random() * 10) / 10;

                self.timer = setTimeout(() => {
                    self.timer = 0;

                    if(self.img_fakePro.width === 0) {
                        self.img_fakePro.width = num * self.PROW;
                    } else if (self.img_fakePro.width < self.PROW) {
                        self.img_fakePro.width = self.PROW;
                    } else if (self.img_fakePro.width === self.PROW) {
                        self.img_fakePro.width = 0;
                    }

                    self.setMC1Pos();
                    self.doFakeProcess();
                }, num * 500)
            }
        }

        private clearTimer(): void {
            let self = this;
            if (self.timer > 0) {
                clearTimeout(self.timer);
                self.timer = 0;
                console.log("fakePro stop timer")
            }
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
                    RES.destroyRes(self.mcJSON);
                    RES.destroyRes(self.mcPNG);
                    return;
                }

                const mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(self._movieData, self._movieImage);
                mcFactory.enableCache = false;
                self._mc0 = new egret.MovieClip(mcFactory.generateMovieClipData("loadXingMc"));
                self.grp_0.addChild(self._mc0);
                self._mc0.play(-1);
                self._mc0.blendMode = egret.BlendMode.ADD;
                self.setMC0Pos();


                self._mc1 = new egret.MovieClip(mcFactory.generateMovieClipData("loadXingMc"));
                self.grp_1.addChild(self._mc1);
                self._mc1.play(-1);
                self._mc1.blendMode = egret.BlendMode.ADD;
                self.setMC1Pos();
            }
        }

        public showPregress(cur: number, total: number): void {
            let self = this;
            if (self.createOk) {
                self.img_pro.width = Math.ceil(self.PROW * (cur / total));
                self.setMC0Pos();

                let now: number = egret.getTimer();
                if (self._wordsUpdateTime < now) {
                    let value: string = self._words[Math.floor(Math.random() * self._words.length)];
                    self.txt_show.text = value;
                    self._wordsUpdateTime = now + 1000;
                }
            }
        }

        private setMC0Pos(): void {
            let self = this;
            if (self._mc0) {
                self._mc0.x = self.img_pro.x + self.img_pro.width - 118;
                self._mc0.y = self.img_pro.y - 30;
            }
        }

        private setMC1Pos(): void {
            let self = this;
            if (self._mc1) {
                self._mc1.x = self.img_fakePro.x + self.img_fakePro.width - 118;
                self._mc1.y = self.img_fakePro.y - 30;
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
            self._disposed = true;
            self._movieData = null;
            self._movieImage = null;
            self.clearTimer();

            if (self._mc0) {
                if (self._mc0.parent) {
                    self._mc0.parent.removeChild(self._mc0);
                }
                self._mc0 = null;
                RES.destroyRes(self.mcJSON);
                RES.destroyRes(self.mcPNG);
            }

            RES.destroyRes(self.img_bg.source as string);

            if (self.parent) {
                self.parent.removeChild(self);
            }
        }
    }
}
