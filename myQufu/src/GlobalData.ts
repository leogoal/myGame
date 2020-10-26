declare let my_gameVars;
declare let loadingView: qufu.LoadingView;

namespace qufu {
    export let resourceDir: string = DEBUG ? "resource" : "qufu_resource";
    export let noticeTxt:string;

    export let requestInfo = () => {
        HttpRequest.request(`${my_gameVars.APILocaiton}txt/list.txt?v=${new Date().getTime()}`, TalkToPHP.onGetData, TalkToPHP)
    }
}