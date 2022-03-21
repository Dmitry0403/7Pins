import React from "react";
import scss from "./styles.module.scss";
import type { ICurrency } from "../../store/currencySlice";
import { Button } from "antd";

interface IProps {
    currency: ICurrency;
    handleExitPortModal: () => void;
}

export const CurrencyCard: React.FC<IProps> = ({
    currency,
    handleExitPortModal,
}) => {
    return (
        <div className={scss.mainCurrencyCard}>
            <div className={scss.titleCurrency}>{currency.Cur_Name}</div>
            <div className={scss.info}>
                <span className={scss.item}>{currency.Cur_Scale}</span>
                <span className={scss.item}>{currency.Cur_Abbreviation}</span>
                <span className={scss.item}>-</span>
                <span className={scss.item}>
                    {currency.Cur_OfficialRate} руб.
                </span>
            </div>
            <div className={scss.button}>
                <Button onClick={handleExitPortModal}>back</Button>
            </div>
        </div>
    );
};
