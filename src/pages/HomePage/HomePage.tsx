import { Button } from "antd";
import { CheckCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import scss from "./styles.module.scss";
import classNames from "classnames";
import { LINKS } from "../../common/routes";

interface GameType {
    game: string;
    idGame: string;
    players: {
        name: string;
        idPlayer: string;
    }[];
    isComplete: boolean;
}

let listGames: GameType[] = [
    {
        game: "Mon Dec 29 2021",
        idGame: "1",
        players: [
            { name: "Pavel", idPlayer: "1" },
            { name: "Dima", idPlayer: "2" },
        ],
        isComplete: true,
    },
    {
        game: "Wed Jan 05 2022",
        idGame: "2",
        players: [
            { name: "Pavel", idPlayer: "3" },
            { name: "Kolya", idPlayer: "4" },
        ],
        isComplete: false,
    },
    {
        game: "Wed Feb 02 2022",
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

    useEffect(() => {
        if (localStorage.getItem("listGames")) {
            listGames = JSON.parse(localStorage.getItem("listGames") as string);
        }
    }, []);

    const isCompleteGame = listGames.find((item) => item.isComplete === false);

    return (
        <div className={scss.wrapper}>
            <div className={scss.mainTitle}>Welcome to 7Pins!</div>
            <div className={scss.sectionButton}>
                <div className={scss.buttonTitle}>Start a new game</div>
                <Button size="large" onClick={() => navigate(LINKS.start)}>
                    Let's go
                </Button>
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
                                    to={LINKS.details + "/" + item.idGame}
                                    className={
                                        item.isComplete
                                            ? scss.gameCompleted
                                            : scss.gameUncompleted
                                    }
                                    key={item.idGame}
                                >
                                    <div className={scss.data}>{item.game}</div>
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
                                    {item.isComplete ? (
                                        <div className={scss.icon}>
                                            <CheckCircleTwoTone twoToneColor="#52c41a" />
                                        </div>
                                    ) : (
                                        <div className={scss.icon}>
                                            <MinusCircleTwoTone twoToneColor="#eb2f96" />
                                        </div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
