import React from "react";
import scss from "./styles.module.scss";
import { Button } from "antd";
import { LINKS } from "../../common";
import { Link } from "react-router-dom";

interface IProps {
    handleExitPortModal: () => void;
}

export const MenuCard: React.FC<IProps> = ({ handleExitPortModal }) => {
    return (
        <div className={scss.mainMenuCard}>
            <div className={scss.titleMenu}>Menu</div>
            <div className={scss.items}>
                <Link
                    to={LINKS.currency}
                    className={scss.item}
                    onClick={() => handleExitPortModal()}
                >
                    currency
                </Link>
            </div>
            <div className={scss.button}>
                <Button onClick={handleExitPortModal}>cancel</Button>
            </div>
        </div>
    );
};
