class HttpRequest {

	/**
	 * @url 请求地址
	 * @params 参数
	 * @callBack 回调
	 * @method get 或者post
	 */
    public static request(url: string, callBack: (data: any, args: any) => void, thisObj: any, params?: string, args?: any[], method = egret.URLRequestMethod.GET): void {

        const urlloader: egret.URLLoader = new egret.URLLoader;
        const r: egret.URLRequest = new egret.URLRequest();

        r.url = url;
        r.method = method;
        if (params) {
            r.data = new egret.URLVariables(params);
        } else {
            r.data = null;
        }


        let self = this;

        const onSuccess = function (e: egret.Event) {

            // console.log(e.target.data);
            callBack.call(thisObj, e.target.data, args ? args : null);

            urlloader.removeEventListener(egret.Event.COMPLETE, onSuccess, self);
            urlloader.removeEventListener(egret.IOErrorEvent.IO_ERROR, onFail, self);
        }

        const onFail = function (e: egret.IOErrorEvent) {
            console.log(`${url}请求错误!`);

            callBack.call(thisObj, null, args ? args : null);
            urlloader.removeEventListener(egret.Event.COMPLETE, onSuccess, self);
            urlloader.removeEventListener(egret.IOErrorEvent.IO_ERROR, onFail, self);
        }

        urlloader.addEventListener(egret.Event.COMPLETE, onSuccess, self);
        urlloader.addEventListener(egret.IOErrorEvent.IO_ERROR, onFail, self);

        urlloader.load(r);
    }


}
