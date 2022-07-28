export class ManageCarBtn {
  public elem: HTMLButtonElement;

  constructor(id: string) {
    this.elem = document.createElement('button');
    this.elem.classList.add('btn');
    this.elem.id = id
  }

  stateHandler(manageCar: () => void) {
    this.elem.addEventListener('click', manageCar)
  }

  // handleEvent() {
  //   console.log('Car Deleted');
  // }
}

//start engine 

//stop engine

//race