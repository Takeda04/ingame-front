import React from 'react';
import Checkout from "@/views/checkout/page";
import {getDeliveryMethods, getPaymentTypes} from "@/http/checkout-api";
import {NextPage} from "next";

interface IPageProps {
    params: {
        locale: "ru" | "uz";
        slug: string;
    }
    searchParams: {
        p: string | undefined;
        slug: string | undefined;
        desktop: "1" | "0" | undefined;

        configurator: string;
        "products[]": string[] | undefined;
    };
}

const Page: NextPage<IPageProps> = async (params) => {
    const {data: deliveryMethods} = await getDeliveryMethods();
    const {data: paymentTypes} = await getPaymentTypes();
    const productId = params.searchParams.p;
    const productSlug = params.searchParams.slug;
    const isProductDesktop = params.searchParams.desktop;

    const configurator = params.searchParams.configurator;
    const desktopProductsId = params.searchParams["products[]"];

    return <Checkout
        paymentTypes={paymentTypes}
        deliveryMethods={deliveryMethods}
        product={{productId, productSlug, isProductDesktop}}
        configurator={configurator}
        desktopProductsId={desktopProductsId}
    />
};

export default Page;