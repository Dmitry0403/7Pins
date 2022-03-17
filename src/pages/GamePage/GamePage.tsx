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
    return (
        <MasterPage>
            <Game />
        </MasterPage>
    );
};
