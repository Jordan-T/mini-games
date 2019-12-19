export class CodeIndicator {
  #element;
  #VALID_TEXT = "✓";
  #INVALID_TEXT = "_ ";

  constructor(wrapper) {
    this.#element = document.createElement("div");

    wrapper.append(this.#element);
  }

  /**
   * Update the code indicator
   * @param {number} valid
   * @param {number} length
   */
  update(valid, length) {
    let html = "";

    for (let i = 0; i < length; i += 1) {
      html += valid > i ? this.#VALID_TEXT : this.#INVALID_TEXT;
    }
    this.#element.innerHTML = html;
  }

  destroy() {
    this.#element.remove();
  }
}
