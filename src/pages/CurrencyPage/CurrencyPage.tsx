import React from "react";
import { CurrencyTable } from "../../components/CurrencyTable";
import { MasterPage } from "../MasterPage";

export const CurrencyPage: React.FC = () => {
    return (
        <MasterPage>
            <CurrencyTable />
        </MasterPage>
    );
};
