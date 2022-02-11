import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { PlayerType } from "../../pages/StartPage";
import { v4 as uuidv4 } from "uuid";

export interface GameType {
    dateGame: string;
    idGame: string;
    players: {
        name: string;
        idPlayer: string;
    }[];
    isComplete: boolean;
}

const initialState: GameType = {
    dateGame: "",
    idGame: "",
    players: [],
    isComplete: false,
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        createGame: (state, action: PayloadAction<PlayerType>) => {
            const players = Object.values(action.payload).map(
                (item: string) => ({
                    name: item,
                    idPlayer: uuidv4(),
                })
            );
            return (state = {
                ...state,
                dateGame: new Date().toDateString(),
                idGame: uuidv4(),
                players,
            });
        },
    },
});

export const gameActions = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
export const getGame = (state: RootState) => state.game;
