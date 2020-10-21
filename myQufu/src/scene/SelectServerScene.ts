namespace qufu {
    export class SelectServerScene extends SceneBase {
        private bgView: BgView;
        private noticeView: NoticeView;

        public constructor() {
            super();
            let self = this;
            self.bgView = new BgView();
            self.noticeView = new NoticeView();

            self.bgView.addEventListener("open noticeview", self.openNoticeView, self);
            self.noticeView.addEventListener("close noticeview", self.closeNoticeView, self);
        }

        public show(): void {
            super.show();
            this._stage.addChild(this.bgView);
        }

        private openNoticeView(event: egret.Event): void {
            let self = this;
            self._stage.addChild(self.noticeView);
        }

        private closeNoticeView(event: egret.Event): void {
            let self = this;
            self._stage.removeChild(self.noticeView);
        }

        public onResize(): void {
            let self = this;
            const nW: number = self._stage.stageWidth;
            const nH: number = self._stage.stageHeight;

            self.bgView.onResize(nW, nH);
            self.noticeView.onResize(nW, nH);
        }

        public dispose(): void {
            super.dispose();
            let self = this;

            self.bgView.dispose();
            self.bgView = null;

            if(self.noticeView) {
                self.noticeView.dispose();
                self.noticeView = null;
            }
            self.bgView.removeEventListener("open noticeview", self.openNoticeView, self);
            self.noticeView.removeEventListener("close noticeview", self.closeNoticeView, self);
        } 
    }
}