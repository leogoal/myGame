namespace qufu {
    export class LoadingScene extends SceneBase {
        private view;
        private loadArr: any[];
        private total: number;
        private loaded: number = 0;

        public async show() {
            let self = this;
            super.show();

            if (my_gameVars.publish) {
                const manifestJson: any =  await self.getMainManifestJson("manifest.json");
                self.loadArr = manifestJson.game;
            } else {
                self.loadArr = [`main${my_gameVars.resVersion}.min.js`];
            }
            self.total = self.loadArr.length;

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
            if(self.loaded >= this.total) {
                const Main = egret.getDefinitionByName("Main");
                SceneManager.Instance.rootContainer.addChild(new Main());
                SceneManager.Instance.changeScene(null);
            } else {
                const script = document.createElement("script");
                script.async = false;

                const loadingItem = self.loadArr[self.loaded];
                if(loadingItem == `main${my_gameVars.resVersion}.min.js`) {
                    script.src = loadingItem;
                } else {
                    script.src = `${loadingItem}?v=${Math.random()}`;
                }

                script.addEventListener("load", function(){
                    script.parentNode.removeChild(script);
                    script.removeEventListener('load', <EventListenerOrEventListenerObject>arguments.callee, false);
                    self.loaded++;
                    self.loadNext();
                })
                document.body.appendChild(script);
            }

            
        }

        public onResize(): void {
            if(this.view) {

            }
        }

        public dispose(): void {

        }
    }
}
