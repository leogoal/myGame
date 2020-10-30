/*
资源版本策略
	1.getResByUrl
	资源路径 + ?v=版本号

    2.其他
    
*/


class GameVersionController implements RES.VersionController {
    init(): Promise<any>{
        return new Promise<ArrayBuffer>(resolve => {
            resolve(null);
        });
    }
    public getVirtualUrl(url: string): string {
        return url;
    }
}