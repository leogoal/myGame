class ResUrl {
	public constructor() {
	}
	public static readonly MapBackGround: string = "map/";
	public static Model: string = "model/";

	public static Data: string = "http://192.168.5.66:8082/";
	public static ImageServer: string = "http://192.168.5.66:8081/";




	public static readonly ConfigZipExt: string = ".dat";
	public static readonly AudioExt: string = ".wav";
	public static readonly mp3Ext: string = ".mp3";

	public static readonly PNGExt: string = ".png";
	public static readonly JPGExt: string = ".jpg";
	public static readonly JsonExt: string = ".json";

	public static NoCache: boolean = false;

	public static url(fileName: string, resType: ResourceType = 0, childDic: any = undefined, ext: string = ResUrl.PNGExt): string {

		let dir = "";
		let url: string;

		switch (resType) {
			case ResourceType.Model:
				dir = ResUrl.Model + childDic;
				break;
			case ResourceType.Map:
				dir = ResUrl.MapBackGround + childDic;
				break;
			case ResourceType.DataZip:
				return url = ResUrl.Data + fileName + ResUrl.ConfigZipExt;
		}

        url = ResUrl.ImageServer + dir;
		return url;
	}


	public static getSourceID(model: number, action: number, dir: number): number {
		return model * 1000 + action * 10 + dir;
	}
}

const enum ResourceType {
	Model,
	Map,
	DataZip,
	Audio,
}