import {NextPage} from "next";
import {getProductsByCategory} from "@/http/products-api";
import Category from "@/views/category/category";
import {getCatalogByType} from "@/http/catalog-api";
import {getAllCommitsFromClients} from "@/http/comments-api";

interface IPageProps {
    params: {
        locale: "ru" | "uz";
        slug: string;
    }
    searchParams: {
        min_price: string | undefined;
        max_price: string | undefined;
        "brand[]": string[] | undefined;
        page: string | undefined;
        "attributes[]": string[] | undefined;
    };
}

const Page: NextPage<IPageProps> = async ({params, searchParams}) => {
    const minPrice = searchParams.min_price;
    const maxPrice = searchParams.max_price;
    const page = searchParams.page || "1";
    const attributes = searchParams["attributes[]"];
    const brandsSearchParams = searchParams["brand[]"];
    const products = await getProductsByCategory(params.slug, {
        min_price: minPrice,
        max_price: maxPrice,
        brand_search_params: brandsSearchParams,
        page: page,
        attributes: attributes
    });
    console.log(attributes);
    const {data: catalog} = await getCatalogByType(params.slug);
    const commitsFromClients = await getAllCommitsFromClients();

    return <Category products={products} currentPage={page} catalog={catalog} minPriceValue={minPrice}
                     maxPriceValue={maxPrice} attributes={attributes} brandsSearchParams={brandsSearchParams} commitsFromClients={commitsFromClients.data}/>;
};


export default Page;