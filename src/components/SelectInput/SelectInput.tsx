import React from "react";
import scss from "./styles.module.scss";

interface IProps {
    id: string;
    selectedValue: number;
    playersNumber: number;
    handleSelect: (e: React.ChangeEvent<HTMLSelectElement>, id: string) => void;
}

export const SelectInput: React.FC<IProps> = ({
    id,
    selectedValue,
    playersNumber,
    handleSelect,
}) => {
    return (
        <div className={scss.mainSelectInput}>
            <select
                className={scss.button}
                onChange={(e) => handleSelect(e, id)}
                value={selectedValue}
            >
                {Array(playersNumber)
                    .fill("item")
                    .map((_, index) => (
                        <option key={index} value={index + 1}>
                            {index + 1}
                        </option>
                    ))}
            </select>
        </div>
    );
};
