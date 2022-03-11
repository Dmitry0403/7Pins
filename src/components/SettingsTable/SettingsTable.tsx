import React, { useContext, useEffect, useState } from "react";
import scss from "./styles.module.scss";
import { StepInput } from "../StepInput";
import { CheckboxInput } from "../CheckboxInput";
import { RadioInput } from "../RadioInput";
import { SelectInput } from "../SelectInput";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    gameActions,
    playersSelector,
    settingGame,
} from "../../store/gameSlice";
import { Button, RadioChangeEvent } from "antd";
import appConfig from "../../../appConfig.json";
import { LINKS } from "../../common/routes";
import { useNavigate } from "react-router-dom";
import type { IPlayers } from "../../store/gameSlice";
import { updateListGames } from "../../store/listGamesSlice";
import {
    updatingListGamesStatusSelector,
    loadingStatusSelector,
    errorMesaageSelector,
    LOAD_STATUSES,
} from "../../store/listGamesSlice";
import { Spin } from "antd";
import { LanguageThemeContext } from "../../themeContext";

export interface ISetting {
    [key: string]: {
        title: string;
        value: any;
    };
}

const defaultPlayerPoints = appConfig.defaultPlayerPoints;
const minValuePlayerPoints = appConfig.minValuePlayerPoints;
const minValueSetting = appConfig.minValueSetting;

export const SettingsTable: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const playersFromStore = useAppSelector(playersSelector);
    const settingsFromStore = useAppSelector(settingGame);

    const loadingStatus = useAppSelector(loadingStatusSelector);
    const errorMessage = useAppSelector(errorMesaageSelector);
    const updatingStatus = useAppSelector(updatingListGamesStatusSelector);

    const languageTheme = useContext(LanguageThemeContext);

    const pointsSettingsWithStepInput = {
        king: {
            title: languageTheme.king,
            value: appConfig.points.kingDefaultValue,
        },
        officer: {
            title: languageTheme.officer,
            value: appConfig.points.officerDefaultValue,
        },
        pawn: {
            title: languageTheme.pawn,
            value: appConfig.points.pawnDefaultValue,
        },
        onlyKingDowned: {
            title: languageTheme.onlyKingDowned,
            value: appConfig.points.onlyKingDownedDefaultValue,
        },
        caromBalls: {
            title: languageTheme.caromBalls,
            value: appConfig.points.carolBallsDefaultValue,
        },
        alianBall: {
            title: languageTheme.alianBall,
            value: appConfig.points.alianBallDefaultValue,
        },
        kingAndFourPawnsKnockedDown: {
            title: languageTheme.kingAndFourPawnsKnockedDown,
            value: appConfig.points.kingAndFourPawnsKnockedDownDefaultValue,
        },
    };
    const pointsSettingsWithRadioInput = {
        allPinsKnockedDown: {
            title: languageTheme.allPinsKnockedDown,
            value: appConfig.points.allPinsKnockedDownDefaultValue,
        },
        fiveCaromBalls: {
            title: languageTheme.fiveCaromBalls,
            value: appConfig.points.fiveCaromBallsDefaultValue,
        },
        bothSightingBallsScored: {
            title: languageTheme.bothSightingBallsScored,
            value: appConfig.points.bothSightingBallsScoredDefaultValue,
        },
    };
    const penaltySettingsWithStepInput = {
        ballJumedOffTable: {
            title: languageTheme.ballJumedOffTable,
            value: appConfig.penalty.ballJumedOffTableDefaultValue,
        },
        cueBallNotTouchSingleAimingBall: {
            title: languageTheme.cueBallNotTouchSingleAimingBall,
            value: appConfig.penalty
                .cueBallNotTouchSingleAimingBallDefaultValue,
        },
        cueBallFallsIntoPocket: {
            title: languageTheme.cueBallFallsIntoPocket,
            value: appConfig.penalty.cueBallFallsIntoPocketDefaultValue,
        },
        touchingAimingBallWithCue: {
            title: languageTheme.touchingAimingBallWithCue,
            value: appConfig.penalty.touchingAimingBallWithCueDefaultValue,
        },
    };

    const penaltySettingsWithCheckbox = {
        ballDirectlyKnockedPins: {
            title: languageTheme.ballDirectlyKnockedPins,
            value: appConfig.penalty
                .ballDirectlyKnockedDownPinsDefaultValueIsSumOfDownePins,
        },
        touchingClothesOrCuePins: {
            title: languageTheme.touchingClothesOrCuePins,
            value: appConfig.penalty
                .touchingClothesOrCuePinsdefaultValueIsSumOfDownePins,
        },
        allPintsAddedToPenaltyPoints: {
            title: languageTheme.allPintsAddedToPenaltyPoints,
            value: appConfig.penalty.allPintsAddedToPenaltyPointsDefaultValue,
        },
    };

    useEffect(() => {
        if (updatingStatus) {
            navigate(LINKS.game);
        }
    }, [updatingStatus]);

    const getInitialDefaultSettings = (): ISetting => {
        return Object.assign(
            {},
            pointsSettingsWithStepInput,
            pointsSettingsWithRadioInput,
            penaltySettingsWithStepInput,
            penaltySettingsWithCheckbox
        );
    };

    const getInitialDataPlayers = (): IPlayers => {
        return Object.keys(playersFromStore).reduce(
            (object, key, index) => ({
                ...object,
                [key]: {
                    ...playersFromStore[key],
                    value: defaultPlayerPoints,
                    order: index + 1,
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
        dispatch(gameActions.updatePlayersData(statePlayers));
        dispatch(gameActions.updateSettingsData(stateSettings));
        dispatch(updateListGames());
    };

    const handleGoBack = () => {
        dispatch(gameActions.updatePlayersData(statePlayers));
        dispatch(gameActions.updateSettingsData(stateSettings));
        navigate(LINKS.start);
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
                        prevState[key].value > minValuePlayerPoints
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
                        <div className={scss.selectTitle}>order in game:</div>
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
        return Object.keys(pointsSettingsWithStepInput).map((key) => (
            <div className={scss.settings} key={key}>
                <StepInput
                    id={key}
                    title={stateSettings[key].title}
                    value={stateSettings[key].value}
                    handleDecrement={handlePointsDecrement}
                    handleIncrement={handlePointsIncrement}
                />
            </div>
        ));
    };

    const handlePointsIncrement = (id: string) => {
        setStateSettings((prevState) => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                value: prevState[id].value + 5,
            },
        }));
    };

    const handlePointsDecrement = (id: string) => {
        setStateSettings((prevState) => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                value:
                    prevState[id].value <= minValueSetting
                        ? prevState[id].value
                        : prevState[id].value - 5,
            },
        }));
    };

    const renderPointsSettingsWithRadioInput = () => {
        const handleRadio = (e: RadioChangeEvent) => {
            const value = e.target.value;
            const key = e.target.name as string;
            setStateSettings((prevState) => ({
                ...prevState,
                [key]: {
                    ...prevState[key],
                    value,
                },
            }));
        };

        return Object.keys(pointsSettingsWithRadioInput).map((key) => (
            <div className={scss.settings} key={key}>
                <RadioInput
                    name={key}
                    value={stateSettings[key].value}
                    handleRadio={handleRadio}
                />
            </div>
        ));
    };

    const renderPenaltySettingsWithStepInput = () => {
        return Object.keys(penaltySettingsWithStepInput).map((key) => (
            <div className={scss.settings} key={key}>
                <StepInput
                    id={key}
                    title={stateSettings[key].title}
                    value={stateSettings[key].value}
                    handleDecrement={handlePointsDecrement}
                    handleIncrement={handlePointsIncrement}
                />
            </div>
        ));
    };

    const renderPenaltySettingsWithCheckbox = () => {
        const handleCheckbox = (key: string) => {
            setStateSettings((prevState) => ({
                ...prevState,
                [key]: {
                    ...prevState[key],
                    value: !prevState[key].value,
                },
            }));
        };

        return Object.keys(penaltySettingsWithCheckbox).map((key) => (
            <div className={scss.settings} key={key}>
                <CheckboxInput
                    id={key}
                    title={stateSettings[key].title}
                    value={stateSettings[key].value}
                    handleCheckbox={handleCheckbox}
                />
            </div>
        ));
    };

    return (
        <div className={scss.mainSettingsGame}>
            <div className={scss.mainTitle}>Settings of the game</div>
            <div className={scss.mainSection}>
                <div className={scss.playersSection}>
                    <div className={scss.title}>Initial points of players:</div>
                    {renderPlayers()}
                </div>
                <div className={scss.settingsSection}>
                    <div className={scss.pointsSection}>
                        <div className={scss.title}>Points:</div>
                        {renderPointsSettingsWithStepInput()}
                        {renderPointsSettingsWithRadioInput()}
                    </div>
                    <div className={scss.penaltiesSection}>
                        <div className={scss.title}>Penalties:</div>
                        {renderPenaltySettingsWithStepInput()}
                        {renderPenaltySettingsWithCheckbox()}
                    </div>
                </div>
            </div>
            <div className={scss.resetButton}>
                <Button size="large" onClick={handleReset}>
                    Reset settings
                </Button>
            </div>
            <div className={scss.footerButtons}>
                <Button
                    className={scss.button}
                    size="large"
                    onClick={handleGoBack}
                >
                    back
                </Button>
                {loadingStatus === LOAD_STATUSES.LOADING && (
                    <Spin size="large" />
                )}
                {loadingStatus === LOAD_STATUSES.FAILURE && (
                    <div>{errorMessage}</div>
                )}
                <Button size="large" onClick={handleSubmitSettings}>
                    next
                </Button>
            </div>
        </div>
    );
};
