import React, { useContext } from "react";
import scss from "./styles.module.scss";
import type { ISetting } from "../../store/gameSlice";
import { useLanguage } from "../../languageContext";

interface IProps {
    settings: ISetting;
    handleClickPoint: (value: string, isPenalty: boolean) => void;
}

const penaltiesKeys = [
    "ballJumedOffTable",
    "cueBallNotTouchSingleAimingBall",
    "cueBallFallsIntoPocket",
    "touchingAimingBallWithCue",
];

const downedPinsPenaltiesKeys = ["king", "officer", "pawn"];

export const GamePenalties: React.FC<IProps> = ({
    settings,
    handleClickPoint,
}) => {
    const { languageTheme: language } = useLanguage();

    return (
        <div className={scss.gamePenalties}>
            <div className={scss.title}>{language.penaltiesGame}</div>
            {penaltiesKeys.map((item) => (
                <div
                    className={scss.button}
                    key={item}
                    onClick={() => handleClickPoint(item, true)}
                >
                    {language && language[item as keyof typeof language]}
                </div>
            ))}
            <div className={scss.title}>{language.downedPinsPenalties}</div>
            {downedPinsPenaltiesKeys.map((item) => (
                <div
                    className={scss.button}
                    key={item}
                    onClick={() => handleClickPoint(item, true)}
                >
                    {language[item as keyof typeof language]}
                </div>
            ))}
        </div>
    );
};
