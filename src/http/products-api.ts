import $host from "@/http/index";
import {Desktop} from "@/http/desktops-api";
import {AxiosError} from "axios";


export interface IAttribute {
    id: number;
    type: {
        uz: string;
        ru: string;
    },
    value: string;
    pivot: {
        product_id: number;
        attribute_id: number;
        value: string;
    }
}

export interface IProductComment {
    user_name: string;
    rating: number;
    comment: string;
    id: number;
    image: string;
}

export interface IProductCredit {
    id: number;
    name: string;
    months: number;
    logo: string;
    usd: number;
    uzs: number;
}

export interface IProductImage {
    id: number;
    image_name: string;
    image_path: string;
    mime: string;
}

export interface Product {
    id: number;
    category_id: number;
    category_slug: string;
    slug: string;
    type: string;
    credits: IProductCredit[];
    name: {
        uz: string;
        ru: string;
    }
    price: {
        usd: number;
        uzs: number;
        euro: number;
        rub: number;
    }
    description: {
        uz: string;
        ru: string;
    }
    brand: {
        id: number;
        name: string;
        slug: string;
    };
    discount: {
        usd: number | null;
        uzs: number;
        euro: number;
        rub: number;
    },
    images: IProductImage[];
    attributes: IAttribute[];
    status: "new" | "active" | "promotion"
    comments: IProductComment[];
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export const getAllProducts = async (): Promise<{ data: Product[] }> => {
    const {data} = await $host.get<{ data: Product[] }>("/products");
    return data;
}

export const getProductBySlug = async (slug: string, isDesktop: boolean = false) => {
    try {
        if(!isDesktop) {
            const {data} = await $host.get<{ data: Product }>(`/products/${slug}`);
            return data;
        }
        const {data} = await $host.get<{ data: Desktop }>(`/desktops/${slug}`);
        return data;
    } catch (e) {
        if(e instanceof AxiosError) {
            if(e.status === 404) {
                return null;
            }
        }
    }
}


export interface CategoryProducts {
    id: number;
    image_name: string | null;
    image_path: string | null;
    mime: string;
    name: {
        ru: string;
        uz: string;
    }
    parent_id: number;
    slug: string;
    status: "active" | "inactive";
    description: {
        ru: string;
        uz: string;
    }
    products: Product[];
    updated_at: string;
    created_at: string;
    deleted_at: string;
}

export interface IProductFilterAttribute {
    id: number;
    type: [string, string];
    value: string;
}

export interface IProductFilter {
    data: Product[];
    products_attributes: IProductFilterAttribute[];
    products_brands: {
        id: number;
        name: string;
    }[];
    links: {
        first: string;
        last: string;
        prev: null;
        next: null;
    },
    meta: {
        current_page: number
        "from": 1,
        "last_page": 1,
        links: {
            url: string;
            label: string;
            active: string;
        }[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    }
}

export const getProductsByCategory = async (slug: string, filter: {
    min_price?: string | undefined,
    max_price?: string | undefined,
    brand_search_params?: string[] | undefined,
    page?: string | undefined,
    attributes?: string[] | undefined,
}) => {
    const {data} = await $host.get<IProductFilter>(`/${slug}/product/filters`, {
        params: {
            min_price: filter.min_price,
            max_price: filter.max_price,
            "brand[]": filter.brand_search_params,
            page: filter.page,
            "attributes[]": filter.attributes
        }
    });
    return data;
}

export const getProductsByCategorySlug = async (slug: string, filter: {
    min_price?: string | undefined,
    max_price?: string | undefined,
    brand_search_params?: string[] | undefined,
}): Promise<{ data: Product[] }> => {
    const {data} = await $host.get<{ data: Product[] }>(`/catalogs/${slug}`, {
        params: {
            min_price: filter.min_price,
            max_price: filter.max_price,
            "brand[]": filter.brand_search_params
        }
    });
    return data;
}

export enum ProductStatus {
    ACTIVE = 1,
    INACTIVE = 2,
    NEW = 3,
    SALE = 4,
}

export const getProductsByStatus = async (status: ProductStatus, slug: string) => {
    const {data} = await $host.get<{ data: Product[] }>(`/${slug}/product`);

}

export interface IProductStatus {
    id: number;
    name: string;
}

export const getProductStatus = async () => {
    const {data} = await $host.get<{ data: IProductStatus[] }>("/products/types");
    return data;
}

export const getProductListTypes = async () => {
    const {data} = await $host.get<{ [key: string]: Product[] }>("/products/list/types");
    return data;
}