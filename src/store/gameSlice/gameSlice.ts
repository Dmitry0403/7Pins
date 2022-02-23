import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { IName } from "../../components/RegistrationForm";
import { nanoid } from "nanoid";
import appConfig from "../../../appConfig.json";

export interface IGame {
    dateGame: string;
    idGame: string;
    players: {
        name: string;
        idPlayer: string;
        points: number;
    }[];
    isComplete: boolean;
}

const initialState: IGame = {
    dateGame: "",
    idGame: "",
    players: [],
    isComplete: false,
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        createGame: (state, action: PayloadAction<IName[]>) => {
            const players = action.payload.map((item) => ({
                name: item.name,
                points: appConfig.defaultInitialPlayerPoints,
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
export const playersSelector = (state: RootState) => state.game.players;
