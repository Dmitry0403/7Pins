import React, { useContext } from "react";
import scss from "./styles.module.scss";
import { useLanguage } from "../../languageContext";

interface IProps {
    handleClickPoint: (key: string, isPenalty: boolean) => void;
}

const pointsKeys = ["king", "officer", "pawn", "caromBalls", "alianBall"];

export const GamePoints: React.FC<IProps> = ({ handleClickPoint }) => {
    const { languageTheme: language } = useLanguage();

    return (
        <div className={scss.gamePoints}>
            <div className={scss.title}>{language.gamePoints}</div>
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
