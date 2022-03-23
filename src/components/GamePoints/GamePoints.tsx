import React, { useContext } from "react";
import scss from "./styles.module.scss";
import { ISetting } from "../../store/gameSlice";
import { LanguageForGameContext } from "../../languageContext";

interface IProps {
    settings: ISetting;
}

const pointsKeys = ["king", "officer", "pawn", "caromBalls", "alianBall"];

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
