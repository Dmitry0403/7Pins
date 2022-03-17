import React, { PropsWithChildren } from "react";
import { MenuOutlined } from "@ant-design/icons";
import scss from "./styles.module.scss";
import { LanguageContext, language } from "../../languageContext";
import { Link } from "react-router-dom";
import { LINKS } from "../../common";

interface IMasterPageProps {}

export const MasterPage: React.FC = (
    props: PropsWithChildren<IMasterPageProps>
) => {
    return (
        <LanguageContext.Provider value={language.english}>
            <div className={scss.wrapper}>
                <div className={scss.header}>
                    <div className={scss.icon}>7Pins</div>
                    <Link to={LINKS.currency} className={scss.currency}>
                        currency
                    </Link>
                    <div>
                        <MenuOutlined />
                    </div>
                </div>
                <div className={scss.wrapperChildren}>{props.children}</div>
            </div>
        </LanguageContext.Provider>
    );
};
