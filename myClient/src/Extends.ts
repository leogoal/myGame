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

declare module RES {
    export let NOCache: string;
    export let NCImg: string;
    let config: ResourceConfig, queue: ResourceLoader, host: ProcessHost;
}

(function () {
    RES.NOCache = "NC";
    RES.NCImg = "NCImg";

    /**
         * 通过url获取资源
         * @method RES.getResByUrl
         * @param url {string}
         * @param compFunc {Function}
         * @param thisObject {any}
         * @param type {string}
         */
    RES.Resource.prototype.getResByUrl = function (url, compFunc, thisObject, type) {
        var _this = this;
        var nocache = type === "NCImg" || type === "NC";
        if (type === "NCImg") {
            type = RES.ResourceItem.TYPE_IMAGE;
        } else if (type === void 0 || type === "NC") { type = ""; }
        var r = RES.config.getResource(url);
        if (!r) {
            if (!type) {
                type = RES.config.__temp__get__type__via__url(url);
            }
            r = { name: url, url: url, type: type, root: '', extra: 1 };

            RES.config.addResourceData(r);
            r = RES.config.getResource(url);
            if (!r) {
                throw 'never';
            }
        }
        return RES.queue.pushResItem(r).then(function (value) {
            if (!nocache) {
                RES.host.save(r, value);
            } else {
                RES.host.remove(r);
            }
            if (compFunc && r) {
                compFunc.call(thisObject, value, r.url);
            }
            if (nocache && r.extra == 1) {
                // RES.config.config.fileSystem.removeFile(r.url);
                RES.config.removeResourceData(r);
            }
            return value;
        }, function (error) {
            RES.host.remove(r);
            RES.ResourceEvent["dispatchResourceEvent"](_this, RES.ResourceEvent.ITEM_LOAD_ERROR, "", r);
            if (compFunc) {
                compFunc.call(thisObject, null, url);
                return Promise.reject(null);
            }
            return Promise.reject(error);
        });
    };

    /************************************************************************************************** */

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