import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import scss from "./styles.module.scss";
import { Button, Input } from "antd";
import appConfig from "../../appConfig.json";
import { useAppDispatch } from "../../store/hooks";
import { gameActions } from "../../store/gameSlice";
import { LINKS } from "../../common/routes";
import { UserOutlined, CloseCircleOutlined } from "@ant-design/icons";

export interface PlayerType {
    [key: string]: string;
}

export const StartPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const initialQuantity = appConfig.minInputsQuantity;
    const maxQuantity = appConfig.maxInputsQuantity;

    let [quantity, setQuantity] = useState(initialQuantity);
    const [isActiveButtons, setActiveButtons] = useState({
        adding: true,
        deleting: true,
    });

    let dataPlayers: PlayerType = {};
    for (let i = 1; i < quantity || i === quantity; i++) {
        dataPlayers[`name${i}`] = "";
    }

    const [players, setPlayers] = useState({
        values: dataPlayers,
        errors: dataPlayers,
    });

    useEffect(() => {
        setActiveButtons((prevState) => ({
            ...prevState,
            adding:
                Object.keys(players.values).length === maxQuantity
                    ? false
                    : true,
            deleting:
                Object.keys(players.values).length === initialQuantity
                    ? false
                    : true,
        }));
    }, [players]);

    const handlerAddQuantity = () => {
        setQuantity(++quantity);
        setPlayers((prevState) => ({
            values: { ...prevState.values, [`name${quantity}`]: "" },
            errors: { ...prevState.errors, [`name${quantity}`]: "" },
        }));
    };

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        setPlayers((prevState) => ({
            values: { ...prevState.values, [target.name]: target.value },
            errors: { ...prevState.errors, [target.name]: "" },
        }));
    };

    const handlerDelete = (key: string) => {
        delete players.values[key];
        setPlayers((prevState) => ({
            ...prevState,
        }));
    };

    const handlerDispatch = () => {
        dispatch(gameActions.createGame(players.values));
        navigate(LINKS.setting);
    };

    const handlerSubmit = () => {
        const emptyInputs = Object.keys(players.values).find((key) => {
            if (players.values[key] === "") {
                return key;
            }
        });

        Object.keys(players.values).map((key) => {
            if (players.values[key] === "") {
                setPlayers((prevState) => ({
                    ...prevState,
                    errors: { ...prevState.errors, [key]: "Enter your name" },
                }));
            }
        });
        if (!emptyInputs) {
            handlerDispatch();
        }
    };

    return (
        <div className={scss.wrapper}>
            <div className={scss.title}> Players registration</div>
            <div className={scss.content}>
                <div className={scss.inputSection}>
                    {Object.keys(players.values).map((key) => (
                        <div className={scss.inputItem} key={key}>
                            <div
                                className={
                                    players.errors[key]
                                        ? scss.error
                                        : scss.input
                                }
                            >
                                <Input
                                    size="large"
                                    placeholder={
                                        players.errors[key]
                                            ? players.errors[key]
                                            : "player"
                                    }
                                    name={key}
                                    value={players.values[key]}
                                    prefix={<UserOutlined />}
                                    onChange={handlerChange}
                                />
                            </div>
                            {isActiveButtons.deleting && (
                                <div
                                    className={scss.icon}
                                    onClick={() => handlerDelete(key)}
                                >
                                    <CloseCircleOutlined
                                        style={{
                                            fontSize: "25px",
                                            color: "gray",
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className={scss.addingButton}>
                    {isActiveButtons.adding && (
                        <Button size="middle" onClick={handlerAddQuantity}>
                            add player
                        </Button>
                    )}
                </div>
                <div className={scss.footerButtons}>
                    <Button size="large" onClick={() => navigate(LINKS.home)}>
                        back
                    </Button>
                    <Button size="large" onClick={handlerSubmit}>
                        start game
                    </Button>
                </div>
            </div>
        </div>
    );
};
