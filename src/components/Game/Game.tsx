import React from "react";
import scss from "./styles.module.scss";
import { GamePlayers } from "../GamePlayers";
import { useLocation, useNavigate } from "react-router-dom";
import { updateListGames } from "../../store/listGamesSlice";
import { useDispatch } from "react-redux";
import { LINKS } from "../../common";
import { Button } from "antd";

export const Game: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleExitGame = () => {
        dispatch(updateListGames());
        navigate(LINKS.home);
    };
    return (
        <div className={scss.mainGame}>
            <div className={scss.players}>
                <GamePlayers />
            </div>
            <div className={scss.footerButtons}>
                <Button size="large" onClick={handleExitGame}>
                    exit the game
                </Button>
                <Button size="large">next player</Button>
            </div>
        </div>
    );
};
