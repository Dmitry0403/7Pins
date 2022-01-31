import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "../src/pages/App";
import "./styles/styles.css";

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);
