import React, { PropsWithChildren, useState, useMemo, useContext } from "react";
import { language, LanguageContext } from "./language";

interface IContext {}

export const LanguageProvider = (props: PropsWithChildren<IContext>) => {
    const [languageTheme, setLanguageTheme] = useState(language.english);
    const value = useMemo(
        () => [languageTheme, setLanguageTheme],
        [languageTheme]
    );
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

    return context;
};
