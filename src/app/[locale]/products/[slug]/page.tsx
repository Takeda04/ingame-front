import React from 'react';
import {NextPage} from "next";
import {getProductBySlug, getProductsByCategory} from "@/http/products-api";
import ProductPage from "@/views/products/product";
import {notFound} from "next/navigation";

interface IPageProps {
    params: {
        locale: "ru" | "uz";
        slug: string;
    }
    searchParams: {
        desktop: "1" | undefined;
    };
}

const Page: NextPage<IPageProps> = async ({params, searchParams}) => {
    const slug = params.slug;
    const locale = params.locale;
    const _product = await getProductBySlug(slug, searchParams.desktop === "1");
    if(!_product) {
        return notFound();
    }
    const { data: product } = _product;
    const {data: similarProducts} = await getProductsByCategory(product.type, {});

    return <ProductPage product={product} locale={locale} similarProducts={similarProducts} isDesktop={searchParams.desktop === "1"}/>;
};

export default Page;