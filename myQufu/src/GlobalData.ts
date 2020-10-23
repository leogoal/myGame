declare let my_gameVars;

namespace qufu {
    export let qfNoticeTxt:string;

    export let requestInfo = () => {
        HttpRequest.request(`${my_gameVars.APILocaiton}list.txt`, TalkToPHP.onGetData, TalkToPHP)
    }
}