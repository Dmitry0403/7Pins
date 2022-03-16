import React, { useState } from "react";
import scss from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { gameActions } from "../../store/gameSlice";
import {
    fetchListGames,
    listGamesSelector,
    loadingStatusSelector,
    errorMesaageSelector,
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

    return (
        <div className={scss.mainGame}>
            <GamePlayers />
        </div>
    );
};
