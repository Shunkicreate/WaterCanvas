import drawCircle from "./drawCircleClass";

export default class drawCircles {
    x: number[] = new Array();
    y: number[] = new Array();
    r: number[] = new Array();
    h: number[] = new Array();
    s: number[] = new Array();
    b: number[] = new Array();
    a: number[] = new Array();
    constructor(x: number, y: number, r: number, h: number, s: number, b: number, a: number) {
        this.x.push(x);
        this.y.push(y);
        this.r.push(r);
        this.h.push(h);
        this.s.push(s);
        this.b.push(b);
        this.a.push(a);
    }
    // pushDrawCircle(addedData:drawCircle) {
    //     this.x.push(addedData.x);
    //     this.y.push(addedData.y);
    //     this.r.push(addedData.r);
    //     this.h.push(addedData.h);
    //     this.s.push(addedData.s);
    //     this.b.push(addedData.b);
    //     this.a.push(addedData.a);
    // }
}

// export interface _IdrawCircle {
//     x: number[];
//     y: number[];
//     r: number[];
//     h: number[];
//     s: number[];
//     b: number[];
//     a: number[];
// }

// export default class drawCircles extends drawCircle {
//     dataArray: drawCircle[] = new Array();
//     // aarray: Array<{
//     //         x: number[];
//     //         y: number[];
//     //         r: number[];
//     //         h: number[];
//     //         s: number[];
//     //         b: number[];
//     //         a: number[];
//     // }>;
//     // constructor(x: number, y: number, r: number, h: number, s: number, b: number, a: number) {
//     //     this.aarray.push
// }

