export class GameBtn {
  constructor(wrapper, value, onClick) {
    this.onClick = e => {
      e.preventDefault();
      onClick();
    };
    const btn = document.createElement("button");
    btn.innerHTML = value;
    btn.classList.add("c-gameBtn");
    btn.addEventListener("click", this.onClick, true);
    this.element = btn;

    wrapper.append(btn);
  }
  setActive() {
    this.element.classList.add("c-gameBtn--active");
    this.element.style.backgroundColor = "green";
  }
  unsetActive() {
    this.element.classList.remove("c-gameBtn--active");
    this.element.style.backgroundColor = null;
  }
  destroy() {
    this.element.removeEventListener("click", this.onClick, true);
    this.element.remove();
  }
}
