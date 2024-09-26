import $host from "@/http/index";


interface Comment {
    id: number;
    product_id: string;
    user_name: string;
    comment: string;
    rating: string;
    updated_at: string;
    created_at: string;
}
export const getAllComments = async () => {
    const { data } = await $host.get<{ data: Comment[] }>("/storeComment");
    return data;
}

export interface CommitFromClients {
    id: number;
    name: string;
    description: {
        ru: string;
        uz: string;
    },
    commit: {
        ru: string;
        uz: string;
    };
    video: string;
    image: string;
    created_at: string;
    updated_at: string;
}
export const getAllCommitsFromClients = async () => {
    const { data } = await $host.get<{ data: CommitFromClients[] }>("/commit-from-clients");
    return data;
}