import { Controller } from '../controller/Controller';

export class App {
  controller: Controller;

  constructor() {
    this.controller = new Controller();
  }

  start() {
    window.addEventListener('load', () => {
      this.controller.initGarage();
    });
  }
}
