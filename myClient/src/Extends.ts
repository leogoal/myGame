declare module egret {
    interface EventDispatcher {
        on(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void;   
        off(type: string, listener: Function, thisObject: any, useCapture?: boolean): void;
    }

}

(function() {
    let p;
    p = egret.EventDispatcher.prototype;
    p.on = p.addEventListener;
    p.off = p.removeEventListener;
})();