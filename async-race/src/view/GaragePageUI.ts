import { CarInterface } from '../model/ts-interfaces';
import { CarUI } from './CarUI';

export class GaragePageUI {
  elem: HTMLElement;

  carsTrack: HTMLElement;

  title: HTMLElement;

  pageTitle: HTMLElement;

  createCarForm: HTMLFormElement;

  createCarTextInput: HTMLInputElement;

  createCarColorInput: HTMLInputElement;

  createCarBtn: HTMLButtonElement;

  updateCarForm: HTMLFormElement;

  updateCartextInput: HTMLInputElement;

  updateCarcolorInput: HTMLInputElement;

  updateCarBtn: HTMLButtonElement;

  static carStorage: CarInterface[] = [];

  constructor() {
    this.elem = this.createElement('main', 'main');
    this.elem.classList.add('main');
    this.elem.id = 'garage';
    this.createCarForm = this.createElement('div', 'cars_constructor', 'create-form') as HTMLFormElement;
    this.createCarTextInput = <HTMLInputElement> this.createElement('input');
    this.createCarTextInput.type = 'text';
    this.createCarColorInput = <HTMLInputElement> this.createElement('input');
    this.createCarColorInput.type = 'color';
    this.createCarBtn = <HTMLButtonElement> this.createElement('button', 'btn');
    this.createCarBtn.textContent = 'Create Car';
    this.createCarForm.append(
      this.createCarTextInput,
      this.createCarColorInput,
      this.createCarBtn,
    );
    this.updateCarForm = this.createElement('from', 'cars_constructor', 'create-form') as HTMLFormElement;
    this.updateCartextInput = <HTMLInputElement> this.createElement('input');
    this.updateCartextInput.type = 'text';
    this.updateCarcolorInput = <HTMLInputElement> this.createElement('input');
    this.updateCarcolorInput.type = 'color';
    this.updateCarBtn = <HTMLButtonElement> this.createElement('button', 'btn');
    this.updateCarBtn.textContent = 'Update Car';
    this.updateCarForm.append(
      this.updateCartextInput,
      this.updateCarcolorInput,
      this.updateCarBtn,
    );
    this.title = this.createElement('h1', 'garage-page-header');
    this.pageTitle = this.createElement('p', 'page-header');
    this.carsTrack = this.createElement('div', 'cars-track');
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
    this.pageTitle.innerHTML = 'Page 1';
    this.elem.append(
      this.createCarForm,
      this.updateCarForm,
      this.title,
      this.pageTitle,
      this.carsTrack,
    );
    return this.elem;
  }

  updateGarage(cars: CarInterface[], carsCounter: string) {
    this.carsTrack.innerHTML = '';
    this.title.innerHTML = `Garage (${carsCounter})`;
    this.drawCars(cars);
  }

  drawCars(cars: CarInterface[]) {
    GaragePageUI.carStorage = [];
    cars.forEach((car) => {
      const carTemplate = new CarUI(car);
      GaragePageUI.carStorage.push(carTemplate);
      this.carsTrack.append(carTemplate.draw());
    });
  }

  listenCreateCar(handler: (arg1: string, arg2: string) => void) {
    this.createCarBtn.addEventListener('click', (event) => {
      event.preventDefault();

      if (this.createCarTextInput && this.createCarColorInput) {
        const inputText = this.createCarTextInput.value;
        const inputColor = this.createCarColorInput.value;
        handler(inputText, inputColor);
      }
      this.createCarTextInput.value = '';
      this.createCarColorInput.value = '#000000';
    });
  }

  selectCar() {
    let res: string = '';
    this.carsTrack.addEventListener('click', (event: Event) => {
      const target: HTMLElement = <HTMLElement>event.target;
      if (target.textContent === 'Select') {
        const targetId: string = target.id.split('-')[3];
        const targetCar = GaragePageUI.carStorage.filter((car) => car.id === Number(targetId));
        res = targetCar[0].name;
        this.updateCartextInput.value = res;
        console.log(this.updateCartextInput);
      }
    });
    return this.updateCartextInput;
  }

  listenUpdateCar() {
    this.updateCarBtn.addEventListener('click', (event) => {
      event.preventDefault();
    });
  }

  listenDeleteCar(handler: (arg: string) => void) {
    this.carsTrack.addEventListener('click', (event: Event) => {
      const target: HTMLElement = <HTMLElement>event.target;
      if (target.textContent === 'Delete') {
        const targetId: string = target.id.split('-')[3];
        handler(targetId);
      }
    });
  }
}
