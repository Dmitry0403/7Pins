import { RootState } from "../store";
import { Message } from "./reducer";

export const getMessages = (state: RootState): Message[] => state.messages;
