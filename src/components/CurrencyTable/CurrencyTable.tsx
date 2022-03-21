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
import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { PortModal } from "../../pages/PortModalPage/PortModalPage";
import { CurrencyCard } from "../CurrencyCard";

export const CurrencyTable: React.FC = () => {
    const dispatch = useAppDispatch();
    const [date, setDate] = useState(format(new Date(), "yyy-MM-dd"));
    const [isActivePortModal, setIsActivePortModal] = useState(false);
    const dataCurrencies = useAppSelector<ICurrency[]>(currencySelector);
    const errorMessage = useAppSelector(errorMessageCurrencySelector);
    const loadStatus = useAppSelector(loadingStatusCurrencySelector);
    const [currency, setCurrency] = useState<ICurrency>(dataCurrencies[0]);
    const navigate = useNavigate();

    const baseUrl = "https://www.nbrb.by/api/exrates/rates?";
    const queryParams = { ondate: date, periodicity: "0" };
    const searchParams = new URLSearchParams(queryParams).toString();
    const url = baseUrl + searchParams;

    useEffect(() => {
        dispatch(fetchCurrency(url));
    }, [date]);

    const titles = ["Currency", "Units", "Code", "Course"];

    const handleClickToday = () => {
        setDate(format(new Date(), "yyy-MM-dd"));
    };

    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    const handleClickCurrency = (currency: ICurrency) => {
        setIsActivePortModal(true);
        setCurrency(currency);
    };

    const handleExitPortModal = () => {
        setIsActivePortModal(false);
    };

    return (
        <div className={scss.mainCurrencyTable}>
            <div className={scss.titleCurrency}>
                Exchange rates of the National Bank of Belarus on{" "}
                {date.replace(/(\d*)-(\d*)-(\d*)/, "$3.$2.$1")}
            </div>
            <div className={scss.sectionDate}>
                <div className={scss.today} onClick={handleClickToday}>
                    for today
                </div>
                <div className={scss.date}>
                    <span>on the date</span>
                    <input
                        type="date"
                        value={date}
                        onChange={handleChangeDate}
                    />
                </div>
            </div>
            <div className={scss.titles}>
                {titles.map((item) => (
                    <div className={scss.itemTitle} key={item}>
                        {item}
                    </div>
                ))}
            </div>
            {loadStatus === LOAD_STATUSES.LOADING && <Spin />}
            {loadStatus === LOAD_STATUSES.FAILURE && (
                <div className={scss.error}>{errorMessage}</div>
            )}
            <div className={scss.sectionCurrencies}>
                {loadStatus === LOAD_STATUSES.SUCCESS && (
                    <div className={scss.subSectionCurrencies}>
                        {dataCurrencies.map((item: ICurrency, i) => (
                            <div
                                className={
                                    i % 2 !== 0
                                        ? scss.itemCurrency
                                        : scss.itemCurrencyGray
                                }
                                key={item.Cur_Name}
                                onClick={() => handleClickCurrency(item)}
                            >
                                <span>{item.Cur_Name}</span>

                                <span>{item.Cur_Scale}</span>
                                <span>{item.Cur_Abbreviation}</span>
                                <span>{item.Cur_OfficialRate}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={scss.footerButtons}>
                <Button size="large" onClick={() => navigate(-1)}>
                    back
                </Button>
            </div>
            {isActivePortModal && (
                <PortModal>
                    <CurrencyCard
                        currency={currency}
                        handleExitPortModal={handleExitPortModal}
                    />
                </PortModal>
            )}
        </div>
    );
};
