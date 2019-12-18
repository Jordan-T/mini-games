import { CodeBtn } from "./codeBtn";

export class Game {
  #element;
  #code;
  #codeCursor;
  #btnValues;

  #codeElement;
  #btnsElement;
  #btns;
  #helpElement;

  constructor(element, btnValues = "0123456789") {
    this.#element = element;
    this.#btnValues = [...btnValues];

    this.#createDOM();

    // @TODO: change with random
    this.setCode("0000");
  }

  #createDOM() {
    this.#codeElement = document.createElement("div");
    this.#element.append(this.#codeElement);

    this.#btnsElement = document.createElement("div");
    this.#element.append(this.#btnsElement);

    this.#btns = this.#btnValues.map(
      value => new CodeBtn(value, this.#checkValue)
    );
    this.#btns.forEach(btn => this.#btnsElement.append(btn.element));

    this.#helpElement = document.createElement("p");
    this.#helpElement.innerHTML = `Help: First code : 0000, seccond: 123456`;
    this.#element.append(this.#helpElement);
  }

  #checkValue = value => {
    if (value === this.#code[this.#codeCursor]) {
      // next
      this.#codeCursor += 1;
      this.#updateCodeView();

      // unlocked ?
      if (this.#codeCursor === this.#code.length) {
        this.#unlocked();
      }
    } else {
      // reset
      this.#fail();
    }
  };

  #updateCodeView() {
    let text = "";

    for (let i = 0; i < this.#code.length; i += 1) {
      text += this.#codeCursor > i ? "✓" : "_ ";
    }

    this.#codeElement.innerText = text;
  }

  #fail() {
    this.#codeCursor = 0;
    this.#updateCodeView();
  }

  #unlocked() {
    alert("WIN, the code was : " + this.#code.join(""));
    this.setCode("123456");
  }

  setCode(code) {
    this.#code = [...code];
    this.#codeCursor = 0;

    this.#updateCodeView();
  }

  destroy() {
    this.#btns.forEach(btn => btn.destroy());

    this.#element.innerHTML = "";
  }
}
