import $host from "@/http/index";

export interface Game {
    id: number;
    name: string;
    slug: string;
    image: string;
}

export const getAllGames = async () => {
    const { data } = await $host.get<Game[]>("games");
    return data;
}