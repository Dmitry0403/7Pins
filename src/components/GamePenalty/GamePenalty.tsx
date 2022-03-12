import React, { useState, useContext } from "react";
import scss from "./styles.module.scss";
import { Button } from "antd";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { settingGame } from "../../store/gameSlice";
import { LanguageThemeContext } from "../../languageContext";

interface IProps {}

export const GamePenalty: React.FC<IProps> = ({}) => {
    const settings = useAppSelector(settingGame);
    const languageTheme = useContext(LanguageThemeContext);
    const penalty = {
        ballJumedOffTable: {
            title: languageTheme.ballJumedOffTable,
            value: settings.ballJumedOffTable.value,
        },
        cueBallNotTouchSingleAimingBall: {
            title: languageTheme.cueBallNotTouchSingleAimingBall,
            value: settings.cueBallNotTouchSingleAimingBall.value,
        },
        cueBallFallsIntoPocket: {
            title: languageTheme.cueBallFallsIntoPocket,
            value: settings.cueBallFallsIntoPocket.value,
        },
        touchingAimingBallWithCue: {
            title: languageTheme.touchingAimingBallWithCue,
            value: settings.touchingAimingBallWithCue.value,
        },
    };

    const downedPinsPenalty = {
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
    };

    return (
        <div className={scss.gameSetting}>
            <div className={scss.title}>Games penalty</div>
            {Object.keys(penalty).map((item) => (
                <div className={scss.itemButton} key={item}>
                    <Button className={scss.button}>
                        {settings[item].value}
                    </Button>
                    <span>{settings[item].title}</span>
                </div>
            ))}
            {(settings.ballDirectlyKnockedPins.value ||
                settings.touchingClothesOrCuePins.value) && (
                <div>
                    <div className={scss.title}>Downed pins penalty:</div>
                    {Object.keys(downedPinsPenalty).map((item) => (
                        <div className={scss.itemButton}>
                            <Button className={scss.button}>
                                {settings[item].value}
                            </Button>
                            <span>{settings[item].title}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
