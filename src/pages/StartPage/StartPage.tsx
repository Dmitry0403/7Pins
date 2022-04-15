import React from "react";
import { useNavigate } from "react-router-dom";
import scss from "./styles.module.scss";
import { LINKS } from "../../common/routes";
import { ListGames } from "../../components/ListGames";
import { useAppDispatch } from "../../store/hooks";
import { gameActions } from "../../store/gameSlice";
import { useLanguage } from "../../languageContext";

export const StartPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { languageTheme: language } = useLanguage();

    const handleStartGame = () => {
        dispatch(gameActions.resetUpdatingGame());
        dispatch(gameActions.createGame());
        navigate(LINKS.registration);
    };

    return (
        <div className={scss.mainHomePage}>
            <div className={scss.mainTitle}>
                {language.welcome} <span>7Pins!</span>
            </div>
            <div className={scss.sectionButton}>
                <div className={scss.buttonTitle}>{language.startNewGame}</div>
                <div className={scss.button} onClick={handleStartGame}>
                    {language.letsGo}
                </div>
            </div>
            <ListGames />
        </div>
    );
};
