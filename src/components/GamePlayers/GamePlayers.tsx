import React from "react";
import scss from "./styles.module.scss";
import type { IPlayers } from "../../store/gameSlice";

interface IProps {
    players: IPlayers;
}

export const GamePlayers: React.FC<IProps> = ({ players }) => {
    return (
        <div className={scss.gamePlayers}>
            <div className={scss.titlePlayers}> Players points: </div>
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
    );
};
