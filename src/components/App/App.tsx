import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../../pages/HomePage";
import { StartPage } from "../../pages/StartPage";
import { SettingPage } from "../../pages/SettingPage";
import { ConfirmationPage } from "../../pages/ConfirmationPage";
import { RulesPage } from "../../pages/RulesPage";
import { GamePage } from "../../pages/GamePage";
import { ResultsPage } from "../../pages/ResultsPage";
import { DetailsPage } from "../../pages/DetailsPage";
import { CurrencyPage } from "../../pages/CurrencyPage";
import { MasterPage } from "../../pages/MasterPage";
import { LINKS } from "../../common/routes";
import "antd/dist/antd.css";
import { Game } from "../Game";

export const App: React.FC = () => {
    return (
        <Routes>
            <Route path={LINKS.home} element={<MasterPage />}>
                <Route index element={<HomePage />} />
                <Route path={LINKS.details} element={<DetailsPage />} />
                <Route path={LINKS.start} element={<StartPage />} />
                <Route path={LINKS.setting} element={<SettingPage />} />
                <Route
                    path={LINKS.confirmation}
                    element={<ConfirmationPage />}
                />
                <Route path={LINKS.game} element={<GamePage />} />
                <Route path={LINKS.results} element={<ResultsPage />} />
                <Route path={LINKS.rules} element={<RulesPage />} />
                <Route path={LINKS.currency} element={<CurrencyPage />} />
                <Route path="*" element={<Navigate to={LINKS.home} />} />
            </Route>
        </Routes>
    );
};
