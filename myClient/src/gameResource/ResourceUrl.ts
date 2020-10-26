class ResUrl {
	public constructor() {
	}
	public static readonly MapBackGround: string = "map/";
	public static Model: string = "model/";
	public static Config: string = "config/"


	public static readonly DatExt: string = ".dat";
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
			case ResourceType.Config:
				dir = ResUrl.Config + fileName + ResUrl.JsonExt;
				break;
			case ResourceType.MapData:
				dir = ResUrl.Config + fileName + ResUrl.DatExt;
				break;
		}

        url = my_gameVars.APILocaiton + dir + my_gameVars.versionTimeS;
		return url;
	}


	public static getSourceID(model: number, action: number, dir: number): number {
		return model * 1000 + action * 10 + dir;
	}
}

const enum ResourceType {
	MapData,
	Config,
	Model,
	Map,
	Audio,
}