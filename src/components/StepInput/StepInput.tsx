import React, { useState } from "react";
import scss from "./styles.module.scss";

interface IProps {
    valueInput: number;
}

export const StepInput: React.FC<IProps> = ({ valueInput }) => {
    const [value, setValue] = useState<number>(valueInput);

    const handleIncrement = () => {
        setValue((prevState) => prevState + 5);
    };

    const handleDecrement = () => {
        setValue((prevState) => {
            if (prevState <= 0) {
                return prevState;
            }
            return prevState - 5;
        });
    };

    return (
        <div className={scss.main}>
            <div className={scss.button} onClick={handleDecrement}>
                -
            </div>
            <div className={scss.value}>{value}</div>
            <div className={scss.button} onClick={handleIncrement}>
                +
            </div>
        </div>
    );
};
