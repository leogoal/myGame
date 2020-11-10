class AnimationTimeControl {
    private elapsedRealTime: number;
    private _distanceTime: number;

    public get distanceTime(): number {
        return this._distanceTime;
    }

    public set distanceTime(value: number) {
        if (value > 0) {
            this._distanceTime = value;
        } else {
            this._distanceTime = 1;
        }
    }

    public reset(): void {
        this.elapsedRealTime = 0;
    }

    public heartbeat(gameTime: GameTime): number {
        let self = this;
        self.elapsedRealTime += gameTime.elapsedGameTime;
        const distanceTime: number = self.distanceTime;

        if (typeof distanceTime === "number" && self.elapsedRealTime >= distanceTime) {
            const count: number = Math.floor(self.elapsedRealTime / distanceTime);
            self.elapsedRealTime -= count * distanceTime;
            return count;
        } else {
            return 0;
        }
    }
}