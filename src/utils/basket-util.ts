import {localStorageAvailable, localStorageGetItem} from "@/utils/storage-available";
import {IProductCredit} from "@/http/products-api";
import uuidv4 from "@/utils/uuidv4";

export interface IBasketProduct {
    productId: number;
    productSlug: string;
    credit: IProductCredit | null;
    count: number;
    id: string;
    isDesktop?: boolean;
}

export const BASKET_PRODUCTS_KEY = "basket_products";
export const COMPARE_PRODUCTS_KEY = "compare_products";

export const addProductToCompare = (desktopId: number) => {
    const isStorageAvailable = localStorageAvailable();
    if (!isStorageAvailable) {
        return false;
    }
    let compareProducts = JSON.parse(localStorageGetItem(COMPARE_PRODUCTS_KEY, "[]") || "[]") as number[];
    compareProducts.push(desktopId);
    localStorage.setItem(COMPARE_PRODUCTS_KEY, JSON.stringify(compareProducts));
    return true;
}

export const isProductInCompare = (desktopId: number) => {
    const isStorageAvailable = localStorageAvailable();
    if (!isStorageAvailable) {
        return false;
    }
    const compareProducts = JSON.parse(localStorageGetItem(COMPARE_PRODUCTS_KEY, "[]") || "[]") as number[];
    const i = compareProducts.findIndex(e => e == desktopId);
    return i > -1;
}

export const deleteProductFromCompare = (desktopId: number) => {
    const isStorageAvailable = localStorageAvailable();
    if (!isStorageAvailable) {
        return false;
    }
    let compareProducts = JSON.parse(localStorageGetItem(COMPARE_PRODUCTS_KEY, "[]") || "[]") as number[];
    localStorage.setItem(COMPARE_PRODUCTS_KEY, JSON.stringify(compareProducts.filter((item) => item != desktopId)));
    return true;
}

export const getProductsFromCompare = () => {
    return JSON.parse(localStorageGetItem(COMPARE_PRODUCTS_KEY, "[]") || "[]") as number[];
}

export const addProductToBasket = (productId: number, productSlug: string, credit: IProductCredit | null, count?: number, isDesktop?: boolean) => {
    const isStorageAvailable = localStorageAvailable();
    if (!isStorageAvailable) {
        return false;
    }
    let basketProducts = JSON.parse(localStorageGetItem(BASKET_PRODUCTS_KEY, "[]") || "[]") as IBasketProduct[];
    const product = {
        productId: productId,
        credit,
        productSlug,
        count: count || 1,
        id: uuidv4(),
        isDesktop: isDesktop,
    }
    basketProducts.push(product);
    localStorage.setItem(BASKET_PRODUCTS_KEY, JSON.stringify(basketProducts));
    return true;
}

export const isProductInBasket = (productId: number, isDesktop: boolean = false) => {
    const isStorageAvailable = localStorageAvailable();
    if (!isStorageAvailable) {
        return false;
    }
    const basketProducts = JSON.parse(localStorageGetItem(BASKET_PRODUCTS_KEY, "[]") || "[]") as IBasketProduct[];
    const i = basketProducts.findIndex(e => (e.productId == productId && e.isDesktop === isDesktop));
    return i > -1;
}


export const removeProductFromBasket = (id: string) => {
    let basketProducts = JSON.parse(localStorageGetItem(BASKET_PRODUCTS_KEY, "[]") || "[]") as IBasketProduct[];
    localStorage.setItem(BASKET_PRODUCTS_KEY, JSON.stringify(basketProducts.filter((item) => item.id !== id)));
}

export const changeCountProductsInBasket = (id: string, type: "INC" | "DEC") => {
    const isStorageAvailable = localStorageAvailable();
    if (!isStorageAvailable) {
        return false;
    }
    let basketProducts = JSON.parse(localStorageGetItem(BASKET_PRODUCTS_KEY, "[]") || "[]") as IBasketProduct[];
    const i = basketProducts.findIndex(e => e.id == id);
    if (i > -1) {
        if (type === "INC") {
            basketProducts[i].count = (basketProducts[i].count + 1);
        } else {
            basketProducts[i].count = (basketProducts[i].count - 1);
        }
        localStorage.setItem(BASKET_PRODUCTS_KEY, JSON.stringify(basketProducts));
        return true;
    }
    return false
}


export const getBasketProducts = () => {
    return JSON.parse(localStorageGetItem(BASKET_PRODUCTS_KEY, "[]") || "[]") as IBasketProduct[];
}

export const getBasketProductById = (productId: number) => {
    const isStorageAvailable = localStorageAvailable();
    if (!isStorageAvailable) {
        return null;
    }
    const basketProducts = JSON.parse(localStorageGetItem(BASKET_PRODUCTS_KEY, "[]") || "[]") as IBasketProduct[];
    const i = basketProducts.findLastIndex(e => e.productId == productId);
    if (i > -1) {
        return basketProducts[i];
    }
    return null;
}


export const getBasketProductByIdAndCreditId = (productId: number, creditId: number | null) => {
    const isStorageAvailable = localStorageAvailable();
    if (!isStorageAvailable) {
        return null;
    }
    const basketProducts = JSON.parse(localStorageGetItem(BASKET_PRODUCTS_KEY, "[]") || "[]") as IBasketProduct[];
    const product = basketProducts.find(e => (e.productId == productId && e.credit?.id == creditId));
    return product || null;
}
