import React from "react";
import scss from "./styles.module.scss";
import { Radio, RadioChangeEvent } from "antd";
import appConfig from "../../../appConfig.json";

interface IProps {
    value: string;
    name: string;
    handleRadio: (e: RadioChangeEvent) => void;
}

const maxSettingsPoint = appConfig.maxSettingsPoint;

export const RadioInput: React.FC<IProps> = ({ name, value, handleRadio }) => {
    return (
        <div className={scss.main}>
            <div className={scss.title}>{name}:</div>
            <Radio.Group
                className={scss.button}
                value={value}
                name={name}
                onChange={handleRadio}
            >
                <Radio value={maxSettingsPoint}>{maxSettingsPoint}</Radio>
                <Radio value={"victory"}>Victory</Radio>
            </Radio.Group>
        </div>
    );
};
