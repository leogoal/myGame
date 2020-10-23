namespace qufu {
	export class NoticeView extends eui.Component {
		private btn_close: eui.Button;
		private txt_content: eui.Label;


		public createChildren(): void {
            let self = this;
			super.createChildren();
			self.skinName = "NoticeViewSkin";
			if (qfNoticeTxt) {
				let htmlText: egret.HtmlTextParser = new egret.HtmlTextParser();
				self.txt_content.textFlow = htmlText.parse(qfNoticeTxt);
			} else {
				self.txt_content.text = "";
			}

			self.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onClose, self);
		}

		private onClose(event: egret.TouchEvent): void {
			this.parent.removeChild(this);
		}

		public onResize(nW, nH): void {
            let self = this;
			self.x = (nW - 700) >> 1;
			self.y = (nH - 501) >> 1;
		}

		public dispose(): void {
            let self = this;
			
			if (self.btn_close) {
				self.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClose, self);
			}
		}
	}
}

