import { CarInterface, WinnerData } from './ts-interfaces';
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
  winners = '/winners',
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

  async getCar(id: number): Promise<CarInterface> {
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

  async driveEngine(id: number) {
    const res = await fetch(`${URL}${Paths.engine}?id=${id}&status=drive`, {
      method: HTTPMethods.changePart,
    }).catch();
    return res.status !== 200 ? { success: false } : { ...await res.json() };
  }

  async stopEngine(id: number) {
    const res = await fetch(`${URL}${Paths.engine}?id=${id}&status=stopped`, {
      method: HTTPMethods.changePart,
    });
    const data = await res.json();
    return data;
  }

  async turnAllToStart(cars: CarInterface []) {
    this.startEngine = this.startEngine.bind(this);
    const data = cars.map(async (car: CarInterface) => {
      const id: number = car.id as number;
      const { velocity, distance }: {
        velocity: number,
        distance: number,
      } = await this.startEngine(id);
      const obj = { id, velocity, distance };
      return obj;
    });
    return data;
  }

  async turnAllToDrive(cars: CarInterface []) {
    const data = cars.map(async (car: CarInterface) => {
      const id: number = car.id as number;
      const { success } = await this.driveEngine(id);
      return success;
    });
    return data;
  }

  async turnAllToStop(cars: CarInterface []) {
    const data = cars.map(async (car: CarInterface) => {
      const id: number = car.id as number;
      const { velocity, distance }: {
        velocity: number,
        distance: number,
      } = await this.stopEngine(id);
      const obj = { id, velocity, distance };
      return obj;
    });
    return data;
  }

  async getWinners(page?: number, limit?: number, sort?: string, order?: string):
  Promise<{ winners: WinnerData[]; winnersCounter: string }> {
    const winnersData = await fetch(`${URL}${Paths.winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
    return {
      winners: await winnersData.json() as WinnerData[],
      winnersCounter: winnersData.headers.get('X-Total-Count') as string,
    };
  }

  async getWinner(id: number) {
    const res = await fetch(`${URL}${Paths.winners}/${id}`);
    const data = await res.json();
    return data;
  }

  async createWinner(body: WinnerData) {
    const res = await fetch(`${URL}${Paths.winners}`, {
      method: HTTPMethods.post,
      headers: HEADER_JSON_DATA,
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  }

  async updateWinner(winner: WinnerData) {
    const body = {
      wins: winner.wins,
      time: winner.time,
    };
    const res = await fetch(`${URL}${Paths.winners}/${winner.id}`, {
      method: HTTPMethods.changeAll,
      headers: HEADER_JSON_DATA,
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  }

  async deleteWinner(id: number) {
    const res = await fetch(`${URL}${Paths.winners}/${id}`, {
      method: HTTPMethods.delete,
    });
    const data = await res.json();
    return data;
  }
}
