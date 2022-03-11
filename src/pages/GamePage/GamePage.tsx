import React from "react";
import scss from "./styles.module.scss";
import { MasterPage } from "../MasterPage";
import { Game } from "../../components/Game";
import { LINKS } from "../../common/routes";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const GamePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <MasterPage>
            <Game />
            <div className={scss.footerButtons}>
                <Button size="large" onClick={() => navigate(LINKS.home)}>
                    exit the game
                </Button>
            </div>
        </MasterPage>
    );
};
