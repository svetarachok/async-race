import { CarModel } from '../model/CarModel';
import { GaragePageUI } from '../view/GaragePageUI';
import { CarInterface } from '../model/ts-interfaces';

export class Controller {
  model: CarModel;

  view: GaragePageUI;

  constructor() {
    this.handleCreateCar = this.handleCreateCar.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdateCar = this.handleUpdateCar.bind(this);
    this.model = new CarModel();
    this.view = new GaragePageUI();
    this.view.listenCreateCar(this.handleCreateCar);
    this.view.listenDeleteCar(this.handleDelete);
  }

  async initGarage() {
    const { cars, carsCounter } = await this.model.getCars();
    document.body.append(this.view.drawGarage(carsCounter));
    this.view.drawCars(cars);
  }

  async handleCreateCar(newName: string, newColor: string) {
    const data: CarInterface = await this.model.createCar({ name: newName, color: newColor });
    const { cars, carsCounter } = await this.model.getCars();
    this.view.updateGarage(cars, carsCounter);
    return data;
  }

  async handleUpdateCar(id: number, body: CarInterface) {
    const data: CarInterface = await this.model.updateCar(id, body);
    const { cars, carsCounter } = await this.model.getCars();
    this.view.updateGarage(cars, carsCounter);
    return data;
  }

  async handleDelete(id: string) {
    const data: CarInterface = await this.model.deleteCar(Number(id));
    this.updateGarage();
    return data;
  }

  private async updateGarage() {
    const { cars, carsCounter } = await this.model.getCars();
    this.view.updateGarage(cars, carsCounter);
  }
}
