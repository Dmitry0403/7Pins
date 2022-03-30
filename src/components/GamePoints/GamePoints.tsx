import React, { useContext } from "react";
import scss from "./styles.module.scss";
import { LanguageForGameContext } from "../../languageContext";

interface IProps {
    handleClickPoint: (key: string, isPenalty: boolean) => void;
}

const pointsKeys = ["king", "officer", "pawn", "caromBalls", "alianBall"];

export const GamePoints: React.FC<IProps> = ({ handleClickPoint }) => {
    const languageForGame = useContext(LanguageForGameContext);

    return (
        <div className={scss.gamePoints}>
            <div className={scss.title}>Game points:</div>
            {pointsKeys.map((item) => (
                <div
                    className={scss.button}
                    key={item}
                    onClick={() => handleClickPoint(item, false)}
                >
                    {languageForGame[item as keyof typeof languageForGame]}
                </div>
            ))}
        </div>
    );
};
