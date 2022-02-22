import React, { useState } from "react";
import scss from "./styles.module.scss";
import { SettingItem } from "../SettingItem";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { gameActions, playersSelector } from "../../store/gameSlice";

interface ISetting {
    title: string;
    value: number | string | boolean;
}

interface IState {
    players: {
        name: string;
        idPlayer: string;
    }[];
    settings: {
        points: ISetting[];
        penalties: ISetting[];
    };
}

const initialPlayerPoints = 500;

const defaultPoints: ISetting[] = [
    { title: "King", value: 25 },
    { title: "Officer", value: 30 },
    { title: "Pawn", value: 5 },
    { title: "Only the king is downed", value: 50 },
    { title: "Carom balls", value: 5 },
    { title: "Alien ball", value: 5 },
    {
        title: "The king and 4 pawns are knocked down at the same time",
        value: 100,
    },
    { title: "All the pins are knocked down at the same time", value: 200 },
    {
        title: "The player made five carom balls in a row without gaining other points",
        value: 200,
    },
    {
        title: "As a result of the impact , both sighting balls are scored",
        value: 200,
    },
];

const dafaultPenalties: ISetting[] = [
    { title: "Cue ball or aiming ball jumped off the table", value: 5 },
    { title: "The cue ball did not touch a single aiming ball", value: 5 },
    {
        title: "Cue ball or aiming ball directly knocked down the pins",
        value: "the sum of the downed pins",
    },
    { title: "The cue ball falls into the pocket", value: 5 },
    {
        title: "Touching clothes or cue pins",
        value: "the sum of the downed pins",
    },
    { title: "Touching the aiming ball with the cue", value: 25 },
    {
        title: "All points scored in this approach are added to the penalty points.",
        value: true,
    },
];

export const SettingsTable: React.FC = () => {
    const playersNames = useAppSelector(playersSelector);
    const initialStateSettings: IState = {
        players: playersNames,
        settings: { points: defaultPoints, penalties: defaultPoints },
    };
    const [stateSettings, setStateSettings] =
        useState<IState>(initialStateSettings);
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
                        <SettingItem
                            title={item.name}
                            valueInput={initialPlayerPoints}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
