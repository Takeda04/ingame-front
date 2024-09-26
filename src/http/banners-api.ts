import $host from "@/http/index";

export interface Banner {
    id: number;
    name: {
        ru: string;
        uz: string;
    };
    url: string;
    image: string;
    description: {
        ru: string;
        uz: string;
    };
}

export const getAllBanners = async () => {
    const {data} = await $host.get<{ data: Banner[] }>("/banners");
    return data;
}