import {Product} from "@/http/products-api";
import $host from "@/http/index";
import {Game} from "@/http/game-api";


export interface IDesktopImage {
    id: number;
    desktop_computer_id: number;
    image_name: string;
    image_path: string;
    mime: string;
    created_at: string;
    updated_at: string;
}

export interface DesktopStatus {
    id: number;
    name: string;
    pivot: {
        desktop_computer_id: number;
        status_id: number;
    }
}

export type DesktopNames = "office" | "allin" | "games" | "creation" | "streaming";

export interface IDesktopType {
    id: number;
    name: DesktopNames;
    pivot: {
        desktop_computer_id: number;
        desktop_type_id: number;
    }
}

export interface IDesktopFps {
    fps: number;
    game_id: number;
    game: string;
    game_fps: string;
}

export interface Desktop {
    id: number;
    catalog_id: number;
    type: string;
    desktop_type: IDesktopType[];
    slug: string;
    status: DesktopStatus[];
    name: {
        uz: string;
        ru: string;
    };
    description: {
        uz: string;
        ru: string;
    };
    price: {
        usd: number;
        uzs: number;
    };
    discount: {
        usd: number;
        uzs: number;
    };
    credits: {
        id: number;
        name: string;
        months: number;
        usd: number;
        uzs: number;
        logo: string;
    }[];
    attributes: {
        id: number;
        type: {
            uz: string;
            ru: string;
        },
        value: string;
        pivot: {
            desktop_computer_id: number;
            attribute_id: number;
            value: string;
        }
    }[];
    products: Product[];
    images: IDesktopImage[];
    fps: IDesktopFps[];
    comments: any[];
    created_at: string;
    updated_at: string;
}

export interface IFilterDesktopAttributes {
    id: number;
    type: [string, string];
    value: string;
}

export const getAllDesktops = async () => {
    const {data} = await $host.get<{ data: Desktop[] }>(`/desktops`);
    return data;
}

export const getDesktopsByFilter = async ({
                                              type,
                                              min_price,
                                              max_price,
                                              attribute,
                                              cpu_attribute,
                                              game,
                                          }: {
    type?: DesktopNames[];
    min_price?: string | null;
    max_price?: string | null;
    attribute?: string,
    cpu_attribute?: string,
    game?: Game,
}) => {
    const {data} = await $host.get<{
        data: Desktop[],
        products_attributes: IFilterDesktopAttributes[][]
    }>(`/desktops/filters`, {
        params: {
            type: type,
            min_price: min_price,
            max_price: max_price,
            desktop_product_name: [attribute, cpu_attribute],
            game: game?.id
        }
    });
    return data;
}

export const getDesktopBySlug = async (slug: string) => {
    const { data } = await $host.get<{ data: Desktop }>(`/desktops/${slug}`);
    return data;
}