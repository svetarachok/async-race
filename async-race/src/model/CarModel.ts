import { CarInterface } from './ts-interfaces';

const URL: string = 'http://127.0.0.1:3000';
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
  async getCars(page?: number, limit?: number):
  Promise<{ cars: CarInterface[]; carsCounter: string }> {
    const res = await fetch(`${URL}${Paths.garage}?_page=${page}&_limit=${limit}`);
    return {
      cars: await res.json(),
      carsCounter: res.headers.get('X-Total-Count') as string,
    };
  }

  async createCar(body: CarInterface): Promise<CarInterface> {
    const res = await fetch(`${URL}${Paths.garage}`, {
      method: HTTPMethods.post,
      headers: HEADER_JSON_DATA,
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  }

  async getCar(id: number) {
    const res = await fetch(`${URL}${Paths.garage}/${id}`, {
      method: HTTPMethods.get,
    });
    const data = await res.json();
    console.log(data);
  }

  async updateCar(id: number, body: CarInterface) {
    const res = await fetch(`${URL}${Paths.garage}/${id}`, {
      method: HTTPMethods.changeAll,
      headers: HEADER_JSON_DATA,
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  }

  async deleteCar(id: number) {
    const res = await fetch(`${URL}${Paths.garage}/${id}`, {
      method: HTTPMethods.delete,
    });
    const data = await res.json();
    return data;
  }
}
