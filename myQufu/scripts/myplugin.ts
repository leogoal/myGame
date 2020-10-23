/**
 * 示例自定义插件，您可以查阅 http://developer.egret.com/cn/github/egret-docs/Engine2D/projectConfig/cmdExtensionPlugin/index.html
 * 了解如何开发一个自定义插件
 */
export class CustomPlugin implements plugins.Command {

    constructor() {
    }

    async onFile(file: plugins.File) {
        return file;
    }

    async onFinish(commandContext: plugins.CommandContext) {

    }
}

export class WXCustomPlugin implements plugins.Command {

    constructor() {
    }

    async onFile(file: plugins.File) {
        const filename = file.basename;
        
        if (filename == 'default.thm.js') {
            const contents = file.contents.toString();
            let content = '';
            content = contents.replace(/\"resource\//g,"\"qufu_resource\/");
            // let parent = file.base.replace(/Qufu_wxgame\//g,"wx_resource\/");
            // file.path = file.base + "/qufu_resource/" + 'qufu.json';
            file.contents = new Buffer(content);
        }else if (filename == 'gameEui.json') {
            const contents = file.contents.toString();
            let content = '';
            content = contents.replace(/\"resource\//g,"\"qufu_resource\/");
            file.path = file.base + "/qufu_resource/" + filename;
            file.contents = new Buffer(content);
        }else if(file.path.indexOf("resource\\") > -1){
            let toPath = file.relative.replace(/resource\\/g,"qufu_resource\\");
            file.path = file.base + "/" + toPath;
            // console.log(file.path);
        }
        return file;
    }

    async onFinish(commandContext: plugins.CommandContext) {

    }
}

export class PCCustomPlugin implements plugins.Command {

    constructor() {
    }

    async onFile(file: plugins.File) {
        const filename = file.basename;
        
        if (filename == 'default.thm.json') {
            const contents = file.contents.toString();
            let content = '';
            content = contents.replace(/\"resource\//g,"\"qufu_resource\/");
            content = content.replace(/default\.thm\.json/g,"qufu1.json");
            file.path = file.base + "/qufu_resource/" + 'qufu.json';
            file.contents = new Buffer(content);
        }else if (filename == 'gameEui.json') {
            const contents = file.contents.toString();
            let content = '';
            content = contents.replace(/\"resource\//g,"\"qufu_resource\/");
            file.path = file.base + "/qufu_resource/" + filename;
            file.contents = new Buffer(content);
        }else if(file.path.indexOf("resource\\") > -1){
            let toPath = file.relative.replace(/resource\\/g,"qufu_resource\\");
            file.path = file.base + "/" + toPath;
            // console.log(file.path);
        }
        return file;
    }

    async onFinish(commandContext: plugins.CommandContext) {

    }
}