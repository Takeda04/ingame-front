import $host from "@/http/index";

export interface News {
    id: number;
    title: {
        uz: string;
        ru: string;
    }
    slug: string;
    description: {
        uz: string;
        ru: string;
    }
    youtube_url: string;
    created_at: string;
    updated_at: string;
}

export const getAllNews = async () => {
    const {data} = await $host.get<{ data: News[] }>("/news");
    return data;
}