import React, { useState } from "react";
import scss from "./styles.module.scss";
import { InputsComponent } from "../../components/Input";
import { Button } from "antd";
import appConfig from "../../appCongig.json";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    addMessage,
    removeMessage,
    getMessages,
} from "../../store/testSlice/testSlice";

export const StartPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const messages = useAppSelector(getMessages);

    let initialQuantity = appConfig.initialQuantityInput;

    let [quantity, setQuantity] = useState(initialQuantity);

    const handlerAddQuantity = () => {
        setQuantity(++quantity);
    };

    return (
        <div>
            <div className={scss.title}> Player registration</div>
            <InputsComponent quantityInput={quantity} />
            <Button size="middle" onClick={handlerAddQuantity}>
                add player
            </Button>
        </div>
    );
};
