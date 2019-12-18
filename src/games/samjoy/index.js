import { GameBtn } from "./btn";
import "./index.css";

export class Game {
  GAME_CLASS = "c-samjoyGame";

  constructor(element) {
    this.element = element;
    element.classList.add(this.GAME_CLASS);
    this.btns = [..."0123456789"].map(
      (value, index) =>
        new GameBtn(element, value, () => this.handleClick(value, index))
    );

    this.createCode();
  }

  handleClick = (value, index) => {
    const btn = this.btns[index];
    console.log("btn clicked", { value, index, btn });

    // fake fail
    if (value === "5") {
      this.fail();
      return;
    }
    // fake win
    if (value === "8") {
      this.win();
      return;
    }
    btn.setActive();
  };

  createCode() {
    console.log("createCode");
    this.btns.forEach(btn => btn.unsetActive());

    // @TODO set a random code
  }

  win() {
    alert("WIN");
    this.createCode();
  }

  fail() {
    console.log("FAIL");
    this.btns.forEach(btn => btn.unsetActive());
  }

  destroy() {
    this.btns.forEach(btn => btn.destroy());

    while (this.element.firstChild) {
      this.element.firstChild.remove();
    }
    this.element.classList.remove(this.GAME_CLASS);
  }
}
