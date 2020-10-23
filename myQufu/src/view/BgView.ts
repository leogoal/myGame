namespace qufu {
    export class BgView extends eui.Component {
        private img_bg: eui.Image;
        private txt_server: eui.Label;
        private txt_huanqu: eui.Label;
        private btn_notice: eui.Button;
        private btn_start: eui.Button;

        public createChildren(): void {
            let self = this;
            self.skinName = "BgViewSkin";

            self.txt_huanqu.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onHuanQuHandler, self);
            self.btn_notice.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onNoticeHandler, self);
            self.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onStartHandler, self);
        }

        private onHuanQuHandler(e: egret.Event): void {
            this.dispatchEvent(new egret.Event("open selectview"));
        }

        private onNoticeHandler(e: egret.Event): void {
            this.dispatchEvent(new egret.Event("open noticeview"));
        }

        private onStartHandler(e: egret.Event): void {
            SceneManager.Instance.changeScene(CreateRoleScence);
        }

        private showInfo(): void {
            let self = this;
        }

        public onResize(nW: number, nH: number): void {
            let self = this;
            self.width = nW;
            self.height = nH;
        }

        public dispose(): void {
            let self = this;

            self.txt_huanqu.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onHuanQuHandler, self);
            self.btn_notice.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onNoticeHandler, self);
            self.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onStartHandler, self);
        }
    }
}