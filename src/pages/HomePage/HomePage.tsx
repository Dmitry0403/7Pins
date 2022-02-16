import { CheckCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";
import React, { useEffect } from "react";
import { Link, useNavigate, generatePath } from "react-router-dom";
import scss from "./styles.module.scss";
import { LINKS } from "../../common/routes";
import type { GameType } from "../../store/gameSlice";

let listGames: GameType[] = [
    {
        dateGame: "Mon Dec 29 2021",
        idGame: "1",
        players: [
            { name: "Pavel", idPlayer: "1" },
            { name: "Dima", idPlayer: "2" },
            { name: "Pavel", idPlayer: "3" },
            { name: "Dima", idPlayer: "4" },
            { name: "Pavel", idPlayer: "5" },
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

export const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const getItemFromStorage = localStorage.getItem("listGames");

    useEffect(() => {
        if (getItemFromStorage) {
            listGames = JSON.parse(getItemFromStorage as string);
        }
    }, []);

    const isCompleteGame = listGames.find((item) => item.isComplete === false);

    return (
        <div className={scss.wrapper}>
            <div className={scss.mainTitle}>
                Welcome to <span>7Pins!</span>
            </div>
            <div className={scss.sectionButton}>
                <div className={scss.buttonTitle}>Start a new game</div>
                <div
                    className={scss.button}
                    onClick={() => navigate(LINKS.start)}
                >
                    Let's go
                </div>
            </div>
            <div className={scss.sectionListGames}>
                <div className={scss.titleListGames}>
                    List of your games (view details):
                </div>
                {listGames.length === 0 ? (
                    <div className={scss.emptyListGames}>
                        list of your games is empty.
                    </div>
                ) : (
                    <div>
                        {isCompleteGame && (
                            <div className={scss.message}>
                                you have uncompleted games
                            </div>
                        )}
                        <div className={scss.listGames}>
                            {listGames.map((item) => (
                                <Link
                                    to={generatePath(LINKS.details, {
                                        id: item.idGame,
                                    })}
                                    className={
                                        item.isComplete
                                            ? scss.gameCompleted
                                            : scss.gameUncompleted
                                    }
                                    key={item.idGame}
                                >
                                    <div className={scss.listContent}>
                                        <div className={scss.data}>
                                            {item.dateGame}
                                        </div>
                                        <div className={scss.players}>
                                            players:
                                            {item.players.map((item) => (
                                                <span
                                                    className={scss.player}
                                                    key={item.idPlayer}
                                                >
                                                    {item.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={scss.icon}>
                                        {item.isComplete ? (
                                            <div>
                                                <CheckCircleTwoTone twoToneColor="#52c41a" />
                                            </div>
                                        ) : (
                                            <div>
                                                <MinusCircleTwoTone twoToneColor="#eb5b2f" />
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
