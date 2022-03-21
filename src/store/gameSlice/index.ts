export {
    gameReducer,
    gameActions,
    gameSelector,
    updateGame,
    fetchGame,
    playersSelector,
    settingGameSelector,
    loadingGameStatusSelector,
    errorMessageGameSelector,
    isUpdateGameStatusSelector,
} from "./gameSlice";
export type { IGame, IPlayers, IPlayer } from "./gameSlice";
