// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_app from "./routes/_app.tsx";
import * as $api_data_fightersData from "./routes/api/data/fightersData.ts";
import * as $index from "./routes/index.tsx";
import * as $Fighter from "./islands/Fighter.tsx";
import * as $FightersFight from "./islands/FightersFight.tsx";
import * as $Modal from "./islands/Modal.tsx";
import * as $calculateWinProbability from "./islands/calculateWinProbability.ts";
import * as $determineWinner from "./islands/determineWinner.ts";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_app.tsx": $_app,
    "./routes/api/data/fightersData.ts": $api_data_fightersData,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/Fighter.tsx": $Fighter,
    "./islands/FightersFight.tsx": $FightersFight,
    "./islands/Modal.tsx": $Modal,
    "./islands/calculateWinProbability.ts": $calculateWinProbability,
    "./islands/determineWinner.ts": $determineWinner,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
