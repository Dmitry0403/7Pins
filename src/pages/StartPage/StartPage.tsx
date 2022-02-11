import { useState } from "react";
import { useNavigate } from "react-router-dom";
import scss from "./styles.module.scss";
import { InputsComponent } from "../../components/Input";
import { Button, notification } from "antd";
import appConfig from "../../appCongig.json";
import { useAppDispatch } from "../../store/hooks";
import { gameActions } from "../../store/gameSlice";
import { LINKS } from "../../common/routes";

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
        if (quantity === maxQuantity) {
            notification.open({
                message: "no more than 5 players",
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
        notification.close("closeNotification");
        const players = getDataForDispatch(values);
        if (Object.keys(players).length < 2) {
            notification.open({
                message: "no less than 2 players",
                duration: 1.5,
            });
            return;
        }
        dispatch(gameActions.createGame(players));
        navigate(LINKS.rules);
    };

    const handlerSubmit = () => {
        const isEmptyValue = typeof Object.values(values).find(
            (item) => item === ""
        );
        if (isEmptyValue !== "undefined") {
            notification.open({
                message: "Attention",
                description: "You have empty lines. Continue?",
                btn: (
                    <Button
                        type="primary"
                        size="small"
                        onClick={handlerDispatch}
                    >
                        Confirm
                    </Button>
                ),
                key: "closeNotification",
                onClose: () => notification.close("closeNotification"),
            });
        } else {
            handlerDispatch();
        }
    };

    return (
        <div>
            <div className={scss.title}> Player registration</div>
            <InputsComponent
                quantity={quantity}
                values={values}
                handlerChange={handlerChange}
            />
            <Button size="middle" onClick={handlerAddQuantity}>
                add player
            </Button>
            <Button size="middle" onClick={handlerSubmit}>
                start game
            </Button>
        </div>
    );
};
