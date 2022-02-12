import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import scss from "./styles.module.scss";
import { Button, Input } from "antd";
import appConfig from "../../../appConfig.json";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { gameActions, playersSelector } from "../../store/gameSlice";
import { LINKS } from "../../common/routes";
import { nanoid } from "nanoid";
import { UserOutlined, CloseCircleOutlined } from "@ant-design/icons";

export interface IName {
    name: string;
    error: string;
}

interface IPlayer {
    [id: string]: IName;
}

const minPlayers = appConfig.minPlayersNumber;
const maxPlayers = appConfig.maxPlayersNumber;
const minLength = appConfig.minInputLengthInRegistrationForm;
const maxLength = appConfig.maxInputLengthInRegistrationForm;

export const RegistrationForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const playerNames = useAppSelector(playersSelector);
    let initialPlayers: IPlayer = {};

    const getInitialPlayers = (): IPlayer => {
        return Array(minPlayers)
            .fill("player")
            .map(() => ({
                name: "",
                error: "",
            }))
            .reduce(
                (object, item) => ({
                    ...object,
                    [nanoid()]: item,
                }),
                {}
            );
    };

    const getInitialPlayersFromStore = (): IPlayer => {
        return playerNames.reduce(
            (object, item) => ({
                ...object,
                [item.idPlayer]: { name: item.name, error: "" },
            }),
            {}
        );
    };

    useMemo(() => {
        playerNames[0]
            ? (initialPlayers = getInitialPlayersFromStore())
            : (initialPlayers = getInitialPlayers());
    }, [playerNames]);

    const [players, setPlayers] = useState<IPlayer>(initialPlayers);
    const [validation, setValidation] = useState<string[]>([]);

    const numberPlayers = Object.keys(players).length;

    const getErrorMessageDuringInput = (value: string) => {
        let error = "";
        const isString = value.match(/[^A-Za-zА-Яа-я\s]/);
        if (
            Object.keys(players).find(
                (key) => players[key].name === value && players[key].name !== ""
            )
        ) {
            error = "this name already exists";
        }
        if (isString) {
            error = `use letters only`;
        }
        if (value.length > maxLength) {
            error = `no more than ${maxLength} letters`;
        }
        return error;
    };

    const getErrorMessageOnSubmit = (value: string) => {
        let error = "";
        if (!value) {
            error = "enter your name";
        } else if (value.length < minLength) {
            error = `at least ${minLength} letters`;
        }
        return error;
    };

    const checkPlayersValidationOnSubmit = () => {
        let isValidOnSubmit = true;
        Object.keys(players).map((key) => {
            const value = players[key].name.trim();
            const error = getErrorMessageOnSubmit(value);
            if (error) {
                if (!validation.includes(key)) {
                    setValidation((prevState) => [...prevState, key]);
                }
                if (!value) {
                    setPlayers((prevState) => ({
                        ...prevState,
                        [key]: { name: "", error },
                    }));
                } else if (!validation.includes(key)) {
                    setPlayers((prevState) => ({
                        ...prevState,
                        [key]: { name: value, error },
                    }));
                }
                isValidOnSubmit = false;
            }
        });
        return isValidOnSubmit && !validation[0] ? true : false;
    };

    const handleAddInput = () => {
        const idPlayer = nanoid();
        setPlayers((prevState) => ({
            ...prevState,
            [idPlayer]: { name: "", error: "" },
        }));
    };

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.target.name;
        const value = e.target.value;
        const error = getErrorMessageDuringInput(value);
        if (error) {
            if (!validation.includes(id)) {
                setValidation((prevState) => [...prevState, id]);
                setPlayers((prevState) => ({
                    ...prevState,
                    [id]: { name: value, error },
                }));
            }
            return;
        } else {
            if (validation.includes(id)) {
                const newValidation = validation.filter((item) => item !== id);
                setValidation(newValidation);
                5;
            }
        }
        setPlayers((prevState) => ({
            ...prevState,
            [id]: { name: value, error },
        }));
    };

    const handleDeleteInput = (id: string) => {
        if (validation.includes(id)) {
            const newValidation = validation.filter((item) => item !== id);
            setValidation(newValidation);
        }
        const newPlayers = { ...players };
        delete newPlayers[id];
        setPlayers(newPlayers);
    };

    const dispatchPlayersToStore = () => {
        const arrayNames = Object.values(players);
        dispatch(gameActions.createGame(arrayNames));
        navigate(LINKS.setting);
    };

    const handleSubmitNames = () => {
        const isValid = checkPlayersValidationOnSubmit();
        if (isValid) {
            dispatchPlayersToStore();
        }
    };

    return (
        <div>
            <div className={scss.title}> Players registration</div>
            <div className={scss.content}>
                <div className={scss.inputSection}>
                    <div className={scss.inputSubSection}>
                        {Object.keys(players).map((id) => (
                            <div className={scss.inputItem} key={id}>
                                <div
                                    className={
                                        validation.includes(id)
                                            ? scss.error
                                            : scss.input
                                    }
                                >
                                    <Input
                                        size="large"
                                        placeholder="player"
                                        name={id}
                                        value={players[id].name}
                                        prefix={<UserOutlined />}
                                        onChange={handleChangeName}
                                    />
                                    {numberPlayers > minPlayers && (
                                        <div
                                            className={scss.deleteButton}
                                            onClick={() =>
                                                handleDeleteInput(id)
                                            }
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
                                <div className={scss.errorMessage}>
                                    {players[id].error}
                                </div>
                            </div>
                        ))}
                        <div className={scss.addingButton}>
                            {numberPlayers < maxPlayers && (
                                <Button size="middle" onClick={handleAddInput}>
                                    add player
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                <div className={scss.footerButtons}>
                    <Button size="large" onClick={() => navigate(LINKS.home)}>
                        back
                    </Button>
                    <Button size="large" onClick={handleSubmitNames}>
                        next
                    </Button>
                </div>
            </div>
        </div>
    );
};
