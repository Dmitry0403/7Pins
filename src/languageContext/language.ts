import React, { SetStateAction } from "react";

export const language = {
    english: {
        king: "King",
        officer: "Officer",
        pawn: "Pawn",
        onlyKingDowned: "Only the king is downed",
        caromBalls: "Carom balls",
        alianBall: "Alien ball",
        kingAndFourPawnsKnockedDown:
            "The king and 4 pawns are knocked down at the same time",
        allPinsKnockedDown: "All the pins are knocked down at the same time",
        fiveCaromBalls:
            "The player made five carom balls in a row without gaining other point",
        bothSightingBallsScored:
            "As a result of the impact, both sighting balls are scored",
        ballJumedOffTable: "Ball jumped off",
        cueBallNotTouchSingleAimingBall: "Cue ball did't touch an aiming ball",
        cueBallFallsIntoPocket: "Cue ball fell into the pocket",
        touchingAimingBallWithCue: "Touching the aiming ball with the cue",
    },
    russian: {
        king: "Король",
        officer: "Офицер",
        pawn: "Пешка",
        onlyKingDowned: "Сбит только король",
        caromBalls: "Карамболь",
        alianBall: "Чужой шар",
        kingAndFourPawnsKnockedDown: "Сбиты одновременно король и четыре пешки",
        allPinsKnockedDown: "Сбиты одновременно все кегли",
        fiveCaromBalls:
            "Игрок «сделал» подряд пять карамболей, не набирая при этом других очков",
        bothSightingBallsScored:
            "В результате удара забиты оба прицельных шара",
        ballJumedOffTable: "Шар выскочил со стола",
        cueBallNotTouchSingleAimingBall: "Биток не коснулся прицельного шара",
        cueBallFallsIntoPocket: "Биток падает в лузу",
        touchingAimingBallWithCue: "Касание кием прицельного шара",
    },
};

type ILanguage = typeof language.english;

interface ILanguageContext {
    languageTheme: ILanguage;
    setLanguageTheme: React.Dispatch<SetStateAction<ILanguage>>;
}

export const LanguageContext = React.createContext<ILanguageContext>({
    languageTheme: language.russian,
    setLanguageTheme: () => {},
});
