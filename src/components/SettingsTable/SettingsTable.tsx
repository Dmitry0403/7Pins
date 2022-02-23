import React, { useState } from "react";
import scss from "./styles.module.scss";
import { StepInput } from "../StepInput";
import { CheckboxInput } from "../CheckboxInput";
import { ToggleInput } from "../ToggleInput";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { gameActions, playersSelector } from "../../store/gameSlice";

interface ISetting {
    [key: string]: { value: any };
}

interface IState {
    players: {
        name: string;
        idPlayer: string;
        points: number;
    }[];
    settings: {
        points: ISetting;
        penalties: ISetting;
    };
}

const defaultPoints: ISetting = {
    "King:": { value: 25 },
    "Officer:": { value: 30 },
    "Pawn:": { value: 5 },
    "Only the king is downed:": { value: 50 },
    "Carom balls:": { value: 5 },
    "Alien ball:": { value: 5 },
    "The king and 4 pawns are knocked down at the same time:": { value: 100 },

    "All the pins are knocked down at the same time:": { value: 200 },

    "The player made five carom balls in a row without gaining other points:": {
        value: 200,
    },
    "As a result of the impact , both sighting balls are scored:": {
        value: 200,
    },
};

const dafaultPenalties: ISetting = {
    "Cue ball or aiming ball jumped off the table:": { value: 5 },
    "The cue ball did not touch a single aiming ball:": { value: 5 },
    "Cue ball or aiming ball directly knocked down the pins:": {
        value: "the sum of the downed pins",
    },
    "The cue ball falls into the pocket:": { value: 5 },
    "Touching clothes or cue pins:": { value: "the sum of the downed pins" },
    "Touching the aiming ball with the cue:": { value: 25 },
    "All points scored in this approach are added to the penalty points:": {
        value: true,
    },
};

export const SettingsTable: React.FC = () => {
    const playersData = useAppSelector(playersSelector);
    const initialStateSettings: IState = {
        players: playersData,
        settings: { points: defaultPoints, penalties: dafaultPenalties },
    };

    const [stateSettings, setStateSettings] =
        useState<IState>(initialStateSettings);

    const handlePlayerPointsIncrement = (title: string) => {
        const { players } = stateSettings;
        const newDataPlayerPoints = players.map((item) => {
            if (item.name === title) {
                return { ...item, points: item.points + 50 };
            }
            return item;
        });
        setStateSettings((prevState) => ({
            ...prevState,
            players: newDataPlayerPoints,
        }));
    };

    const handlePlayerPointsDecrement = (title: string) => {
        const newDataPlayerPoints = players.map((item) => {
            if (item.name === title && item.points > 200) {
                return { ...item, points: item.points - 50 };
            }
            return item;
        });
        setStateSettings((prevState) => ({
            ...prevState,
            players: newDataPlayerPoints,
        }));
    };

    const handlePointsIncrement = (title: string) => {
        const { points } = stateSettings.settings;
        setStateSettings((prevState) => ({
            ...prevState,
            settings: {
                ...prevState.settings,
                points: {
                    ...points,
                    [title]: {
                        value: points[title].value + 5,
                    },
                },
            },
        }));
    };

    const handlePointsDecrement = (title: string) => {
        const { points } = stateSettings.settings;
        setStateSettings((prevState) => ({
            ...prevState,
            settings: {
                ...prevState.settings,
                points: {
                    ...points,
                    [title]: {
                        value:
                            points[title].value > 5
                                ? points[title].value - 5
                                : points[title].value,
                    },
                },
            },
        }));
    };
    const handlePenaltiesIncrement = (title: string) => {
        const { penalties } = stateSettings.settings;
        setStateSettings((prevState) => ({
            ...prevState,
            settings: {
                ...prevState.settings,
                penalties: {
                    ...penalties,
                    [title]: {
                        value: penalties[title].value + 5,
                    },
                },
            },
        }));
    };

    const handlePenaltiesDecrement = (title: string) => {
        const { penalties } = stateSettings.settings;
        setStateSettings((prevState) => ({
            ...prevState,
            settings: {
                ...prevState.settings,
                penalties: {
                    ...penalties,
                    [title]: {
                        value:
                            penalties[title].value > 5
                                ? penalties[title].value - 5
                                : penalties[title].value,
                    },
                },
            },
        }));
    };
    const {
        players,
        settings: { points, penalties },
    } = stateSettings;
    return (
        <div>
            <div className={scss.mainTitle}>Settings of the game</div>
            <div className={scss.playersSection}>
                {players.map((item) => (
                    <div className={scss.player} key={item.idPlayer}>
                        <StepInput
                            key={item.idPlayer}
                            title={item.name}
                            value={item.points}
                            handleDecrement={handlePlayerPointsDecrement}
                            handleIncrement={handlePlayerPointsIncrement}
                        />
                    </div>
                ))}
            </div>
            <div className={scss.settingsSection}>
                <div className={scss.pointsSection}>
                    {Object.keys(points).map((key) => (
                        <StepInput
                            key={key}
                            title={key}
                            value={points[key].value}
                            handleDecrement={handlePointsDecrement}
                            handleIncrement={handlePointsIncrement}
                        />
                    ))}
                </div>
                <div className={scss.penaltiesSection}>
                    {Object.keys(penalties).map((key) =>
                        Number(penalties[key].value) ? (
                            <StepInput
                                key={key}
                                title={key}
                                value={penalties[key].value}
                                handleDecrement={handlePenaltiesDecrement}
                                handleIncrement={handlePenaltiesIncrement}
                            />
                        ) : (
                            <div className={scss.stringSettings}>
                                <div>{key}</div>
                                <div>{penalties[key].value}</div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};
