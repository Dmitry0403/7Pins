import React from "react";
import scss from "./styles.module.scss";
import type { IPlayers } from "../../store/gameSlice";
import { useLanguage } from "../../languageContext";

interface IProps {
    players: IPlayers;
}

export const GamePlayers: React.FC<IProps> = ({ players }) => {
    const { languageTheme: language } = useLanguage();
    return (
        <div className={scss.gamePlayers}>
            <div className={scss.titlePlayers}>{language.playersPoints}</div>
            <div className={scss.wrapperListPlayers}>
                <div className={scss.listPlayers}>
                    {Object.keys(players).map((item) => (
                        <div
                            className={
                                players[item].isActive
                                    ? scss.activePlayer
                                    : scss.player
                            }
                            key={item}
                        >
                            <div className={scss.namePlayer}>
                                {players[item].name}:
                            </div>
                            <div className={scss.pointsPlayer}>
                                {players[item].value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
