import WindowStatus from "./WindowStatus"
export default class WindowStatusClass implements WindowStatus{
  WindowWidth: number
  BlurValue: number
  ColorMode: number
  WindowHeight: number
  Mode: string
  ChangeTwoPic: string
  ImgData: string
  SavedImageJudge: boolean
  CanvasReset: boolean
  AutoDraw: boolean
  IsLoading: boolean
  DrawAnotherPicture: boolean
  CanDraw: boolean
  Generate: boolean
  ImgToUrlJudge: boolean

  constructor(WindowWidth: number, WindowHeight: number, BlurValue: number, ColorMode: number, Mode: string, ChangeTwoPic: string, SavedImageJudge: boolean, CanvasReset: boolean, AutoDraw: boolean, IsLoading: boolean, DrawAnotherPicture: boolean, CanDraw: boolean, Generate: boolean, ImgData: string, ImgToUrlJudge: boolean) {
    this.WindowWidth = WindowWidth;
    this.WindowHeight = WindowHeight;
    this.BlurValue = BlurValue;
    this.ColorMode = ColorMode;
    this.Mode = Mode;
    this.ChangeTwoPic = ChangeTwoPic;
    this.SavedImageJudge = SavedImageJudge;
    this.CanvasReset = CanvasReset;
    this.AutoDraw = AutoDraw;
    this.IsLoading = IsLoading;
    this.DrawAnotherPicture = DrawAnotherPicture;
    this.CanDraw = CanDraw;
    this.Generate = Generate;
    this.ImgData = ImgData;
    this.ImgToUrlJudge = ImgToUrlJudge
  }
}