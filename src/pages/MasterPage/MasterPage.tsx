import React, { useState } from "react";
import scss from "./styles.module.scss";
import { PortModal } from "../PortModalPage";
import { MenuCard } from "../../components/MenuCard";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";

export const MasterPage: React.FC = () => {
    const [isActivePortModal, setIsActivePortModal] = useState(false);
    const handleChangeActiveMenu = () => {
        setIsActivePortModal((prevState) => !prevState);
    };

    return (
        <div className={scss.wrapper}>
            <Header handleChangeActiveMenu={handleChangeActiveMenu} />
            <div className={scss.wrapperChildren}>
                <Outlet />
            </div>
            {isActivePortModal && (
                <PortModal>
                    <MenuCard handleExitPortModal={handleChangeActiveMenu} />
                </PortModal>
            )}
        </div>
    );
};
