import $host from "@/http/index";

export interface ServicePrice {
    id: number;
    category: string;
    subCategory: string;
    type: null;
    price: string;
}

export const getServicePrice = async () => {
    const { data } = await $host.get<{ data: ServicePrice[] }>("/servicePrices");
    return data;
}