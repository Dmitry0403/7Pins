import React from "react";
import { useNavigate } from "react-router-dom";
import scss from "./styles.module.scss";
import { LINKS } from "../../common/routes";
import { MasterPage } from "../MasterPage";
import { ListGames } from "../../components/ListGames";

export const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <MasterPage>
            <div className={scss.container}>
                <div className={scss.mainTitle}>
                    Welcome to <span>7Pins!</span>
                </div>
                <div className={scss.sectionButton}>
                    <div className={scss.buttonTitle}>Start a new game</div>
                    <div
                        className={scss.button}
                        onClick={() => navigate(LINKS.start)}
                    >
                        Let's go
                    </div>
                </div>
                <ListGames />
            </div>
        </MasterPage>
    );
};
