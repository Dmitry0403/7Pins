import React, { useState } from "react";
import scss from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { gameActions } from "../../store/gameSlice";
import {
    fetchListGames,
    listGamesSelector,
    loadingStatusSelector,
    errorMesaageSelector,
    LOAD_STATUSES,
} from "../../store/listGamesSlice";
import { LINKS } from "../../common/routes";
import { useNavigate } from "react-router-dom";
import { Spin, Button } from "antd";
import { GamePoints } from "../GamePoints";
import { GamePenalty } from "../GamePenalty";
import { GamePlayers } from "../GamePlayers";

export const Game: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [choice, setChoice] = useState<boolean>(true);

    const loadingStatus = useAppSelector(loadingStatusSelector);
    const errorMessage = useAppSelector(errorMesaageSelector);

    const handleChoiceSetting = (boolean: boolean) => {
        setChoice(boolean);
    };

    return (
        <div className={scss.mainGame}>
            <GamePlayers />
            <div className={scss.choiceSection}>
                <Button
                    className={scss.choiceSetting}
                    onClick={() => handleChoiceSetting(true)}
                >
                    points
                </Button>
                <Button
                    className={scss.choiceSetting}
                    onClick={() => handleChoiceSetting(false)}
                >
                    penalty
                </Button>
            </div>
            {choice ? <GamePoints /> : <GamePenalty />}
            <Button>back move</Button>
        </div>
    );
};
