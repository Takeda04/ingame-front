import $host from "@/http/index";

export interface IBrand {
    id: number;
    name: string;
    slug: string;
}

export const getAllBrands = async () => {
    const { data } = await $host.get<{ data: IBrand[] }>("/brands");
    return data;
}