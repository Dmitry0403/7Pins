import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { NameType } from "../../pages/StartPage";
import { nanoid } from "nanoid";

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
        createGame: (state, action: PayloadAction<NameType[]>) => {
            const players = action.payload.map((item) => ({
                name: item.name,
                idPlayer: nanoid(),
            }));
            return (state = {
                ...state,
                dateGame: new Date().toDateString(),
                idGame: nanoid(),
                players,
            });
        },
    },
});

export const gameActions = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
export const gameSelector = (state: RootState) => state.game;
