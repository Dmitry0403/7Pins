import React, { PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import scss from "./styles.module.scss";

interface IPorlalPage {}

const Portal: React.FC = (props: PropsWithChildren<IPorlalPage>) => {
    return ReactDOM.createPortal(
        props.children,
        document.querySelector("body") as Element
    );
};

const BaseModal = (props: PropsWithChildren<IPorlalPage>) => {
    return <div className={scss.modalWrapper}>{props.children}</div>;
};

export const PortModal = (props: PropsWithChildren<IPorlalPage>) => {
    return (
        <Portal>
            <BaseModal>
                <div className={scss.modal}>{props.children}</div>
            </BaseModal>
        </Portal>
    );
};
