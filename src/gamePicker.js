class GamePickerBtn {
  #element;
  #onClick;

  constructor(wrapper, game, onClick) {
    this.#element = document.createElement("button");
    this.#element.classList.add("c-gamePickerBtn");
    this.#element.innerHTML = game.name;

    this.#onClick = e => {
      e.preventDefault();
      onClick(game);
    };

    wrapper.append(this.#element);

    this.#addEvents();
  }

  #addEvents() {
    this.#element.addEventListener("click", this.#onClick, true);
  }
}

export class GamePicker {
  #games;
  #element;
  #actionsWrapper;
  #gameElement;
  #currentGame;

  PLAYING_CLASS = "c-gamePicker--playing";

  constructor(element, games) {
    this.#element = element;
    this.#games = games;

    this.#createDOM();
  }

  #createDOM() {
    this.#element.classList.add("c-gamePicker");
    this.#element.innerHTML = "Choose your game :";

    this.#actionsWrapper = document.createElement("div");
    this.#element.append(this.#actionsWrapper);

    const leaveGameElement = document.createElement("button");
    leaveGameElement.classList.add("c-gamePicker__leave");
    leaveGameElement.innerHTML = "X Leave game";
    leaveGameElement.addEventListener("click", e => {
      e.preventDefault();
      this.#leaveGame();
    });
    this.#actionsWrapper.append(leaveGameElement);

    this.#gameElement = document.createElement("div");
    this.#element.append(this.#gameElement);

    this.#games.forEach(
      game => new GamePickerBtn(this.#actionsWrapper, game, this.#chooseGame)
    );
  }

  #chooseGame = game => {
    this.#leaveGame();

    this.#currentGame = new game.Game(this.#gameElement);
    this.#element.classList.add(this.PLAYING_CLASS);
  };

  #leaveGame = () => {
    if (this.#currentGame !== undefined) {
      this.#currentGame.destroy();
      this.#currentGame = undefined;

      this.#element.classList.remove(this.PLAYING_CLASS);
    }
  };
}
