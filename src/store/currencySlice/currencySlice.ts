import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import { LOAD_STATUSES } from "../../common";
import { serviceCurrency } from "../../services";

export interface ICurrency {
    Cur_Abbreviation: string;
    Cur_Name: string;
    Cur_OfficialRate: number;
    Cur_Scale: number;
    Cur_ID: number;
}

interface IState {
    data: ICurrency[];
    loadingStatus: string;
    error: any;
}

const initialState: IState = {
    data: [],
    loadingStatus: LOAD_STATUSES.UNKNOWN,
    error: "",
};

export const fetchCurrency = createAsyncThunk(
    "currency/fetchCurrency",
    async (url: string, { rejectWithValue }) => {
        try {
            const resp = await serviceCurrency.getCurrency(url);
            if (!resp) {
                throw new Error("loading error, try again");
            }
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrency.pending, (state) => {
                (state.loadingStatus = LOAD_STATUSES.LOADING),
                    (state.error = "");
            })
            .addCase(fetchCurrency.fulfilled, (state, action) => {
                (state.loadingStatus = LOAD_STATUSES.SUCCESS),
                    (state.data = action.payload);
            })
            .addCase(fetchCurrency.rejected, (state, action) => {
                (state.loadingStatus = LOAD_STATUSES.FAILURE),
                    (state.error = action.error.message);
            });
    },
});

export const currencyReducer = currencySlice.reducer;
export const currencySelector = (state: RootState) => state.currency.data;
export const loadingStatusCurrencySelector = (state: RootState) =>
    state.currency.loadingStatus;
export const errorMessageCurrencySelector = (state: RootState) =>
    state.currency.error;
