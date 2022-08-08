import { CarModel } from '../model/Model';
import { GaragePageUI } from '../view/GaragePageUI';
import {
  CarInterface, WinnerInterface, WinnerData,
} from '../model/ts-interfaces';
import { carsPerPage } from '../components/constants';
// import { once } from '../components/utils';

export class Controller {
  model: CarModel;

  view: GaragePageUI;

  constructor() {
    this.model = new CarModel();
    this.view = new GaragePageUI();
  }

  async initGarage() {
    this.handleCreateCar = this.handleCreateCar.bind(this);
    this.handleDeleteCar = this.handleDeleteCar.bind(this);
    this.handleUpdateCar = this.handleUpdateCar.bind(this);
    this.handleShowCarsAtPage = this.handleShowCarsAtPage.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleRace = this.handleRace.bind(this);
    this.handleWinsSort = this.handleWinsSort.bind(this);
    this.handleTimeSort = this.handleTimeSort.bind(this);
    this.makeWinners = this.makeWinners.bind(this);
    this.handleShowWinnersAtPage = this.handleShowWinnersAtPage.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.view.header.append(this.view.garageBtn, this.view.winnersBtn);
    document.body.append(this.view.header);
    const { cars, carsCounter } = await this.model.getCars(1, carsPerPage);
    document.body.append(this.view.drawGarage(carsCounter));
    this.view.drawCars(cars);
    const { winners, winnersCounter } = await this.model.getWinners(1, 10) as {
      winners: WinnerData []; winnersCounter: string
    };
    const winT = this.view.drawWinnersTable(winnersCounter);
    document.body.append(winT);
    const winnersToDraw: WinnerInterface [] = await this.makeWinners(winners);
    this.view.drawWinners(winnersToDraw);
    this.view.garageBtn.addEventListener('click', () => {
      this.view.winners.style.display = 'none';
      this.view.elem.style.display = 'flex';
    });
    this.view.winnersBtn.addEventListener('click', () => {
      this.view.elem.style.display = 'none';
      this.view.winners.style.display = 'block';
    });
    this.view.listenCreateCar(this.handleCreateCar);
    this.view.listenUpdateCar(this.handleUpdateCar);
    this.view.listenDeleteCar(this.handleDeleteCar);
    this.view.listenGenerateCars(this.handleCreateCar);
    this.view.listenPages(this.handleShowCarsAtPage);
    this.view.listenStart(this.handleStart);
    this.view.listenStop(this.handleStop);
    this.view.listenRace(this.handleRace);
    this.view.listenReset(this.handleReset);
    this.view.listenWinPages(this.handleShowWinnersAtPage);
    this.view.listenWins(this.handleWinsSort);
    this.view.listenTimeSort(this.handleTimeSort);
  }

  async makeWinners(winners: WinnerData []) {
    const winnersToDraw: WinnerInterface [] = [];
    await Promise.all(winners.map(async (winner: WinnerData) => {
      const car = await this.model.getCar(winner.id);
      const winnerItem: WinnerInterface = {} as WinnerInterface;
      winnerItem.id = winner.id;
      winnerItem.color = car.color;
      winnerItem.name = car.name;
      winnerItem.time = winner.time;
      winnerItem.wins = winner.wins;
      winnersToDraw.push(winnerItem);
    }));
    return winnersToDraw;
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
    await this.model.deleteCar(Number(id));
    const { cars, carsCounter } = await this.model.getCars(page);
    this.view.updateGarageView(cars, carsCounter);
    await this.model.deleteWinner(Number(id));
    this.updateWinners();
  }

  async handleShowCarsAtPage(page: number, limit: number) {
    const { cars, carsCounter } = await this.model.getCars(page, limit);
    this.view.updateGarageView(cars, carsCounter);
  }

  async handleStart(id: number) {
    const { velocity, distance } = await this.model.startEngine(id);
    this.view.animationStart(id, velocity, distance);
    const { success } = await this.model.driveEngine(id);
    this.view.animationEnd(success);
    // if (!success) window.cancelAnimationFrame(res);
  }

  async handleStop(id: number) {
    const { velocity } = await this.model.stopEngine(id);
    this.view.returnToStart(id, velocity);
  }

  async handleRace(page: number, limit: number) {
    const winners: {
      id: number,
      velocity: number,
      distance: number,
    }[] = [];
    const winner: WinnerData = {} as WinnerData;
    const { cars } = await this.model.getCars(page, limit);
    const allCarsStartPromises = await this.model.turnAllToStart(cars);
    const allCarsStartData = await Promise.all(allCarsStartPromises);
    await Promise.all(
      allCarsStartData.map(async (car) => {
        this.view.animationStart(car.id, car.velocity, car.distance);
        const { success } = await this.model.driveEngine(car.id as number);
        this.view.animationEnd(success);
        if (success) {
          winners.push(car);
          const time = Math.round(car.distance / car.velocity);
          if (winners.length !== 0 && winners.length === 1) {
            winner.id = car.id as number;
            winner.wins = 1;
            winner.time = time;
          }
          this.view.drawPopUp({
            id: car.id,
            wins: 1,
            time,
          });
        }
      }),
    );
    await this.settleWinner(winner);
    this.updateWinners();
  }

  async handleReset(page: number, limit: number) {
    const { cars } = await this.model.getCars(page, limit);
    const allCarsStopPromises = await this.model.turnAllToStop(cars);
    const allCarsStopData = await Promise.all(allCarsStopPromises);
    await Promise.all(
      allCarsStopData.map((car) => this.view.returnToStart(car.id, car.velocity)),
    );
  }

  async handleGetWinners(page: number, limit: number) {
    const { winners, winnersCounter } = await this.model.getWinners(page, limit) as {
      winners: WinnerData[]; winnersCounter: string
    };
    const winnersToDraw: WinnerInterface [] = await this.makeWinners(winners);
    this.view.updateWinnersView(winnersToDraw, winnersCounter);
  }

  async settleWinner(winner: WinnerData) {
    const promise = this.model.getWinner(winner.id as number);
    const isWinner = await promise;
    if (Object.entries(isWinner).length === 0) {
      const data = await this.model.createWinner(winner);
      return data;
    }
    const wins: number = isWinner.wins + winner.wins;
    const { time, id } = winner;
    const updateW: WinnerData = { wins, time, id };
    const data = await this.model.updateWinner(updateW);
    return data;
  }

  private async updateGarage() {
    const { cars, carsCounter } = await this.model.getCars();
    this.view.updateGarageView(cars, carsCounter);
  }

  private async updateWinners() {
    const { winners, winnersCounter } = await this.model.getWinners();
    const winnersToDraw: WinnerInterface [] = await this.makeWinners(winners);
    this.view.updateWinnersView(winnersToDraw, winnersCounter);
  }

  async handleShowWinnersAtPage(page: number, limit: number, sort: string) {
    const { winners, winnersCounter } = await this.model.getWinners(page, limit, sort);
    const winnersToDraw: WinnerInterface [] = await this.makeWinners(winners);
    this.view.updateWinnersView(winnersToDraw, winnersCounter);
  }

  async handleWinsSort(page: number, limit: number, sort: string, order: string) {
    const { winners, winnersCounter } = await this.model.getWinners(
      page,
      limit,
      sort,
      order,
    );
    const winnersToDraw: WinnerInterface [] = await this.makeWinners(winners);
    this.view.updateWinnersView(winnersToDraw, winnersCounter);
  }

  async handleTimeSort(page: number, limit: number, sort: string, order: string) {
    const { winners, winnersCounter } = await this.model.getWinners(
      page,
      limit,
      sort,
      order,
    );
    const winnersToDraw: WinnerInterface [] = await this.makeWinners(winners);
    this.view.updateWinnersView(winnersToDraw, winnersCounter);
  }
}
