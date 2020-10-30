class ResUrl {
	public constructor() {
	}
	public static readonly Map: string = "img/map/";
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
		const resVersion: string = `?v=${my_gameVars.versionNumber}`;
		let path = "";
		let url: string;


		switch (resType) {
			case ResourceType.Model:
				path = ResUrl.Model + childDic;
				break;
			case ResourceType.Map:
				path = ResUrl.Map + childDic + fileName + ResUrl.JPGExt;
				break;
			case ResourceType.Config:
				path = ResUrl.Config + fileName + ResUrl.JsonExt;
				break;
			case ResourceType.MapData:
				path = ResUrl.Config + fileName + ResUrl.DatExt;
				break;
		}

        url = `${my_gameVars.APILocaiton}${path}${resVersion}`;
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