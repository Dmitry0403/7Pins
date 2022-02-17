import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import { store } from "./store/store";
import "./styles/styles.css";
import { MasterPage } from "./pages/MasterPage";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <MasterPage>
                <App />
            </MasterPage>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
