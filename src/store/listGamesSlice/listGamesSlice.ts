import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { IGame } from "../gameSlice";
import { serviceGame } from "../../services";
import appConfig from "../../../appConfig.json";

interface IState {
    listGames: IGame[];
    loadingStatus: string;
    updatingListGamesStatus: boolean;
    error: any;
}

export enum LOAD_STATUSES {
    UNKNOWN = "unknown",
    LOADING = "loading",
    SUCCESS = "loaded",
    FAILURE = "failure",
}

const initialState: IState = {
    listGames: [],
    loadingStatus: LOAD_STATUSES.UNKNOWN,
    updatingListGamesStatus: false,
    error: "",
};

export const fetchListGames = createAsyncThunk(
    "listGames/fetchListGames",
    async (_, { rejectWithValue }) => {
        try {
            const resp = await serviceGame.getUserGamesList();
            if (!resp) {
                return [];
            }
            const data = resp
                .reverse()
                .reduce((array: IGame[], item, idx) => {
                    if (idx < appConfig.maxListGamesNumber) {
                        array.push(item);
                    }
                    return array;
                }, [])
                .reverse();
            return data as IGame[];
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateListGames = createAsyncThunk<
    string,
    void,
    { state: RootState }
>(
    "listGames/updateListGames",
    async (_, { rejectWithValue, dispatch, getState }) => {
        const listGames = getState().stateGames.listGames as IGame[];
        const newGame = getState().currentGame;
        const newListGames = [...listGames, newGame];

        try {
            const resp = await serviceGame.postUserGamesList(newListGames);
            if (resp !== "ok") {
                throw new Error("error updating the list of games");
            }

            dispatch(listGamesActions.addListGames(newListGames));
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const listGamesSlice = createSlice({
    name: "listGames",
    initialState,
    reducers: {
        addListGames: (state, action: PayloadAction<IGame[]>) => {
            return (state = {
                ...state,
                listGames: action.payload,
            });
        },
        resetUpdatingListGamesStatus: (state) => {
            return (state = {
                ...state,
                updatingListGamesStatus: false,
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchListGames.pending, (state) => {
                (state.loadingStatus = LOAD_STATUSES.LOADING),
                    (state.error = "");
            })
            .addCase(fetchListGames.rejected, (state, action) => {
                (state.loadingStatus = LOAD_STATUSES.FAILURE),
                    (state.error = action.payload);
            })
            .addCase(fetchListGames.fulfilled, (state, action) => {
                (state.loadingStatus = LOAD_STATUSES.SUCCESS),
                    (state.listGames = action.payload);
            })
            .addCase(updateListGames.pending, (state) => {
                (state.loadingStatus = LOAD_STATUSES.LOADING),
                    (state.error = "");
            })
            .addCase(updateListGames.fulfilled, (state) => {
                (state.loadingStatus = LOAD_STATUSES.SUCCESS),
                    (state.updatingListGamesStatus = true);
            })
            .addCase(updateListGames.rejected, (state, action) => {
                (state.loadingStatus = LOAD_STATUSES.FAILURE),
                    (state.updatingListGamesStatus = false),
                    (state.error = action.payload);
            });
    },
});

export const listGamesActions = listGamesSlice.actions;
export const listGamesReducer = listGamesSlice.reducer;
export const listGamesSelector = (state: RootState) =>
    state.stateGames.listGames;
export const loadingStatusSelector = (state: RootState) =>
    state.stateGames.loadingStatus;
export const errorMesaageSelector = (state: RootState) =>
    state.stateGames.error;
export const updatingListGamesStatusSelector = (state: RootState) =>
    state.stateGames.updatingListGamesStatus;
