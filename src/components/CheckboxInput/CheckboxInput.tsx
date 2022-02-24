import React from "react";
import scss from "./styles.module.scss";
import { Checkbox } from "antd";

interface IProps {
    id: string;
    value: boolean;
    title: string;
    handleCheckbox: (id: string) => void;
}

export const CheckboxInput: React.FC<IProps> = ({
    id,
    value,
    title,
    handleCheckbox,
}) => {
    return (
        <div className={scss.main}>
            <div className={scss.title}>{title}:</div>
            <Checkbox checked={value} onChange={() => handleCheckbox(id)} />
        </div>
    );
};
