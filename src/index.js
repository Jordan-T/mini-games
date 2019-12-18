import "./styles.css";

import { Game as UnlockerGame } from "./games/unlocker";
import { Game as SamjoyGame } from "./games/samjoy";
import { GamePicker } from "./gamePicker";

const games = [
  { name: "Unlocker", Game: UnlockerGame },
  { name: "Samjoy", Game: SamjoyGame }
];

new GamePicker(document.getElementById("app"), games);
