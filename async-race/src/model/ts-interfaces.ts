export interface CarInterface {
  name: string,
  color: string,
  id?: number
}

export interface CarUIInteface {
  name: string,
  color: string,
  id?: number,
  carConstructor: HTMLElement,
  carSelectBtn: HTMLButtonElement,
  carDeleteBtn: HTMLButtonElement,
  carName: HTMLElement,
  carWrapper: HTMLElement,
  carControllers: HTMLElement,
  startBtn: HTMLButtonElement,
  stopBtn: HTMLButtonElement,
  carImgWrapper: HTMLElement,
  carFlag: HTMLElement,
}

export interface WinnerInterface {
  id: number,
  wins: number,
  time: number
}
