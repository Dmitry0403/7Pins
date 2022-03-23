import React from "react";

export const languageForGame = {
    english: {
        king: "King",
        officer: "Officer",
        pawn: "Pawn",
        caromBalls: "Carom balls",
        alianBall: "Alien ball",
        ballJumedOffTable: "Ball jumped off",
        cueBallNotTouchSingleAimingBall: "Cue ball did't touch an aiming ball",
        cueBallFallsIntoPocket: "Cue ball falls into the pocket",
        touchingAimingBallWithCue: "Touching the aiming ball with the cue",
    },
};

export const LanguageForGameContext = React.createContext(
    languageForGame.english
);
