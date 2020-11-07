class VectorExtension {
    public static moveIncrementByPoint(movePoint: number[], startPoint: number[], endPoint: number[], speed: number): void {
        const distanceOfTwoPoint = this.distanceOfTwoPoint(startPoint, endPoint);
        const x: number = (endPoint[0] - startPoint[0]) / distanceOfTwoPoint * speed;
        const y: number = (endPoint[1] - startPoint[0]) / distanceOfTwoPoint * speed;
        movePoint[0] = x;
        movePoint[1] = y;
    }

    public static distanceOfTwoPoint(p0: number[], p1: number[]): number {
        const xx: number = p0[0] - p0[1];
        const yy: number = p1[0] - p1[1];
        return Math.sqrt(xx * xx + yy * yy);
    }
}