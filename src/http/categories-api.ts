import $host from "@/http/index";
import {Desktop} from "@/http/desktops-api";

export interface Category {
    id: number;
    image_name: string | null;
    image_path: string | null;
    mime: string;
    name: {
        ru: string;
        uz: string;
    }
    parent_id: number | null;
    slug: string;
    status: "active" | "inactive";
    description: {
        ru: string;
        uz: string;
    }
    desktops: Desktop[];
    subCategories: Category[];
    updated_at: string;
    created_at: string;
    deleted_at: string;

    path?: string;
}

export const getAllCategories = async (): Promise<{ data: Category[] }> => {
    const {data} = await $host.get<{ data: Category[] }>("/categories");
    return data;
}

export const getCategoryBySlug = async (slug: string | null) => {
    if(slug) {
        return { data: null };
    }
    const {data} = await $host.get<{ data: Category }>(`/categories/${slug}`);
    return data;
}



