import { Button } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import scss from "./styles.module.scss";
import { LINKS } from "../../common/routes";

interface GameType {
    game: string;
    id: string;
    players: {
        name: string;
        idPlayer: string;
    }[];
    isComplit: boolean;
}

let listGames: GameType[] = [
    {
        game: "Mon Dec 29 2021",
        id: "1",
        players: [
            { name: "Pavel", idPlayer: "1" },
            { name: "Dima", idPlayer: "2" },
        ],
        isComplit: true,
    },
    {
        game: "Wed Jan 05 2022",
        id: "2",
        players: [
            { name: "Pavel", idPlayer: "3" },
            { name: "Kolya", idPlayer: "4" },
        ],
        isComplit: false,
    },
    {
        game: "Wed Feb 02 2022",
        id: "3",
        players: [
            { name: "Pavel", idPlayer: "5" },
            { name: "Vasya", idPlayer: "6" },
        ],
        isComplit: true,
    },
];

export const HomePage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("listGames")) {
            listGames = JSON.parse(localStorage.getItem("listGames") as string);
        }
    }, []);

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
                <div className={scss.titleListGames}>List of your games:</div>
                {listGames.length === 0 ? (
                    <div className={scss.emptyListGames}>
                        list of your games is empty.
                    </div>
                ) : (
                    <div className={scss.listGames}>
                        {listGames.map((item) => (
                            <div className={scss.game} key={item.id}>
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
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
