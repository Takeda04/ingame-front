import $host from "@/http/index";


export interface IConversion {
    id: number;
    usd: number;
    currency: string;
    conversions: string;
    marja: string;
}
export const getConversion = async (): Promise<IConversion> => {
    try {
        const { data } = await $host.get("/conversions");
        return data?.[0];
    } catch (e) {
        return Promise.resolve({
            id: 1,
            usd: 1,
            currency: "uzs",
            conversions: "12700",
            marja: "0.0000787402",
        });
    }
}