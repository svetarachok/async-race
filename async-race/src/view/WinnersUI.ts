import { WinnerInterface, TableElement, WinnersUIInterface } from '../model/ts-interfaces';

export class WinnersUI implements WinnersUIInterface {
  id: number;

  color: string;

  name: string;

  wins: number;

  time: number;

  tabRow: HTMLTableRowElement;

  tabCellNum: HTMLTableCellElement;

  tabCellImg: HTMLTableCellElement;

  tabCellName: HTMLTableCellElement;

  tabCellWins: HTMLTableCellElement;

  tabCellTime: HTMLTableCellElement;

  static pageNumber: number = 1;

  constructor({
    id, color, name, wins, time,
  }: WinnerInterface) {
    this.id = id as number;
    this.color = color;
    this.name = name;
    this.wins = wins;
    this.time = time;
    this.tabRow = <HTMLTableRowElement> this.createElement('tr');
    this.tabCellNum = <HTMLTableCellElement> this.createElement('th');
    this.tabCellImg = <HTMLTableCellElement> this.createElement('th');
    this.tabCellName = <HTMLTableCellElement> this.createElement('th');
    this.tabCellWins = <HTMLTableCellElement> this.createElement('th');
    this.tabCellTime = <HTMLTableCellElement> this.createElement('th');
  }

  private createElement(element: string, elClass?: string, elId?: string) {
    const elem: TableElement = <TableElement>document.createElement(element);
    if (elClass) {
      elem.classList.add(elClass);
    }
    if (elId) {
      elem.id = elId;
    }
    return elem;
  }

  draw() {
    this.tabCellNum.textContent = '0';
    this.tabCellImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 122.9 35" style="enable-background:new 0 0 122.9 35; width: 4rem;" xml:space="preserve">
  <g>
    <path class="st0" d="M23.5,13.6c5.9,0,10.7,4.8,10.7,10.7S29.4,35,23.5,35s-10.7-4.8-10.7-10.7S17.5,13.6,23.5,13.6L23.5,13.6z    M43.8,5c-1.3-2.9-1.1-2.8-4-2.2c-2.2,0.4-5,1.2-5.3,2.6c-0.2,0.7,0.3,1.5,1.4,2.2c2.1,1.2,4.1,2.5,6.2,3.7c2.8,1.1,4,0.5,3.2-2.1   C44.9,7.7,44.4,6.3,43.8,5L43.8,5z M99,19.3c2.8,0,5,2.2,5,5s-2.2,5-5,5c-2.8,0-5-2.2-5-5C94,21.5,96.3,19.3,99,19.3L99,19.3z    M23.5,19.3c2.8,0,5,2.2,5,5s-2.2,5-5,5c-2.8,0-5-2.2-5-5C18.5,21.5,20.7,19.3,23.5,19.3L23.5,19.3z M76.7,12.5H53   c-2.1-0.1-3.5-1.2-4.7-2.8l-2.9-7.5C54,2.2,59,1.7,67.1,5.7C70.8,7.6,74,9.5,76.7,12.5L76.7,12.5z M99,13.6   c5.9,0,10.7,4.8,10.7,10.7c0,5.9-4.8,10.7-10.7,10.7s-10.7-4.8-10.7-10.7S93.1,13.6,99,13.6L99,13.6z M82.1,10.3   c9.1-1.8,27.8-1.9,35.6,2.6c1.5,0.9,2.2,2.4,2,2.7c-0.2,0.4-0.1,0.1-0.2,0.2c1.3,0.9,2.4,1.9,3.4,2.9c-3.8,8.6-9.6,12.6-12.1,10   c7.1-23.3-32.7-23.2-23.4,0.8H37.1c2.2-24-26.7-26.7-26.6-2.8c0,1.2-0.4,1.9-1,2.2c-2,1.1-5.8-0.8-7.1-2.7c-0.8-1.1-1.2-2.4-1.3-4   c0.5-2.6,1.8-4.3,3.3-5.6L0,11.4c0.4-2.9,17.9-3.8,21.9-4.8c4.1-1,8.2-2.5,12.2-4.1c13.5-4.1,23.4-3.2,36.3,1.9   C74.7,6.2,78.5,8.1,82.1,10.3L82.1,10.3z" style="fill: ${this.color};"/>
  </g>
  </svg>`;
    this.tabCellName.textContent = this.name;
    this.tabCellWins.textContent = String(this.wins);
    this.tabCellTime.textContent = String(this.time / 1000);
    this.tabRow.append(
      this.tabCellNum,
      this.tabCellImg,
      this.tabCellName,
      this.tabCellWins,
      this.tabCellTime,
    );
    return this.tabRow;
  }
}
