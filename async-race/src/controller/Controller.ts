import { CarModel } from "../model/CarModel";
import { GaragePageUI } from "../view/GaragePageUI";

export class Controller {
  model: CarModel;
  view: GaragePageUI;

  constructor(view: GaragePageUI, model: CarModel) {
    this.model = model;
    this.view = view
  }

  init() {
    
  }
}