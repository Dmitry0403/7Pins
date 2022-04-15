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
import { useLanguage } from "../../languageContext";

interface IImpact {
    value: string;
    isPenalty: boolean;
}

export const Game: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const players = useAppSelector(playersSelector);
    const settings = useAppSelector(settingGameSelector);
    const { languageTheme: language } = useLanguage();

    const [approachPoints, setApproachPoints] = useState<number>(0);
    const [impactPoints, setImpactPoints] = useState<number>(0);
    const [impact, setImpact] = useState<IImpact[]>([]);
    const [isPenalty, setIsPenalty] = useState<boolean>(false);

    useEffect(() => {
        if (!Object.keys(players).length) {
            dispatch(fetchGame());
        }
        if (isPenalty) {
            handleChangeActivePlayer();
            setIsPenalty(false);
        }
    }, [isPenalty]);

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
                value: isPenalty
                    ? Number(players[prevActiveKey].value) + approachPoints
                    : Number(players[prevActiveKey].value) - approachPoints,
                isActive: false,
            },
            [nextActiveKey]: {
                ...players[nextActiveKey],
                isActive: true,
            },
        };
        setApproachPoints(0);
        dispatch(gameActions.updatePlayersData(newDataPlayers));
        dispatch(updateGame());
    };

    const handleClickPoint = (value: string, isPenalty: boolean) => {
        const changeImpactValue = (impactNumber: number) => {
            if (
                impact.filter((item) => item.value === value).length >=
                impactNumber
            ) {
                return;
            }
            setImpact((prevState) => [...prevState, { value, isPenalty }]);
            setImpactPoints((prevState) => prevState + settings[value]);
        };

        switch (value) {
            case "king":
                changeImpactValue(1);
                break;
            case "officer":
                changeImpactValue(2);
                break;
            case "pawn":
                changeImpactValue(4);
                break;
            case "alianBall":
                changeImpactValue(2);
                break;
            case "caromBalls":
                changeImpactValue(1);
                break;
            case "ballJumedOffTable":
                changeImpactValue(1);
                break;
            case "cueBallNotTouchSingleAimingBall":
                changeImpactValue(1);
                break;
            case "cueBallFallsIntoPocket":
                changeImpactValue(1);
                break;
            case "touchingAimingBallWithCue":
                changeImpactValue(1);
                break;
            default:
                return;
        }
    };

    const handleRecordImpact = () => {
        if (impact.find((item) => item.isPenalty)) {
            setIsPenalty(true);
        }
        setApproachPoints((prevState) => prevState + impactPoints);
        setImpactPoints(0);
        setImpact([]);
    };

    const handleCommitApproach = () => {
        if (impactPoints) {
            handleRecordImpact();
            return;
        }
        handleChangeActivePlayer();
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
                    <GamePoints handleClickPoint={handleClickPoint} />
                    <GamePenalties
                        settings={settings}
                        handleClickPoint={handleClickPoint}
                    />
                </div>
                <div className={scss.statisticsSection}>
                    <div className={scss.currentGamePoints}>
                        <div className={scss.currentGamePointsValue}>
                            <div>{language.aproachPoints + approachPoints}</div>
                            <div>{language.impactPoints + impactPoints}</div>
                        </div>
                    </div>
                    <div className={scss.gameStatistics}>
                        <div className={scss.gameStatisticsList}></div>
                    </div>
                    <div className={scss.button} onClick={handleRecordImpact}>
                        {language.recordImpact}
                    </div>
                </div>
            </div>
            <div className={scss.footerButtons}>
                <Button size="large" onClick={handleExitGame}>
                    {language.exitGame}
                </Button>
                <Button size="large" onClick={handleCommitApproach}>
                    {language.commitApproach}
                </Button>
            </div>
        </div>
    );
};
