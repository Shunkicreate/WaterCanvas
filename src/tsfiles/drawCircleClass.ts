export interface _IClass {
    x: number;
    y: number;
    r: number;
    h: number;
    s: number;
    b: number;
    a: number;
}
export default class drawCircle implements _IClass {
    x: number
    y: number
    r: number
    h: number
    s: number
    b: number
    a: number
    constructor(x: number, y: number, r: number, h: number, s: number, b: number, a: number) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.h = h;
        this.s = s;
        this.b = b;
        this.a = a;
      }
}