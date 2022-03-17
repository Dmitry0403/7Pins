import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { ISetting } from "../../components/SettingsTable";
import { LOAD_STATUSES } from "../../common";
import { serviceGame } from "../../services";
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

interface IState {
    game: IGame;
    loadingStatusGame: string;
    isUpdateGameStatus: boolean;
    error: any;
}

const initialState: IState = {
    game: {
        dateGame: "",
        idGame: "",
        players: {},
        settingGame: {},
        isComplete: false,
    },
    isUpdateGameStatus: false,
    loadingStatusGame: LOAD_STATUSES.UNKNOWN,
    error: "",
};

export const fetchGame = createAsyncThunk(
    "game/fetchGames",
    async (_, { rejectWithValue }) => {
        try {
            const resp = (await serviceGame.getGames("currentGame")) as IGame;
            if (!resp) {
                throw new Error("error updating the game");
            }
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateGame = createAsyncThunk<string, void, { state: RootState }>(
    "game/updateGame",
    async (_, { rejectWithValue, getState }) => {
        const game = getState().currentGame.game;
        try {
            const resp = await serviceGame.postGames(game, "currentGame");
            if (resp !== "ok") {
                throw new Error("error updating the game");
            }
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        createGame: (state) => {
            return (state = {
                ...state,
                game: {
                    ...state.game,
                    dateGame: new Date().toDateString(),
                    idGame: nanoid(),
                    players: {},
                    settingGame: {},
                    isComplete: false,
                },
            });
        },
        updatePlayersData: (state, action: PayloadAction<IPlayers>) => {
            return (state = {
                ...state,
                game: {
                    ...state.game,
                    players: action.payload,
                },
            });
        },
        updateSettingsData: (state, action: PayloadAction<ISetting>) => {
            return (state = {
                ...state,
                game: {
                    ...state.game,
                    settingGame: action.payload,
                },
            });
        },
        resetUpdatingGame: (state) => {
            return (state = {
                ...state,
                isUpdateGameStatus: false,
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateGame.pending, (state) => {
                (state.loadingStatusGame = LOAD_STATUSES.LOADING),
                    (state.error = "");
            })
            .addCase(updateGame.fulfilled, (state) => {
                (state.loadingStatusGame = LOAD_STATUSES.SUCCESS),
                    (state.isUpdateGameStatus = true);
            })
            .addCase(updateGame.rejected, (state, action) => {
                (state.loadingStatusGame = LOAD_STATUSES.FAILURE),
                    (state.error = action.payload);
            })
            .addCase(fetchGame.pending, (state) => {
                (state.loadingStatusGame = LOAD_STATUSES.LOADING),
                    (state.error = "");
            })
            .addCase(fetchGame.fulfilled, (state, action) => {
                (state.loadingStatusGame = LOAD_STATUSES.SUCCESS),
                    (state.loadingStatusGame = LOAD_STATUSES.SUCCESS),
                    (state.game = action.payload),
                    (state.isUpdateGameStatus = true);
            })
            .addCase(fetchGame.rejected, (state, action) => {
                (state.loadingStatusGame = LOAD_STATUSES.FAILURE),
                    (state.error = action.payload);
            });
    },
});

export const gameActions = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
export const gameSelector = (state: RootState) => state.currentGame.game;
export const playersSelector = (state: RootState) =>
    state.currentGame.game.players;
export const settingGameSelector = (state: RootState) =>
    state.currentGame.game.settingGame;
export const loadingGameStatusSelector = (state: RootState) =>
    state.currentGame.loadingStatusGame;
export const errorMessageGameSelector = (state: RootState) =>
    state.currentGame.error;
export const isUpdateGameStatusSelector = (state: RootState) =>
    state.currentGame.isUpdateGameStatus;
