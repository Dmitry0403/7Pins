import type { IGame } from "../store/gameSlice";

interface IServiceGame {
    postUserGamesList: (payload: IGame[]) => Promise<string>;
    getUserGamesList: () => Promise<IGame[]>;
}

class ServiceGame implements IServiceGame {
    postUserGamesList(payload: IGame[]): Promise<string> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() * 100 < 90
                    ? (() => {
                          localStorage.setItem(
                              "listGames",
                              JSON.stringify(payload)
                          );
                          resolve("ok");
                      })()
                    : reject("loading error, try again");
            }, 1200);
        });
    }

    getUserGamesList(): Promise<IGame[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() * 100 < 90
                    ? resolve(
                          JSON.parse(
                              localStorage.getItem("listGames") as string
                          )
                      )
                    : reject("error loading the list of games");
            }, 1200);
        });
    }
}

export const serviceGame = new ServiceGame();
