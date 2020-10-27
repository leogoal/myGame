class GameEventCenter {
    public static readonly Instance: GameEventCenter = new GameEventCenter();
    private listeners: {[eid: number]: I_GameEventHandler[]} = {};

    public dispatcher(eid: number, data: any): void {
        const handlers = this.listeners[eid];
        if(handlers) {
            for(let handler of handlers) {
                handler.centerEventHandler(eid, data);
            }
        }
    }

    public addListener(eid: number, handler: I_GameEventHandler): void {
        let handlers = this.listeners[eid];
        if(!handlers) {
            handlers = this.listeners[eid] = [];
        }

        if(handlers.indexOf(handler) !== -1) {
            return;
        }

        handlers.push(handler);
    }

    public removeListener(eid: number, handler: I_GameEventHandler): void {
        const handlers = this.listeners[eid];
        if(handlers) {
            const index: number = handlers.indexOf(handler);
            handlers.splice(index, 1);
        }
    }
}

const enum E_GameEvent {
    Resize
}