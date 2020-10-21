namespace qufu {
	export class NoticeView extends eui.Component {
		private btn_close: eui.Button;
		private txt_content: eui.Label;


		public createChildren(): void {
            let self = this;
			super.createChildren();
			self.skinName = "NoticeViewSkin";
			// if (notice) {
			// 	let htmlText: egret.HtmlTextParser = new egret.HtmlTextParser();
			// 	self.txt_content.textFlow = htmlText.parse(notice);
			// } else {
			// 	self.txt_content.text = "";
			// }

			self.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onClose, self);
		}

		private onClose(event: egret.TouchEvent): void {
			this.dispatchEvent(new egret.Event("close noticeview"));
		}

		public onResize(nW, nH): void {
            let self = this;
			self.x = (nW - 700) >> 1;
			self.y = (nH - 501) >> 1;
		}

		public dispose(): void {
            let self = this;
			if (self.parent) {
				self.parent.removeChild(self);
			}
			if (self.btn_close) {
				self.btn_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClose, self);
			}

		}
	}
}

