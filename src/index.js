import "./styles.css";

import { Game as UnlockerGame } from "./games/unlocker";
import { GamePicker } from "./gamePicker";

const games = [{ name: "Unlocker", Game: UnlockerGame }];

new GamePicker(document.getElementById("app"), games);
