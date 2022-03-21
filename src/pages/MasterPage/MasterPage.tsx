import React, { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import scss from "./styles.module.scss";
import { LanguageContext, language } from "../../languageContext";
import { PortModal } from "../PortModalPage";
import { MenuCard } from "../../components/MenuCard";
import { Outlet } from "react-router-dom";

export const MasterPage: React.FC = () => {
    const [isActivePortModal, setIsActivePortModal] = useState(false);
    const handleChangeActiveMenu = () => {
        setIsActivePortModal((prevState) => !prevState);
    };

    return (
        <LanguageContext.Provider value={language.english}>
            <div className={scss.wrapper}>
                <div className={scss.header}>
                    <div className={scss.icon}>7Pins</div>
                    <div>
                        <MenuOutlined onClick={handleChangeActiveMenu} />
                    </div>
                </div>
                <div className={scss.wrapperChildren}>
                    <Outlet />
                </div>
                {isActivePortModal && (
                    <PortModal>
                        <MenuCard
                            handleExitPortModal={handleChangeActiveMenu}
                        />
                    </PortModal>
                )}
            </div>
        </LanguageContext.Provider>
    );
};
