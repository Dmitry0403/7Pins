import { Api } from "./Api";
import type { IGame } from "../store/gameSlice";

const listGames: IGame[] = [
    {
        dateGame: "Mon Dec 29 2021",
        idGame: "1",
        players: [
            { name: "Pavel", idPlayer: "1", points: 500 },
            { name: "Dima", idPlayer: "2", points: 500 },
            { name: "Pavel", idPlayer: "3", points: 500 },
        ],
        isComplete: true,
    },
    {
        dateGame: "Wed Jan 05 2022",
        idGame: "2",
        players: [
            { name: "Pavel", idPlayer: "3", points: 500 },
            { name: "Kolya", idPlayer: "4", points: 500 },
        ],
        isComplete: false,
    },
    {
        dateGame: "Wed Feb 02 2022",
        idGame: "3",
        players: [
            { name: "Pavel", idPlayer: "5", points: 500 },
            { name: "Vasya", idPlayer: "6", points: 500 },
        ],
        isComplete: true,
    },
];

export const getGamesList = (): Promise<IGame[]> => {
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
