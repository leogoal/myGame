class ResUrl {
	public constructor() {
	}
	public static readonly Map: string = "img/map/";
	public static readonly MiniMap: string = "img/miniMap/"
	public static Model: string = "model/";
	public static Config: string = "config/"

	public static readonly DatExt: string = ".dat";
	public static readonly AudioExt: string = ".wav";
	public static readonly mp3Ext: string = ".mp3";

	public static readonly PNGExt: string = ".png";
	public static readonly JPGExt: string = ".jpg";
	public static readonly JsonExt: string = ".json";

	public static NoCache: boolean = false;

	public static url(fileName: string, resType: ResourceType = 0, childDic: string = "", ext: string = ResUrl.PNGExt): string {
		const resVersion: string = `?v=${my_gameVars.versionNumber}`;
		let path = "";
		let url: string;


		switch (resType) {
			case ResourceType.Model_PNG:
				path = ResUrl.Model + childDic + fileName + ResUrl.PNGExt;
				break;
			case ResourceType.Model_JSON:
				path = ResUrl.Model + childDic + fileName + ResUrl.JsonExt;
				break;
			case ResourceType.Map:
				// path = ResUrl.Map + childDic + fileName + ResUrl.JPGExt;
				// break;
				return "https://cdn.zzcq.app.9125flying.com/zhuzai_20201013/assets/resource/map/" + childDic + fileName + ResUrl.JPGExt;
			case ResourceType.Config:
				// path = ResUrl.Config + fileName + ResUrl.JsonExt;
				// break;

				return "https://cdn.zzcq.app.9125flying.com/zhuzai_20201013/" + fileName + ResUrl.JsonExt;	
			case ResourceType.MapData:
				// path = ResUrl.Config + fileName + ResUrl.DatExt;
				// break;

				return "https://cdn.zzcq.app.9125flying.com/zhuzai_20201013/" + fileName + ResUrl.DatExt;			
			case ResourceType.MiniMap:
				path = ResUrl.MiniMap + fileName + ResUrl.JPGExt;
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
	Model_PNG,
	Model_JSON,
	Map,
	MiniMap,
	Audio,
}