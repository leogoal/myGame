class CallBack0 {
    private fun: Function;
    private thisObj: any;
    
    constructor(fun: Function, thisObj: any) {
        this.fun = fun;
        this.thisObj = thisObj;
    }

    public exec(): void {
        if(this.fun) {
            this.fun.apply(this.thisObj);
        }
    }

    public dispose(): void {
        this.fun = null;
        this.thisObj = null;
    }
}

class CallBack1 {
    private fun: Function;
    private thisObj: any;
    private params: any[];

    constructor(fun: Function, thisObj: any, params: any[]) {
        this.fun = fun;
        this.thisObj = thisObj;
        this.params = params;
    }

    public exec(): void {
        if(this.fun) {
            this.fun.apply(this.thisObj, this.params);
        }
    }

    public dispose(): void {
        this.fun = null;
        this.thisObj = null;
        this.params = null;
    }
}

class CallBack2 {
    private fun: Function;
    private thisObj: any;

    constructor(fun: Function, thisObj: any) {
        this.fun = fun;
        this.thisObj = thisObj;
    }

    public exec(...args): void {
        if(this.fun) {
            this.fun.apply(this.thisObj, args);
        }
    }

    public dispose(): void {
        this.fun = null;
        this.thisObj = null;
    }
}

class CallBack3 {
    private fun: Function;
    private thisObj: any;
    private params: any[];

    constructor(fun: Function, thisObj: any, params: any[]) {
        this.fun = fun;
        this.thisObj = thisObj;
        this.params = params;
    }

    public exec(...args): void {
        if(this.fun) {
            this.fun.apply(this.thisObj, this.params ? this.params.concat(args) : args);
        }
    }

    public dispose(): void {
        this.fun = null;
        this.thisObj = null;
        this.params = null;
    }
}