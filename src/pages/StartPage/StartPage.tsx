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

export interface PlayerType {
    name: string;
    id: string;
}

const minPlayers = appConfig.minPlayersNumber;
const maxPlayers = appConfig.maxPlayersNumber;

export const StartPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const getInitialPlayers = () => {
        let initialPlayers: PlayerType[] = [];
        for (let i = 1; i <= minPlayers; i++) {
            initialPlayers = [...initialPlayers, { name: "", id: nanoid() }];
        }
        return initialPlayers;
    };

    const [players, setPlayers] = useState<PlayerType[]>(getInitialPlayers());

    const numberPlayers = players.length;

    const handleAddInput = () => {
        setPlayers((prevState) => [...prevState, { name: "", id: nanoid() }]);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const newPlayers = players.map((item) => {
            if (item.id === target.name) {
                item.name = target.value;
            }
            return item;
        });
        setPlayers(newPlayers);
    };

    const handleDelete = (id: string) => {
        const newPlayers = players.filter((item) => item.id !== id);
        setPlayers(newPlayers);
    };

    const dispatchPlayersToStore = () => {
        // dispatch(gameActions.createGame(players.values));
        navigate(LINKS.setting);
    };

    const handleSubmit = () => {
        dispatchPlayersToStore();
    };

    return (
        <div className={scss.wrapper}>
            <div className={scss.title}> Players registration</div>
            <div className={scss.content}>
                <div className={scss.inputSection}>
                    {players.map((item) => (
                        <div className={scss.inputItem} key={item.id}>
                            <div className={scss.input}>
                                <Input
                                    size="large"
                                    placeholder={"player"}
                                    name={item.id}
                                    value={item.name}
                                    prefix={<UserOutlined />}
                                    onChange={handleChange}
                                />
                            </div>
                            {numberPlayers !== minPlayers && (
                                <div
                                    className={scss.icon}
                                    onClick={() => handleDelete(item.id)}
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
