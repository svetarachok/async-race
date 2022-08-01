import { CarInterface } from '../model/ts-interfaces';
import { CarUI } from './CarUI';
import { carsPerPage, carNames } from '../components/constants';
import { getRandomCarsData } from '../components/utils';

export class GaragePageUI {
  elem: HTMLElement;

  carsTrack: HTMLElement;

  title: HTMLElement;

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

  static carStorage: CarInterface[] = [];

  static carToUpdateId: number = 0;

  static pageNumber: number = 1;

  constructor() {
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
    this.title = this.createElement('h1', 'garage-page-header');
    this.pageTitle = <HTMLElement> this.createElement('p', 'page-header');
    this.pageTitle.innerHTML = `Page ${GaragePageUI.pageNumber}`;
    this.carsTrack = this.createElement('div', 'cars-track');
    this.pagination = this.createElement('div', 'pagination-section');
    this.prevBtn = <HTMLButtonElement> this.createElement('button', 'btn', 'prev-btn');
    this.nextBtn = <HTMLButtonElement> this.createElement('button', 'btn', 'prev-btn');
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

  drawGarage(carsCounter: string) {
    this.title.innerHTML = `Garage (${carsCounter})`;
    this.raceBtn.textContent = 'Race';
    this.resetBtn.textContent = 'Reset';
    this.generateCarsBtn.textContent = 'Generate Cars';
    this.prevBtn.textContent = 'Prev';
    this.nextBtn.textContent = 'Next';
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
      this.title,
      this.pageTitle,
      this.carsTrack,
      this.pagination,
    );
    return this.elem;
  }

  public updateGarageView(cars: CarInterface[], carsCounter: string) {
    this.carsTrack.innerHTML = '';
    this.title.innerHTML = `Garage (${carsCounter})`;
    this.drawCars(cars);
  }

  public drawCars(cars: CarInterface[]) {
    GaragePageUI.carStorage = [];
    cars.forEach((car) => {
      const carTemplate = new CarUI(car);
      GaragePageUI.carStorage.push(carTemplate);
      this.carsTrack.append(carTemplate.draw());
    });
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
        const targetCar = GaragePageUI.carStorage.filter((car) => car.id === Number(targetId));
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
}
