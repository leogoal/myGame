interface MapConfig {
	id: number;//地图ID
	img: number;//资源目录
	data: number;//阻挡配置（可共用）
	name: string;//地图名称(服务端之前就是用这个公告的)
	width: number;//地图宽度
	height: number;//地图高度
	fuhuo: number;//复活倒计时
	cls: number;//类型（客户端）
	condition: string;//进入条件
	showText: string;//条件说明
	duplicate: number;//是否是副本
	cancross: number;//是否可以无条件穿人
	safe: number;//是否是安全地图
	playerAI: number;//玩家ai配置表
	canBuyRelive: number;//复活方式（只控制能不能买活）
	hereReliveCost: string;//原地复活需要的道具
	autoRelive: string;//安全复活的类型和时间#累计时间#最大时间（有倒计时的情况下玩家无法安全复活）
	serverType: number;//服务器类型
	canDeliver: number;//是否可传送
	random: number;//随机卷轴的使用
	homeXY: string;//回城卷轴
	huanshou: number;//幻兽出战
	automatic: number;//自动战斗
	convene: number;//帮会召唤令牌是否使用
	deliver: number;//找NPC传送
	alert: number;//低血量弹窗提示
	team: number;
	zdrandom: number;

}
