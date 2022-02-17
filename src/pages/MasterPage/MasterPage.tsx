import React from "react";
import { MenuOutlined } from "@ant-design/icons";
import scss from "./styles.module.scss";

interface Props {
    children: React.ReactChild;
}

export const MasterPage: React.FC<Props> = (props) => {
    return (
        <div className={scss.wrapper}>
            <div className={scss.header}>
                <div className={scss.icon}>7Pins</div>
                <div>
                    <MenuOutlined />
                </div>
            </div>
            <div className={scss.wrapperChildren}>{props.children}</div>
        </div>
    );
};
