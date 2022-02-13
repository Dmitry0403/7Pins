import { useState } from "react";
import { useNavigate } from "react-router-dom";
import scss from "./styles.module.scss";
import { Button, Input, notification } from "antd";
import appConfig from "../../appConfig.json";
import { useAppDispatch } from "../../store/hooks";
import { gameActions } from "../../store/gameSlice";
import { LINKS } from "../../common/routes";
import { UserOutlined } from "@ant-design/icons";

export interface PlayerType {
    [key: string]: string;
}

const getDataForDispatch = (obj: PlayerType) => {
    let newObj: PlayerType = {};
    for (let key in obj) {
        if (obj[key].trim()) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
};

export const StartPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const initialQuantity = appConfig.minInputsQuantity;
    const maxQuantity = appConfig.maxInputsQuantity;

    let [quantity, setQuantity] = useState(initialQuantity);

    let dataPlayers: PlayerType = {};
    for (let i = 1; i < quantity || i === quantity; i++) {
        dataPlayers[`name${i}`] = "";
    }

    let [values, setValues] = useState(dataPlayers);

    const handlerAddQuantity = () => {
        if (Object.keys(values).length === maxQuantity) {
            notification.open({
                message: `no more than ${maxQuantity} players`,
                duration: 1.5,
            });
            return;
        }
        setQuantity(++quantity);
        setValues((prevState) => ({
            ...prevState,
            [`name${quantity}`]: "",
        }));
    };

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        setValues((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const handlerDispatch = () => {
        const players = getDataForDispatch(values);
        if (Object.keys(players).length < initialQuantity) {
            notification.open({
                message: `no less than ${initialQuantity} players`,
                duration: 1.5,
            });
            return;
        }
        dispatch(gameActions.createGame(players));
        navigate(LINKS.setting);
    };

    const handlerSubmit = () => {
        const emptyValue = typeof Object.values(values).find(
            (item) => item === ""
        );
        if (emptyValue !== "undefined") {
            notification.open({
                message: "Attention",
                description: "You have empty lines. Continue?",
                btn: (
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => {
                            notification.close("closeNotification");
                            handlerDispatch();
                        }}
                    >
                        Confirm
                    </Button>
                ),
                key: "closeNotification",
                onClose: () => notification.close("closeNotification"),
            });
            return;
        }
        handlerDispatch();
    };

    return (
        <div>
            <div className={scss.title}> Player registration</div>
            {Object.keys(values).map((key) => (
                <div className={scss.inputSection} key={key}>
                    <Input
                        size="large"
                        placeholder="player"
                        name={key}
                        value={values[key]}
                        className={scss.input}
                        prefix={<UserOutlined />}
                        onChange={handlerChange}
                    />
                </div>
            ))}
            <Button size="middle" onClick={handlerAddQuantity}>
                add player
            </Button>
            <Button size="middle" onClick={handlerSubmit}>
                start game
            </Button>
        </div>
    );
};
