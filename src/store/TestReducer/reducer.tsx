import { Action } from "redux";
import { TEST_ACTIONS } from "./constatns";
import { v4 as uuidv4 } from "uuid";

export interface Message {
    itemMessage: string;
    id: string;
}

export interface MessagesType {
    messages: Message[];
}

const INITIAL_STATE: MessagesType = {
    messages: [],
};

export const TestReducer = (
    store: MessagesType = INITIAL_STATE,
    action: Action<TEST_ACTIONS>
): MessagesType => {
    const { messages } = store;
    switch (action.type) {
        case TEST_ACTIONS.ADD_MESSAGE:
            const { payload } = action as {
                type: TEST_ACTIONS.ADD_MESSAGE;
                payload: string;
            };
            if (payload) {
                return {
                    ...store,
                    messages: messages.concat([
                        { itemMessage: payload, id: uuidv4() },
                    ]),
                };
            }
            return store;
        case TEST_ACTIONS.REMOVE_MESSAGE:
            const { id } = action as {
                type: TEST_ACTIONS.REMOVE_MESSAGE;
                id: string;
            };
            return {
                ...store,
                messages: messages.filter((item) => item.id !== id),
            };
        default:
            return store;
    }
};
