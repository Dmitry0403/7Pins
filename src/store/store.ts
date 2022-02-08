import { configureStore } from "@reduxjs/toolkit";
import { testSlice } from "./testSlice/testSlice";

export const store = configureStore({
    reducer: {
        test: testSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
