import type { IGame } from "../store/gameSlice";
import type { ICurrency } from "../store/currencySlice";

interface IServiceGame {
    postGames: (payload: IGame[] | IGame, path: string) => Promise<string>;
    getGames: (path: string) => Promise<IGame[] | IGame>;
    getCurrency: (params: string) => Promise<any>;
}

class ServiceGame implements IServiceGame {
    postGames(payload: IGame[] | IGame, path: string): Promise<string> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() * 100 < 90
                    ? (() => {
                          localStorage.setItem(path, JSON.stringify(payload));
                          resolve("ok");
                      })()
                    : reject("loading error, try again");
            }, 1200);
        });
    }

    getGames(path: string): Promise<IGame[] | IGame> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() * 100 < 90
                    ? resolve(JSON.parse(localStorage.getItem(path) as string))
                    : reject("loading error, try again");
            }, 1200);
        });
    }

    getCurrency(params: string): Promise<ICurrency[]> {
        return fetch(params).then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
        });
    }
}

export const serviceGame = new ServiceGame();
