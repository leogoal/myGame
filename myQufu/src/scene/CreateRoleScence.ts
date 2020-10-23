namespace qufu {
    export class CreateRoleScence extends SceneBase {
        private view: CreateRoleView;

        protected onResize(): void {
            let self = this;
            const nW: number = self._stage.stageWidth;
            const nH: number = self._stage.stageHeight;
            if(self.view) {
                self.view.onResize(nW, nH);
            }
        }

        public show(): void {
            super.show();
            let self = this;
            self.view = new CreateRoleView();
            self._stage.addChild(self.view);
            self.onResize();
        }

        public dispose(): void {
            super.dispose();
            let self = this;
            if(self.view) {
                if(self.view.parent) {
                    self.view.parent.removeChild(self.view);
                }
                self.view.dispose();
                self.view = null;
            }
        }
    }
}