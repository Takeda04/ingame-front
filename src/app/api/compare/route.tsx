import {NextApiResponse} from "next";
import {NextRequest, NextResponse} from "next/server";
import $host from "@/http";

export async function POST(req: NextRequest, res: NextApiResponse) {
    const {products} = await req.json() as { products: number[] };
    const result = [];
    for (let product of products) {
        try {
            const {data} = await $host.get(`/desktops/${product}`);
            result.push(data.data);
        } catch (e) {
            console.log(e);
        }
    }
    return NextResponse.json(result);
}
