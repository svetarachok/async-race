
import { CarInterface } from "./ts-interfaces";

const URL: string = '';
const HEADER_JSON_DATA = {'Content-Type' : 'application/json'};

enum HTTPMethods {
  get = "GET",
  post = 'POST',
  changeAll = 'PUT',
  chagePart = 'PATCH',
  delete = 'DELETE'
}

enum Paths {
  garage = '/garage'
}


export class CarModel {
  async createCar(body: CarInterface): Promise<CarInterface> {
    const res = await fetch(`${URL}${Paths.garage}`, {
      method: HTTPMethods.post,
      headers: HEADER_JSON_DATA,
      body: JSON.stringify(body)
    });
    const data = await res.json();
    return data;
  }

  async getCar(id: number): Promise<CarInterface> {
    const res = await fetch(`${URL}${Paths.garage}:${id}`, {
      method: HTTPMethods.get
    });
    const data = await res.json();
    return data;
  }

  async updateCar(id: number, body: CarInterface): Promise<CarInterface> {
    const res = await fetch(`${URL}${Paths.garage}:${id}`, {
      method: HTTPMethods.changeAll,
      headers: HEADER_JSON_DATA,
      body: JSON.stringify(body)
    });
    const data = await res.json();
    return data;
  }

  async deleteCar(id: number): Promise<{}> {
    const res = await fetch(`${URL}${Paths.garage}:${id}`, {
      method: HTTPMethods.delete
    });
    const data = await res.json();
    return data;
  }

}