import React from "react";
import scss from "./styles.module.scss";
import { Checkbox } from "antd";

interface IProps {
    value: number;
    title: string;
    handleChangeCheckbox: () => void;
}

export const CheckboxInput: React.FC<IProps> = ({
    value,
    title,
    handleChangeCheckbox,
}) => {
    return (
        <div className={scss.main}>
            <div className={scss.title} key={title}>
                {title}
            </div>
            <Checkbox value={value} onChange={handleChangeCheckbox} />
        </div>
    );
};
