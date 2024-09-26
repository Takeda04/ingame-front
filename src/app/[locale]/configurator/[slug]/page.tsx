import React from 'react';
import {getProductListTypes, getProductsByCategory, getProductStatus, Product} from "@/http/products-api";
import Configurator from "@/views/configurator/configurator";
import {getDesktopBySlug} from "@/http/desktops-api";
import {NextPage} from "next";

interface IPageProps {
    params: {
        locale: "ru" | "uz";
        slug: string;
    }
}

const Page: NextPage<IPageProps> = async ({ params }) => {
    const desktopSlug = params.slug;
    const products = await getProductListTypes();
    const desktop = await getDesktopBySlug(desktopSlug);


    return <Configurator products={products} desktop={desktop.data}/>
};

export default Page;