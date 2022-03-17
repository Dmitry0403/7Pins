import React, { useContext, useEffect } from "react";
import scss from "./styles.module.scss";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
    updateGame,
    gameSelector,
    playersSelector,
    settingGameSelector,
    loadingGameStatusSelector,
    errorMessageGameSelector,
    isUpdateGameStatusSelector,
} from "../../store/gameSlice";
import { Button, Spin } from "antd";
import { LINKS } from "../../common/routes";
import { useNavigate, generatePath } from "react-router-dom";
import { LOAD_STATUSES } from "../../common";
import { LanguageContext } from "../../languageContext";

export const ConfirmationList: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const players = useAppSelector(playersSelector);
    const settings = useAppSelector(settingGameSelector);
    const gameId = useAppSelector(gameSelector).idGame;
    const language = useContext(LanguageContext);

    const loadingStatus = useAppSelector(loadingGameStatusSelector);
    const errorMessage = useAppSelector(errorMessageGameSelector);
    const isUpdateGame = useAppSelector(isUpdateGameStatusSelector);

    useEffect(() => {
        if (isUpdateGame) {
            // navigate(generatePath(LINKS.game, { id: gameId }));
            navigate(LINKS.game);
        }
    }, [isUpdateGame]);

    const handleSubmitGame = () => {
        dispatch(updateGame());
    };

    const handleGoBack = () => {
        navigate(LINKS.setting);
    };

    return (
        <div className={scss.mainConfirmationGame}>
            <div className={scss.mainTitle}>Settings of the game</div>
            <div className={scss.mainSection}>
                <div className={scss.mainSubSection}>
                    <div className={scss.playersSection}>
                        <div className={scss.title}>Points of the players:</div>
                        {Object.keys(players).map((item) => (
                            <div className={scss.player} key={item}>
                                <div className={scss.playerName}>
                                    {players[item].name}
                                </div>
                                <div className={scss.playerSetting}>
                                    <div className={scss.settingItem}>
                                        <span>points:</span>
                                        <span>{players[item].value}</span>
                                    </div>
                                    <div className={scss.settingItem}>
                                        <span>order:</span>
                                        <span>{players[item].order}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={scss.settingsSection}>
                        <div className={scss.title}>Points of the game:</div>
                        {Object.keys(settings).map(
                            (item, idx) =>
                                settings[item] && (
                                    <div
                                        className={
                                            idx % 2 === 0
                                                ? scss.settingGray
                                                : scss.setting
                                        }
                                        key={item}
                                    >
                                        <div className={scss.settingItem}>
                                            {
                                                language[
                                                    item as keyof typeof language
                                                ]
                                            }
                                        </div>
                                        <div className={scss.settingItem}>
                                            {settings[item]}
                                        </div>
                                    </div>
                                )
                        )}
                    </div>
                </div>
            </div>
            <div className={scss.footerButtons}>
                <Button
                    className={scss.button}
                    size="large"
                    onClick={handleGoBack}
                >
                    back
                </Button>
                {loadingStatus === LOAD_STATUSES.LOADING && (
                    <Spin size="large" />
                )}
                {loadingStatus === LOAD_STATUSES.FAILURE && (
                    <div>{errorMessage}</div>
                )}
                <Button size="large" onClick={handleSubmitGame}>
                    next to start
                </Button>
            </div>
        </div>
    );
};
