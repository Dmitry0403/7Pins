import { TEST_ACTIONS } from "./constatns";

export const addMessage = (payload: string) => ({
    type: TEST_ACTIONS.ADD_MESSAGE,
    payload,
});

export const removeMessage = (id: string) => ({
    type: TEST_ACTIONS.REMOVE_MESSAGE,
    id,
});
