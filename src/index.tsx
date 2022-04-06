import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import { store } from "./store/store";
import "./styles/styles.css";
import { LanguageContext, language } from "./languageContext";

const Main: React.FC = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <LanguageContext.Provider value={language.english}>
                    <App />
                </LanguageContext.Provider>
            </BrowserRouter>
        </Provider>
    );
};

ReactDOM.render(<Main />, document.getElementById("root"));
