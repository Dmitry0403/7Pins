import React, { useState } from "react";
import scss from "./styles.module.scss";
import { Button } from "antd";

interface IProps {
    value: any;
    id: string;
    title: string;
    handleDecrement: (id: string) => void;
    handleIncrement: (id: string) => void;
}

export const StepInput: React.FC<IProps> = ({
    value,
    id,
    title,
    handleDecrement,
    handleIncrement,
}) => {
    return (
        <div className={scss.mainStepInput}>
            <div className={scss.title}>{title}:</div>
            <div className={scss.buttonSection}>
                <Button
                    className={scss.button}
                    onClick={() => handleDecrement(id)}
                >
                    -
                </Button>
                <div className={scss.value}>{value}</div>
                <Button
                    className={scss.button}
                    onClick={() => handleIncrement(id)}
                >
                    +
                </Button>
            </div>
        </div>
    );
};
