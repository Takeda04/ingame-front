"use client";
import {useRouter, useSearchParams} from 'next/navigation';
import React, {FormEvent, useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import AppContainer from "@/ui/app-container/app-container";
import NavigationLink from "@/components/navigation-link/navigation-link";
import Typography from "@mui/material/Typography";
import {Button, Skeleton, TextField} from "@mui/material";
import axios from "axios";
import {useLocale, useTranslations} from "next-intl";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";

interface ISearchProducts {
    facet_counts: any[];
    found: number;
    hits: {
        document: {
            brand_id: number;
            category_id: number;
            created_at: string;
            description: string[];
            id: string;
            name: string[];
            price: number;
            slug: string;
            status: string;
            updated_at: string;
        };
        highlights: {
            field: string;
            indices: number[];
            matched_tokens: string[][];
            snippets: string[];
            values: string[];
        }[];
    }[];
}

const Page = () => {
    const [products, setProducts] = useState<ISearchProducts["hits"]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const searchQuery = searchParams?.get('q') || "";
    const [search, setSearch] = useState(searchQuery || "");
    const router = useRouter();
    const localActive = useLocale();
    const t = useTranslations("Search");

    const fetchData = async () => {
        setLoading(true);
        try {
            const products = await axios.get<ISearchProducts>("/api/search", {
                params: {
                    q: searchQuery
                }
            });
            setProducts(products.data.hits);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams?.toString())
        params.set('q', search);
        router.push(`/${localActive}/search?${params.toString()}`);
    }

    useEffect(() => {
        fetchData();
    }, [searchQuery]);


    return (
        <Box
            sx={{
                backgroundColor: theme => theme.palette.secondary.main
            }}
        >
            <AppContainer>
                <Breadcrumb
                    list={[
                        {
                            label: t("pagination.main"),
                            link: "/"
                        },
                        {
                            label: t("pagination.searchPage")
                        },
                        {
                            label: searchQuery!
                        }
                    ]}
                />

                <Box
                    sx={{
                        mt: "20px"
                    }}
                >
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            height: "40px",
                            display: "flex",
                            maxWidth: "530px"
                        }}
                    >

                        <TextField
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            sx={{
                                height: "100%",
                                backgroundColor: "#383838",
                            }}
                            InputProps={{
                                sx: {
                                    height: "100%",
                                    borderRadius: 0,
                                    color: theme => theme.palette.primaryText.main
                                }
                            }}
                            fullWidth
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                borderRadius: 0,
                                height: "100%",
                                padding: "10px 24px"
                            }}
                        >
                            {t("searchBtn")}
                        </Button>
                    </Box>
                </Box>

                <Box>
                    {products.length === 0 && (
                        <Typography
                            sx={{
                                color: theme => theme.palette.primary.main,
                                fontSize: 20,
                                lineHeight: "24px",
                                mt: "6px"
                            }}
                        >
                            No results found
                        </Typography>
                    )}
                    {loading && [1, 2, 3, 4].map((item, idx) => (
                        <Box
                            key={idx}
                            sx={{
                                padding: "38px 10px",
                                borderBottom: "1px solid #424242",

                            }}
                        >
                            <Skeleton
                                animation="wave"
                                variant="rectangular"
                                width="100%"
                                height={20}
                                sx={{
                                    '&::after': {
                                        backgroundImage: 'linear-gradient(90deg, transparent, #383838, transparent)'
                                    }
                                }}
                            />
                            <Skeleton
                                animation="wave"
                                variant="rectangular"
                                width="100%"
                                height={40}
                                sx={{
                                    mt: "10px",
                                    '&::after': {
                                        backgroundImage: 'linear-gradient(90deg, transparent, #383838, transparent)'
                                    }
                                }}
                            />
                        </Box>
                    ))}
                    {!loading && products.map((product, idx) => (
                        <NavigationLink key={idx} href={`/products/${product.document.slug}`}>
                            <Box
                                sx={{
                                    padding: {xs: "16px 17px", sm: "38px 10px"},
                                    borderBottom: "1px solid #424242",

                                }}
                            >
                                <Typography
                                    dangerouslySetInnerHTML={{__html: product.highlights.map(h => h.snippets).join(', ')}}
                                    sx={{
                                        color: theme => theme.palette.primary.main,
                                        fontSize: {xs: 16, sm: 20},
                                        lineHeight: "24px",
                                        mt: "6px"
                                    }}
                                />
                                <Typography
                                    sx={{
                                        color: theme => theme.palette.primaryText.main,
                                        fontSize: {xs: 12, sm: 14},
                                        lineHeight: "17px",
                                        fontWeight: 500
                                    }}
                                >
                                    {product.document.description}
                                </Typography>
                            </Box>
                        </NavigationLink>
                    ))}
                </Box>
            </AppContainer>
        </Box>
    );
};

export default Page;