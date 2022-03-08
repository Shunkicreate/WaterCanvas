class drawCircle {
    x: number[] = new Array();
    y: number[] = new Array();
    r: number[] = new Array();
    h: number[] = new Array();
    s: number[] = new Array();
    b: number[] = new Array();
    a: number[] = new Array();

}

export interface _IdrawCircle {
    x: number[];
    y: number[];
    r: number[];
    h: number[];
    s: number[];
    b: number[];
    a: number[];
}

export default class drawCircles extends drawCircle {
    dataArray:drawCircle[] = new Array();
}

