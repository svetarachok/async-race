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

export interface WinnerData {
  wins: number,
  time: number,
  id: number,
}

export interface WinnerInterface {
  id?: number,
  color: string,
  name: string,
  wins: number,
  time: number,
}

export type TableElement = HTMLTableRowElement | HTMLTableCellElement;

export interface WinnersUIInterface {
  id?: number,
  color: string,
  name: string,
  wins: number,
  time: number,
  tabRow: HTMLTableRowElement;
  tabCellNum: HTMLTableCellElement;
  tabCellImg: HTMLTableCellElement;
  tabCellName: HTMLTableCellElement;
  tabCellWins: HTMLTableCellElement;
  tabCellTime: HTMLTableCellElement;
}
