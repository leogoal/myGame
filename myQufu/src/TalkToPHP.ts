namespace qufu {
    export class TalkToPHP {
        public static onGetData(data): void {
            if(data) {
                data = JSON.parse(data);
                noticeTxt = data.notice;
                my_gameVars.versionName = data.versionName; 
                my_gameVars.versionTimeStamp = data.versionTimeStamp;
            }
        }
    }
}