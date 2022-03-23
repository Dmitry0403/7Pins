import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import { store } from "./store/store";
import "./styles/styles.css";
import {
    LanguageContext,
    language,
    LanguageForGameContext,
    languageForGame,
} from "./languageContext";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <LanguageContext.Provider value={language.english}>
                <LanguageForGameContext.Provider
                    value={languageForGame.english}
                >
                    <App />
                </LanguageForGameContext.Provider>
            </LanguageContext.Provider>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
