import React, { useState, useEffect } from "react";
import scss from "./styles.module.scss";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { playersSelector } from "../../store/gameSlice";
import { useDispatch } from "react-redux";
import { fetchGame } from "../../store/gameSlice";
import { Spin } from "antd";
import {
    loadingGameStatusSelector,
    errorMessageGameSelector,
} from "../../store/gameSlice";
import { LOAD_STATUSES } from "../../common";

export const GamePlayers: React.FC = () => {
    const dispatch = useDispatch();
    const players = useAppSelector(playersSelector);
    const errorMessage = useAppSelector(errorMessageGameSelector);
    const loadStatus = useAppSelector(loadingGameStatusSelector);

    useEffect(() => {
        if (!Object.keys(players)[0]) {
            dispatch(fetchGame());
        }
    }, [dispatch]);

    return (
        <div className={scss.gamePlayers}>
            <div className={scss.titlePlayers}> Players points </div>
            {loadStatus === LOAD_STATUSES.LOADING && <Spin />}
            {loadStatus === LOAD_STATUSES.FAILURE && <div>{errorMessage}</div>}
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
