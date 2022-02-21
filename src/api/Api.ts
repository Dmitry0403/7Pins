import type { IGame } from "../store/gameSlice";

interface ApiType {
    getUserGamesList: () => Promise<IGame[]>;
}

export class Api implements ApiType {
    getUserGamesList(): Promise<IGame[]> {
        const resp: Promise<IGame[]> = new Promise((resolve) => {
            resolve(JSON.parse(localStorage.getItem("listGames") as string));
        });
        return resp;
    }
}
