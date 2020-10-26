namespace qufu {
    export class LoadingScene extends SceneBase {
        private view: LoadingView;
        private loadArr: any[];
        private total: number;
        private loaded: number = 0;

        public async show() {
            let self = this;
            super.show();

            const loadingView: LoadingView = new LoadingView();
            if (!window["loadingView"]) {
                window["loadingView"] = loadingView;
            }
            self.view = loadingView;
            self._stage.addChild(self.view);
            self.onResize();

            if (!my_gameVars.publish) {
                const manifestJson: any = await self.getMainManifestJson("manifest.json");
                self.loadArr = manifestJson.game;
            } else {
                self.loadArr = [`main${my_gameVars.versionName}.min.js`];
            }
            self.total = self.loadArr.length;
            self.loadNext();
        }

        private getMainManifestJson(file: string) {
            return new Promise((resolve, reject) => {
                RES.getResByUrl(file, (res) => {
                    resolve(res);
                }, this, RES.ResourceItem.TYPE_JSON)
            })
        }

        private loadNext(): void {
            let self = this;
            if (self.loaded >= this.total) {
                const Main = egret.getDefinitionByName("Main");
                Main && SceneManager.Instance.rootContainer.addChild(new Main());
                SceneManager.Instance.changeScene(null);
            } else {

                self.view.showPregress(self.loaded, self.total);

                const script = document.createElement("script");
                script.async = false;

                const loadingItem = self.loadArr[self.loaded];
                if (loadingItem == `main${my_gameVars.versionName}.min.js`) {
                    script.src = loadingItem;
                } else {
                    script.src = `${loadingItem}?v=${Math.random()}`;
                }

                script.addEventListener("load", function () {
                    script.parentNode.removeChild(script);
                    script.removeEventListener('load', <EventListenerOrEventListenerObject>arguments.callee, false);
                    self.loaded++;
                    self.loadNext();
                })
                document.body.appendChild(script);
            }
        }

        public onResize(): void {
            let self = this;

            if (self.view) {
                const nW: number = self._stage.stageWidth;
                const nH: number = self._stage.stageHeight;
                self.view.onResize(nW, nH);
            }
        }

        public dispose(): void {
            let self = this;

            if (self.view) {
                if (self.view.parent) {
                    self.view.parent.removeChild(self.view);
                }
                self.view = null;
            }
        }
    }
}
