import { CarInterface } from "../model/ts-interfaces";
import { CarUI } from "./CarUI";


export class GaragePageUI {
  elem: HTMLElement;

  constructor() {
    this.elem = document.createElement('main');
    this.elem.classList.add('main');
    this.elem.id = 'garage';
  }

  draw() {
    const template = `<section class="section__cars_constructor">
      <div class="cars_constructor">
        <input type="text" name="create-car-input_text" id="create-car-input_text" class="car-input_text">
        <input type="color" name="create-car-input_color" id="create-car-input_color" class="car-input_color">
        <button id="create-car-btn" class="btn">Create car</button>
      </div>
      <div class="cars_constructor">
        <input type="text" name="update-car-input_text" id="update-car-input_text" class="car-input_text">
        <input type="color" name="update-car-input_color" id="update-car-input_color" class="car-input_color">
        <button id="update-car-btn" class="btn">Update car</button>
      </div>
    </section>
    <section class="section__cars-maintain">
      <button id="race-btn" class="btn">Race</button>
      <button id="reset-btn" class="btn">Reset</button>
      <button id="generate-cars-btn" class="btn">Generate Cars</button>
    </section>
    <section class="section__garage">
      <div class="section__garage-headers">
        <h1 class="garage-page-header">Garage (4)</h1>
        <p class="page-header">Page 1</p>
      </div>
      <div class="cars-container">
        <div class="cars-track">
        </div>
        <div class="pagination"></div>
      </div>
    </section>`
    this.elem.append(template);
    return this.elem;
  }
  drawCars(cars: CarInterface[]) {
    const container: HTMLElement = <HTMLElement>document.querySelector('cars-track');
    cars.forEach(car => {
      let carTemplate = new CarUI(car);
      container.append(carTemplate.draw());
    });
  }
}
