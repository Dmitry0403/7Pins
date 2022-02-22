import React from "react";
import scss from "./styles.module.scss";
import { StepInput } from "../StepInput";

interface IProps {
    title: string;
    valueInput: number;
}

export const SettingItem: React.FC<IProps> = ({ title, valueInput }) => {
    return (
        <div className={scss.main}>
            <div className={scss.title}>{title}</div>
            <StepInput valueInput={valueInput} />
        </div>
    );
};
