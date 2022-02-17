interface ApiType {
    getListGames: () => void;
}

export class Api implements ApiType {
    getListGames = () => {
        return localStorage.getItem("listGames");
    };
}
