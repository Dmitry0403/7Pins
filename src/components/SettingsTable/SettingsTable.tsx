import React, { useContext, useState } from "react";
import scss from "./styles.module.scss";
import { StepInput } from "../StepInput";
import { RadioInput } from "../RadioInput";
import { SelectInput } from "../SelectInput";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    gameActions,
    playersSelector,
    settingGameSelector,
} from "../../store/gameSlice";
import { Button, RadioChangeEvent } from "antd";
import appConfig from "../../../appConfig.json";
import { LINKS } from "../../common/routes";
import { useNavigate } from "react-router-dom";
import type { IPlayers, ISetting } from "../../store/gameSlice";
import { useLanguage } from "../../languageContext";

const defaultPlayerPoints = appConfig.defaultPlayerPoints;
const minValuePlayerPoints = appConfig.minValuePlayerPoints;
const minValueSetting = appConfig.minValueSetting;

export const SettingsTable: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const playersFromStore = useAppSelector(playersSelector);
    const settingsFromStore = useAppSelector(settingGameSelector);

    const { languageTheme: language } = useLanguage();

    const pointsSettingsWithStepInput = {
        king: appConfig.points.kingDefaultValue,
        officer: appConfig.points.officerDefaultValue,
        pawn: appConfig.points.pawnDefaultValue,
        onlyKingDowned: appConfig.points.onlyKingDownedDefaultValue,
        caromBalls: appConfig.points.carolBallsDefaultValue,
        alianBall: appConfig.points.alianBallDefaultValue,
        kingAndFourPawnsKnockedDown:
            appConfig.points.kingAndFourPawnsKnockedDownDefaultValue,
    };
    const pointsSettingsWithRadioInput = {
        allPinsKnockedDown: appConfig.points.allPinsKnockedDownDefaultValue,
        fiveCaromBalls: appConfig.points.fiveCaromBallsDefaultValue,
        bothSightingBallsScored:
            appConfig.points.bothSightingBallsScoredDefaultValue,
    };
    const penaltySettingsWithStepInput = {
        ballJumedOffTable: appConfig.penalty.ballJumedOffTableDefaultValue,
        cueBallNotTouchSingleAimingBall:
            appConfig.penalty.cueBallNotTouchSingleAimingBallDefaultValue,
        cueBallFallsIntoPocket:
            appConfig.penalty.cueBallFallsIntoPocketDefaultValue,
        touchingAimingBallWithCue:
            appConfig.penalty.touchingAimingBallWithCueDefaultValue,
    };

    const getInitialDefaultSettings = (): ISetting => {
        return Object.assign(
            {},
            pointsSettingsWithStepInput,
            pointsSettingsWithRadioInput,
            penaltySettingsWithStepInput
        );
    };

    const getInitialDataPlayers = (): IPlayers => {
        return Object.keys(playersFromStore).reduce(
            (object, key, index) => ({
                ...object,
                [key]: {
                    ...playersFromStore[key],
                    value: playersFromStore[key].value
                        ? playersFromStore[key].value
                        : defaultPlayerPoints,
                    order: playersFromStore[key].order
                        ? playersFromStore[key].order
                        : index + 1,
                },
            }),
            {}
        );
    };

    const [statePlayers, setStatePlayers] = useState<IPlayers>(
        getInitialDataPlayers()
    );

    let initialSettings: ISetting = {};
    Object.keys(settingsFromStore)[0]
        ? (initialSettings = settingsFromStore)
        : (initialSettings = getInitialDefaultSettings());
    const [stateSettings, setStateSettings] =
        useState<ISetting>(initialSettings);

    const handleSubmitSettings = () => {
        const newStatePlayers = () => {
            return Object.keys(statePlayers)
                .sort((a, b) => {
                    return (
                        Number(statePlayers[a].order) -
                        Number(statePlayers[b].order)
                    );
                })
                .reduce(
                    (obj, item) => ({
                        ...obj,
                        [item]: {
                            ...statePlayers[item],
                            isActive:
                                statePlayers[item].order === 1 ? true : false,
                        },
                    }),
                    {}
                );
        };
        dispatch(gameActions.updatePlayersData(newStatePlayers()));
        dispatch(gameActions.updateSettingsData(stateSettings));
        navigate(LINKS.confirmation);
    };

    const handleGoBack = () => {
        dispatch(gameActions.updatePlayersData(statePlayers));
        dispatch(gameActions.updateSettingsData(stateSettings));
        navigate(LINKS.registration);
    };

    const handleReset = () => {
        setStatePlayers(getInitialDataPlayers());
        setStateSettings(getInitialDefaultSettings());
    };

    const renderPlayers = () => {
        const handlePlayerPointsIncrement = (key: string) => {
            setStatePlayers((prevState) => ({
                ...prevState,
                [key]: {
                    ...prevState[key],
                    value: Number(prevState[key].value) + 50,
                },
            }));
        };

        const handlePlayerPointsDecrement = (key: string) => {
            setStatePlayers((prevState) => ({
                ...prevState,
                [key]: {
                    ...prevState[key],
                    value:
                        Number(prevState[key].value) > minValuePlayerPoints
                            ? Number(prevState[key].value) - 50
                            : prevState[key].value,
                },
            }));
        };

        const handleOrderSelect = (
            e: React.ChangeEvent<HTMLSelectElement>,
            key: string
        ) => {
            const value = Number(e.target.value);
            const prevValue = statePlayers[key].order;
            const replacementKey = Object.keys(statePlayers).find(
                (key) => statePlayers[key].order === value
            ) as string;

            setStatePlayers((prevState) => ({
                ...prevState,
                [replacementKey]: {
                    ...prevState[replacementKey],
                    order: prevValue,
                },
                [key]: { ...prevState[key], order: value },
            }));
        };

        const playersNumber = Object.keys(statePlayers).length;

        return Object.keys(statePlayers).map((key) => (
            <div className={scss.player} key={key}>
                <div className={scss.playerButton}>
                    <StepInput
                        id={key}
                        title={statePlayers[key].name}
                        value={statePlayers[key].value}
                        handleDecrement={handlePlayerPointsDecrement}
                        handleIncrement={handlePlayerPointsIncrement}
                    />
                    <div className={scss.playerOrder}>
                        <div className={scss.selectTitle}>
                            {language.orderInGame}
                        </div>
                        <SelectInput
                            id={key}
                            selectedValue={statePlayers[key].order as number}
                            playersNumber={playersNumber}
                            handleSelect={handleOrderSelect}
                        />
                    </div>
                </div>
            </div>
        ));
    };

    const renderPointsSettingsWithStepInput = () => {
        return Object.keys(pointsSettingsWithStepInput).map((key, i) => (
            <div
                className={i % 2 === 0 ? scss.settingGray : scss.setting}
                key={key}
            >
                <StepInput
                    id={key}
                    title={language[key as keyof typeof language]}
                    value={stateSettings[key]}
                    handleDecrement={handlePointsDecrement}
                    handleIncrement={handlePointsIncrement}
                />
            </div>
        ));
    };

    const handlePointsIncrement = (id: string) => {
        setStateSettings((prevState) => ({
            ...prevState,
            [id]: prevState[id] + 5,
        }));
    };

    const handlePointsDecrement = (id: string) => {
        setStateSettings((prevState) => ({
            ...prevState,
            [id]:
                prevState[id] <= minValueSetting
                    ? prevState[id]
                    : prevState[id] - 5,
        }));
    };

    const renderPointsSettingsWithRadioInput = () => {
        const handleRadio = (e: RadioChangeEvent) => {
            const value = e.target.value;
            const key = e.target.name as string;
            setStateSettings((prevState) => ({
                ...prevState,
                [key]: value,
            }));
        };
        return Object.keys(pointsSettingsWithRadioInput).map((key, i) => (
            <div
                className={i % 2 !== 0 ? scss.settingGray : scss.setting}
                key={key}
            >
                <RadioInput
                    name={key}
                    title={language[key as keyof typeof language]}
                    value={stateSettings[key]}
                    handleRadio={handleRadio}
                />
            </div>
        ));
    };

    const renderPenaltySettingsWithStepInput = () => {
        return Object.keys(penaltySettingsWithStepInput).map((key, i) => (
            <div
                className={i % 2 === 0 ? scss.settingGray : scss.setting}
                key={key}
            >
                <StepInput
                    id={key}
                    title={language[key as keyof typeof language]}
                    value={stateSettings[key]}
                    handleDecrement={handlePointsDecrement}
                    handleIncrement={handlePointsIncrement}
                />
            </div>
        ));
    };

    return (
        <div className={scss.mainSettingsGame}>
            <div className={scss.mainTitle}>{language.gameSetup}</div>
            <div className={scss.mainSection}>
                <div className={scss.wrapperMainSection}>
                    <div className={scss.playersSection}>
                        <div className={scss.title}>
                            {language.initialPlayersPoints}
                        </div>
                        {renderPlayers()}
                    </div>
                    <div className={scss.settingsSection}>
                        <div className={scss.pointsSection}>
                            <div className={scss.title}>{language.points}</div>
                            {renderPointsSettingsWithStepInput()}
                            {renderPointsSettingsWithRadioInput()}
                        </div>
                        <div className={scss.penaltiesSection}>
                            <div className={scss.title}>
                                {language.penalties}
                            </div>
                            {renderPenaltySettingsWithStepInput()}
                        </div>
                    </div>
                </div>
            </div>
            <div className={scss.resetButton}>
                <Button size="large" onClick={handleReset}>
                    {language.reset}
                </Button>
            </div>
            <div className={scss.footerButtons}>
                <Button
                    className={scss.button}
                    size="large"
                    onClick={handleGoBack}
                >
                    {language.back}
                </Button>
                <Button size="large" onClick={handleSubmitSettings}>
                    {language.next}
                </Button>
            </div>
        </div>
    );
};
