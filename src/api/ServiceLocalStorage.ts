import { Api } from "./Api";
import type { GameType } from "../store/gameSlice";

const listGames: GameType[] = [
    {
        dateGame: "Mon Dec 29 2021",
        idGame: "1",
        players: [
            { name: "Pavel", idPlayer: "1" },
            { name: "Dima", idPlayer: "2" },
            { name: "Pavel", idPlayer: "3" },
        ],
        isComplete: true,
    },
    {
        dateGame: "Wed Jan 05 2022",
        idGame: "2",
        players: [
            { name: "Pavel", idPlayer: "3" },
            { name: "Kolya", idPlayer: "4" },
        ],
        isComplete: false,
    },
    {
        dateGame: "Wed Feb 02 2022",
        idGame: "3",
        players: [
            { name: "Pavel", idPlayer: "5" },
            { name: "Vasya", idPlayer: "6" },
        ],
        isComplete: true,
    },
];

export const getGamesList = (): Promise<GameType[]> => {
    const { getUserGamesList } = Api.prototype;
    return getUserGamesList()
        .then((data) => {
            if (data) {
                return data;
            } else throw new Error("error");
        })
        .catch(() => {
            return listGames;
        });
};
