import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../../pages/HomePage";
import { RulesPage } from "../../pages/RulesPage";
import { GamePage } from "../../pages/GamePage";
import { ResultsPage } from "../../pages/ResultsPage";
import { LINKS } from "../../common/routes";
import "antd/dist/antd.css";
import scss from "./styles.module.scss";

export const App = () => {
    return (
        <div className={scss.wrapper}>
            <Routes>
                <Route path={LINKS.home} element={<HomePage />} />
                <Route path={LINKS.rules} element={<RulesPage />} />
                <Route path={LINKS.start} element={<GamePage />} />
                <Route path={LINKS.results} element={<ResultsPage />} />
                <Route path="*" element={<Navigate to={LINKS.home} />} />
            </Routes>
        </div>
    );
};
