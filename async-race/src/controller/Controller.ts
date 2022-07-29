import { CarModel } from '../model/CarModel';
import { GaragePageUI } from '../view/GaragePageUI';
import { CarInterface } from '../model/ts-interfaces';
import { CarUI } from '../view/CarUI';

export class Controller {
  model: CarModel;

  view: GaragePageUI;

  constructor(model: CarModel, view: GaragePageUI) {
    this.model = model;
    this.view = view;
  }

  async initGarage() {
    const { cars, carsCounter } = await this.model.getCars();
    document.body.append(this.view.draw(carsCounter));
    this.view.drawCars(cars);
    this.linkHandles();
  }

  linkHandles() {
    this.handleCreate = this.handleCreate.bind(this);
    const createBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('create-car-btn');
    createBtn.addEventListener('click', this.handleCreate);

    const deleteBtns = document.querySelectorAll<HTMLButtonElement>('.delete-btn');
    deleteBtns.forEach((btn) => btn.addEventListener('click', (e: Event) => {
      const target: HTMLElement = e.target as HTMLElement;
      const id: string = <string>target.id.split('-').filter((num) => Number(num)).join();
      this.handleDelete(id);
    }));
  }

  async handleCreate() {
    const textInput: HTMLInputElement = <HTMLInputElement>document.getElementById('create-car-input_text');
    const colorInput: HTMLInputElement = <HTMLInputElement>document.getElementById('create-car-input_color');
    const newName: string = textInput.value;
    const newColor: string = colorInput.value;
    const data: CarInterface = await this.model.createCar({ name: newName, color: newColor });
    const carDrawer = new CarUI(data);
    carDrawer.draw();
  }

  async handleDelete(id: string) {
    const carElem: HTMLElement = <HTMLElement>document.getElementById(id);
    const data: CarInterface = await this.model.deleteCar(Number(id));
    if (data) {
      carElem.remove();
    }
  }
}
