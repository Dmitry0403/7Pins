import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../../pages/HomePage";
import { StartPage } from "../../pages/StartPage";
import { SettingPage } from "../../pages/SettingPage";
import { RulesPage } from "../../pages/RulesPage";
import { GamePage } from "../../pages/GamePage";
import { ResultsPage } from "../../pages/ResultsPage";
import { DetailsPage } from "../../pages/DetailsPage";
import { LINKS } from "../../common/routes";
import "antd/dist/antd.css";

export const App: React.FC = () => {
    return (
        <Routes>
            <Route path={LINKS.home} element={<HomePage />} />
            <Route path={LINKS.details} element={<DetailsPage />} />
            <Route path={LINKS.start} element={<StartPage />} />
            <Route path={LINKS.setting} element={<SettingPage />} />
            <Route path={LINKS.game} element={<GamePage />} />
            <Route path={LINKS.results} element={<ResultsPage />} />
            <Route path={LINKS.rules} element={<RulesPage />} />
            <Route path="*" element={<Navigate to={LINKS.home} />} />
        </Routes>
    );
};
