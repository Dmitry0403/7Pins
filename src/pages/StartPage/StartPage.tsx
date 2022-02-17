import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import scss from "./styles.module.scss";
import { Button, Input } from "antd";
import appConfig from "../../appConfig.json";
import { useAppDispatch } from "../../store/hooks";
import { gameActions } from "../../store/gameSlice";
import { LINKS } from "../../common/routes";
import { nanoid } from "nanoid";
import { UserOutlined, CloseCircleOutlined } from "@ant-design/icons";

export interface NameType {
    name: string;
}

interface PlayerType {
    [id: string]: NameType;
}

const minPlayers = appConfig.minPlayersNumber;
const maxPlayers = appConfig.maxPlayersNumber;
const minLength = appConfig.minInputLength;
const maxLength = appConfig.maxInputLength;

export const StartPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const getInitialPlayers = (): PlayerType => {
        return Array(minPlayers)
            .fill("player")
            .map(() => ({
                name: "",
            }))
            .reduce(
                (object, item) => ({
                    ...object,
                    [nanoid()]: item,
                }),
                {}
            );
    };

    const [players, setPlayers] = useState<PlayerType>(getInitialPlayers());
    const [validation, setValidation] = useState<PlayerType>({});

    const numberPlayers = Object.keys(players).length;

    const handleAddInput = () => {
        const idPlayer = nanoid();
        setPlayers((prevState) => ({
            ...prevState,
            [idPlayer]: { name: "" },
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        players[target.name].name = target.value;
        if (validation[target.name]) {
            delete validation[target.name];
        }
        setPlayers((prevState) => ({
            ...prevState,
        }));
        setValidation((prevState) => ({
            ...prevState,
        }));
    };

    const handleDelete = (id: string) => {
        delete players[id];
        if (validation[id]) {
            delete validation[id];
        }
        setPlayers((prevState) => ({
            ...prevState,
        }));
        setValidation((prevState) => ({
            ...prevState,
        }));
    };

    const dispatchPlayersToStore = () => {
        const arrayNames = Object.values(players);
        dispatch(gameActions.createGame(arrayNames));
        navigate(LINKS.setting);
    };

    const getPlayersValidation = () => {
        Object.keys(players).map((key) => {
            let error = "";
            const value = players[key].name.trim();
            if (value.length === 0) {
                error = "enter your name";
            } else if (value.length <= minLength) {
                error = `at least ${minLength} letters`;
            } else if (value.length > maxLength) {
                error = `no more than ${maxLength} letters`;
            }
            if (error) {
                Object.assign(validation, { [key]: { name: error } });
                players[key].name = "";
                setPlayers((prevState) => ({
                    ...prevState,
                }));
                setValidation((prevState) => ({
                    ...prevState,
                }));
            }
        });
        return Object.keys(validation).length;
    };

    const handleSubmit = () => {
        const isValid = getPlayersValidation();
        if (isValid === 0) {
            dispatchPlayersToStore();
        }
    };

    return (
        <div className={scss.wrapper}>
            <div className={scss.title}> Players registration</div>
            <div className={scss.content}>
                <div className={scss.inputSection}>
                    {Object.keys(players).map((id) => (
                        <div className={scss.inputItem} key={id}>
                            <div
                                className={
                                    validation[id] ? scss.error : scss.input
                                }
                            >
                                <Input
                                    size="large"
                                    placeholder={
                                        validation[id]
                                            ? validation[id].name
                                            : "player"
                                    }
                                    name={id}
                                    value={players[id].name}
                                    prefix={<UserOutlined />}
                                    onChange={handleChange}
                                />
                            </div>
                            {numberPlayers !== minPlayers && (
                                <div
                                    className={scss.icon}
                                    onClick={() => handleDelete(id)}
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
                    {numberPlayers !== maxPlayers && (
                        <Button size="middle" onClick={handleAddInput}>
                            add player
                        </Button>
                    )}
                </div>
                <div className={scss.footerButtons}>
                    <Button size="large" onClick={() => navigate(LINKS.home)}>
                        back
                    </Button>
                    <Button size="large" onClick={handleSubmit}>
                        start game
                    </Button>
                </div>
            </div>
        </div>
    );
};
