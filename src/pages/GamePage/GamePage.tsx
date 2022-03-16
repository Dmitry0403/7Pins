import React from "react";
import scss from "./styles.module.scss";
import { MasterPage } from "../MasterPage";
import { Game } from "../../components/Game";
import { LINKS } from "../../common/routes";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateListGames } from "../../store/listGamesSlice/listGamesSlice";

export const GamePage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleExitGame = () => {
        dispatch(updateListGames());
        navigate(LINKS.home);
    };

    return (
        <MasterPage>
            <Game />
            <div className={scss.footerButtons}>
                <Button size="large" onClick={handleExitGame}>
                    exit the game
                </Button>
            </div>
        </MasterPage>
    );
};
