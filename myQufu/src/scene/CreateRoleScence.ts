namespace qufu {
    export class CreateRoleScence extends SceneBase {
        private view: CreateRoleView;

        protected onResize(): void {
            let self = this;
            if(self.view) {
                self.view.onResize();
            }
        }

        public show(): void {
            super.show();
            let self = this;
            self.view = new CreateRoleView();
            self._stage.addChild(self.view);
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