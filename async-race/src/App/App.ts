import { Controller } from '../controller/Controller';
import { CarModel } from '../model/CarModel';
import { GaragePageUI } from '../view/GaragePageUI';

export class App {
  controller: Controller;

  model: CarModel;

  view: GaragePageUI;

  constructor() {
    this.model = new CarModel();
    this.view = new GaragePageUI();
    this.controller = new Controller(this.model, this.view);
  }

  start() {
    window.addEventListener('load', () => {
      this.controller.initGarage();
    });
  }
}
