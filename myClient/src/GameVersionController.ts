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