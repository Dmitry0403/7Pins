import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { ISetting } from "../../components/SettingsTable";
import { nanoid } from "nanoid";

export interface IPlayer {
    name: string;
    value: number | null;
    order: number | null;
}

export interface IPlayers {
    [key: string]: IPlayer;
}

export interface IGame {
    dateGame: string;
    idGame: string;
    players: IPlayers;
    settingGame: ISetting;
    isComplete: boolean;
}

const initialState: IGame = {
    dateGame: "",
    idGame: "",
    players: {},
    settingGame: {},
    isComplete: false,
};
const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        createGame: (state) => {
            return (state = {
                dateGame: new Date().toDateString(),
                idGame: nanoid(),
                players: {},
                settingGame: {},
                isComplete: false,
            });
        },
        updatePlayersData: (state, action: PayloadAction<IPlayers>) => {
            return (state = {
                ...state,
                players: action.payload,
            });
        },
        updateSettingsData: (state, action: PayloadAction<ISetting>) => {
            return (state = {
                ...state,
                settingGame: action.payload,
            });
        },
    },
});

export const gameActions = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
export const gameSelector = (state: RootState) => state.currentGame;
export const playersSelector = (state: RootState) => state.currentGame.players;
export const settingGame = (state: RootState) => state.currentGame.settingGame;
