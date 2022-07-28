import { CarInterface } from './ts-interfaces';

const URL: string = '';
const HEADER_JSON_DATA = { 'Content-Type': 'application/json' };

enum HTTPMethods {
  get = 'GET',
  post = 'POST',
  changeAll = 'PUT',
  chagePart = 'PATCH',
  delete = 'DELETE',
}

enum Paths {
  garage = '/garage',
}

export class CarModel {
  async createCar(body: CarInterface) {
    const res = await fetch(`${URL}${Paths.garage}`, {
      method: HTTPMethods.post,
      headers: HEADER_JSON_DATA,
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log(data);
  }

  async getCar(id: number) {
    const res = await fetch(`${URL}${Paths.garage}:${id}`, {
      method: HTTPMethods.get,
    });
    const data = await res.json();
    console.log(data);
  }

  async updateCar(id: number, body: CarInterface) {
    const res = await fetch(`${URL}${Paths.garage}:${id}`, {
      method: HTTPMethods.changeAll,
      headers: HEADER_JSON_DATA,
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log(data);
  }

  async deleteCar(id: number) {
    const res = await fetch(`${URL}${Paths.garage}:${id}`, {
      method: HTTPMethods.delete,
    });
    const data = await res.json();
    console.log(data);
  }
}
