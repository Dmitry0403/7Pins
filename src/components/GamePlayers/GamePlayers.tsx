import React, { useState, useEffect } from "react";
import scss from "./styles.module.scss";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { playersSelector } from "../../store/gameSlice";
import { useDispatch } from "react-redux";
import { fetchGame } from "../../store/gameSlice";

export const GamePlayers: React.FC = () => {
    const dispatch = useDispatch();
    const players = useAppSelector(playersSelector);

    useEffect(() => {
        if (!players) {
            dispatch(fetchGame());
        }
    }, [dispatch]);

    return (
        <div className={scss.gamePlayers}>
            <div className={scss.titlePlayers}> Players points </div>
            <div className={scss.listPlayers}>
                {Object.keys(players).map((item) => (
                    <div className={scss.itemPlayer} key={item}>
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
