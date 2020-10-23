declare let my_gameVars;
declare let qf_resourceDirName;
namespace qufu {
    export let qfNoticeTxt:string;

    export let requestInfo = () => {
        HttpRequest.request(`${my_gameVars.APILocaiton}list.txt`, TalkToPHP.onGetData, TalkToPHP)
    }
}