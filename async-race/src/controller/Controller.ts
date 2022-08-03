import { CarModel } from '../model/CarModel';
import { GaragePageUI } from '../view/GaragePageUI';
import { CarInterface, CarUIInteface } from '../model/ts-interfaces';
import { carsPerPage } from '../components/constants';
import { getDistance } from '../components/utils';

export class Controller {
  model: CarModel;

  view: GaragePageUI;

  constructor() {
    this.handleCreateCar = this.handleCreateCar.bind(this);
    this.handleDeleteCar = this.handleDeleteCar.bind(this);
    this.handleUpdateCar = this.handleUpdateCar.bind(this);
    this.handleShowCarsAtPage = this.handleShowCarsAtPage.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.model = new CarModel();
    this.view = new GaragePageUI();
    this.view.listenCreateCar(this.handleCreateCar);
    this.view.listenUpdateCar(this.handleUpdateCar);
    this.view.listenDeleteCar(this.handleDeleteCar);
    this.view.listenGenerateCars(this.handleCreateCar);
    this.view.listenPages(this.handleShowCarsAtPage);
    this.view.listenStart(this.handleStart);
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

  async handleStart(id: number, car: CarUIInteface) {
    const { velocity, distance } = await this.model.startEngine(id);
    const time = Math.round(distance / velocity);
    const screenDistance = Math.floor(getDistance(car.carImgWrapper, car.carFlag) + 70);
    window.requestAnimationFrame(() => this.view.animationStart(car, screenDistance, time));
    const { success } = await this.model.driveEngine(id);
    console.log(success);
    this.view.animationEnd(success);
  }

  private async updateGarage() {
    const { cars, carsCounter } = await this.model.getCars();
    this.view.updateGarageView(cars, carsCounter);
  }
}
