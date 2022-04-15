import React, { PropsWithChildren, useState, useContext } from "react";
import { language, LanguageContext } from "./language";

interface IContext {}

export const LanguageProvider = (props: PropsWithChildren<IContext>) => {
    const [languageTheme, setLanguageTheme] = useState(language.russian);
    return (
        <LanguageContext.Provider
            value={{ languageTheme, setLanguageTheme }}
            {...props}
        />
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageContext");
    }
    const { languageTheme, setLanguageTheme } = context;
    return { languageTheme, setLanguageTheme, language };
};
