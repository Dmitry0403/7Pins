import React, { useState } from "react";
import scss from "./styles.module.scss";

export const CurrencyTable: React.FC = () => {
    const [state, setState] = useState(null);

    return <div className={scss.mainCurrencyTable}></div>;
};
