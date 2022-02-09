import React, { useState } from "react";
import scss from "./styles.module.scss";
import { Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    addMessage,
    removeMessage,
    getMessages,
} from "../../store/testSlice/testSlice";

export const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const messages = useAppSelector(getMessages);
    const [value, setValue] = useState("");

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handlerClickSubmit = () => {
        dispatch(addMessage(value.trim()));
        setValue("");
    };

    const handlerClickDelete = (id: string) => {
        dispatch(removeMessage(id));
    };

    return (
        <div>
            <div className={scss.title}> Welcome to 7Pins! </div>
            <div className={scss.inputSection}>
                <Input
                    size="middle"
                    placeholder="message"
                    value={value}
                    className={scss.input}
                    prefix={<UserOutlined />}
                    onChange={handlerChange}
                />

                <Button size="middle" onClick={handlerClickSubmit}>
                    Submit
                </Button>
            </div>
            <div className={scss.messagesSection}>
                {messages.map((item) => (
                    <div className={scss.cardMessage} key={item.id}>
                        <div className={scss.message}>{item.title}</div>
                        <Button
                            size="middle"
                            onClick={() => handlerClickDelete(item.id)}
                        >
                            delete
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};
