import $host from "@/http/index";

export interface Catalog {
    id: string;
    name: {
        uz: string;
        ru: string;
    },
    slug: string;
    type: string;
    image: string;
    image_name: string;
    mime: string;
}

export type ICatalog = Catalog[]

export const getAllCatalogs = async () => {
    const { data } = await $host.get<ICatalog>("/catalogs");
    return data;
}


export const getCatalogByType = async (type: string) => {
    const { data } = await $host.get<{ data: Catalog }>(`/catalogs/${type}`);
    return data;
}

