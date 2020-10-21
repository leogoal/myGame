namespace qufu {
    export class TalkToPHP {
        public static onGetData(data): void {
            if(data) {
                data = JSON.parse(data);
                qfNoticeTxt = data.notice;
            }
        }
    }
}