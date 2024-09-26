"use client";
import React, {createContext, FC, useContext, useState} from "react";
import {localStorageGetItem} from "@/utils/storage-available";
import {useTranslations} from "next-intl";
import {getBasketProducts, IBasketProduct, removeProductFromBasket} from "@/utils/basket-util";

export type Currency = "uzs" | "usd";
interface IAppContext {
    currency: Currency
    changeCurrency: (type: Currency) => void;
    formatPrice: (price: number, fractionDigits?: number, isCredit?: boolean) => string;
    basketProducts: IBasketProduct[];
    deleteProductFromBasket: (id: string) => void;
    refreshBasketProducts: () => void;
}

interface IAppState {
    currency: Currency
}

const AppContext = createContext<IAppContext>({
    currency: "uzs",
    changeCurrency: () => undefined,
    formatPrice: () => "",
    basketProducts: [],
    deleteProductFromBasket: () => undefined,
    refreshBasketProducts: () => undefined,
});

const CURRENCY_KEY = "currency";

interface IAppProviderProps {
    children: React.ReactNode;
}

export const useAppContext = () => {
    return useContext(AppContext);
}

export const AppProvider: FC<IAppProviderProps> = ({ children }) => {
    const [state, setState] = useState<IAppState>({
        currency: localStorageGetItem(CURRENCY_KEY, "uzs") as Currency || "uzs"
    });
    const t = useTranslations("Currency");
    const [basketProducts, setBasketProducts] = useState(getBasketProducts());

    const changeCurrency = (type: Currency) => {
        window.localStorage.setItem("CURRENCY_KEY", type);
        setState(prev => ({
            ...prev,
            currency: type
        }))
    }

    const formatPrice = (price: number, fractionDigits?: number, isCredit: boolean = false) => {
        if(isCredit) {
            return price.toLocaleString("ru-RU", {
                minimumFractionDigits: fractionDigits,
                maximumFractionDigits: fractionDigits,
            }) + " " + t(state.currency) + "/" + t("month");
        }
        return price.toLocaleString("ru-RU", {
            minimumFractionDigits: fractionDigits,
            maximumFractionDigits: fractionDigits,
        }) + " " + t(state.currency);
    }

    const deleteProductFromBasket = (id: string) => {
        setBasketProducts((prev=> prev.filter((item) => item.id !== id)));
        removeProductFromBasket(id);
    }

    const refreshBasketProducts = () => {
        setBasketProducts(getBasketProducts());
    }

    const value = {
        currency: state.currency,
        changeCurrency,
        formatPrice,
        basketProducts,
        deleteProductFromBasket,
        refreshBasketProducts
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}