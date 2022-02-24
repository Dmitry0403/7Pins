import React from "react";
import { useNavigate } from "react-router-dom";
import scss from "./styles.module.scss";
import { LINKS } from "../../common/routes";
import { MasterPage } from "../MasterPage";
import { ListGames } from "../../components/ListGames";
import { useAppDispatch } from "../../store/hooks";
import { gameActions } from "../../store/gameSlice";
import { listGamesActions } from "../../store/listGamesSlice/listGamesSlice";

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleStartGame = () => {
        dispatch(listGamesActions.resetUpdatingListGamesStatus());
        dispatch(gameActions.createGame());
        navigate(LINKS.start);
    };

    return (
        <MasterPage>
            <div className={scss.mainHomePage}>
                <div className={scss.mainTitle}>
                    Welcome to <span>7Pins!</span>
                </div>
                <div className={scss.sectionButton}>
                    <div className={scss.buttonTitle}>Start a new game</div>
                    <div className={scss.button} onClick={handleStartGame}>
                        Let's go
                    </div>
                </div>
                <ListGames />
            </div>
        </MasterPage>
    );
};
