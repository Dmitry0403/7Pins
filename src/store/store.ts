import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "./gameSlice";
import { listGamesReducer } from "./listGamesSlice";
import { currencyReducer } from "./currencySlice";

export const store = configureStore({
    reducer: {
        currentGame: gameReducer,
        stateGames: listGamesReducer,
        currency: currencyReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
