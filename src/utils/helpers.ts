import {Currency} from "@/context/app-context";


export function calculateDiscountPercentage(oldPrice: number, newPrice: number | null) {
    if (oldPrice === 0 || !newPrice) {
        throw new Error("Old price cannot be zero.");
    }
    const discount = (oldPrice - newPrice) / oldPrice * 100;
    return Math.round(discount);
}

export function formatPrice(price: number, currency: Currency) {
    return `${price.toLocaleString("ru-RU")} ${currency.toUpperCase()}`;
}

export const getAssetUrl = (_url: string) => {
    try {
        const domainUrl = process.env.NEXT_PUBLIC_API_DOMAIN;
        const url = new URL(_url);
        const pathAfterDomain = url.pathname;
        return `${domainUrl}/${pathAfterDomain}`;
    } catch (e) {
        console.log(e);
        return "";
    }
}

export const cutText = (str: string, limit: number) => {
    if(str.length > limit) {
        return str.slice(0, limit) + "...";
    }
    return str;
}