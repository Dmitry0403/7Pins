import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "./gameSlice";
import { listGamesReducer } from "./listGamesSlice";

export const store = configureStore({
    reducer: {
        currentGame: gameReducer,
        stateGames: listGamesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
