import React from "react";
import scss from "./styles.module.scss";
import { MasterPage } from "../MasterPage";
import { SettingsTable } from "../../components/SettingsTable";

export const SettingPage = () => {
    return (
        <MasterPage>
            <SettingsTable />
        </MasterPage>
    );
};
