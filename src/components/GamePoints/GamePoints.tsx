import React, { useContext } from "react";
import scss from "./styles.module.scss";
import { LanguageContext } from "../../languageContext";

interface IProps {
    handleClickPoint: (key: string, isPenalty: boolean) => void;
}

const pointsKeys = ["king", "officer", "pawn", "caromBalls", "alianBall"];

export const GamePoints: React.FC<IProps> = ({ handleClickPoint }) => {
    const language = useContext(LanguageContext);

    return (
        <div className={scss.gamePoints}>
            <div className={scss.title}>Game points:</div>
            {pointsKeys.map((item) => (
                <div
                    className={scss.button}
                    key={item}
                    onClick={() => handleClickPoint(item, false)}
                >
                    {language[item as keyof typeof language]}
                </div>
            ))}
        </div>
    );
};
