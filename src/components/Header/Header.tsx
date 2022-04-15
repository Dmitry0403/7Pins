import React, { useMemo } from "react";
import scss from "./styles.module.scss";
import { MenuOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { useLanguage } from "../../languageContext";

interface IProps {
    handleChangeActiveMenu: () => void;
}

export const Header: React.FC<IProps> = ({ handleChangeActiveMenu }) => {
    const { setLanguageTheme, language } = useLanguage();

    const handleChangeLang = (value: string) => {
        setLanguageTheme(value === "eng" ? language.english : language.russian);
    };

    return (
        <div className={scss.header}>
            <div className={scss.icon}>7Pins</div>
            <div className={scss.sectionMenu}>
                <div className={scss.selectLang}>
                    <Select defaultValue={"pус"} onChange={handleChangeLang}>
                        <Select.Option value="рус">рус</Select.Option>
                        <Select.Option value="eng">eng</Select.Option>
                    </Select>
                </div>
                <MenuOutlined onClick={handleChangeActiveMenu} />
            </div>
        </div>
    );
};
