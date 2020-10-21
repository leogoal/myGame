class QufuVersionController implements RES.VersionController {
    init(): Promise<any> {
        let promise = new Promise<ArrayBuffer>(resolve => {
            resolve();
        });
        return promise;
    }
    public getVirtualUrl(url: string): string {
        return url;
    }
}