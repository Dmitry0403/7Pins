import type { GameType } from "../store/gameSlice";

interface ApiType {
    getUserGamesList: () => void;
}

export class Api implements ApiType {
    getUserGamesList = (): GameType[] => {
        return JSON.parse(localStorage.getItem("listGames") as string);
    };
}
