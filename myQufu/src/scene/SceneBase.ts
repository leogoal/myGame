namespace qufu {
    export class SceneBase {
        protected _stage: egret.Stage;

        public constructor() {
            this._stage = SceneManager.Instance._stage;
        }

        protected onResize(): void {

        }

        public show(): void {
            this._stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
        }

        public dispose(): void {
            this._stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            this._stage = null;
        }
    }
}