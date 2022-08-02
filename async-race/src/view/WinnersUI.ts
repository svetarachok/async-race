export class WinnersUI {
  winners: HTMLElement;

  winHeader: HTMLElement;

  winPageTitle: HTMLElement;

  winWrapper: HTMLElement;

  winTable: HTMLTableElement;

  tabHeader: HTMLTableSectionElement;

  tabHeaderRow: HTMLTableRowElement;

  tabHeaderCellNum: HTMLTableCellElement;

  tabHeaderCellImg: HTMLTableCellElement;

  tabHeaderCellName: HTMLTableCellElement;

  tabHeaderCellWins: HTMLTableCellElement;

  tabHeaderCellTime: HTMLTableCellElement;

  static pageNumber: number = 1;

  constructor() {
    this.winners = <HTMLElement> this.createElement('section', 'winners', 'winners');
    this.winHeader = this.createElement('h1', 'page-header');
    this.winPageTitle = <HTMLElement> this.createElement('p', 'pages-header');
    this.winWrapper = this.createElement('div', 'winners__wrapper');
    this.winTable = <HTMLTableElement> this.createElement('table', 'win__table', 'winners');
    this.tabHeader = <HTMLTableSectionElement> this.createElement('thead', 'win__table_header');
    this.tabHeaderRow = <HTMLTableRowElement> this.createElement('tr');
    this.tabHeaderCellNum = <HTMLTableCellElement> this.createElement('th');
    this.tabHeaderCellImg = <HTMLTableCellElement> this.createElement('th');
    this.tabHeaderCellName = <HTMLTableCellElement> this.createElement('th');
    this.tabHeaderCellWins = <HTMLTableCellElement> this.createElement('th');
    this.tabHeaderCellTime = <HTMLTableCellElement> this.createElement('th');
  }

  private createElement(element: string, elClass?: string, elId?: string) {
    const elem: HTMLElement = document.createElement(element);
    if (elClass) {
      elem.classList.add(elClass);
    }
    if (elId) {
      elem.id = elId;
    }
    return elem;
  }

  drawWinnersTable() {
    this.winHeader.textContent = 'Winners';
    this.winPageTitle.innerHTML = `Page ${WinnersUI.pageNumber}`;
    this.tabHeaderCellNum.textContent = 'Number';
    this.tabHeaderCellImg.textContent = 'Car';
    this.tabHeaderCellName.textContent = 'Name';
    this.tabHeaderCellWins.textContent = 'Wins';
    this.tabHeaderCellTime.textContent = 'Best time (seconds)';
    this.tabHeaderRow.append(
      this.tabHeaderCellNum,
      this.tabHeaderCellImg,
      this.tabHeaderCellName,
      this.tabHeaderCellWins,
      this.tabHeaderCellTime,
    );
    this.tabHeader.append(this.tabHeaderRow);
    this.winTable.append(this.tabHeader);
    this.winWrapper.append(this.winTable);
    this.winners.append(this.winHeader, this.winPageTitle, this.winWrapper);
    return this.winners;
  }

  drawWinners() {

  }
}
