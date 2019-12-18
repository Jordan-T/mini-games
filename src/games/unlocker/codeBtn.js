export class CodeBtn {
  #onClick;

  constructor(value, onClick) {
    this.#onClick = e => {
      e.preventDefault();
      onClick(value);
    };

    this.element = document.createElement("button");
    this.element.innerText = value;

    this.#addEvents();
  }

  #addEvents() {
    this.element.addEventListener("click", this.#onClick, true);
  }
}
