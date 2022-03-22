import React, { useState, useContext } from "react";
import scss from "./styles.module.scss";
import { Button } from "antd";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { ISetting, settingGameSelector } from "../../store/gameSlice";
import { LanguageForGameContext } from "../../languageContext";

interface IProps {
    settings: ISetting;
}

const pointsKeys = [
    "king",
    "officer",
    "pawn",
    "onlyKingDowned",
    "caromBalls",
    "alianBall",
    "kingAndFourPawnsKnockedDown",
    "allPinsKnockedDown",
    "bothSightingBallsScored",
];

export const GamePoints: React.FC<IProps> = ({ settings }) => {
    const languageForGame = useContext(LanguageForGameContext);

    return (
        <div className={scss.gamePoints}>
            <div className={scss.title}>Game points:</div>
            {pointsKeys.map((item) => (
                <div className={scss.button} key={item}>
                    {languageForGame[item as keyof typeof languageForGame]}
                </div>
            ))}
        </div>
    );
};
