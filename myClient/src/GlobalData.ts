declare const TP = "touchTap";
declare let my_gameVars;
declare let loadingView: any; 
declare let mStage: egret.Stage;
declare let cm: ConfigManager;
declare let uim: UIManager;
declare let ncm: NoticeManager;
declare let emIns: EntityManager;
declare let gd: DataManager;
declare let cursorPoint: egret.Point;

declare class Long {
	public toString(): string;
}

class GameDefine {
    public static BottomBorder: number = -100;

    
    public static readonly MAP_TILE_WIDTH: number = 512;
	public static readonly MAP_TILE_HEIGHT: number = 256;
    
	/**每格子的宽度 */
	public static readonly MAP_GRID_WIDTH: number = 48;
	/**每格子的高度 */
	public static readonly MAP_GRID_HEIGHT: number = 32;
}