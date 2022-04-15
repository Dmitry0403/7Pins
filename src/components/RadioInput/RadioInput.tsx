import React from "react";
import scss from "./styles.module.scss";
import { Radio, RadioChangeEvent } from "antd";
import appConfig from "../../../appConfig.json";
import { useLanguage } from "../../languageContext";

interface IProps {
    title: string;
    value: string;
    name: string;
    handleRadio: (e: RadioChangeEvent) => void;
}

const maxSettingsPoint = appConfig.maxSettingsPoint;

export const RadioInput: React.FC<IProps> = ({
    title,
    name,
    value,
    handleRadio,
}) => {
    const { languageTheme: language } = useLanguage();
    return (
        <div className={scss.mainRadioInput}>
            <div className={scss.title}>{title}:</div>
            <Radio.Group value={value} name={name} onChange={handleRadio}>
                <Radio value={maxSettingsPoint}>{maxSettingsPoint}</Radio>
                <Radio value={"victory"}>{language.victory}</Radio>
            </Radio.Group>
        </div>
    );
};
