import React from "react";
import scss from "styles.module.scss";
import { MasterPage } from "../MasterPage";
import { RegistrationForm } from "../../components/RegistrationForm";

export const StartPage: React.FC = () => {
    return (
        <MasterPage>
            <RegistrationForm />
        </MasterPage>
    );
};
