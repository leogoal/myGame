//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();
        let self = this;

        // egret.lifecycle.addLifecycleListener((context) => {
        //     // custom lifecycle plugin
        // })

        // egret.lifecycle.onPause = () => {
        //     egret.ticker.pause();
        // }

        // egret.lifecycle.onResume = () => {
        //     egret.ticker.resume();
        // }

        self.doSomeEngineSetting();
        self.startGame();
    }

    private doSomeEngineSetting(): void {
        let self = this;
        RES.setMaxLoadingThread(6);
        RES.registerVersionController(new GameVersionController());

        //1 自定义屏幕适配器

    }

    private startGame(): void {
        let self = this;
        //1 小游戏 加速各种销毁
        //1 ios h5的性能较差？setMaxLoadingThread需要设置较小值 # 线程忙碌先别播放声音？

        Capability.isWebgl = egret.Capabilities.renderMode === "webgl";
        Capability.mobileUI = my_gameVars.isMobile;

        if (Capability.mobileUI) {
           GameDefine.BottomBorder = 0;
           self.stage.setContentSize(1136, 640);
           self.stage.scaleMode = egret.StageScaleMode.FIXED_WIDE;
        }

        mStage = self.stage;
        MtwGame.Instance.init();
    }

}
