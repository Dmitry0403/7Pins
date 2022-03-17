import React, { useEffect, useState } from "react";
import scss from "./styles.module.scss";
import {
    ICurrency,
    currencySelector,
    fetchCurrency,
    errorMessageCurrencySelector,
    loadingStatusCurrencySelector,
} from "../../store/currencySlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { LOAD_STATUSES } from "../../common";
import { Spin } from "antd";

export const CurrencyTable: React.FC = () => {
    const dispatch = useAppDispatch();
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const dataCurrencies = useAppSelector<ICurrency[]>(currencySelector);
    const errorMessage = useAppSelector(errorMessageCurrencySelector);
    const loadStatus = useAppSelector(loadingStatusCurrencySelector);

    const baseUrl = "https://www.nbrb.by/api/exrates/rates?";
    const queryParams = { ondate: date, periodicity: "0" };
    const searchParams = new URLSearchParams(queryParams).toString();
    const url = baseUrl + searchParams;

    useEffect(() => {
        dispatch(fetchCurrency(url));
    }, [dispatch, date]);

    const titles = ["Currency", "Units", "Code", "Course"];

    const handleClickToday = () => {
        setDate(new Date().toLocaleDateString());
    };

    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    return (
        <div className={scss.mainCurrencyTable}>
            <div className={scss.titleCurrency}>
                Exchange rates of the National Bank of Belarus on{" "}
                {date.replace(/(\d*)-(\d*)-(\d*)/, "$3-$2-$1")}
            </div>
            <div className={scss.sectionDate}>
                <div className={scss.today} onClick={handleClickToday}>
                    for today
                </div>
                <div className={scss.date}>
                    <span>on the date</span>
                    <input type="date" onChange={handleChangeDate} />
                </div>
            </div>
            <div className={scss.titles}>
                {titles.map((item) => (
                    <div className={scss.itemTitle} key={item}>
                        {item}
                    </div>
                ))}
            </div>
            {loadStatus === LOAD_STATUSES.SUCCESS && (
                <div className={scss.sectionCurrencies}>
                    <div className={scss.subSectionCurrencies}>
                        {dataCurrencies.map((item: ICurrency, idx) => (
                            <div
                                className={
                                    idx % 2 !== 0
                                        ? scss.itemCurrency
                                        : scss.itemCurrencyGray
                                }
                                key={item.Cur_Name}
                            >
                                <span>{item.Cur_Name}</span>
                                <span>{item.Cur_Scale}</span>
                                <span>{item.Cur_Abbreviation}</span>
                                <span>{item.Cur_OfficialRate}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {loadStatus === LOAD_STATUSES.LOADING && <Spin />}
            {loadStatus === LOAD_STATUSES.FAILURE && (
                <div className={scss.error}>{errorMessage}</div>
            )}
        </div>
    );
};
