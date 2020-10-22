class GameEventCenter {
    public static readonly Instance: GameEventCenter = new GameEventCenter();
    private listeners: {[eid: number]: IGameEventHandler[]} = {};

    public dispatcher(eid: number, data: any): void {
        const handlers = this.listeners[eid];
        if(handlers) {
            for(let handler of handlers) {
                handler.centerEventHandler(eid, data);
            }
        }
    }

    public addListener(eid: number, handler: IGameEventHandler): void {
        let handlers = this.listeners[eid];
        if(!handlers) {
            handlers = this.listeners[eid] = [];
        }

        if(handlers.indexOf(handler) !== -1) {
            return;
        }

        handlers.push(handler);
    }

    public removeListener(eid: number, handler: IGameEventHandler): void {
        const handlers = this.listeners[eid];
        if(handlers) {
            const index: number = handlers.indexOf(handler);
            handlers.splice(index, 1);
        }
    }
}

interface IGameEventHandler {
    centerEventHandler(eid: number, data: any);
}

const enum E_GameEvent {
    Resize
}