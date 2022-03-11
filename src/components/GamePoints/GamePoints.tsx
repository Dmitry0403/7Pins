import React, { useState, useContext } from "react";
import scss from "./styles.module.scss";
import { Button } from "antd";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { settingGame } from "../../store/gameSlice";
import { LanguageThemeContext } from "../../themeContext";

interface IProps {}

export const GamePoints: React.FC<IProps> = ({}) => {
    const settings = useAppSelector(settingGame);
    const languageTheme = useContext(LanguageThemeContext);
    const points = {
        king: {
            title: languageTheme.king,
            value: settings.king.value,
        },
        officer: {
            title: languageTheme.officer,
            value: settings.officer.value,
        },
        pawn: {
            title: languageTheme.pawn,
            value: settings.pawn.value,
        },
        onlyKingDowned: {
            title: languageTheme.onlyKingDowned,
            value: settings.onlyKingDowned.value,
        },
        caromBalls: {
            title: languageTheme.caromBalls,
            value: settings.caromBalls.value,
        },
        alianBall: {
            title: languageTheme.alianBall,
            value: settings.alianBall.value,
        },
        kingAndFourPawnsKnockedDown: {
            title: languageTheme.kingAndFourPawnsKnockedDown,
            value: settings.kingAndFourPawnsKnockedDown.value,
        },
        allPinsKnockedDown: {
            title: languageTheme.allPinsKnockedDown,
            value: settings.allPinsKnockedDown.value,
        },
        fiveCaromBalls: {
            title: languageTheme.fiveCaromBalls,
            value: settings.fiveCaromBalls.value,
        },
        bothSightingBallsScored: {
            title: languageTheme.bothSightingBallsScored,
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
