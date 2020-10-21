namespace qufu {
    export class SceneManager {
        public _stage: egret.Stage;

        private static _instance: SceneManager;
        public static get Instance(): SceneManager {
            if(!this._instance) {
                this._instance = new SceneManager();
            }
            return this._instance;
        }

        private curScene: SceneBase;
        public changeScene(SceneType: any): void {
            let self = this;
            if(self.curScene) {
                self.curScene.dispose();
            }

            self.curScene = new SceneType();
            self.curScene.show();
        }
    }
}