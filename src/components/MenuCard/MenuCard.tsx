import React from "react";
import scss from "./styles.module.scss";
import { Button } from "antd";
import { LINKS } from "../../common";
import { Link } from "react-router-dom";
import { useLanguage } from "../../languageContext";

interface IProps {
    handleExitPortModal: () => void;
}

export const MenuCard: React.FC<IProps> = ({ handleExitPortModal }) => {
    const { languageTheme: language } = useLanguage();
    return (
        <div className={scss.mainMenuCard}>
            <div className={scss.titleMenu}>{language.menu}</div>
            <div className={scss.items}>
                <Link
                    to={LINKS.currency}
                    className={scss.item}
                    onClick={() => handleExitPortModal()}
                >
                    {language.exchangeRate}
                </Link>
            </div>
            <div className={scss.button}>
                <Button onClick={handleExitPortModal}>{language.cancel}</Button>
            </div>
        </div>
    );
};
