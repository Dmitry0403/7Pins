import React, { useContext } from "react";
import scss from "./styles.module.scss";
import type { ISetting } from "../../store/gameSlice";
import { LanguageForGameContext } from "../../languageContext";

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
    const languageForGame = useContext(LanguageForGameContext);

    return (
        <div className={scss.gamePenalties}>
            <div className={scss.title}>Game penalties:</div>
            {penaltiesKeys.map((item) => (
                <div
                    className={scss.button}
                    key={item}
                    onClick={() => handleClickPoint(item, true)}
                >
                    {languageForGame[item as keyof typeof languageForGame]}
                </div>
            ))}
            {(settings.ballDirectlyKnockedPins ||
                settings.touchingClothesOrCuePins) && (
                <div>
                    <div className={scss.title}>Downed pins penalties:</div>
                    {downedPinsPenaltiesKeys.map((item) => (
                        <div
                            className={scss.button}
                            key={item}
                            onClick={() => handleClickPoint(item, true)}
                        >
                            {
                                languageForGame[
                                    item as keyof typeof languageForGame
                                ]
                            }
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
