import {
  CarInterface, CarUIInteface, WinnerData, WinnerInterface,
} from '../model/ts-interfaces';
import { CarUI } from './CarUI';
import { carsPerPage, carNames, winnersPerPage } from '../components/constants';
import { getRandomCarsData, getDistance } from '../components/utils';
import { WinnersUI } from './WinnersUI';

export class GaragePageUI {
  header: HTMLElement;

  garageBtn: HTMLElement;

  winnersBtn: HTMLElement;

  elem: HTMLElement;

  carsTrack: HTMLElement;

  garageHeader: HTMLElement;

  pageTitle: HTMLElement;

  createCarForm: HTMLDivElement;

  createCarTextInput: HTMLInputElement;

  createCarColorInput: HTMLInputElement;

  createCarBtn: HTMLButtonElement;

  updateCarForm: HTMLDivElement;

  updateCartextInput: HTMLInputElement;

  updateCarcolorInput: HTMLInputElement;

  updateCarBtn: HTMLButtonElement;

  trackControllers: HTMLElement;

  raceBtn: HTMLButtonElement;

  resetBtn: HTMLButtonElement;

  generateCarsBtn: HTMLButtonElement;

  prevBtn: HTMLButtonElement;

  nextBtn: HTMLButtonElement;

  pagination: HTMLElement;

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

  popUp: HTMLElement;

  tabBody: HTMLTableSectionElement;

  tabPagination: HTMLElement;

  tabPrevBtn: HTMLButtonElement;

  tabNextBtn: HTMLButtonElement;

  static carStorage: CarUIInteface[] = [];

  static winnersStorage: WinnerInterface[] = [];

  static carToUpdateId: number = 0;

  static pageNumber: number = 1;

  static winPageNumber: number = 1;

  static resID: number = 0;

  constructor() {
    this.header = this.createElement('header', 'header');
    this.garageBtn = this.createElement('button', 'btn', 'garage-page-btn');
    this.garageBtn.textContent = 'To Garage';
    this.winnersBtn = this.createElement('button', 'btn', 'winners-page-btn');
    this.winnersBtn.textContent = 'To Winners';
    this.elem = this.createElement('main', 'main');
    this.elem.classList.add('main');
    this.elem.id = 'garage';
    this.createCarForm = this.createElement('div', 'cars_constructor', 'create-form') as HTMLDivElement;
    this.createCarTextInput = <HTMLInputElement> this.createElement('input');
    this.createCarTextInput.type = 'text';
    this.createCarColorInput = <HTMLInputElement> this.createElement('input');
    this.createCarColorInput.type = 'color';
    this.createCarBtn = <HTMLButtonElement> this.createElement('button', 'btn');
    this.createCarBtn.textContent = 'Create Car';
    this.updateCarForm = this.createElement('div', 'cars_constructor', 'update-form') as HTMLDivElement;
    this.updateCartextInput = <HTMLInputElement> this.createElement('input');
    this.updateCartextInput.type = 'text';
    this.updateCarcolorInput = <HTMLInputElement> this.createElement('input');
    this.updateCarcolorInput.type = 'color';
    this.updateCarBtn = <HTMLButtonElement> this.createElement('button', 'btn');
    this.updateCarBtn.textContent = 'Update Car';
    this.trackControllers = this.createElement('div', 'track-controllers');
    this.raceBtn = <HTMLButtonElement> this.createElement('button', 'btn', 'race-btn');
    this.resetBtn = <HTMLButtonElement> this.createElement('button', 'btn', 'reset-btn');
    this.generateCarsBtn = <HTMLButtonElement> this.createElement('button', 'btn', 'generate-cars-btn');
    this.garageHeader = this.createElement('h1', 'page-header');
    this.pageTitle = <HTMLElement> this.createElement('p', 'pages-header');
    this.pageTitle.innerHTML = `Page ${GaragePageUI.pageNumber}`;
    this.carsTrack = this.createElement('div', 'cars-track');
    this.pagination = this.createElement('div', 'pagination-section');
    this.prevBtn = <HTMLButtonElement> this.createElement('button', 'btn', 'prev-btn');
    this.nextBtn = <HTMLButtonElement> this.createElement('button', 'btn', 'next-btn');
    // winners section
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
    this.tabBody = <HTMLTableSectionElement> this.createElement('tbody', 'win__table_body');
    this.tabPagination = this.createElement('div', 'pagination-section');
    this.tabPrevBtn = <HTMLButtonElement> this.createElement('button', 'btn', 'tab-prev-btn');
    this.tabNextBtn = <HTMLButtonElement> this.createElement('button', 'btn', 'tab-next-btn');
    // pop up
    this.popUp = this.createElement('div', 'popUp', 'popUp');
    this.animationStart = this.animationStart.bind(this);
    this.selectCar();
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

  drawWinnersTable(winnersCounter: string) {
    this.winHeader.textContent = `Winners (${winnersCounter})`;
    this.winPageTitle.innerHTML = `Page ${GaragePageUI.winPageNumber}`;
    this.tabHeaderCellNum.textContent = 'Number';
    this.tabHeaderCellImg.textContent = 'Car';
    this.tabHeaderCellName.textContent = 'Name';
    this.tabHeaderCellWins.textContent = 'Wins ';
    this.tabHeaderCellTime.textContent = 'Best time (seconds) ';
    this.tabPrevBtn.textContent = 'Prev';
    this.tabNextBtn.textContent = 'Next';
    this.tabHeaderRow.append(
      this.tabHeaderCellNum,
      this.tabHeaderCellImg,
      this.tabHeaderCellName,
      this.tabHeaderCellWins,
      this.tabHeaderCellTime,
    );
    this.tabHeader.append(this.tabHeaderRow);
    this.winTable.append(this.tabHeader, this.tabBody);
    this.winWrapper.append(this.winTable);
    this.tabPagination.append(this.tabPrevBtn, this.tabNextBtn);
    this.winners.append(this.winHeader, this.winPageTitle, this.winWrapper, this.tabPagination);
    this.winners.style.display = 'none';
    return this.winners;
  }

  drawGarage(carsCounter: string) {
    this.garageHeader.innerHTML = `Garage (${carsCounter})`;
    this.raceBtn.textContent = 'Race';
    this.resetBtn.textContent = 'Reset';
    this.generateCarsBtn.textContent = 'Generate Cars';
    this.prevBtn.textContent = 'Prev';
    this.prevBtn.disabled = true;
    this.nextBtn.textContent = 'Next';
    this.nextBtn.disabled = true;
    this.resetBtn.disabled = true;
    this.createCarForm.append(
      this.createCarTextInput,
      this.createCarColorInput,
      this.createCarBtn,
    );
    this.updateCarForm.append(
      this.updateCartextInput,
      this.updateCarcolorInput,
      this.updateCarBtn,
    );
    this.trackControllers.append(this.raceBtn, this.resetBtn, this.generateCarsBtn);
    this.pagination.append(this.prevBtn, this.nextBtn);
    this.elem.append(
      this.createCarForm,
      this.updateCarForm,
      this.trackControllers,
      this.garageHeader,
      this.pageTitle,
      this.carsTrack,
      this.pagination,
    );
    return this.elem;
  }

  drawPopUp(winner: WinnerData) {
    const { id } = winner;
    const car = GaragePageUI.carStorage.filter((carItem) => carItem.id === id)[0];
    this.popUp.textContent = `${car.name} went first (${winner.time / 1000}s)`;
    this.elem.append(this.popUp);
  }

  public updateGarageView(cars: CarInterface[], carsCounter: string) {
    this.carsTrack.innerHTML = '';
    this.garageHeader.innerHTML = `Garage (${carsCounter})`;
    this.drawCars(cars);
  }

  public updateWinnersView(winners: WinnerInterface[], winnerCounter: string) {
    this.tabBody.innerHTML = '';
    this.winHeader.innerHTML = `Winners (${winnerCounter})`;
    this.drawWinners(winners);
  }

  public drawCars(cars: CarInterface[]) {
    GaragePageUI.carStorage = [];
    cars.forEach((car) => {
      const carTemplate = new CarUI(car);
      GaragePageUI.carStorage.push(carTemplate);
      this.carsTrack.append(carTemplate.draw());
    });
    const carsNumber = Number(this.garageHeader.innerHTML.split(' ')[1].slice(1, -1));
    if (carsNumber > 7 && GaragePageUI.pageNumber < Math.ceil(carsNumber / 7)) {
      this.nextBtn.disabled = false;
    } else {
      this.nextBtn.disabled = true;
    }
    if (GaragePageUI.pageNumber > 1) {
      this.prevBtn.disabled = false;
    } else {
      this.prevBtn.disabled = true;
    }
  }

  public drawWinners(winners: WinnerInterface[]) {
    GaragePageUI.winnersStorage = [];
    winners.forEach((winner) => {
      const winnerTemplate = new WinnersUI(winner);
      GaragePageUI.winnersStorage.push(winnerTemplate);
      this.tabBody.append(winnerTemplate.draw());
    });
    const winnersNumber = Number(this.winHeader.innerHTML.split(' ')[1].slice(1, -1));
    if (winnersNumber > 10 && GaragePageUI.winPageNumber < Math.ceil(winnersNumber / 10)) {
      console.log(GaragePageUI.winPageNumber);
      this.tabNextBtn.disabled = false;
    } else {
      this.tabNextBtn.disabled = true;
    }
    if (GaragePageUI.winPageNumber > 1) {
      this.tabPrevBtn.disabled = false;
    } else {
      this.tabPrevBtn.disabled = true;
    }
  }

  public listenCreateCar(handler: (ar1: string, ar2: string, arg3: number) => void) {
    this.createCarBtn.addEventListener('click', (event) => {
      event.preventDefault();

      if (this.createCarTextInput && this.createCarColorInput) {
        const inputText = this.createCarTextInput.value;
        const inputColor = this.createCarColorInput.value;
        handler(inputText, inputColor, GaragePageUI.pageNumber);
      }
      this.createCarTextInput.value = '';
      this.createCarColorInput.value = '#000000';
    });
  }

  private selectCar() {
    this.carsTrack.addEventListener('click', (event: Event): void => {
      const target: HTMLElement = <HTMLElement>event.target;
      if (target.textContent === 'Select') {
        const targetId: string = target.id.split('-')[3];
        const arr = GaragePageUI.carStorage;
        const targetCar = arr.filter((car) => car.id === Number(targetId));
        this.updateCartextInput.value = targetCar[0].name;
        this.updateCarcolorInput.value = targetCar[0].color;
        if (targetCar[0].id) {
          GaragePageUI.carToUpdateId = targetCar[0].id;
        }
      }
    });
  }

  public listenUpdateCar(handler: (id: number, body: CarInterface) => void) {
    this.updateCarBtn.addEventListener('click', (event) => {
      event.preventDefault();

      if (this.updateCartextInput && this.updateCarcolorInput) {
        const inputText = this.updateCartextInput.value;
        const inputColor = this.updateCarcolorInput.value;
        handler(GaragePageUI.carToUpdateId, { name: inputText, color: inputColor });
      }
      this.updateCartextInput.value = '';
      this.updateCarcolorInput.value = '#000000';
    });
  }

  public listenDeleteCar(handler: (arg: string, page: number) => void) {
    this.carsTrack.addEventListener('click', (event: Event) => {
      const target: HTMLElement = <HTMLElement>event.target;
      if (target.textContent === 'Delete') {
        const targetId: string = target.id.split('-')[3];
        handler(targetId, GaragePageUI.pageNumber);
      }
    });
  }

  public listenGenerateCars(handler: (arg1: string, arg2: string, arg3: number) => void) {
    this.generateCarsBtn.addEventListener('click', (event: Event) => {
      event.preventDefault();

      const carsArr: CarInterface [] = [];
      for (let i = 0; i < 100; i += 1) {
        const car: CarInterface = getRandomCarsData(carNames);
        carsArr.push(car);
      }
      carsArr.map((car) => handler(car.name, car.color, GaragePageUI.pageNumber));
    });
  }

  public listenPages(handler: (page: number, limit: number) => void) {
    this.prevBtn.addEventListener('click', () => {
      GaragePageUI.pageNumber -= 1;
      handler(GaragePageUI.pageNumber, carsPerPage);
      this.pageTitle.innerHTML = `Page ${GaragePageUI.pageNumber}`;
    });
    this.nextBtn.addEventListener('click', () => {
      GaragePageUI.pageNumber += 1;
      handler(GaragePageUI.pageNumber, carsPerPage);
      this.pageTitle.innerHTML = `Page ${GaragePageUI.pageNumber}`;
    });
  }

  public listenStart(handler: (id: number, car: CarUIInteface) => void) {
    this.carsTrack.addEventListener('click', (event: Event) => {
      const target: HTMLButtonElement = <HTMLButtonElement>event.target;
      if (target.classList.contains('start-race')) {
        const id = target.id.split('-')[1];
        const arr = GaragePageUI.carStorage;
        const targetCar = arr.filter((car) => car.id === Number(id))[0];
        handler(Number(id), targetCar);
      }
    });
  }

  public animationStart(id: number, velocity: number, distance: number) {
    const car = GaragePageUI.carStorage.filter((carItem) => carItem.id === id)[0];
    const btn = car.startBtn;
    btn.disabled = true;
    const duration = Math.round(distance / velocity);
    const screenDistance = Math.floor(getDistance(car.carImgWrapper, car.carFlag) + 70);
    let start: number | null = null;
    function step(timestamp: number) {
      if (!start) start = timestamp;
      const time: number = timestamp - start;
      const passed = Math.round(time * (screenDistance / duration));
      const carImg = car.carImgWrapper;
      carImg.style.transform = `translateX(${Math.min(passed, screenDistance)}px)`;
      if (passed < duration) GaragePageUI.resID = requestAnimationFrame(step);
    }
    GaragePageUI.resID = requestAnimationFrame(step);
    return GaragePageUI.resID;
  }

  public animationEnd(success: boolean) {
    if (!success) window.cancelAnimationFrame(GaragePageUI.resID);
  }

  public listenStop(handler: (id: number, car: CarUIInteface) => void) {
    this.carsTrack.addEventListener('click', (event: Event) => {
      const target: HTMLButtonElement = <HTMLButtonElement>event.target;
      if (target.classList.contains('stop-race')) {
        const id = target.id.split('-')[1];
        const arr = GaragePageUI.carStorage;
        const targetCar = arr.filter((car) => car.id === Number(id))[0];
        handler(Number(id), targetCar);
      }
    });
  }

  public listenRace(handler: (page: number, limit: number) => void) {
    this.raceBtn.addEventListener('click', () => {
      const page: string = this.pageTitle.textContent as string;
      const pageNumber: number = Number(page.split(' ')[1] as string);
      const limit = carsPerPage;
      this.raceBtn.disabled = true;
      handler(pageNumber, limit);
      this.resetBtn.disabled = false;
    });
    this.resetBtn.addEventListener('click', () => {
      this.raceBtn.disabled = false;
      // cars.forEach((car) => {
      //   this.returnToStart(0, car);
      // });
      this.popUp.remove();
      this.resetBtn.disabled = true;
    });
  }

  public returnToStart(velocity: number, car: CarUIInteface) {
    const carImg = car.carImgWrapper;
    carImg.style.transform = `translateX(${velocity}px)`;
    return car;
  }

  public listenWinPages(handler: (page: number, limit: number, sort: string) => void) {
    this.tabPrevBtn.addEventListener('click', () => {
      GaragePageUI.winPageNumber -= 1;
      handler(GaragePageUI.winPageNumber, winnersPerPage, 'id');
      this.winPageTitle.innerHTML = `Page ${GaragePageUI.winPageNumber}`;
    });
    this.tabNextBtn.addEventListener('click', () => {
      GaragePageUI.winPageNumber += 1;
      handler(GaragePageUI.winPageNumber, winnersPerPage, 'id');
      this.winPageTitle.innerHTML = `Page ${GaragePageUI.winPageNumber}`;
    });
  }

  public listenWins(handler: (page: number, limit: number, sort: string, order: string) => void) {
    this.tabHeaderCellWins.addEventListener('click', (event: Event) => {
      const target: HTMLButtonElement = <HTMLButtonElement>event.target;
      console.log(target);
      if (target.classList.contains('asc-sorted')) {
        handler(GaragePageUI.winPageNumber, winnersPerPage, 'wins', 'DESC');
        this.tabHeaderCellWins.classList.remove('asc-sorted');
        this.tabHeaderCellWins.classList.add('desc-sorted');
        this.tabHeaderCellWins.innerText = 'Wins 🠗';
      } else {
        handler(GaragePageUI.winPageNumber, winnersPerPage, 'wins', 'ASC');
        this.tabHeaderCellWins.classList.remove('desc-sorted');
        this.tabHeaderCellWins.classList.add('asc-sorted');
        this.tabHeaderCellWins.innerText = 'Wins 🠕';
      }
    });
  }

  public listenTimeSort(
    handler: (page: number, limit: number, sort: string, order: string) => void,
  ) {
    this.tabHeaderCellTime.addEventListener('click', (event: Event) => {
      const target: HTMLButtonElement = <HTMLButtonElement>event.target;
      console.log(target);
      if (target.classList.contains('asc-sorted')) {
        handler(GaragePageUI.winPageNumber, winnersPerPage, 'time', 'DESC');
        this.tabHeaderCellTime.classList.remove('asc-sorted');
        this.tabHeaderCellTime.classList.add('desc-sorted');
        this.tabHeaderCellTime.innerText = 'Best time (seconds) 🠗';
      } else {
        handler(GaragePageUI.winPageNumber, winnersPerPage, 'time', 'ASC');
        this.tabHeaderCellTime.classList.remove('desc-sorted');
        this.tabHeaderCellTime.classList.add('asc-sorted');
        this.tabHeaderCellTime.innerText = 'Best time (seconds) 🠕';
      }
    });
  }
}
