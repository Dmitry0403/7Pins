import { CheckCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";
import React, { useEffect } from "react";
import { Link, generatePath } from "react-router-dom";
import scss from "./styles.module.scss";
import { LINKS } from "../../common/routes";
import {
    fetchListGames,
    listGamesSelector,
    loadingStatusSelector,
    errorMesaageSelector,
} from "../../store/listGamesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Spin } from "antd";
import { LOAD_STATUSES } from "../../common";
import { useLanguage } from "../../languageContext";

export const ListGames: React.FC = () => {
    const dispatch = useAppDispatch();
    const { languageTheme: language } = useLanguage();

    useEffect(() => {
        dispatch(fetchListGames());
    }, [dispatch]);

    const listGames = useAppSelector(listGamesSelector);
    const loadingStatus = useAppSelector(loadingStatusSelector);
    const errorMessage = useAppSelector(errorMesaageSelector);

    const isCompleteGame = listGames.find((item) => Boolean(!item.isComplete));

    return (
        <div className={scss.mainListGames}>
            {loadingStatus === LOAD_STATUSES.LOADING && <Spin size="large" />}
            {loadingStatus === LOAD_STATUSES.SUCCESS && (
                <div className={scss.sectionListGames}>
                    <div className={scss.titleListGames}>
                        {language.listGames}:
                        {isCompleteGame && (
                            <div className={scss.message}>
                                {language.umcompletedGame}
                            </div>
                        )}
                    </div>
                    {!listGames.length ? (
                        <div className={scss.emptyListGames}>
                            {language.emptyGamesList}
                        </div>
                    ) : (
                        <div className={scss.subSectionListGames}>
                            <div className={scss.listGames}>
                                {listGames.map((item) => (
                                    <Link
                                        to={generatePath(LINKS.details, {
                                            id: item.idGame,
                                        })}
                                        className={
                                            item.isComplete
                                                ? scss.gameCompleted
                                                : scss.gameUncompleted
                                        }
                                        key={item.idGame}
                                    >
                                        <div className={scss.listContent}>
                                            <div className={scss.data}>
                                                {item.dateGame}
                                            </div>
                                            <div className={scss.players}>
                                                {language.players}:
                                                {Object.keys(item.players).map(
                                                    (key) => (
                                                        <span
                                                            className={
                                                                scss.player
                                                            }
                                                            key={key}
                                                        >
                                                            {
                                                                item.players[
                                                                    key
                                                                ].name
                                                            }
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <div className={scss.icon}>
                                            {item.isComplete ? (
                                                <CheckCircleTwoTone twoToneColor="#52c41a" />
                                            ) : (
                                                <MinusCircleTwoTone twoToneColor="#eb5b2f" />
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
            {loadingStatus === LOAD_STATUSES.FAILURE && (
                <div>{errorMessage}</div>
            )}
        </div>
    );
};
