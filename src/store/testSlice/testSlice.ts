import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { v4 as uuidv4 } from "uuid";

export interface Message {
    title: string;
    id: string;
}

export interface MessagesType {
    messages: Message[];
}

const initialState: MessagesType = {
    messages: [],
};

export const testSlice = createSlice({
    name: "massages",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<string>) => {
            state.messages = [
                ...state.messages,
                { title: action.payload, id: uuidv4() },
            ];
        },
        removeMessage: (state, action: PayloadAction<string>) => {
            state.messages = state.messages.filter(
                (item) => item.id !== action.payload
            );
        },
    },
});

export const { addMessage, removeMessage } = testSlice.actions;
export const getMessages = (state: RootState) => state.test.messages;
