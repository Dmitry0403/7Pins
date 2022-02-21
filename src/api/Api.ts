import type { GameType } from "../store/gameSlice";

interface ApiType {
    getUserGamesList: () => Promise<GameType[]>;
}

export class Api implements ApiType {
    getUserGamesList(): Promise<GameType[]> {
        const resp: Promise<GameType[]> = new Promise((resolve) => {
            resolve(JSON.parse(localStorage.getItem("listGames") as string));
        });
        return resp;
    }
}
