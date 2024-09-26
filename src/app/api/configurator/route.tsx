import {NextApiResponse} from "next";
import {NextRequest, NextResponse} from "next/server";
import $host from "@/http";
import {Product} from "@/http/products-api";

export async function POST(req: NextRequest, res: NextApiResponse) {
    const {desktopId, productIds} = await req.json() as { desktopId: string, productIds: string[] };
    const result: Product[] = [];
    for (let productId of productIds) {
        try {
            const {data} = await $host.get(`/products/${productId}`);
            result.push(data.data);
        } catch (e) {
            console.log(e);
        }
    }
    try {
        const {data} = await $host.get(`/desktops/${desktopId}`);
        return NextResponse.json({
            ...data.data,
            products: result
        });
    } catch (e) {
        console.log(e);
    }
    return NextResponse.json({});
}
