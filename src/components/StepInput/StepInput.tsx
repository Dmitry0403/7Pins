import React, { useState } from "react";
import scss from "./styles.module.scss";
import { Button } from "antd";

interface IProps {
    value: number;
    title: string;
    handleDecrement: (title: string) => void;
    handleIncrement: (title: string) => void;
}

export const StepInput: React.FC<IProps> = ({
    value,
    title,
    handleDecrement,
    handleIncrement,
}) => {
    return (
        <div className={scss.main}>
            <div className={scss.title}>{title}</div>
            <Button
                className={scss.button}
                onClick={() => handleDecrement(title)}
            >
                -
            </Button>
            <div className={scss.value}>{value}</div>
            <Button
                className={scss.button}
                onClick={() => handleIncrement(title)}
            >
                +
            </Button>
        </div>
    );
};
