export class FormUI {
  form: HTMLFormElement;

  textInput: HTMLInputElement;

  colorInput: HTMLInputElement;

  submitBtn: HTMLButtonElement;

  constructor(name: string, className: string) {
    this.form = this.createElement('from', className) as HTMLFormElement;
    this.textInput = <HTMLInputElement> this.createElement('input');
    this.textInput.type = 'text';
    this.colorInput = <HTMLInputElement> this.createElement('input');
    this.colorInput.type = 'color';
    this.submitBtn = <HTMLButtonElement> this.createElement('button', 'btn');
    this.submitBtn.textContent = name;
    this.form.append(this.textInput, this.colorInput, this.submitBtn);
  }

  private createElement(element: string, elClass?: string, elId?: string) {
    const elem: HTMLElement = document.createElement(element);
    if (elClass) {
      elem.classList.add(elClass);
    }
    if (elId) {
      elem.id = elId;
    }
    return elem;
  }

  private get InputText() {
    return this.textInput.value;
  }

  private get InputColor() {
    return this.colorInput.value;
  }

  private resetInput() {
    this.colorInput.value = '';
    this.textInput.value = '';
  }

  draw() {
    return this.form;
  }

  bindCreateForm(handler: (arg1: string, arg2: string) => void) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log('hello');
      if (this.InputText && this.InputColor) {
        handler(this.InputText, this.InputColor);
        this.resetInput();
      }
    });
  }
}
