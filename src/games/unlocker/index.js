import { CodeBtn } from "./codeBtn";
import { CodeIndicator } from "./codeIndicator";

export class Game {
  #element;
  #code;
  #codeCursor;
  #btnValues;
  #difficulty = "easy";
  #difficultyKeyboard = "medium";

  #codeIndicator;
  #btnsElement;
  #btns;
  #helpElement;
  #actionsElement;

  constructor(element, btnValues = "0123456789") {
    this.#element = element;
    this.#btnValues = [...btnValues];

    this.#createDOM();
  }

  #createDOM() {
    this.#actionsElement = document.createElement("div");
    const difficulties = [
      { text: "Easy", value: "easy" },
      { text: "Medium", value: "medium" },
      { text: "Hard", value: "hard" }
    ];
    this.#actionsElement.append("Code difficulty");
    difficulties.forEach(difficulty => {
      const btn = document.createElement("button");
      btn.innerHTML = difficulty.text;
      btn.addEventListener("click", e => {
        e.preventDefault();
        this.setRandomCode(difficulty.value);
      });
      this.#actionsElement.append(btn);
    });
    this.#actionsElement.append("Keyboard difficulty");
    difficulties.forEach(difficulty => {
      const btn = document.createElement("button");
      btn.innerHTML = difficulty.text;
      btn.addEventListener("click", e => {
        e.preventDefault();
        this.setKeyboard(difficulty.value);
      });
      this.#actionsElement.append(btn);
    });
    this.#element.append(this.#actionsElement);

    this.#codeIndicator = new CodeIndicator(this.#element);

    this.#btnsElement = document.createElement("div");
    this.#element.append(this.#btnsElement);

    this.setKeyboard();

    this.#helpElement = document.createElement("p");
    this.#helpElement.innerHTML = `Good luck`;
    this.#element.append(this.#helpElement);
  }

  #createButtons() {
    if (Array.isArray(this.#btns)) {
      this.#btns.forEach(btn => btn.destroy());

      while (this.#btnsElement.firstChild) {
        this.#btnsElement.firstChild.remove();
      }
    }

    this.#btns = this.#btnValues.map(
      value => new CodeBtn(value, this.#checkValue)
    );
    this.#btns.forEach(btn => this.#btnsElement.append(btn.element));
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
    this.#codeIndicator.update(this.#codeCursor, this.#code.length);
  }

  #fail() {
    this.#codeCursor = 0;
    this.#updateCodeView();
  }

  #unlocked() {
    alert("WIN, the code was : " + this.#code.join(""));
    this.setRandomCode();
  }

  setKeyboard(difficultyBase) {
    const difficulty = difficultyBase || this.#difficultyKeyboard;

    let btnValues = [..."👍👎😀"];

    if (difficulty === "hard") {
      btnValues = [..."ABCDEFGHIJKLMNOPQRST"];
    }
    if (difficulty === "medium") {
      btnValues = [..."0123456789"];
    }

    this.#btnValues = btnValues;
    this.#createButtons();

    this.setRandomCode();
  }

  setRandomCode(difficultyBase) {
    const difficulty = difficultyBase || this.#difficulty;
    let codeLength = 4;
    let code = [];
    let values = this.#btnValues;

    if (difficulty === "hard") {
      codeLength = 10;
    }
    if (difficulty === "medium") {
      codeLength = 6;
    }

    for (let i = 0; i < codeLength; i += 1) {
      code.push(values[Math.floor(Math.random() * values.length)]);
    }

    console.log("new code : " + code.join(""));

    this.setCode(code);
  }

  setCode(code) {
    this.#code = [...code];
    this.#codeCursor = 0;

    this.#updateCodeView();
  }

  destroy() {
    this.#btns.forEach(btn => btn.destroy());

    while (this.#element.firstChild) {
      this.#element.firstChild.remove();
    }

    this.#element = undefined;
    this.#code = undefined;
    this.#codeCursor = undefined;
    this.#btnValues = undefined;

    this.#codeIndicator = undefined;
    this.#btnsElement = undefined;
    this.#btns = undefined;
    this.#helpElement = undefined;
  }
}
