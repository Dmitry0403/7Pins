import React, { useEffect, useState } from "react";
import scss from "./styles.module.scss";
import { GamePlayers } from "../GamePlayers";
import { useNavigate } from "react-router-dom";
import { updateListGames } from "../../store/listGamesSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
    playersSelector,
    settingGameSelector,
    fetchGame,
    gameActions,
    updateGame,
} from "../../store/gameSlice";
import { useDispatch } from "react-redux";
import { LINKS } from "../../common";
import { Button } from "antd";
import { GamePoints } from "../GamePoints";
import { GamePenalties } from "../GamePenalties";

export const Game: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const players = useAppSelector(playersSelector);
    const settings = useAppSelector(settingGameSelector);

    useEffect(() => {
        if (!Object.keys(players)[0]) {
            dispatch(fetchGame());
        }
    }, [dispatch]);

    const handleChangeActivePlayer = () => {
        const numberPlayers = Object.keys(players).length;

        const prevActiveKey = Object.keys(players).find(
            (item) => players[item].isActive
        ) as string;

        const nextActiveOrder =
            Number(players[prevActiveKey].order) >= numberPlayers
                ? 1
                : Number(players[prevActiveKey].order) + 1;

        const nextActiveKey = Object.keys(players).find(
            (item) => players[item].order === nextActiveOrder
        ) as string;

        const newDataPlayers = {
            ...players,
            [prevActiveKey]: {
                ...players[prevActiveKey],
                isActive: false,
            },
            [nextActiveKey]: {
                ...players[nextActiveKey],
                isActive: true,
            },
        };

        dispatch(gameActions.updatePlayersData(newDataPlayers));
        dispatch(updateGame());
    };

    const handleExitGame = () => {
        dispatch(updateListGames());
        navigate(LINKS.home);
    };

    return (
        <div className={scss.mainGame}>
            <div className={scss.players}>
                <GamePlayers players={players} />
            </div>
            <div className={scss.gameInfoSection}>
                <div className={scss.settingsSection}>
                    <GamePoints settings={settings} />
                    <GamePenalties settings={settings} />
                </div>
                <div className={scss.statisticsSection}>
                    <div className={scss.currentGamePoints}>
                        <div className={scss.currentGamePointsTitle}>
                            Current points:
                        </div>
                        <div className={scss.currentGamePointsValue}>0</div>
                    </div>
                    <div className={scss.gameStatistics}>
                        <div className={scss.gameStatisticsList}></div>
                    </div>
                    <div className={scss.button}>record the impact</div>
                </div>
            </div>
            <div className={scss.footerButtons}>
                <Button size="large" onClick={handleExitGame}>
                    exit the game
                </Button>
                <Button size="large" onClick={handleChangeActivePlayer}>
                    commit the approach
                </Button>
            </div>
        </div>
    );
};
