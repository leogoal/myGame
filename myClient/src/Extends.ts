declare module egret {
    interface EventDispatcher {
        on(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void;   
        off(type: string, listener: Function, thisObject: any, useCapture?: boolean): void;
    }

    interface DisplayObject {
        /**
         * 移除自身
         */
        removeSelf(): void;
    }

}

(function() {
    let p;
    p = egret.EventDispatcher.prototype;
    p.on = p.addEventListener;
    p.off = p.removeEventListener;

    p = egret.DisplayObject.prototype;
    Object.defineProperties(p, {
        removeSelf: {
            value: function () {
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            },
            enumerable: false
        }
    });
})();