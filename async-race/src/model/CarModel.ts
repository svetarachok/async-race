import { CarInterface } from './ts-interfaces';
import { URL, HEADER_JSON_DATA } from '../components/constants';

enum HTTPMethods {
  get = 'GET',
  post = 'POST',
  changeAll = 'PUT',
  changePart = 'PATCH',
  delete = 'DELETE',
}

enum Paths {
  garage = '/garage',
  engine = '/engine',
}

export class CarModel {
  async getCars(page?: number, limit: number = 7):
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
    return data;
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

  async startEngine(id: number) {
    const res = await fetch(`${URL}${Paths.engine}?id=${id}&status=started`, {
      method: HTTPMethods.changePart,
    });
    const data = await res.json();
    return data;
  }

  async stopEngine(id: number) {
    const res = await fetch(`${URL}${Paths.engine}?id=${id}&status=stopped`, {
      method: HTTPMethods.changePart,
    });
    const data = await res.json();
    return data;
  }

  async driveEngine(id: number) {
    const res = await fetch(`${URL}${Paths.engine}?id=${id}&status=drive`, {
      method: HTTPMethods.changePart,
    }).catch();
    return res.status !== 200 ? { success: false } : { ...await res.json() };
  }
}
