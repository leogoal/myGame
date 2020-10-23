namespace qufu {
    export class CreateRoleView extends eui.Component {
    private img_model: eui.Image;
    private btn_start: eui.Button;
    private radio_0: eui.RadioButton;
    private radio_1: eui.RadioButton;
    private txt_input: eui.EditableText;
    private txt_sj: eui.Label;
    private radioGrp: eui.RadioButtonGroup;


    public createChildren(): void {
        let self = this;
        self.skinName = "CreateRoleViewSkin";

        self.radioGrp = new eui.RadioButtonGroup();
        self.radio_0.group = self.radioGrp;
        self.radio_1.group = self.radioGrp;
        self.radio_0.value = 0;
        self.radio_1.value = 1;
        self.radio_0.selected = true;

        self.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onClickHandler, self);
        self.txt_sj.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onClickHandler, self);
        self.radioGrp.addEventListener(egret.Event.CHANGE, self.onRadioChange, self);
    }

    private onClickHandler(e: egret.Event): void {
        let self = this;
        const target = e.currentTarget;
        if (self.btn_start === target) {
            SceneManager.Instance.changeScene(LoadingScene);
        } else if (self.txt_sj === target) {

        }
    }

    private onRadioChange(e: egret.Event): void {
        let self = this;
        self.img_model.source = `resource/assets/qufu_img/qf_gender_${self.radioGrp.selectedValue}.png`;
    }

    public onResize(nW: number, nH: number): void {
        let self = this;
        self.width = nW;
        self.height = nH;
    }

    public dispose(): void {
        let self = this;

        self.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClickHandler, self);
        self.txt_sj.removeEventListener(egret.TouchEvent.TOUCH_TAP, self.onClickHandler, self);
        self.radioGrp.removeEventListener(egret.Event.CHANGE, self.onRadioChange, self);
    }
}
}
