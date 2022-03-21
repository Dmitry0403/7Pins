import React, { useState, useContext } from "react";
import scss from "./styles.module.scss";
import { Button } from "antd";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { settingGameSelector } from "../../store/gameSlice";
import { LanguageContext } from "../../languageContext";

interface IProps {}

export const GamePoints: React.FC<IProps> = ({}) => {
    const settings = useAppSelector(settingGameSelector);
    const language = useContext(LanguageContext);

    return (
        <div className={scss.gameSetting}>
            <div className={scss.title}>Games points</div>
            {Object.keys(settings).map((item) => (
                <div className={scss.itemButton} key={item}>
                    <Button className={scss.button}>
                        {settings[item].value}
                    </Button>
                    <span>{settings[item].title}</span>
                </div>
            ))}
        </div>
    );
};
