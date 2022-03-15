import React, { useState, useContext } from "react";
import scss from "./styles.module.scss";
import { Button } from "antd";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { settingGame } from "../../store/gameSlice";
import { LanguageContext } from "../../languageContext";

interface IProps {}

export const GamePoints: React.FC<IProps> = ({}) => {
    const settings = useAppSelector(settingGame);
    const language = useContext(LanguageContext);
    const points = {
        king: {
            title: language.king,
            value: settings.king.value,
        },
        officer: {
            title: language.officer,
            value: settings.officer.value,
        },
        pawn: {
            title: language.pawn,
            value: settings.pawn.value,
        },
        onlyKingDowned: {
            title: language.onlyKingDowned,
            value: settings.onlyKingDowned.value,
        },
        caromBalls: {
            title: language.caromBalls,
            value: settings.caromBalls.value,
        },
        alianBall: {
            title: language.alianBall,
            value: settings.alianBall.value,
        },
        kingAndFourPawnsKnockedDown: {
            title: language.kingAndFourPawnsKnockedDown,
            value: settings.kingAndFourPawnsKnockedDown.value,
        },
        allPinsKnockedDown: {
            title: language.allPinsKnockedDown,
            value: settings.allPinsKnockedDown.value,
        },
        fiveCaromBalls: {
            title: language.fiveCaromBalls,
            value: settings.fiveCaromBalls.value,
        },
        bothSightingBallsScored: {
            title: language.bothSightingBallsScored,
            value: settings.bothSightingBallsScored.value,
        },
    };

    return (
        <div className={scss.gameSetting}>
            <div className={scss.title}>Games points</div>
            {Object.keys(points).map((item) => (
                <div className={scss.itemButton} key={item}>
                    <Button className={scss.button}>
                        {settings[item].value}
                    </Button>
                    <span>{settings[item].title}</span>
                </div>
            ))}
        </div>
    );
};
