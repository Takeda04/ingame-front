import HomeSlider from "@/components/home-slider/home-slider";
import HomeCatalog from "@/components/home-slider/home-catalog/home-catalog";
import HomePC from "@/components/home-pc/home-pc";
import {getAllProducts} from "@/http/products-api";
import HomeProductSlider from "@/components/home-product-slider/home-product-slider";
import HomeSelectPc from "@/components/home-select-pc/home-select-pc";
import HomeServices from "@/components/home-services/home-services";
import WhyChooseUs from "@/components/why-choose-us/why-choose-us";
import HomeNews from "@/components/home-news/home-news";
import HomeFooter from "@/components/home-footer/home-footer";
import Box from "@mui/material/Box";
import {getAllBanners} from "@/http/banners-api";
import {getAllDesktops} from "@/http/desktops-api";
import HomeFaq from "@/components/home-faq/home-faq";
import {getAllCommitsFromClients} from "@/http/comments-api";
import {getAllNews} from "@/http/news-api";
import {getAllCatalogs} from "@/http/catalog-api";

export const revalidate = 3600;

export default async function Home() {
    const catalogs = await getAllCatalogs();
    const products = await getAllProducts();
    const banners = await getAllBanners();
    const desktops = await getAllDesktops();
    const commitsFromClients = await getAllCommitsFromClients();
    const news = await getAllNews();

    return (
        <Box
            component="main"
            sx={{
                overflowX: "hidden"
            }}
        >
            <HomeSlider banners={banners.data}/>
            <HomeCatalog catalogs={catalogs}/>
            <HomePC desktops={desktops.data.slice(0, 6)}/>
            <HomeProductSlider
                products={products.data.slice(0, 4)}
                type="new_items"
            />
            <HomeProductSlider
                products={products.data.slice(4, 8)}
                type="stock"
            />
            <HomeSelectPc/>
            <HomeServices/>
            <WhyChooseUs commitsFromClients={commitsFromClients.data}/>

            <HomeFaq/>

            <HomeNews news={news.data}/>

            <HomeFooter/>

        </Box>
    );
};