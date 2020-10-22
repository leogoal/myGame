class SecondTimerUtil {
    public static _instance: SecondTimerUtil;
    public static get Instance(): SecondTimerUtil {
        if(!this._instance) {
            this._instance = new SecondTimerUtil();
        }
        return this._instance;
    }


    public constructor() {
        this._tasks = {};
    }

    private  _intervalId: number = 0;
    private _id: number = 0;
    private _tasks: {[key: number]: CallBack0};
    private _lastTime: number;

    public init(): void {
        let self = this;
        if(self._intervalId === 0) {
            self._intervalId = setInterval(self.update, 500);
        }
    }

    public dispose(): void {
        let self = this;
        if(self._intervalId > 0) {
            clearTimeout(self._intervalId);
            self._intervalId = 0;
        }

        let _tasks = self._tasks;
        for(let id in _tasks) {
            _tasks[id] = null;
            delete _tasks[id];
        }

        _tasks = self._tasks = null;
    }


    public addSecondTask(func: CallBack0): number {
        let self = this;
        self._id ++;
        self._tasks[self._id] = func;

        return this._id;
    }

    public removeSecondTask(id: number): void {
        let self = this;
        if(id in self._tasks) {
            self._tasks[id] = null;
            delete self._tasks[id];
        }
    }

    public length(): number {
        let count: number = 0;
        const _tasks = this._tasks;
        for(let key in _tasks) {
            count++;
        }

        return count;
    }

    private update(): void {
        let self = this;
        const now: number = new Date().getTime();
        if(!self._lastTime) {
            self._lastTime = now;
            return;
        }
        
        let passed: number = now - self._lastTime;
        let count: number = 3;

        while(passed > 1000 && count > 0) {
            const _tasks = self._tasks;
            for(let key in _tasks) {
                const task = _tasks[key];
                task.exec();
            }

            passed -= 1000;
            count -= 1;
        }
        self._lastTime = now - passed;
    }
    
}