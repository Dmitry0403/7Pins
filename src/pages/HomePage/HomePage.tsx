import scss from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getMessages } from "../../store/TestReducer";
import { messagesAction } from "../../store/TestReducer";
import { useState } from "react";

export const HomePage: React.FC = () => {
    const dispatch = useDispatch();
    const messages = useSelector(getMessages);
    const [value, setValue] = useState("");

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handlerClickSubmit = () => {
        dispatch(messagesAction.addMessage(value.trim()));
        setValue("");
    };

    const handlerClickDelete = (id: string) => {
        dispatch(messagesAction.removeMessage(id));
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
                        <div className={scss.message}>{item.itemMessage}</div>
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
