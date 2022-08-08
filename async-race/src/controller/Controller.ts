import { CarModel } from '../model/Model';
import { GaragePageUI } from '../view/GaragePageUI';
import {
  CarInterface, CarUIInteface, WinnerInterface, WinnerData,
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
    this.handleSort = this.handleSort.bind(this);
    this.makeWinners = this.makeWinners.bind(this);
    const { cars, carsCounter } = await this.model.getCars(1, carsPerPage);
    document.body.append(this.view.drawGarage(carsCounter));
    this.view.drawCars(cars);
    const { winners, winnersCounter } = await this.model.getWinners(1, 10) as {
      winners: WinnerData []; winnersCounter: string
    };
    document.body.append(this.view.drawWinnersTable(winnersCounter));
    const winnersToDraw: WinnerInterface [] = await this.makeWinners(winners);
    this.view.drawWinners(winnersToDraw);
    this.view.listenCreateCar(this.handleCreateCar);
    this.view.listenUpdateCar(this.handleUpdateCar);
    this.view.listenDeleteCar(this.handleDeleteCar);
    this.view.listenGenerateCars(this.handleCreateCar);
    this.view.listenPages(this.handleShowCarsAtPage);
    this.view.listenStart(this.handleStart);
    this.view.listenStop(this.handleStop);
    this.view.listenRace(this.handleRace);
    this.view.listenWinPages(this.handleShowWinnersAtPage);
    this.view.listenSort(this.handleSort);
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
    // const { winners, winnersCounter } = await this.model.getWinners(page, 10);
    // this.view.updateWinnersView(winners, winnersCounter);
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

  async handleStop(id: number, car: CarUIInteface) {
    const { velocity } = await this.model.stopEngine(id);
    this.view.returnToStart(velocity, car);
  }

  async handleRace(page: number, limit: number) {
    // const winners: number[] = [];
    // const winner: WinnerData = {} as WinnerData;
    const { cars } = await this.model.getCars(page, limit);
    const allCarsStartPromises = await this.model.turnAllToStart(cars);
    const allCarsStartData = await Promise.all(allCarsStartPromises);
    console.log(allCarsStartData);
    const min = Math.min(...allCarsStartData.map((item) => item.velocity));
    const winner = allCarsStartData.filter((item) => item.velocity === min)[0];
    console.log(winner);
    await Promise.all(
      allCarsStartData.map(async (car) => {
        this.view.animationStart(car.id, car.velocity, car.distance);
        const { success } = await this.model.driveEngine(car.id as number);
        this.view.animationEnd(success);
        if (success) {
          this.view.drawPopUp({
            id: car.id,
            wins: 1,
            time: Math.round(car.distance / car.velocity),
          });
        }
      }),
    );
    const allCarsStopData = await Promise.any(allCarsStartData);
    console.log(allCarsStopData);
    // const allCarsDrivePromises = await this.model.turnAllToDrive(cars);
    // allCarsStopData.map(async (promise) => {
    //   const success = promise.then((res: { json: () => string; }) => res.json());
    //   console.log(success);
    //   if (success) {
    //     this.view.animationEnd(success);
    //   }
    // });
    // await Promise.all(cars.map(async (car) => {
    //   const promise = await this.model.startEngine(car.id as number);
    //   const { velocity, distance } = await Promise.resolve(promise);
    //   const time = Math.round(distance / velocity);
    //   const screenDistance = Math.floor(getDistance(car.carImgWrapper, car.carFlag) + 70);
    //   const res = this.view.animationStart(car, screenDistance, time);
    //   const { success } = await this.model.driveEngine(car.id as number);
    //   console.log(success);
    //   if (success) {
    //     window.cancelAnimationFrame(res);
    //     winners.push(car.id as number);
    //   }
    //   this.view.animationEnd(success);
    //   if (winners.length !== 0 && winners.length === 1 && success) {
    //     winner.id = car.id as number;
    //     winner.wins = 1;
    //     winner.time = time;
    //     this.view.drawPopUp({
    //       id: winner.id,
    //       name: car.name,
    //       color: car.color,
    //       wins: winner.wins,
    //       time: winner.time,
    //     });
    //   }
    // }));
    // const winnertoShow = await this.settleWinner(winner);
    // this.updateWinners();
    // console.log(winnertoShow);
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
    console.log(`isWinner ${isWinner}`);
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

  async handleSort(page: number, limit: number, sortStatus: string) {
    const { winners, winnersCounter } = await this.model.getWinners(
      page,
      limit,
      sortStatus,
    );
    const winnersToDraw: WinnerInterface [] = await this.makeWinners(winners);
    this.view.updateWinnersView(winnersToDraw, winnersCounter);
  }
}
