import { CarInterface, CarUIInteface } from '../model/ts-interfaces';

export class CarUI implements CarUIInteface {
  car: HTMLDivElement;

  id: number | undefined;

  name: string;

  color: string;

  carConstructor: HTMLElement;

  carSelectBtn: HTMLButtonElement;

  carDeleteBtn: HTMLButtonElement;

  carName: HTMLElement;

  carWrapper: HTMLElement;

  carControllers: HTMLElement;

  startBtn: HTMLButtonElement;

  stopBtn: HTMLButtonElement;

  carImgWrapper: HTMLElement;

  carFlag: HTMLElement;

  constructor({ name, color, id }: CarInterface) {
    this.name = name;
    this.color = color;
    this.id = id;
    this.car = <HTMLDivElement> this.createElement('div', 'car');
    this.car.id = String(this.id);
    this.carConstructor = this.createElement('div', 'cars_constructor');
    this.carSelectBtn = <HTMLButtonElement> this.createElement('button', 'btn', `select-car-btn-${this.id}`);
    this.carDeleteBtn = <HTMLButtonElement> this.createElement('button', 'btn', `delete-car-btn-${this.id}`);
    this.carName = this.createElement('h2', 'car-name');
    this.carWrapper = this.createElement('div', 'car_wrapper');
    this.carControllers = this.createElement('div', 'car-controllers');
    this.startBtn = <HTMLButtonElement> this.createElement('button', 'btn', `start-${this.id}`);
    this.startBtn.classList.add('start-race');
    this.stopBtn = <HTMLButtonElement> this.createElement('button', 'btn', `stop-${this.id}`);
    this.stopBtn.classList.add('stop-race');
    this.carImgWrapper = this.createElement('div', 'car-img');
    this.carFlag = this.createElement('div', 'car-flag');
    // this.listenStartEngine();
  }

  draw() {
    this.carSelectBtn.textContent = 'Select';
    this.carDeleteBtn.textContent = 'Delete';
    this.carName.textContent = `${this.name}`;
    this.startBtn.textContent = 'A';
    this.stopBtn.textContent = 'B';
    this.carImgWrapper.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 122.9 35" style="enable-background:new 0 0 122.9 35;" xml:space="preserve">
    <g>
      <path class="st0" d="M23.5,13.6c5.9,0,10.7,4.8,10.7,10.7S29.4,35,23.5,35s-10.7-4.8-10.7-10.7S17.5,13.6,23.5,13.6L23.5,13.6z    M43.8,5c-1.3-2.9-1.1-2.8-4-2.2c-2.2,0.4-5,1.2-5.3,2.6c-0.2,0.7,0.3,1.5,1.4,2.2c2.1,1.2,4.1,2.5,6.2,3.7c2.8,1.1,4,0.5,3.2-2.1   C44.9,7.7,44.4,6.3,43.8,5L43.8,5z M99,19.3c2.8,0,5,2.2,5,5s-2.2,5-5,5c-2.8,0-5-2.2-5-5C94,21.5,96.3,19.3,99,19.3L99,19.3z    M23.5,19.3c2.8,0,5,2.2,5,5s-2.2,5-5,5c-2.8,0-5-2.2-5-5C18.5,21.5,20.7,19.3,23.5,19.3L23.5,19.3z M76.7,12.5H53   c-2.1-0.1-3.5-1.2-4.7-2.8l-2.9-7.5C54,2.2,59,1.7,67.1,5.7C70.8,7.6,74,9.5,76.7,12.5L76.7,12.5z M99,13.6   c5.9,0,10.7,4.8,10.7,10.7c0,5.9-4.8,10.7-10.7,10.7s-10.7-4.8-10.7-10.7S93.1,13.6,99,13.6L99,13.6z M82.1,10.3   c9.1-1.8,27.8-1.9,35.6,2.6c1.5,0.9,2.2,2.4,2,2.7c-0.2,0.4-0.1,0.1-0.2,0.2c1.3,0.9,2.4,1.9,3.4,2.9c-3.8,8.6-9.6,12.6-12.1,10   c7.1-23.3-32.7-23.2-23.4,0.8H37.1c2.2-24-26.7-26.7-26.6-2.8c0,1.2-0.4,1.9-1,2.2c-2,1.1-5.8-0.8-7.1-2.7c-0.8-1.1-1.2-2.4-1.3-4   c0.5-2.6,1.8-4.3,3.3-5.6L0,11.4c0.4-2.9,17.9-3.8,21.9-4.8c4.1-1,8.2-2.5,12.2-4.1c13.5-4.1,23.4-3.2,36.3,1.9   C74.7,6.2,78.5,8.1,82.1,10.3L82.1,10.3z" style="fill: ${this.color};"/>
    </g>
    </svg>`;
    this.carFlag.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 314.2 489.98"><g id="Layer_2" data-name="Layer 2" style="fill: #ff0006">
    <g id="Capa_1" data-name="Capa 1">
    <rect y="13.98" width="46.7" height="476"/>
    <path d="M66.9,14.68v150.1c82.4,50.9,164.9-50.9,247.3,0V14.68C231.8-36.22,149.3,65.68,66.9,14.68Z" />
    </g>
    </g>
    </svg>`;
    this.carConstructor.append(this.carSelectBtn, this.carDeleteBtn, this.carName);
    this.carControllers.append(this.startBtn, this.stopBtn);
    this.carWrapper.append(this.carControllers, this.carImgWrapper, this.carFlag);
    this.car.append(this.carConstructor, this.carWrapper);
    return this.car;
  }

  private createElement(element: string, elClass?: string, elId?: string) {
    const elem = document.createElement(element);
    if (elClass) {
      elem.classList.add(elClass);
    }
    if (elId) {
      elem.id = elId;
    }
    return elem;
  }

  // public listenStartEngine() {
  //   let id: number = 0;
  //   this.startBtn.addEventListener('click', () => {
  //     id = this.id as number;
  //   });
  //   return id;
  // }
}
