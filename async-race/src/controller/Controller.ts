import { CarModel } from '../model/CarModel';
import { GaragePageUI } from '../view/GaragePageUI';
import { CarInterface } from '../model/ts-interfaces';
import { carsPerPage } from '../components/constants';

export class Controller {
  model: CarModel;

  view: GaragePageUI;

  constructor() {
    this.handleCreateCar = this.handleCreateCar.bind(this);
    this.handleDeleteCar = this.handleDeleteCar.bind(this);
    this.handleUpdateCar = this.handleUpdateCar.bind(this);
    this.handleShowCarsAtPage = this.handleShowCarsAtPage.bind(this);
    this.model = new CarModel();
    this.view = new GaragePageUI();
    this.view.listenCreateCar(this.handleCreateCar);
    this.view.listenUpdateCar(this.handleUpdateCar);
    this.view.listenDeleteCar(this.handleDeleteCar);
    this.view.listenGenerateCars(this.handleCreateCar);
    this.view.listenPages(this.handleShowCarsAtPage);
  }

  async initGarage() {
    const { cars, carsCounter } = await this.model.getCars(1, carsPerPage);
    document.body.append(this.view.drawGarage(carsCounter));
    this.view.drawCars(cars);
  }

  async handleCreateCar(newName: string, newColor: string, page: number) {
    const data: CarInterface = await this.model.createCar({ name: newName, color: newColor });
    const { cars, carsCounter } = await this.model.getCars(page);
    this.view.updateGarageView(cars, carsCounter);
    return data;
  }

  async handleUpdateCar(id: number, body: CarInterface) {
    const data: CarInterface = await this.model.updateCar(id, body);
    this.updateGarage();
    return data;
  }

  async handleDeleteCar(id: string, page: number) {
    const data: CarInterface = await this.model.deleteCar(Number(id));
    const { cars, carsCounter } = await this.model.getCars(page);
    this.view.updateGarageView(cars, carsCounter);
    return data;
  }

  async handleShowCarsAtPage(page: number, limit: number) {
    const { cars, carsCounter } = await this.model.getCars(page, limit);
    this.view.updateGarageView(cars, carsCounter);
  }

  private async updateGarage() {
    const { cars, carsCounter } = await this.model.getCars();
    this.view.updateGarageView(cars, carsCounter);
  }
}
