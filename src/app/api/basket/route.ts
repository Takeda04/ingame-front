import {NextApiResponse} from "next";
import {NextRequest, NextResponse} from "next/server";
import {IBasketProduct} from "@/utils/basket-util";
import $host from "@/http";
import {getProductBySlug} from "@/http/products-api";

export async function POST(req: NextRequest, res: NextApiResponse) {
    const {products} = await req.json() as { products: IBasketProduct[] };
    const result = [];
    for (let product of products) {
        try {
            if(product.isDesktop) {
                const _product = await getProductBySlug(product.productSlug, true);
                if(!_product) {
                    continue;
                }
                result.push({
                    product: _product.data,
                    ...product,
                });
                continue;
            }
            const {data} = await $host.get(`/products/${product.productSlug}`);
            result.push({
                product: data.data,
                ...product
            });
        } catch (e) {
            console.log(e);
        }
    }
    return NextResponse.json(result);
}
