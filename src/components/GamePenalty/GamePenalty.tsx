import React, { useState, useContext } from "react";
import scss from "./styles.module.scss";
import { Button } from "antd";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { settingGame } from "../../store/gameSlice";
import { LanguageContext } from "../../languageContext";

interface IProps {}

export const GamePenalty: React.FC<IProps> = ({}) => {
    const settings = useAppSelector(settingGame);
    const language = useContext(LanguageContext);
    const penalty = {
        ballJumedOffTable: {
            title: language.ballJumedOffTable,
            value: settings.ballJumedOffTable.value,
        },
        cueBallNotTouchSingleAimingBall: {
            title: language.cueBallNotTouchSingleAimingBall,
            value: settings.cueBallNotTouchSingleAimingBall.value,
        },
        cueBallFallsIntoPocket: {
            title: language.cueBallFallsIntoPocket,
            value: settings.cueBallFallsIntoPocket.value,
        },
        touchingAimingBallWithCue: {
            title: language.touchingAimingBallWithCue,
            value: settings.touchingAimingBallWithCue.value,
        },
    };

    const downedPinsPenalty = {
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
