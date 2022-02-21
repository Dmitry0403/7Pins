import { CheckCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link, generatePath } from "react-router-dom";
import scss from "./styles.module.scss";
import { LINKS } from "../../common/routes";
import { getGamesList } from "../../api";
import type { GameType } from "../../store/gameSlice";

export const ListGames: React.FC = () => {
    const [listGames, setList] = useState<GameType[]>([]);

    useEffect(() => {
        getGamesList().then((data) => setList(data));
    }, []);

    const isCompleteGame = listGames.find((item) => item.isComplete === false);

    return (
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
    );
};
