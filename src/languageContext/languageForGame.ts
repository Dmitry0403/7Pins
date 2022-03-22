import React from "react";

export const languageForGame = {
    english: {
        king: "King",
        officer: "Officer",
        pawn: "Pawn",
        onlyKingDowned: "Only king",
        caromBalls: "Carom balls",
        alianBall: "Alien ball",
        kingAndFourPawnsKnockedDown: "King and 4 pawns",
        allPinsKnockedDown: "All the pins are knocked down",
        fiveCaromBalls: "Five carom balls",
        bothSightingBallsScored: "Both sighting balls are scored",
        ballJumedOffTable: "Ball jumped off",
        cueBallNotTouchSingleAimingBall: "Cue ball did't touch an aiming ball",
        cueBallFallsIntoPocket: "Cue ball falls into the pocket",
        touchingAimingBallWithCue: "Touching the aiming ball",
    },
};

export const LanguageForGameContext = React.createContext(
    languageForGame.english
);
