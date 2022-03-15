import React from "react";

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
        ballJumedOffTable: "Cue ball or aiming ball jumped off the table",
        cueBallNotTouchSingleAimingBall:
            "The cue ball did not touch a single aiming ball",
        cueBallFallsIntoPocket: "The cue ball falls into the pocket",
        touchingAimingBallWithCue: "Touching the aiming ball with the cue",
        ballDirectlyKnockedPins:
            "Cue ball or aiming ball directly knocked down the pins - the sum of the downed pins",
        touchingClothesOrCuePins:
            "Touching clothes or cue pins - the sum of the downed pins",
        allPintsAddedToPenaltyPoints:
            "All points scored in this approach are added to the penalty points",
    },
};

export const LanguageContext = React.createContext(language.english);
