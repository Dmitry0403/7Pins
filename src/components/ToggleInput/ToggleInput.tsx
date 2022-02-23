import React, { useState } from "react";
import scss from "./styles.module.scss";
import { Radio } from "antd";

interface IProps {
    value: number;
    title: string;
    handleChangeRadio: (title: string) => void;
}

export const ToggleInput: React.FC<IProps> = ({
    value,
    title,
    handleChangeRadio,
}) => {
    return (
        <div className={scss.main}>
            <div className={scss.title} key={title}>
                {title}
            </div>
            <Radio.Group name={title} onChange={() => handleChangeRadio(title)}>
                <Radio value={value}>{value}</Radio>
                <Radio value={"victory"}>Victory</Radio>
            </Radio.Group>
        </div>
    );
};
