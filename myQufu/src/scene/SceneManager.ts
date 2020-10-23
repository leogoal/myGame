namespace qufu {
    export class SceneManager {
        private static _instance: SceneManager;
        public static get Instance(): SceneManager {
            if (!this._instance) {
                this._instance = new SceneManager();
            }
            return this._instance;
        }

        public _stage: egret.Stage;
        public rootContainer: eui.UILayer;
        private curScene: SceneBase;

        public changeScene(Scene: { new () }): void {
            let self = this;
            if (self.curScene) {
                self.curScene.dispose();
            }

            if (Scene) {
                self.curScene = new Scene();
                self.curScene.show();
            }

        }
    }
}